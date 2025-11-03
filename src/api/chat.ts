// Mock API handler for chat functionality
// In a production environment, this would be a real API endpoint

import { handleChatRequest } from '../../functions/chat/index';

// Mock API function that simulates a real API call
export const chatAPI = async (message: string): Promise<{ response: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  try {
    const result = await handleChatRequest({ message });
    return result;
  } catch (error) {
    console.error('Chat API error:', error);
    return {
      response: 'Sorry, I encountered an error. Please try again or contact our support team at +968 7259 6531.'
    };
  }
};

// For use in the Chatbot component
export default chatAPI;


// import OpenAI from "openai";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function POST(req: Request) {
//   const { message } = await req.json();
//   const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [{ role: "user", content: message }],
//   });
//   return Response.json({ reply: completion.choices[0].message.content });
// }

