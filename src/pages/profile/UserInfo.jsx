import React, { useState } from "react";

export function UserInfo({ user }) {
  console.log(user);
  console.log(JSON.parse(user.extracurriculars));

  const [extracurriculars, setExtracurriculars] = useState([
    { name: "", role: "", description: "", duration: "" },
  ]);
  const [academics, setAcademics] = useState({
    coursework: [{ name: "", description: "" }],
    projects: [{ name: "", description: "" }],
  });
  const [goals, setGoals] = useState({
    firstChoiceMajor: "",
    secondChoiceMajor: "",
    careerGoal: "",
  });
  const [diversity, setDiversity] = useState({
    experiences: "",
    externalAttributes: "",
    internalAttributes: "",
  });

  // Handlers for dynamic fields
  const handleDynamicChange = (state, setState, index, field, value) => {
    const newState = [...state];
    newState[index] = { ...newState[index], [field]: value };
    setState(newState);
  };

  const handleSimpleChange = (setState, field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can integrate an API call or any other submission logic
    console.log("Submitted", { extracurriculars, academics, goals, diversity });
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Extracurriculars */}
        <div className="group flex flex-col gap-y-2 pb-12 hover:pb-0.5">
          <h3 className="-ml-2 py-2 text-xl font-light">Extracurriculars</h3>

          {extracurriculars.map((activity, index) => (
            <div key={index} className="flex items-center gap-x-2">
              <input
                type="text"
                placeholder="Name"
                value={activity.name}
                onChange={(e) =>
                  handleDynamicChange(
                    extracurriculars,
                    setExtracurriculars,
                    index,
                    "name",
                    e.target.value,
                  )
                }
                className="w-1/4 rounded border p-2"
              />
              <input
                type="text"
                placeholder="Role"
                value={activity.role}
                onChange={(e) =>
                  handleDynamicChange(
                    extracurriculars,
                    setExtracurriculars,
                    index,
                    "role",
                    e.target.value,
                  )
                }
                className="w-1/8 rounded border p-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={activity.description}
                onChange={(e) =>
                  handleDynamicChange(
                    extracurriculars,
                    setExtracurriculars,
                    index,
                    "description",
                    e.target.value,
                  )
                }
                className="w-1/2 rounded border p-2"
              />
              <input
                type="text"
                placeholder="Duration"
                value={activity.duration}
                onChange={(e) =>
                  handleDynamicChange(
                    extracurriculars,
                    setExtracurriculars,
                    index,
                    "duration",
                    e.target.value,
                  )
                }
                className="w-1/8 rounded border p-2"
              />
            </div>
          ))}

          <button
            type="button"
            className="hidden self-start rounded-md border border-slate-500 px-5 py-1.5 transition-all hover:border-slate-500 hover:bg-slate-500 hover:text-white group-hover:block"
            onClick={() =>
              setExtracurriculars([
                ...extracurriculars,
                { name: "", role: "", description: "", duration: "" },
              ])
            }
          >
            Add Extracurriculars
          </button>
        </div>

        {/* Academics */}
        <div className=" flex flex-col gap-y-2 hover:mb-0">
          <h3 className="-ml-2 py-2 text-xl font-light">Academics</h3>
          <div className="space-y-2">
            <div className="group mb-4 space-y-2 pb-12 hover:pb-0.5">
              <h4>Coursework</h4>

              {academics.coursework.map((course, index) => (
                <div key={index} className="flex items-center gap-x-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={course.name}
                    onChange={(e) =>
                      handleDynamicChange(
                        academics.coursework,
                        setAcademics,
                        index,
                        "name",
                        e.target.value,
                      )
                    }
                    className="w-3/5 rounded border p-2"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={course.description}
                    onChange={(e) =>
                      handleDynamicChange(
                        academics.coursework,
                        setAcademics,
                        index,
                        "description",
                        e.target.value,
                      )
                    }
                    className="w-2/5 rounded border p-2"
                  />
                </div>
              ))}

              <div className="hidden w-full items-center justify-between text-slate-700 group-hover:flex">
                <button
                  type="button"
                  className="rounded-md border border-slate-500 px-5 py-1.5 transition-all hover:border-slate-500 hover:bg-slate-500 hover:text-white"
                  onClick={() =>
                    setAcademics({
                      ...academics,
                      coursework: [
                        ...academics.coursework,
                        { name: "", description: "" },
                      ],
                    })
                  }
                >
                  Add Coursework
                </button>

                <button
                  type="button"
                  className="rounded-md border border-slate-500 px-5 py-1.5 transition-all hover:border-slate-500 hover:bg-slate-500 hover:text-white"
                  onClick={() => {
                    if (academics.coursework.length > 1) {
                      setAcademics({
                        ...academics,
                        coursework: academics.coursework.slice(0, -1),
                      });
                    }
                  }}
                >
                  Remove Coursework
                </button>
              </div>
            </div>

            <div className="group mb-4 space-y-2 pb-12 hover:pb-0.5">
              <h4>Projects</h4>

              {academics.projects.map((course, index) => (
                <div key={index} className="flex items-center gap-x-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={course.name}
                    onChange={(e) =>
                      handleDynamicChange(
                        academics.projects,
                        setAcademics,
                        index,
                        "name",
                        e.target.value,
                      )
                    }
                    className="w-3/5 rounded border p-2"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={course.description}
                    onChange={(e) =>
                      handleDynamicChange(
                        academics.projects,
                        setAcademics,
                        index,
                        "description",
                        e.target.value,
                      )
                    }
                    className="w-2/5 rounded border p-2"
                  />
                </div>
              ))}

              <div className="hidden w-full items-center justify-between text-slate-700 group-hover:flex">
                <button
                  type="button"
                  className="rounded-md border border-slate-500 px-5 py-1.5 transition-all hover:border-slate-500 hover:bg-slate-500 hover:text-white"
                  onClick={() =>
                    setAcademics({
                      ...academics,
                      projects: [
                        ...academics.projects,
                        { name: "", description: "" },
                      ],
                    })
                  }
                >
                  Add projects
                </button>

                <button
                  type="button"
                  className="rounded-md border border-slate-500 px-5 py-1.5 transition-all hover:border-slate-500 hover:bg-slate-500 hover:text-white"
                  onClick={() => {
                    if (academics.projects.length > 1) {
                      setAcademics({
                        ...academics,
                        projects: academics.projects.slice(0, -1),
                      });
                    }
                  }}
                >
                  Remove projects
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="group mb-20 flex flex-col gap-y-2 hover:mb-0">
          <h3 className="-ml-2 py-2 text-xl font-light">Goals</h3>
          <input
            type="text"
            placeholder="First Choice Major"
            value={goals.firstChoiceMajor}
            onChange={(e) =>
              handleSimpleChange(setGoals, "firstChoiceMajor", e.target.value)
            }
            className="w-1/3 rounded border p-2"
          />
          <input
            type="text"
            placeholder="Second Choice Major"
            value={goals.secondChoiceMajor}
            onChange={(e) =>
              handleSimpleChange(setGoals, "secondChoiceMajor", e.target.value)
            }
            className="w-1/3 rounded border p-2"
          />
          <input
            type="text"
            placeholder="Career Goal"
            value={goals.careerGoal}
            onChange={(e) =>
              handleSimpleChange(setGoals, "careerGoal", e.target.value)
            }
            className="w-1/3 rounded border p-2"
          />
        </div>

        {/* Diversity */}
        <div className="group mb-20 flex flex-col gap-y-2 hover:mb-0">
          <h3 className="-ml-2 py-2 text-xl font-light">Diversity</h3>
          <textarea
            placeholder="Experiences"
            value={diversity.experiences}
            onChange={(e) =>
              handleSimpleChange(setDiversity, "experiences", e.target.value)
            }
            className="w-1/2 rounded border p-2"
          />
          <textarea
            placeholder="External Attributes"
            value={diversity.externalAttributes}
            onChange={(e) =>
              handleSimpleChange(
                setDiversity,
                "externalAttributes",
                e.target.value,
              )
            }
            className="w-1/2 rounded border p-2"
          />
          <textarea
            placeholder="Internal Attributes"
            value={diversity.internalAttributes}
            onChange={(e) =>
              handleSimpleChange(
                setDiversity,
                "internalAttributes",
                e.target.value,
              )
            }
            className="w-1/2 rounded border p-2"
          />
        </div>

        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
