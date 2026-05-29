import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js"; // or wherever configured
import axios from "axios";
import { generateAIResponse } from "../services/ai.service.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
export const getUsersForSidebar=async(req, res)=>{
    try{
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    }catch(error){
        console.error("Error in getUsersForSidebar:", error.message);
        res.status(500).json({error:"Internal Server error"});
    }
};
export const getMessages=async(req,res)=>{
    try{
        const {id:userToChatId}=req.params
        const myId=req.user._id;
        const messages=await Message.find({
            $or: [
                    { senderId: myId, receiverId: userToChatId },
                    { senderId: userToChatId, receiverId: myId }
                ]
        });
        res.status(200).json(messages);
    }catch(error){
        console.log("Error in getMessages controller:", error.message);
           res.status(500).json({ message: "Internal server error" }); 
    }
};
export const sendMessage=async(req,res)=>{
    try{
        const {text,image}=req.body;
        const { id: receiverId } = req.params;
        const senderId=req.user._id;
        const aiUser = await User.findOne({
            email: "chattyai@bot.com",
        });
        if (
            aiUser &&
            receiverId === aiUser._id.toString()
            ) 
        {
            const userMessage = new Message({
                senderId,
                receiverId,
                text,
            });
            await userMessage.save();
            const aiReply = await generateAIResponse(`
                You are Chatty AI, an intelligent assistant integrated into a real-time chat application.

                Be helpful, concise, and friendly.

                User message:
                ${text}
            `);
            const aiMessage = new Message({
                senderId: aiUser._id,
                receiverId: senderId,
                text: aiReply,
            });
            await aiMessage.save();
            return res.status(201).json(aiMessage);
        }
        let imageUrl;
        if(image){
            const uploadResponse = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    file: image,
                    upload_preset: "chat-app",
                }
            );
            imageUrl=uploadResponse.data.secure_url;
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });
        await newMessage.save();
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
           io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        //todo: realtime functionality goes here=>socket.io
        res.status(201).json(newMessage)
    }catch(error){
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ message: "Internal server error" }); 
    }
};