import connectDB from "@/lib/db";

import { NextResponse } from "next/server";
import { getAndValidateRequestData } from "@/utils/getAndValidateRequestData";

import { z } from "zod";
import Trivia from "@/models/trivia";

export const POST = async (req: Request) => {
  const questionSchema = z.object({
    questionText: z.string().min(5).max(255),
    choices: z
      .array(
        z.object({
          value: z.string().min(3).max(65),
          // isCorrect: z.boolean().optional(),
        })
      )
      .length(4), // Validate choices length and value
    answer: z.number().min(0).max(3),
    // owner: z.string().uuid(), // Assuming owner ID is a stringified UUID
  });

  const triviaSchema = z.object({
    questions: questionSchema.array().length(5), // Make sure there are 5 questions
  });

  try {
    /* Both data and error will be returned as possibly undefined */
    const { data, error } = await getAndValidateRequestData(req, triviaSchema);

    if (error) {
      console.error(error);
      return NextResponse.json(
        {
          error: "Error in creating question",
          message: error.message.toString(),
        },
        { status: 400 }
      );
    }

    await connectDB();
    const newTrivia = new Trivia(data);
    await newTrivia.save();

    return NextResponse.json(
      {
        message: "Question created successfully!",
        question: newTrivia,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error in creating question", message: error },
      { status: 500 }
    );
  }
};
