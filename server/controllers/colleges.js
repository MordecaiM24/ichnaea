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

//TODO Get college, possibly separate file with support for queries
// Possible queries: Sort and filter by ranking, program ranking, SAT/ACT/GPA
export { createCollege };
