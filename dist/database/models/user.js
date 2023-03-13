import { Schema, model } from "mongoose";
const userSchema = new Schema({
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
