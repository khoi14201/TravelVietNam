import express from "express";
import dotenv from "dotenv";
import foodRouter from "./routes/foodRouter.js";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Alow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use("/user", userRouter);
app.use("/food", foodRouter);
app.get("/", (req, res) => res.json({ message: "Welcome to our API" }));
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not Found" })
);

const startServer = async () => {
  try {
    // connect to mongodb
    await mongoose.connect(process.env.MONGO_CONNECT);
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
