import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema({
  fullName: String,
  shortName: String,
  kebabName: String,
  location: String,
  setting: String,
  campusSize: Number,
  genRanking: Number,
  programRankings: {
    bestValue: Number,
    engineering: Number,
    biomedEng: Number,
    eeEng: Number,
    mechEng: Number,
    compSci: Number,
    ai: Number,
    cyberSec: Number,
    dataScience: Number,
    writing: Number,
    studyAbroad: Number,
  },
  acceptanceRate: Number,
  numStudents: Number,
  public: Boolean,
  baseCost: Number,
  costAfterAid: Number,
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
  deadlines: [
    {
      _id: false,
      decisionType: String,
      date: Date,
      specialName: String,
      financialAid: Date,
    },
  ],
  imgLinks: [String],
});

export const CollegeModel = mongoose.model("colleges", CollegeSchema);
