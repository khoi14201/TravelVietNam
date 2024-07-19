import Food from "../models/Food.js";
import tryCatch from "./utils/tryCatch.js";

export const createFood = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;
  const newFood = new Food({ ...req.body, uid, uName, uPhoto });
  await newFood.save();
  res.status(201).json({ success: true, result: newFood });
});

export const getFoods = tryCatch(async (req, res) => {
  const foods = await Food.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: foods });
});
