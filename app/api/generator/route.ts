import { openai } from "@/src/lib/openai";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { msg } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "assistant",
        content: "Write only tailwind code",
      },
      {
        role: "user",
        content: msg,
      },
    ],
  });

  return NextResponse.json({
    code: response.choices[0].message.content,
  });
};
