const fs = require("fs");
var convert = require("xml-js");
var js2xmlparser = require("js2xmlparser");

let x = {
  activities: [
    {
      name: "Student Government Association",
      role: "Vice President",
      description:
        "Organized school-wide initiatives, including a sustainability week and mental health workshops, leading a team of 10 students.",
      duration: "2 years",
    },
    {
      name: "Varsity Soccer Team",
      role: "Captain",
      description:
        "Led team practices and strategies, improved team's win rate by 20%, and coordinated community soccer clinics for youth.",
      duration: "3 years",
    },
    {
      name: "Math Club",
      role: "Member",
      description:
        "Participated in regional and national math competitions, achieving top 10% placements. Also tutored underclassmen in advanced mathematics.",
      duration: "4 years",
    },
  ],
  coursework: [
    {
      name: "AP Calculus BC",
      description:
        "Covered advanced topics in calculus, including sequences, series, and multivariable calculus.",
    },
    {
      name: "AP Physics C: Mechanics",
      description:
        "Explored principles of mechanics, work, energy, and power, with an emphasis on problem-solving and laboratory work.",
    },
  ],
  projects: [
    {
      name: "Renewable Energy Science Fair Project",
      description:
        "Designed and constructed a small-scale wind turbine to explore efficient energy production, which won 2nd place at the state science fair.",
    },
    {
      name: "Mobile App for Community Service",
      description:
        "Developed a mobile application that connects volunteers with local non-profit organizations, facilitating over 1,000 hours of community service.",
    },
  ],
  firstChoiceMajor: "Mechanical Engineering",
  secondChoiceMajor: "Applied Mathematics",
  careerGoal:
    "To become an innovative mechanical engineer focused on developing sustainable energy solutions.",
  uniqueExperiences:
    "Participated in a summer internship with a local engineering firm, contributing to the design of an eco-friendly irrigation system.",
  uniqueExternalAttributes:
    "Recipient of the Community Leadership Award for outstanding service and commitment to local environmental initiatives.",
  uniqueInternalAttributes:
    "Strong problem-solving skills, creativity in approaching complex challenges, and a passion for sustainability and engineering.",
};

let xml = js2xmlparser.parse("info", x);

console.log(xml);

// Write data in 'Output.txt' .
fs.writeFile("Output.xml", xml, (err) => {
  // In case of a error throw err.
  if (err) throw err;
});
