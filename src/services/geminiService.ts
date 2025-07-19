import { GoogleGenAI } from "@google/genai";

// The API key is made available via the Vite config (vite.config.ts)
// You should create a .env file in the project root:
// VITE_GEMINI_API_KEY=your_google_gemini_api_key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  // This error will be thrown during the build process if the API key is not set.
  throw new Error("VITE_GEMINI_API_KEY environment variable not set. Please create a .env file.");
}

const ai = new GoogleGenAI({ apiKey });

export function createChatSession() {
  const model = 'gemini-2.5-flash';
  
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: `You are a helpful and creative storyteller. Always use the user's input as the main context for the story, and continue the story in a way that makes sense with what the user provided. Write in simple, clear language suitable for all ages. Keep your responses short (1-2 paragraphs), and make sure the story is easy to follow and directly related to the user's prompt. Do not add unrelated details or ignore the user's input.`,
      temperature: 0.8,
      topP: 0.9,
    },
  });

  return chat;
}
