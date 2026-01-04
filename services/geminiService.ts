
import { GoogleGenAI } from "@google/genai";

// Service to handle AI-powered features using Google Gemini API
export class GeminiService {
  async getHint(problemDescription: string, currentCode: string): Promise<string> {
    try {
      // Re-initialize for each call to ensure the most recent API key is used
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am stuck on this coding problem: "${problemDescription}". My current code is: \n\n${currentCode}\n\nProvide a short, encouraging hint without giving away the full solution.`,
        config: {
          systemInstruction: "You are a senior technical interviewer at a top tech company. Provide brief, helpful hints for coding problems."
        }
      });
      // The .text property directly returns the generated string
      return response.text || "I'm having trouble thinking of a hint right now. Keep trying!";
    } catch (error) {
      console.error("Gemini Hint Error:", error);
      return "Keep analyzing the constraints! You can do it.";
    }
  }

  async getExplanation(question: string, correctAnswer: string): Promise<string> {
    try {
      // Re-initialize for each call as per SDK guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Explain why "${correctAnswer}" is the correct answer for the question: "${question}". Keep the explanation concise and educational.`,
      });
      // Access the generated text directly from response.text
      return response.text || "The selected answer is correct due to the fundamental concepts of the topic.";
    } catch (error) {
      console.error("Gemini Explanation Error:", error);
      return "Great job! This is the standard correct answer for this concept.";
    }
  }
}

export const geminiService = new GeminiService();