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

  const handleRankChange = (event) => {
    const { name, value } = event.target;
    setCollege({
      ...college,
      programRankings: { ...college.programRankings, [name]: value },
    });
  };

  const handleTestChange = (event) => {
    const { name, value } = event.target;
    setCollege({ ...college, testRange: { [name]: value } });
  };

  const publicChange = (event) => {
    const { value } = event.target;
    if (value === "public") {
      setCollege({ ...college, public: true });
    }
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

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          onChange={handleChange}
        />

        <label htmlFor="setting">setting</label>
        <input
          type="text"
          id="setting"
          name="setting"
          onChange={handleChange}
        />

        <label htmlFor="campusSize">Campus Size</label>
        <input
          type="text"
          id="campusSize"
          name="campusSize"
          onChange={handleChange}
        />

        <label htmlFor="genRanking">General Ranking</label>
        <input
          type="number"
          id="genRanking"
          name="genRanking"
          onChange={handleChange}
        />

        <label htmlFor="bestValue">Best Value Ranking</label>
        <input
          type="number"
          id="bestValue"
          name="bestValue"
          onChange={handleRankChange}
        />

        <label htmlFor="engineering">Engineering Ranking</label>
        <input
          type="number"
          id="engineering"
          name="engineering"
          onChange={handleRankChange}
        />

        <label htmlFor="biomedEng">Biomed Eng Ranking</label>
        <input
          type="number"
          id="biomedEng"
          name="biomedEng"
          onChange={handleRankChange}
        />

        <label htmlFor="eeEng">Electric Eng Ranking</label>
        <input
          type="number"
          id="eeEng"
          name="eeEng"
          onChange={handleRankChange}
        />

        <label htmlFor="mechEng">Mechanical Eng Ranking</label>
        <input
          type="number"
          id="mechEng"
          name="mechEng"
          onChange={handleRankChange}
        />

        <label htmlFor="compSci">Comp Sci Ranking</label>
        <input
          type="number"
          id="compSci"
          name="compSci"
          onChange={handleRankChange}
        />

        <label htmlFor="ai">Artifical Int Ranking</label>
        <input type="number" id="ai" name="ai" onChange={handleRankChange} />

        <label htmlFor="cyberSec">Cyber Sec Ranking</label>
        <input
          type="number"
          id="cyberSec"
          name="cyberSec"
          onChange={handleRankChange}
        />

        <label htmlFor="dataScience">Data Science Ranking</label>
        <input
          type="number"
          id="dataScience"
          name="dataScience"
          onChange={handleRankChange}
        />

        <label htmlFor="writing">Writing Ranking</label>
        <input
          type="number"
          id="writing"
          name="writing"
          onChange={handleRankChange}
        />

        <label htmlFor="studyAbroad">Study Abroad Ranking</label>
        <input
          type="number"
          id="studyAbroad"
          name="studyAbroad"
          onChange={handleRankChange}
        />

        <label htmlFor="acceptanceRate">Acceptance Rate</label>
        <input
          type="number"
          id="acceptanceRate"
          name="acceptanceRate"
          onChange={handleChange}
        />

        <label htmlFor="numStudents">Num Students</label>
        <input
          type="number"
          id="numStudents"
          name="numStudents"
          onChange={handleChange}
        />

        <label htmlFor="public">Public</label>
        <input type="text" id="public" name="public" onChange={publicChange} />

        <label htmlFor="baseCost">Num Students</label>
        <input
          type="number"
          id="baseCost"
          name="baseCost"
          onChange={handleChange}
        />

        <label htmlFor="costAfterAid">Num Students</label>
        <input
          type="number"
          id="costAfterAid"
          name="costAfterAid"
          onChange={handleChange}
        />

        <button type="submit">Create College</button>
      </form>
    </div>
  );
};
