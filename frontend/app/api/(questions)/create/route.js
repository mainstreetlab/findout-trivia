import connectDB from "@/lib/db";
import Question from "@/models/question";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    // 1. Connect to database:
    await connectDB();

    // 2. Parse request body and handle potential errors:
    let data;
    try {
      data = await req.json();
    } catch (error) {
      console.error("Error parsing request body:", error);
      return new NextResponse(
        JSON.stringify({ message: "Invalid request body format" }),
        { status: 400 },
      );
    }

    // 3. Validate request data (optional):
    const validationErrors = validateQuestionData(data); // Implement a validation function
    if (validationErrors.length > 0) {
      return new NextResponse(
        JSON.stringify({
          message: "Validation errors occurred:",
          errors: validationErrors,
        }),
        { status: 400 },
      );
    }

    // 4. Create and save question:
    const newQuestion = new Question(data);
    await newQuestion.save();

    // 5. Send successful response:
    return new NextResponse(
      JSON.stringify({
        message: "Question created successfully!",
        question: newQuestion,
      }),
      { status: 201 }, // Use 201 Created for new resource creation
    );
  } catch (error) {
    console.error("Error creating question:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error creating question!" }),
      { status: 500 },
    );
  }
};

// Optional validation function (implement based on your validation logic)
function validateQuestionData(data) {
  const errors = [];
  if (!data.questionText) {
    errors.push("Question text is required");
  }
  // Add more validations for choices, answer, etc.
  return errors;
}
