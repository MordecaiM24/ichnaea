import { useState } from "react";
import "./App.css";
import axios from "axios";

export const CreateCollege = () => {
  const [suppEssayNum, setSupEssayNum] = useState([1]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const obj = {};

    for (let i = 0; i < form.length; i++) {
      obj[form[i].name] = form[i].value;
    }

    const res = await axios.post("http://localhost:5000/api/colleges/create", {
      ...obj,
      suppEssayLength: suppEssayNum.length,
    });

    alert(res.data.msg);
    if (res.status === 200) {
      window.location.reload();
    }
  };

  const deleteEssay = () => {
    const tempEssay = [...suppEssayNum];
    tempEssay.pop();
    setSupEssayNum(tempEssay);
  };

  return (
    <form
      autoComplete="off"
      className="justify"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input type="text" name="fullName" placeholder="fullName" />
      <input type="text" name="shortName" placeholder="shortName" />
      <input type="text" name="kebabName" placeholder="kebabName" />
      <input type="text" name="location" placeholder="location" />
      <input type="text" name="setting" placeholder="setting" />
      <input type="number" name="campusSize" placeholder="campusSize" />
      <input type="number" name="genRanking" placeholder="genRanking" />
      <input
        type="number"
        name="acceptanceRate"
        placeholder="acceptanceRate"
        step={0.1}
      />
      <input type="number" name="numStudents" placeholder="numStudents" />
      <input type="text" name="privacy" placeholder="privacy" />
      <input type="number" name="baseCost" placeholder="baseCost" />
      <input type="number" name="costAfterAid" placeholder="costAfterAid" />
      <input type="text" name="decisionMetrics" placeholder="decisionMetrics" />

      {suppEssayNum.map((num, idx) => {
        return (
          <input
            key={idx}
            type="text"
            name={`suppEssay${num}`}
            placeholder={`suppEssay${num}`}
          />
        );
      })}

      <button
        type="button"
        onClick={() => {
          setSupEssayNum([
            ...suppEssayNum,
            suppEssayNum[suppEssayNum.length - 1] + 1,
          ]);
        }}
      >
        Add supp essay
      </button>

      <button type="button" onClick={deleteEssay}>
        Delete supp essay
      </button>

      <input type="number" name="25thACT" placeholder="25thACT" />
      <input type="number" name="50thACT" placeholder="50thACT" />
      <input type="number" name="75thACT" placeholder="75thACT" />
      <input type="number" name="25thSAT" placeholder="25thSAT" />
      <input type="number" name="50thSAT" placeholder="50thSAT" />
      <input type="number" name="75thSAT" placeholder="75thSAT" />

      <input type="text" name="imgLink" placeholder="imgLink" />

      <input
        type="text"
        name="regularDecisionSpecialName"
        placeholder="regDecisionDeadlineSpecName"
      />
      <input type="date" name="regularDecisionDate" />
      <p>Regular Decision Financial Aid Deadline</p>
      <input type="date" name="regularDecisionFinancialAidDeadline" />
      <br />

      <input
        type="text"
        name="earlyActionSpecialName"
        placeholder="earlyActionSpecName"
      />
      <input type="date" name="earlyActionDate" />
      <p>Early Action Financial Aid Deadline</p>
      <input type="date" name="earlyActionFinancialAidDeadline" />
      <br />

      <input
        type="text"
        name="earlyDecisionSpecialName"
        placeholder="earlyDecisionSpecName"
      />
      <input type="date" name="earlyDecisionDate" />
      <p>Early Decision Financial Aid Deadline</p>
      <input type="date" name="earlyDecisionFinancialAidDeadline" />
      <br />

      <input
        type="text"
        name="earlyDecision2SpecialName"
        placeholder="earlyDecision2SpecName"
      />
      <input type="date" name="earlyDecision2Date" />
      <p>Early Decision 2 Financial Aid Deadline</p>
      <input type="date" name="earlyDecision2FinancialAidDeadline" />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};
