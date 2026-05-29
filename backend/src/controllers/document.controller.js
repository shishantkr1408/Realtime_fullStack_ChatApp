import {PDFParse} from "pdf-parse";
import Document from "../models/document.model.js";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded" });
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

    res.status(201).json({
      success: true,
      documentId: document._id,
      fileName: document.fileName,
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