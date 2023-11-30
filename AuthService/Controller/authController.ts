import { Request, Response } from "express";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { openingMail } from "../Utils/email";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const token = await jwt.sign(hashed, "secret");

    const user = await prisma.authModel.create({
      data: {
        userName,
        email,
        password: hashed,
        token,
        store: [],
      },
    });

    openingMail(user);
    return res.status(201).json({
      message: "Account Created Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error Creating User",
      data: error,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.authModel.findUnique({
      where: { email },
    });

    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        if (user.verified && user.token === "") {
          const token = await jwt.sign({ id: user.id }, "secret");

          req.headers.authorization = `Bearer ${token}`;
          return res.status(201).json({
            message: `Welcome Back ${user.userName}`,
            data: token,
          });
        } else {
          return res.status(400).json({
            message: "You ain't Verified",
          });
        }
      } else {
        return res.status(400).json({
          message: "Incorrect Password",
        });
      }
    } else {
      return res.status(400).json({
        message: "You ain't a User",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error Creating User",
      data: error,
    });
  }
};

export const findUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await prisma.authModel.findUnique({
      where: { id: userID },
    });

    return res.status(200).json({
      message: "found  User",
      logic: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error Creating User",
      data: error,
    });
  }
};

export const findAllUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.authModel.findMany({});

    return res.status(200).json({
      message: "found  Users",
      logic: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error Creating User",
      data: error,
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await prisma.authModel.findUnique({
      where: { id: userID },
    });

    if (user?.token !== "") {
      const userData = await prisma.authModel.update({
        where: { id: userID },
        data: {
          verified: true,
          token: "",
        },
      });
      return res.status(200).json({
        message: "Verified Successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error Verifying User",
      data: error,
    });
  }
};
