import { PDFParse } from "pdf-parse";
import Document from "../models/document.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const parser = new PDFParse({
      data: req.file.buffer,
    });

    const pdfData = await parser.getText();

    const document = await Document.create({
      userId: req.user._id,
      fileName: req.file.originalname,
      content: pdfData.text,
    });

    const aiUser = await User.findOne({
      email: "chattyai@bot.com",
    });

    if (aiUser) {
      await Message.create({
        senderId: req.user._id,
        receiverId: aiUser._id,
        messageType: "document",
        documentName: document.fileName,
      });
    }

    res.status(201).json({
      success: true,
      documentId: document._id,
      fileName: document.fileName,
      messageType: "document",
    });
  } catch (error) {
    console.log(
      "Error uploading document:",
      error.message
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};