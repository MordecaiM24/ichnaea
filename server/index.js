import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { userRouter } from "./routes/users.js";
import { collegeRouter } from "./routes/colleges.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/colleges", collegeRouter);
app.use("/api/users", userRouter);

mongoose.connect(`mongodb://localhost:27017/`);

app.listen(5000, () => {
  console.log("Server listening on port 5000...");
});
