import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  const connState = mongoose.connection.readyState;

  if (connState === 1) {
    console.log("DB connection already established!");
    return;
  }

  if (connState === 2) {
    console.log("DB connection in progress!");
    return;
  }

  try {
    mongoose.connect(MONGO_URI, {
      dbName: "findout-trivia",
      bufferCommands: true,
    });
    console.log("Connetced to DB!");
  } catch (error) {
    console.error("DB Connection error", error);
    throw new Error("DB connection error:", error);
  }
};

export default connectDB;
