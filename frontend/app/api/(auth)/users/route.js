import connectDB from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {
  try {
    await connectDB();
    const users = await User.find({}, { password: 0 });

    return NextResponse.json(users, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error in fetching users", message: error },
      { status: 500 },
    );
  }
};

export const POST = async (req) => {
  try {
    const { email, username, password } = await req.json();
    await connectDB();
    const newUser = new User({ email, username, password });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully!", user: newUser },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating user!", message: error },
      { status: 500 },
    );
  }
};

export const PATCH = async (req) => {
  try {
    const { userId, username } = await req.json();
    await connectDB();

    if (!userId || !username) {
      return NextResponse.json(
        { error: "Invalid credentials!", message: error },
        { status: 400 },
      );
    }

    if (!ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID!", message: error },
        { status: 400 },
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: new ObjectId(userId),
      },
      { username: username },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found in DB!", message: error },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "User updated successfully!", user: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating user!", message: error },
      { status: 500 },
    );
  }
};

export const DELETE = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Please provide a user ID!", message: error },
        { status: 400 },
      );
    }

    if (!ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID!", message: error },
        { status: 400 },
      );
    }

    await connectDB();

    const deletedUser = await User.findByIdAndDelete(new ObjectId(userId));

    if (!deletedUser) {
      return NextResponse.json(
        { error: "User not found in database!", message: error },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully!", user: deletedUser },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting user!", message: error },
      { status: 500 },
    );
  }
};