import { CollegeModel } from "../models/College.js";
import "dotenv/config";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(
  // `mongodb+srv://${process.env.ATLAS_ID}:${process.env.ATLAS_PASSWORD}@cluster0.rnqhvef.mongodb.net/production?retryWrites=true&w=majority`
  `mongodb+srv://mordecaim:pJl9GMiirlLDfEyu@cluster0.rnqhvef.mongodb.net/?retryWrites=true&w=majority`
  // `mongodb://${process.env.ATLAS_ID}:${process.env.ATLAS_PASSWORD}@ac-2kh7eip-shard-00-00.rnqhvef.mongodb.net:27017,ac-2kh7eip-shard-00-01.rnqhvef.mongodb.net:27017,ac-2kh7eip-shard-00-02.rnqhvef.mongodb.net:27017/?ssl=true&replicaSet=atlas-4i34dx-shard-0&authSource=admin&retryWrites=true&w=majority`
  // `mongodb://localhost:27017`
);

const getColleges = async () => {
  console.log("Getting colleges");

  const page = 0; // current page, default 0
  const collegesPerPage = 6;

  const colleges = await CollegeModel.find({});
  return colleges;
};

const res = await getColleges();
console.log(res);
