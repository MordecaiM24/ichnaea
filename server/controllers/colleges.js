import { CollegeModel } from "../models/College.js";
import "dotenv/config";

const createCollege = async (req, res) => {
  console.log("In create college");
  const college = req.body;

  console.log("COLLEGE REQUEST BODY");
  console.log(college);

  const newCollege = new CollegeModel(college);

  await newCollege.save();

  res.status(200).json({ msg: "College registered successfully" });
};

const getColleges = async (req, res) => {
  console.log("Getting colleges");
  const colleges = await CollegeModel.find({});
  res.status(200).json(colleges);
};

//TODO Get college, possibly separate file with support for queries
// Possible queries: Sort and filter by ranking, program ranking, SAT/ACT/GPA
export { createCollege, getColleges };
