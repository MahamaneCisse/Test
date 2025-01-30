import OpenAI from "openai";

const openAIKey = process.env.OPENAI_API_KEY;

if (!openAIKey) {
  throw new Error("Missing OpenAI API key");
}

export const openai = new OpenAI({
  apiKey: openAIKey,
});
