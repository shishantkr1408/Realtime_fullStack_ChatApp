import { GoogleGenerativeAI } from "@google/generative-ai";
import Document from "../models/document.model.js";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export const generateAIResponse = async (
  prompt,
  userId
) => {
  try {
    const documents = await Document.find({
      userId,
    });

    const lowerPrompt = prompt.toLowerCase();

    let selectedDocuments = [];

    // Latest document retrieval
    if (
      lowerPrompt.includes("this document") ||
      lowerPrompt.includes("this pdf") ||
      lowerPrompt.includes("summarize this") ||
      lowerPrompt.includes("summarise this")
    ) {
      const latestDoc = await Document.findOne({
        userId,
      }).sort({ createdAt: -1 });

      if (latestDoc) {
        selectedDocuments.push(latestDoc);
      }
    }

    // Specific document retrieval
    if (selectedDocuments.length === 0) {
      documents.forEach((doc) => {
        if (
          lowerPrompt.includes(
            doc.fileName.toLowerCase()
          )
        ) {
          selectedDocuments.push(doc);
        }
      });
    }

    // Fallback to all documents
    if (selectedDocuments.length === 0) {
      selectedDocuments = documents;
    }

    let context = "";

    selectedDocuments.forEach((doc) => {
      context += `
      
Document: ${doc.fileName}

${doc.content}

      `;
    });

    context = context.slice(0, 5000);

    const finalPrompt = `
You are Chatty AI integrated into a real-time chat application.

Rules:

1. If the user asks a general question, answer normally.
2. If the user asks about uploaded documents, use the document context.
3. If the user says "this document", "this pdf", "summarize this", or "summarise this", use the latest uploaded document.
4. If the user mentions a document name, use that document only.
5. Do not mention documents unless they are relevant.
6. Be concise and conversational.

User Documents:

${context}

User Question:

${prompt}
`;

    console.log(
      "Documents selected:",
      selectedDocuments.length
    );
    console.log(
      "Context length:",
      context.length
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
      finalPrompt
    );

    return result.response.text();
  } catch (error) {
    console.log("Gemini Error Message:");
    console.log(error.message);

    console.log("Gemini Error Status:");
    console.log(error.status);

    if (error.status === 429) {
      return "Chatty AI is currently experiencing rate limits. Please try again in a few moments.";
    }

    if (
      error.message &&
      error.message.includes(
        "location is not supported"
      )
    ) {
      return "AI service is unavailable from the current deployment region.";
    }

    return `AI Error (${error.status || "Unknown"})`;
  }
};