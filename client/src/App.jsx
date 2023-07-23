import { useState } from "react";
import axios from "axios";

export const App = () => {
  const [college, setCollege] = useState({
    fullName: "",
    shortName: "",
    location: "",
    setting: "",
    campusSize: "",
    genRanking: "",
    programRankings: {
      bestValue: "",
      engineering: "",
      biomedEng: "",
      eeEng: "",
      mechEng: "",
      compSci: "",
      ai: "",
      cyberSec: "",
      dataScience: "",
      writing: "",
      studyAbroad: "",
    },
    acceptanceRate: 0,
    numStudents: 0,
    public: false,
    baseCost: 0,
    costAfterAid: 0,
    decisionMetrics: [""],
    suppEssays: [""],
    testRange: {
      "25thACT": 0,
      "50thACT": 0,
      "75thACT": 0,
      "25thSAT": 0,
      "50thSAT": 0,
      "75thSAT": 0,
    },
    gpaRange: {
      "25thWeighted": 0,
      "50thWeighted": 0,
      "75thWeighted": 0,
      "25thUnweighted": 0,
      "50thUnweighted": 0,
      "75thUnweighted": 0,
    },
    imgLinks: [""],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCollege({ ...college, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(college);
      const res = await axios.post(
        "http://localhost:5000/api/colleges/create",
        college
      );
      console.log(res);
      alert("College created");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center ",
      }}
    >
      <h2> Create College </h2>

      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center ",
        }}
      >
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          onChange={handleChange}
        />

        <label htmlFor="shortName">Short Name</label>
        <input
          type="text"
          id="shortName"
          name="shortName"
          onChange={handleChange}
        />

        <button type="submit">Create College</button>
      </form>
    </div>
  );
};
