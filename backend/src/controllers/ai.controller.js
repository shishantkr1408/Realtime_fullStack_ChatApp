import Message from "../models/message.model.js";
import Document from "../models/document.model.js";
import User from "../models/user.model.js";

export const clearAIChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const aiUser = await User.findOne({
      email: "chattyai@bot.com",
    });

    if (!aiUser) {
      return res.status(404).json({
        message: "Chatty AI not found",
      });
    }

    await Message.deleteMany({
      $or: [
        {
          senderId: userId,
          receiverId: aiUser._id,
        },
        {
          senderId: aiUser._id,
          receiverId: userId,
        },
      ],
    });

    await Document.deleteMany({
      userId,
    });

    res.status(200).json({
      success: true,
      message: "AI chat cleared successfully",
    });
  } catch (error) {
    console.log(
      "Error clearing AI chat:",
      error.message
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};