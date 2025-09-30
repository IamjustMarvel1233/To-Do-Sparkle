
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getCelebrationMessage(taskText: string): Promise<string> {
  try {
    const prompt = `You are a super enthusiastic and positive life coach. A user just completed this task: "${taskText}". Write a very short, fun, one-sentence celebratory message for them. Use exclamation points and at least one emoji. Keep it under 15 words.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error fetching celebration message from Gemini:", error);
    return "You did it! Amazing work! 🎉"; // Fallback message
  }
}
