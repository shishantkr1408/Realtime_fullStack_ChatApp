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

    let context = "";

    documents.forEach((doc) => {
      context += `
      
Document: ${doc.fileName}

${doc.content}

      `;
    });

    const finalPrompt = `
You are Chatty AI.

Use the user's uploaded documents when relevant.

User Documents:

${context}

User Question:

${prompt}
`;  
    console.log("Documents found:", documents.length);
    console.log("Context length:", context.length);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
      finalPrompt
    );

    return result.response.text();
  } 
    catch (error) {
    console.log("Gemini Error Message:");
    console.log(error.message);

    console.log("Gemini Error Status:");
    console.log(error.status);

    if (error.status === 429) {
        return "Chatty AI is currently experiencing rate limits. Please try again in a few moments.";
    }

    if (
        error.message &&
        error.message.includes("location is not supported")
    ) {
        return "AI service is unavailable from the current deployment region.";
    }

    return `AI Error (${error.status || "Unknown"})`;
}
};