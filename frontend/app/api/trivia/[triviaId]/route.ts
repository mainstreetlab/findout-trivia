import connectDB from '@/lib/db';
import Trivia from '@/models/trivia';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, { params }: any) => {
  // Extract triviaId from the request URL
  const { triviaId } = params;
  await connectDB(); // Replace with your actual database connection logic

  // Handle missing triviaId or invalid format
  if (!triviaId) {
    return NextResponse.json(
      { message: 'Missing trivia ID in request URL' },
      {
        status: 400,
      },
    );
  }

  // Replace with your logic to retrieve trivia based on triviaId
  // (e.g., database query, in-memory storage)
  const data = await getTriviaById(triviaId); // Replace with your retrieval function

  // Handle cases where trivia is not found
  if (!data) {
    return NextResponse.json({ message: 'Trivia not found' }, { status: 404 });
  }

  return NextResponse.json(
    { data },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
};

// Replace this function with your actual trivia retrieval logic
async function getTriviaById(triviaId: string): Promise<Trivia | null> {
  console.log(triviaId);
  try {
    // Fetch trivia from the database
    const triviaData = await Trivia.findOne({ triviaId });

    return triviaData ? (triviaData as Trivia) : null; // Cast and return Trivia object
  } catch (error) {
    console.error(`Error fetching trivia with ID ${triviaId}:`, error);
    return null; // Return null on error
  }
}
