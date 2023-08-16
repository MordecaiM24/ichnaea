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
  const colleges = await CollegeModel.find({});
  res.status(200).json(colleges);
};

const getCollegeSearch = async (req, res) => {
  console.log(req.query.search);
  const search = req.query.search;

  const regex = `.*${search}.*`;

  // Add index in mongodb for case insensitivty to speed up search

  const colleges = await CollegeModel.find({
    $or: [
      { fullName: { $regex: new RegExp(regex, "i") } },
      { shortName: { $regex: new RegExp(regex, "i") } },
    ],
  });

  res.status(200).json(colleges[0]);
};

//TODO Get college, possibly separate file with support for queries
// Possible queries: Sort and filter by ranking, program ranking, SAT/ACT/GPA
export { createCollege, getColleges, getCollegeSearch };
