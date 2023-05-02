import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../database/models/user";
import ErrorCode from "../../interfaces/error";

dotenv.config();

const loginUser = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  const secret: any = process.env.SECRET;
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log("user", user);

    if (!user) {
      const error = new ErrorCode("Incorrect username");
      error.code = 401;
      next(error);
    } else {
      const rightPassword = await bcrypt.compare(password, user.password);
      if (!rightPassword) {
        const error = new ErrorCode("Incorrect password");
        error.code = 401;
        next(error);
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            password: user.password,
          },
          secret
        );
        res.json({ token });
      }
    }
  } catch (error) {
    next(error);
  }
};

export { loginUser };
