import { Schema, model, models } from "mongoose";

export interface User {
  email: string;
  username: string;
  password: string;
}

const UserSchema = new Schema<User>(
  {
    email: { type: "string", required: true, unique: true },
    username: { type: "string", required: true, unique: true },
    password: { type: "string", required: true, select: false },
  },
  {
    timestamps: true,
  }
);

const User = models.User<User> || model<User>("User", UserSchema);

export default User;
