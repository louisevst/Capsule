import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// Extend the Session interface to add a user property
declare module "express-session" {
  interface Session {
    user: { id: string };
  }
}

// Encryption key and IV
const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.AES_KEY!, "hex");
const iv = Buffer.from(process.env.AES_IV!, "hex");

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
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY || "default_secret"
    );
    if (typeof decoded === "string") {
      throw new Error("Invalid token");
    }
    const userId = decoded.user.id;
    console.log(userId);
    // Find user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Decrypt payment card information
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decryptedPaymentCard = decipher.update(
      user.payment_card,
      "hex",
      "utf8"
    );
    decryptedPaymentCard += decipher.final("utf8");

    res.json({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address,
      payment_type: user.payment_type,
      payment_card: decryptedPaymentCard,
    });
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

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Encrypt payment card information
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedPaymentCard = cipher.update(payment_card, "utf8", "hex");
    encryptedPaymentCard += cipher.final("hex");

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      address,
      payment_type,
      payment_card: encryptedPaymentCard,
    });

    // Save user to database
    await newUser.save();

    // Set session variable
    req.session.user = { id: newUser.id };
    req.session.save();

    // Create JWT token
    const token = jwt.sign(
      { id: newUser.id },
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
    req.session.save();
    console.log(req.session.user);
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
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY || "default_secret"
    );
    if (typeof decoded === "string") {
      throw new Error("Invalid token");
    }
    const userId = decoded.user.id;
    console.log(userId);
    // Find user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

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

    // Encrypt payment card information
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedPaymentCard = cipher.update(payment_card, "utf8", "hex");
    encryptedPaymentCard += cipher.final("hex");

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        address,
        payment_type,
        payment_card: encryptedPaymentCard,
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
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY || "default_secret"
    );
    if (typeof decoded === "string") {
      throw new Error("Invalid token");
    }
    const userId = decoded.user.id;
    console.log(userId);
    // Find user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
