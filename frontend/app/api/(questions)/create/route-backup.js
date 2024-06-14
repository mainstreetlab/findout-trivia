import connectDB from "@/lib/db";
import Question from "@/models/question";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const req = await req.json();
    await connectDB();
    const newQuestion = new Question(req);
    await newQuestion.save();

    return new NextResponse(
      JSON.stringify({
        message: "Question created successfully!",
        question: newQuestion,
      }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error creating question!", error }),
      { status: 500 },
    );
  }
};
