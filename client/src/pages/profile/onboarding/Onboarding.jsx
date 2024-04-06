import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function Onboarding() {
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

  // Get a specific query parameter
  const user = searchParams.get("user");

  return <div className="tw-bg-primary">{user}</div>;
}
