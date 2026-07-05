import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const refineText = async (prompt: string) => {
    try {
    const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    });
    return result.text;
} catch (e) {
    console.error("Erro while refining text!");
}
}