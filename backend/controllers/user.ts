import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Session } from "express-session";

// Extend the Session interface to add a user property
declare module "express-session" {
  interface Session {
    user: { id: string };
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    // Check if user is logged in
    if (!req.session.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // Retrieve user ID from session variable
    const userId = req.session.user.id;

    // Find user by ID
    const user = await User.findById(req.params.id);

    // Check if user exists and matches the logged-in user
    if (!user || user.id !== userId) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
      address,
      payment_type,
      payment_card,
    } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      address,
      payment_type,
      payment_card,
    });

    // save user to database
    await newUser.save();

    // Set session variable
    req.session.user = { id: newUser.id };

    // create JWT token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || "default_secret"
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user with provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    // Set session variable
    req.session.user = { id: user.id };
    // Create and send token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY!,
      { expiresIn: 86400 }, // Token expiration time in seconds
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    // Check if user is logged in
    if (!req.session.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // Retrieve user ID from session variable
    const userId = req.session.user.id;

    const {
      email,
      password,
      first_name,
      last_name,
      address,
      payment_type,
      payment_card,
    } = req.body;

    // If the password is being updated, hash it before updating it in the database
    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = await User.findById(req.params.id);

    // Check if user exists and matches the logged-in user
    if (!user || user.id !== userId) {
      return res.status(404).send("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        address,
        payment_type,
        payment_card,
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Check if user is logged in
    if (!req.session.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // Retrieve user ID from session variable
    const userId = req.session.user.id;

    const user = await User.findById(req.params.id);

    // Check if user exists and matches the logged-in user
    if (!user || user.id !== userId) {
      return res.status(404).send("User not found");
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
