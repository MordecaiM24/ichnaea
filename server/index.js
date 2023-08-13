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

mongoose.connect(
  // `mongodb+srv://${process.env.ATLAS_ID}:${process.env.ATLAS_PASSWORD}@cluster0.rnqhvef.mongodb.net/?retryWrites=true&w=majority`
  // `mongodb://${process.env.ATLAS_ID}:${process.env.ATLAS_PASSWORD}@ac-2kh7eip-shard-00-00.rnqhvef.mongodb.net:27017,ac-2kh7eip-shard-00-01.rnqhvef.mongodb.net:27017,ac-2kh7eip-shard-00-02.rnqhvef.mongodb.net:27017/?ssl=true&replicaSet=atlas-4i34dx-shard-0&authSource=admin&retryWrites=true&w=majority`
  `mongodb://localhost:27017`
);

app.listen(5000, () => {
  console.log("Server listening on port 5000...");
});
