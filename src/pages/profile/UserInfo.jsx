import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function UserInfo() {
  const [searchParams, _] = useSearchParams();
  const extracurriculars = useState({
    activites: [
      {
        name: "",
        role: "",
        description: "",
        duration: "",
      },
    ],
  });

  const academics = useState({
    coursework: [{ name: "", description: "" }],
    projects: [{ name: "", description: "" }],
  });

  const goals = useState({
    firstChoiceMajor: "",
    secondChoiceMajor: "",
    careerGoal: "",
  });

  const diversity = useState({
    experiences: "",
    externalAttributes: "",
    internalAttributes: "",
  });

  let x = {
    activites: [
      {
        name: "",
        role: "",
        description: "",
        duration: "",
      },
    ],
    coursework: [{ name: "", description: "" }],
    projects: [{ name: "", description: "" }],
    firstChoiceMajor: "",
    secondChoiceMajor: "",
    careerGoal: "",
    uniqueExperiences: "",
    uniqueExternalAttributes: "",
    uniqueInternalAttributes: "",
  };

  const user = searchParams.get("user");

  return (
    <div className="-mt-4 flex min-h-screen w-full items-start justify-center bg-sky-50">
      {user}
    </div>
  );
}
