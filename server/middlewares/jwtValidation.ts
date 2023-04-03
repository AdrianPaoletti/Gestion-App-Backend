import express from "express";
import jwt from "jsonwebtoken";
import User from "../../database/models/user";
import jwtDecode from "jwt-decode";

const jwtValidation = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the request",
    });
  }

  try {
    const { id } = jwtDecode(token) as any;
    (req as any).id = id;
    const authenticatedUser = await User.findById(id);
    if (!authenticatedUser) {
      return res.status(401).json({
        msg: "Not valid token - user doesn't exist in bbdd",
      });
    }
    (req as any).authenticatedUser = authenticatedUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Not valid token",
    });
  }
};

export { jwtValidation };
