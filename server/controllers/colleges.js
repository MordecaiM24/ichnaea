import { CollegeModel } from "../models/College.js";
import "dotenv/config";

const createCollege = async (req, res) => {
  console.log("Creating college");
  const collegeFrame = req.body;

  const suppEssays = [];
  for (let i = 0; i < req.body.suppEssayLength; i++) {
    suppEssays.push(collegeFrame[`suppEssay${i + 1}`]);
  }

  const deadlines = [
    collegeFrame.regularDecisionSpecialName && {
      decisionType: "regularDecision",
      date: collegeFrame.regularDecisionDate,
      specialName: collegeFrame.regularDecisionSpecialName,
      financialAid: collegeFrame.regularDecisionFinancialAidDeadline,
    },
    collegeFrame.earlyActionSpecialName && {
      decisionType: "earlyAction",
      date: collegeFrame.earlyActionDate,
      specialName: collegeFrame.earlyActionSpecialName,
      financialAid: collegeFrame.earlyActionFinancialAidDeadline,
    },
    collegeFrame.earlyDecisionSpecialName && {
      decisionType: "earlyDecision",
      date: collegeFrame.earlyDecisionDate,
      specialName: collegeFrame.earlyDecisionSpecialName,
      financialAid: collegeFrame.earlyDecisionFinancialAidDeadline,
    },
    collegeFrame.earlyDecision2SpecialName && {
      decisionType: "earlyDecision2",
      date: collegeFrame.earlyDecision2Date,
      specialName: collegeFrame.earlyDecision2SpecialName,
      financialAid: collegeFrame.earlyDecision2FinancialAidDeadline,
    },
  ];

  const newDeadlines = deadlines.filter((obj) => {
    return obj !== "";
  });

  console.log(newDeadlines);

  const college = {
    fullName: collegeFrame.fullName,
    shortName: collegeFrame.shortName,
    kebabName: collegeFrame.kebabName,
    location: collegeFrame.location,
    setting: collegeFrame.setting,
    campusSize: collegeFrame.campusSize,
    genRanking: collegeFrame.genRanking,
    acceptanceRate: collegeFrame.acceptanceRate,
    numStudents: collegeFrame.numStudents,
    privacy: collegeFrame.privacy,
    baseCost: collegeFrame.baseCost,
    costAfterAid: collegeFrame.costAfterAid,
    decisionMetrics: [collegeFrame.decisionMetrics],
    suppEssays,
    testRange: {
      "25thACT": collegeFrame["25thACT"],
      "50thACT": collegeFrame["50thACT"],
      "75thACT": collegeFrame["75thACT"],
      "25thSAT": collegeFrame["25thSAT"],
      "50thSAT": collegeFrame["50thSAT"],
      "75thSAT": collegeFrame["75thSAT"],
    },
    deadlines: newDeadlines,
  };

  const newCollege = new CollegeModel(college);

  await newCollege.save();

  res.status(200).json({ msg: "College registered successfully" });
};

const getColleges = async (req, res) => {
  console.log("Getting colleges");
  console.log(req.query.page || 0);
  const page = req.query.page || 0; // current page, default 0
  const collegesPerPage = 6;

  const colleges = await CollegeModel.find({})
    .skip(page * collegesPerPage)
    .limit(collegesPerPage);
  res.status(200).json(colleges);
};

const getCollegeSearch = async (req, res) => {
  console.log("SEARCHING");
  console.log(req.query.search);
  const search = req.query.search;

  const regex = `.*${search}.*`; // .* means contains the search parameter

  // Add index in mongodb for case insensitivty to speed up search

  const colleges = await CollegeModel.find({
    $or: [
      { fullName: { $regex: new RegExp(regex, "i") } },
      { shortName: { $regex: new RegExp(regex, "i") } },
      { location: { $regex: new RegExp(regex, "i") } },
    ],
  });

  res.status(200).json(colleges);
};

//TODO Get college, possibly separate file with support for queries
// Possible queries: Sort and filter by ranking, program ranking, SAT/ACT/GPA
export { createCollege, getColleges, getCollegeSearch };
