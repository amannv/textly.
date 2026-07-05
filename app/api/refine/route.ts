import { NextRequest, NextResponse } from "next/server";
import { refineText } from "@/app/services/aiService";

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();

    const text =  await refineText(prompt);

    return NextResponse.json({ text });
}