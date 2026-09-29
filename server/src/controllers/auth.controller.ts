import { Request, Response } from "express";
import User from "../models/User";
import { SignupInput, SafeUser } from "../types/auth.types";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password }: SignupInput = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Name, email, and password are required" });
      return;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({ message: "Email is already registered" });
      return;
    }

    const user = await User.create({ name, email, password });

    const safeUser: SafeUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(201).json({ user: safeUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Something went wrong during signup" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    req.session.userId = user._id.toString();//create a sesion and save in mongo 

    const safeUser: SafeUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ user: safeUser });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong during login" });
  }
};


export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.session.userId);

    if (!user) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const safeUser: SafeUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ user: safeUser });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}; 

export const logout = async (req: Request, res: Response): Promise<void> => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      res.status(500).json({ message: "Something went wrong during logout" });
      return;
    }

    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
};