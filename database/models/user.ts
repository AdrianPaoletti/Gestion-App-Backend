import { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  type: string;
}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
});

const User = model("User", userSchema, "Users");

export default User;
