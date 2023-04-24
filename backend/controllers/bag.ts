import { Request, Response } from "express";
import Bag from "../models/bag";

export const getBags = async (req: Request, res: Response) => {
  try {
    const bags = await Bag.find();
    res.json(bags);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const getBagById = async (req: Request, res: Response) => {
  try {
    const bag = await Bag.findById(req.params.id);
    if (!bag) {
      return res.status(404).send("Bag not found");
    }
    res.json(bag);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const createBag = async (req: Request, res: Response) => {
  try {
    const bag = new Bag(req.body);
    await bag.save();
    res.status(201).json(bag);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const updateBag = async (req: Request, res: Response) => {
  try {
    const bag = await Bag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bag) {
      return res.status(404).send("Bag not found");
    }
    res.json(bag);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
