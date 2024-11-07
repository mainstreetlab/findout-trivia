import mongoose, { ConnectionStates } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

interface ConnectionInterface {
  isConnected: ConnectionStates;
}

const conn: ConnectionInterface = {
  isConnected: 0,
};

const connectDB = async () => {
  if (conn.isConnected === 1) {
    console.log("DB connection already established!");
    return;
  }

  if (conn.isConnected === 2) {
    console.log("DB connection in progress!");
    return;
  }

  try {
    mongoose.connect(MONGO_URI!, {
      dbName: "findout-trivia",
      bufferCommands: true,
    });

    conn.isConnected = mongoose.connection.readyState;
    console.log("Connected to DB!");
  } catch (error) {
    console.error("DB Connection error", error);
    throw new Error("DB connection error:", error!);
  }
};

export default connectDB;
