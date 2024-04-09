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

  const user = searchParams.get("user");

  return (
    <div className="-tw-mt-4 tw-flex tw-min-h-screen tw-w-full tw-items-start tw-justify-center tw-bg-sky-50">
      {user}
    </div>
  );
}
