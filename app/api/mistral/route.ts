import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  console.log("Sending request to HF:", { inputs: prompt });

  const API_URL =
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1";
  const API_KEY = process.env.MISTRAL_API_KEY; 

  if (!API_KEY) {
    return NextResponse.json({ error: "API key missing" }, { status: 500 });
  }
  console.log("API Key:", process.env.MISTRAL_API_KEY);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    const data = await response.json();
    console.log("Response from HF:", data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch response" },
      { status: 500 }
    );
  }
}
