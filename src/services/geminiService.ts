import { GoogleGenAI } from "@google/genai";

// The API key is made available via the Vite config (vite.config.ts)
// You should create a .env file in the project root:
// GEMINI_API_KEY=your_google_gemini_api_key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  // This error will be thrown during the build process if the API key is not set.
  throw new Error("GEMINI_API_KEY environment variable not set. Please create a .env file.");
}

const ai = new GoogleGenAI({ apiKey });

export function createChatSession() {
  const model = 'gemini-2.5-flash';
  
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: 'You are a master storyteller, weaving captivating and endless tales. Continue the story based on the user\'s prompt. Keep your responses concise, about 2-3 paragraphs, and always end on a cliffhanger or an intriguing note to make the user want to continue the story. Do not greet the user or break character.',
      temperature: 0.8,
      topP: 0.9,
    },
  });

  return chat;
}
