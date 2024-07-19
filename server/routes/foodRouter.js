import { Router } from "express";

import { createFood, getFoods } from "../controllers/food.js";
import auth from "../middleware/auth.js";

const foodRouter = Router();
foodRouter.post("/", auth, createFood);
foodRouter.get("/", getFoods);
export default foodRouter;
