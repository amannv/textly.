import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const refineText = async (prompt: string) => {
  try {
    const getGroqChatCompletion = async () => {
      return groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });
    };
    const completion = await getGroqChatCompletion();
    return completion.choices[0]?.message?.content || "";
  } catch (e) {
    console.error("Error while refining text!", e);
  }
};
