import { NextRequest, NextResponse } from "next/server";
import { refineText } from "@/app/services/aiService";
import { rateLimit } from "@/app/utils/rateLimit";

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 5, 60000);

  if (limited) {
    return limited;
  }

  try {
    const { prompt } = await req.json();

    const text = await refineText(prompt);

    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while refining text." },
      { status: 500 },
    );
  }
}
