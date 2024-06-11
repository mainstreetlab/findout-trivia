import connectDB from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const users = await User.find();

    return new NextResponse(JSON.stringify(users), { status: 201 });
  } catch (error) {
    return new NextResponse("Error in fetching users: ", error.message, {
      status: 500,
    });
  }
};

export const POST = async (req) => {
  try {
  } catch (error) {}
};
