import { existsSync, mkdirSync, write, writeFileSync } from "fs";
import { join } from "path";
import { CollegeModel } from "../models/College.js";
import "dotenv/config";
import mongoose from "mongoose";
import { colleges } from "./colleges.js";
import { essays } from "./essays.js";

mongoose.connect(
  // `mongodb+srv://${process.env.ATLAS_ID}:${process.env.ATLAS_PASSWORD}@cluster0.rnqhvef.mongodb.net/production?retryWrites=true&w=majority`
  `mongodb+srv://mordecaim:pJl9GMiirlLDfEyu@cluster0.rnqhvef.mongodb.net/?retryWrites=true&w=majority`
  // `mongodb://${process.env.ATLAS_ID}:${process.env.ATLAS_PASSWORD}@ac-2kh7eip-shard-00-00.rnqhvef.mongodb.net:27017,ac-2kh7eip-shard-00-01.rnqhvef.mongodb.net:27017,ac-2kh7eip-shard-00-02.rnqhvef.mongodb.net:27017/?ssl=true&replicaSet=atlas-4i34dx-shard-0&authSource=admin&retryWrites=true&w=majority`
  // `mongodb://localhost:27017`
);

const getColleges = async (num) => {
  console.log("Getting colleges");

  const page = num; // current page, default 0
  const collegesPerPage = num;

  const colleges = await CollegeModel.find({});
  // .skip(page * collegesPerPage)
  // .limit(collegesPerPage);
  // .limit(1);
  return colleges;
};

function generateAndSaveInsertStatements(
  collegeDocument,
  suppEssays,
  outputDir
) {
  const {
    fullName,
    shortName,
    kebabName,
    location,
    setting,
    campusSize,
    genRanking,
    acceptanceRate,
    numStudents,
    baseCost,
    costAfterAid,
    privacy,
    testRange,
    deadlines,
  } = collegeDocument;

  // Escaping single quotes to prevent SQL syntax errors and mitigate SQL injection risks.
  const escapeQuotes = (str) => {
    // Check if str is undefined or null and return an empty string if true
    if (str == null) return "";
    // Replace all single quotes with doubled single quotes to escape them in SQL
    return str.replace(/'/g, "''");
  };

  // College insert statement
  const collegeInsert = `INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('${escapeQuotes(
    fullName
  )}', '${escapeQuotes(shortName)}', '${escapeQuotes(
    kebabName
  )}', '${escapeQuotes(location)}', '${escapeQuotes(
    setting
  )}', ${campusSize}, ${genRanking}, ${acceptanceRate}, ${numStudents}, ${baseCost}, ${costAfterAid}, '${escapeQuotes(
    privacy
  )}', ${testRange["25thSAT"]}, ${testRange["50thSAT"]}, ${
    testRange["75thSAT"]
  }, ${testRange["25thACT"]}, ${testRange["50thACT"]}, ${
    testRange["75thACT"]
  });\n`;

  // Deadlines insert statements
  const deadlineInserts = deadlines
    .map((deadline, index) => {
      const { decisionType, date, specialName, financialAid } = deadline;
      console.log(date);
      return `-- Deadline ${index + 1} for ${escapeQuotes(
        fullName
      )}\nINSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = '${escapeQuotes(
        fullName
      )}'), '${decisionType}', '${date}', '${escapeQuotes(
        specialName
      )}', '${financialAid}');\n`;
    })
    .join("");

  // Supplemental essays insert statements
  const essayInserts = suppEssays.newSuppEssays
    .map((essay, index) => {
      return `-- Supplemental Essay ${index + 1} for ${escapeQuotes(
        fullName
      )}\nINSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = '${escapeQuotes(
        fullName
      )}'), '${escapeQuotes(essay.prompt)}', ${essay.length});\n`;
    })
    .join("");

  // Combine all insert statements into one string
  const allInserts = collegeInsert + deadlineInserts + essayInserts;

  // Ensure the output directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // Write the insert statements to a text file named after the college
  const fileName = `${kebabName}-inserts.sql`;
  const filePath = join(outputDir, fileName);
  writeFileSync(filePath, allInserts);

  console.log(
    `Insert statements for ${fullName} have been saved to ${filePath}`
  );
}

for (let i = 0; i < 66; i++) {
  const college = colleges[i];
  const suppEssays = essays[i];
  generateAndSaveInsertStatements(college, suppEssays, "inserts");
}

// const allCollegesX = await getColleges();

// const allColleges = allCollegesX.map((college) => {
//   const { fullName, shortName, kebabName, suppEssays } = college;
//   const newSuppEssays = suppEssays.map((prompt) => {
//     return { prompt, length: 0 };
//   });
//   return { fullName, shortName, kebabName, newSuppEssays };
// });

// const outputFile = join(
//   "/Users/mordecaimengesteab/ichnaea/server/migration",
//   "inserts",
//   "colleges.json"
// );

// Convert the JSON array to a string with indentation for formatting
// const jsonString = JSON.stringify(allColleges, null, 2);

// // Write the string to a file
// writeFileSync("essays.js", jsonString, "utf8");

// console.log(`JSON array has been written to essays.`);

// const res = await getColleges();

// const res = [
//   {
//     testRange: {
//       "25thACT": 34,
//       "50thACT": 35,
//       "75thACT": 35,
//       "25thSAT": 1510,
//       "50thSAT": 1540,
//       "75thSAT": 1570,
//     },
//     _id: "64dd9bd970ffbbff36d67fce",
//     fullName: "Princeton University",
//     shortName: "Princeton",
//     kebabName: "princeton",
//     location: "Princeton, NJ",
//     setting: "Suburban",
//     campusSize: 600,
//     genRanking: 1,
//     acceptanceRate: 4.4,
//     numStudents: 5321,
//     baseCost: 57410,
//     costAfterAid: 9836,
//     decisionMetrics: ["Test Optional"],
//     suppEssays: [
//       "Princeton values community and encourages students, faculty, staff and leadership to engage in respectful conversations that can expand their perspectives and challenge their ideas and beliefs. As a prospective member of this community, reflect on how your lived experiences will impact the conversations you will have in the classroom, the dining hall or other campus spaces. What lessons have you learned in life thus far? What will your classmates learn from you? In short, how has your lived experience shaped you? (500 words or fewer)",
//       "Princeton has a longstanding commitment to understanding our responsibility to society through service and civic engagement. How does your own story intersect with these ideals? (250 words or fewer)",
//       "What is a new skill you would like to learn in college? (50 words or fewer)",
//       "What brings you joy? (50 words or fewer)",
//       "What song represents the soundtrack of your life at this moment? (50 words or fewer)",
//       "Princeton requires you to submit a graded written paper as part of your application. You may submit this material now or any time before the application deadline. If you choose not to upload the required paper at this time, you may mail, e-mail, or upload your paper through the applicant portal.",
//     ],
//     deadlines: [
//       {
//         decisionType: "regularDecision",
//         date: "2024-01-02T00:00:00.000Z",
//         specialName: "Regular Decision",
//         financialAid: "2024-02-02T00:00:00.000Z",
//       },
//       {
//         decisionType: "earlyAction",
//         date: "2023-11-02T00:00:00.000Z",
//         specialName: "Single-Choice Early Action",
//         financialAid: "2023-11-10T00:00:00.000Z",
//       },
//     ],
//     imgLinks: [],
//     __v: 0,
//     privacy: "Private",
//   },
// ];
