import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema({
  fullName: String,
  shortName: String,
  location: String,
  setting: String,
  campusSize: String,
  genRanking: String,
  programRankings: {
    bestValue: String,
    engineering: String,
    biomedEng: String,
    eeEng: String,
    mechEng: String,
    compSci: String,
    ai: String,
    cyberSec: String,
    dataScience: String,
    writing: String,
    studyAbroad: String,
  },
  acceptanceRate: Number,
  numStudents: Number,
  public: Boolean,
  baseCost: Number,
  costAfterAid: String,
  decisionMetrics: [String],
  suppEssays: [String],
  testRange: {
    "25thACT": Number,
    "50thACT": Number,
    "75thACT": Number,
    "25thSAT": Number,
    "50thSAT": Number,
    "75thSAT": Number,
  },
  gpaRange: {
    "25thWeighted": Number,
    "50thWeighted": Number,
    "75thWeighted": Number,
    "25thUnweighted": Number,
    "50thUnweighted": Number,
    "75thUnweighted": Number,
  },
  imgLinks: [String],
});

export const CollegeModel = mongoose.model("colleges", CollegeSchema);
