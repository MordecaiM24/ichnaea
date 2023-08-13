import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import {
  CalendarDate,
  CircleFill,
  Flag,
  FlagFill,
  JournalBookmarkFill,
} from "react-bootstrap-icons";
import { ProgressBar } from "react-loader-spinner";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const User = () => {
  const [todo, setTodo] = useState([]);

  const [savedColleges, setSavedColleges] = useState([]);

  const [updateSaved, shouldUpdate] = useState(0);

  const [todoReq, updateTodo] = useState([]);

  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    if (userID) {
      const getSavedColleges = async () => {
        const res = await axios.get(
          `http://${
            import.meta.env.VITE_IP
          }:5000/api/users/savedColleges/${userID}`
        );

        setSavedColleges(res.data);
      };

      getSavedColleges();
    }
  }, [updateSaved]);

  useEffect(() => {
    if (userID) {
      const getTodo = async () => {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}:5000/api/users/todo/${userID}`
        );

        setTodo(res.data);
      };

      getTodo();
    }
  }, [todoReq]);
  //Only have dependency for todos because todos depends on savedColleges but not vice versa

  const logout = async () => {
    await signOut(auth);
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={logout}
        style={{ position: "fixed", top: "10px", right: "10px" }}
      >
        Logout
      </button>

      <TodoList todo={todo} updateTodo={updateTodo} setTodo={setTodo} />

      <SuppEssays todo={todo} updateTodo={updateTodo} />
    </>
  );
};

const TodoList = (props) => {
  const todo = props.todo;
  const updateTodo = props.updateTodo;

  const [_, rerender] = useState([]);

  const [isTodoLoading, setTodoLoading] = useState(false);

  const defaultNoteVisibilty = {
    commonAppEssay: false,
    satUpload: false,
    actUpload: false,
    extracurriculars: false,
    teacherRecs: false,
    writingSupplement: false,
  };

  const [noteAreaVisibility, showNoteArea] = useState({
    defaultNoteVisibilty,
  });

  const initObject = {
    status: 0,
    btn: "btn-danger",
    bullet: "text-danger",
    text: "Not Started",
  };

  const [elStyles, setElStyles] = useState({
    commonAppEssay: initObject,
    satUpload: initObject,
    actUpload: initObject,
    extracurriculars: initObject,
    teacherRecs: initObject,
    writingSupplement: initObject,
  });

  const [isFlagLoading, setFlagLoading] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const style = (status) => {
    let btn;
    let bullet;
    let text;

    switch (status) {
      case 0:
        btn = "btn-danger";
        bullet = "text-danger";
        text = "Not Started";
        break;
      case 1:
        btn = "btn-warning";
        bullet = "text-warning";
        text = "In Progress";
        break;
      case 2:
        btn = "btn-success";
        bullet = "text-success";
        text = "Completed";
        break;
      default:
        btn = "btn-secondary";
        bullet = "text-secondary";
        text = "Error";
    }

    return {
      status,
      btn,
      bullet,
      text,
    };
  };

  useState(() => {
    const setInitialStyles = async () => {
      const res = await axios.get(
        `http://${
          import.meta.env.VITE_IP
        }:5000/api/users/todo/${window.localStorage.getItem("userID")}`
      );

      const todoList = res.data;

      let tempObj = {};

      todoList.forEach((todo, idx) => {
        const task = todo.task;
        const status = todoList[idx].status;
        tempObj[task] = style(status);
        setElStyles(tempObj);
      });
    };

    setInitialStyles();
  }, []);

  const completeTask = async (task) => {
    setTodoLoading(true);
    const res = await axios.patch(
      `http://${import.meta.env.VITE_IP}:5000/api/users/completetask`,
      {
        userID: window.localStorage.getItem("userID"),
        taskToComplete: task,
      }
    );

    const elIndex = res.data.findIndex((obj) => {
      return obj.task === task;
    });

    const status = res.data[elIndex].status;
    const styles = style(status);

    setElStyles({ ...elStyles, [task]: styles });

    updateTodo([...todo]);
    setTodoLoading(false);
  };

  const changeFlag = async (task) => {
    const temp = isFlagLoading;
    temp[
      todo.findIndex((obj) => {
        return obj.task === task;
      })
    ] = true;
    setFlagLoading(temp);
    const res = await axios.patch(
      `http://${import.meta.env.VITE_IP}:5000/api/users/changeFlag`,
      {
        userID: localStorage.getItem("userID"),
        task,
        flag:
          todo.find((obj) => obj.task == task).flag === "blue" ? "" : "blue",
      }
    );
    updateTodo([...todo]);

    setTimeout(() => {
      setFlagLoading([false, false, false, false, false, false]);
    }, 250);

    return;
  };

  if (isTodoLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <ProgressBar
          height="25vh"
          width="25vh"
          ariaLabel="progress-bar-loading"
          wrapperClass="progress-bar-wrapper"
          borderColor="#910016"
          barColor="#175e54"
        />
      </div>
    );
  } else {
    return (
      <>
        <div className="container-xxl my-5 px-md-5">
          <div className="list-group">
            <div className="list-group-item list-group-item-action p-0 border-0">
              <div className="row d-flex align-items-center">
                <div className="col-5">
                  <a className="list-group-item list-group-item-action active w-max-content px-md-5 px-3 rounded-top">
                    Common App
                  </a>
                </div>
                <div className="row col-7 pe-4 text-center">
                  <div className="col-2">Notes</div>
                  <div className="col-2">Target Date</div>
                  <div className="col-6 pe-4">Status</div>
                  <div className="col-2">Priority</div>
                </div>
              </div>
            </div>

            <a className="list-group-item list-group-item-action rounded-end rounded-bottom border-top">
              <div className="row d-flex align-items-center">
                <div className="col-5 d-flex align-items-center">
                  <CircleFill
                    role="button"
                    className={"fs-8 me-2 " + elStyles.commonAppEssay.bullet}
                    onClick={() => completeTask("commonAppEssay")}
                  />
                  <p>Finish Common App Essay</p>
                </div>
                <div className="row col-7 text-center">
                  <div className="col-2 position-relative">
                    {noteAreaVisibility.commonAppEssay && (
                      <NoteArea
                        showNoteArea={showNoteArea}
                        setTodo={props.setTodo}
                        element={"commonAppEssay"}
                        todo={todo}
                      />
                    )}
                    <JournalBookmarkFill
                      className="fs-5 c-pointer"
                      onClick={() => {
                        showNoteArea({
                          ...defaultNoteVisibilty,
                          commonAppEssay: !noteAreaVisibility.commonAppEssay,
                        });
                      }}
                    />
                  </div>
                  <div className="col-2">
                    <CalendarDate className="fs-5" />
                  </div>
                  <div className="col-6">
                    <button
                      className={"btn w-md " + elStyles.commonAppEssay.btn}
                      onClick={() => completeTask("commonAppEssay")}
                    >
                      {elStyles.commonAppEssay.text}
                    </button>
                  </div>
                  <div className="col-2">
                    {isFlagLoading[0] ? (
                      <ProgressBar
                        height="2rem"
                        width="2rem"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass="progress-bar-wrapper"
                        borderColor="#910016"
                        barColor="#175e54"
                      />
                    ) : todo[0]?.flag ? (
                      <FlagFill
                        className="fs-5 text-blue c-pointer"
                        onClick={() => changeFlag("commonAppEssay")}
                      />
                    ) : (
                      <Flag
                        className="fs-5 c-pointer"
                        onClick={() => changeFlag("commonAppEssay")}
                      />
                    )}
                    {todo.find((obj) => {
                      obj.task === "commonAppEssay";
                    })}
                  </div>
                </div>
              </div>
            </a>

            <a className="list-group-item list-group-item-action rounded">
              <div className="row d-flex align-items-center">
                <div className="col-5 d-flex align-items-center">
                  <CircleFill
                    role="button"
                    className={"fs-8 me-2 " + elStyles.satUpload.bullet}
                    onClick={() => completeTask("satUpload")}
                  />
                  <p>Upload SAT</p>
                </div>
                <div className="row col-7 text-center">
                  <div className="col-2 position-relative">
                    {noteAreaVisibility.satUpload && (
                      <NoteArea
                        showNoteArea={showNoteArea}
                        setTodo={props.setTodo}
                        element={"satUpload"}
                        todo={todo}
                      />
                    )}
                    <JournalBookmarkFill
                      className="fs-5 c-pointer"
                      onClick={() => {
                        showNoteArea({
                          ...defaultNoteVisibilty,
                          satUpload: !noteAreaVisibility.satUpload,
                        });
                      }}
                    />
                  </div>
                  <div className="col-2">
                    <CalendarDate className="fs-5" />
                  </div>
                  <div className="col-6">
                    <button
                      className={"btn w-md " + elStyles.satUpload.btn}
                      onClick={() => completeTask("satUpload")}
                    >
                      {elStyles.satUpload.text}
                    </button>
                  </div>
                  <div className="col-2">
                    {isFlagLoading[1] ? (
                      <ProgressBar
                        height="2rem"
                        width="2rem"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass="progress-bar-wrapper"
                        borderColor="#910016"
                        barColor="#175e54"
                      />
                    ) : todo[1]?.flag ? (
                      <FlagFill
                        className="fs-5 text-blue c-pointer"
                        onClick={() => changeFlag("satUpload")}
                      />
                    ) : (
                      <Flag
                        className="fs-5 c-pointer"
                        onClick={() => changeFlag("satUpload")}
                      />
                    )}
                    {todo.find((obj) => {
                      obj.task === "satUpload";
                    })}
                  </div>
                </div>
              </div>
            </a>

            <a className="list-group-item list-group-item-action rounded">
              <div className="row d-flex align-items-center">
                <div className="col-5 d-flex align-items-center">
                  <CircleFill
                    role="button"
                    className={"fs-8 me-2 " + elStyles.actUpload.bullet}
                    onClick={() => completeTask("actUpload")}
                  />
                  <p>Upload ACT</p>
                </div>
                <div className="row col-7 text-center">
                  <div className="col-2 position-relative">
                    {noteAreaVisibility.actUpload && (
                      <NoteArea
                        showNoteArea={showNoteArea}
                        setTodo={props.setTodo}
                        element={"actUpload"}
                        todo={todo}
                      />
                    )}
                    <JournalBookmarkFill
                      className="fs-5 c-pointer"
                      onClick={() => {
                        showNoteArea({
                          ...defaultNoteVisibilty,
                          actUpload: !noteAreaVisibility.actUpload,
                        });
                      }}
                    />
                  </div>
                  <div className="col-2">
                    <CalendarDate className="fs-5" />
                  </div>
                  <div className="col-6">
                    <button
                      className={"btn w-md " + elStyles.actUpload.btn}
                      onClick={() => completeTask("actUpload")}
                    >
                      {elStyles.actUpload.text}
                    </button>
                  </div>
                  <div className="col-2">
                    {isFlagLoading[2] ? (
                      <ProgressBar
                        height="2rem"
                        width="2rem"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass="progress-bar-wrapper"
                        borderColor="#910016"
                        barColor="#175e54"
                      />
                    ) : todo[2]?.flag ? (
                      <FlagFill
                        className="fs-5 text-blue c-pointer"
                        onClick={() => changeFlag("actUpload")}
                      />
                    ) : (
                      <Flag
                        className="fs-5 c-pointer"
                        onClick={() => changeFlag("actUpload")}
                      />
                    )}
                    {todo.find((obj) => {
                      obj.task === "actUpload";
                    })}
                  </div>
                </div>
              </div>
            </a>

            <a className="list-group-item list-group-item-action rounded">
              <div className="row d-flex align-items-center">
                <div className="col-5 d-flex align-items-center">
                  <CircleFill
                    role="button"
                    className={"fs-8 me-2 " + elStyles.extracurriculars.bullet}
                    onClick={() => completeTask("extracurriculars")}
                  />
                  <p>Upload extracurriculars</p>
                </div>
                <div className="row col-7 text-center">
                  <div className="col-2 position-relative">
                    {noteAreaVisibility.extracurriculars && (
                      <NoteArea
                        showNoteArea={showNoteArea}
                        setTodo={props.setTodo}
                        element={"extracurriculars"}
                        todo={todo}
                      />
                    )}
                    <JournalBookmarkFill
                      className="fs-5 c-pointer"
                      onClick={() => {
                        showNoteArea({
                          ...defaultNoteVisibilty,
                          extracurriculars:
                            !noteAreaVisibility.extracurriculars,
                        });
                      }}
                    />
                  </div>

                  <div className="col-2">
                    <CalendarDate className="fs-5" />
                  </div>
                  <div className="col-6">
                    <button
                      className={"btn w-md " + elStyles.extracurriculars.btn}
                      onClick={() => completeTask("extracurriculars")}
                    >
                      {elStyles.extracurriculars.text}
                    </button>
                  </div>
                  <div className="col-2">
                    {isFlagLoading[3] ? (
                      <ProgressBar
                        height="2rem"
                        width="2rem"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass="progress-bar-wrapper"
                        borderColor="#910016"
                        barColor="#175e54"
                      />
                    ) : todo[3]?.flag ? (
                      <FlagFill
                        className="fs-5 text-blue c-pointer"
                        onClick={() => changeFlag("extracurriculars")}
                      />
                    ) : (
                      <Flag
                        className="fs-5 c-pointer"
                        onClick={() => changeFlag("extracurriculars")}
                      />
                    )}
                    {todo.find((obj) => {
                      obj.task === "extracurriculars";
                    })}
                  </div>
                </div>
              </div>
            </a>

            <a className="list-group-item list-group-item-action rounded">
              <div className="row d-flex align-items-center">
                <div className="col-5 d-flex align-items-center">
                  <CircleFill
                    role="button"
                    className={"fs-8 me-2 " + elStyles.teacherRecs.bullet}
                    onClick={() => completeTask("teacherRecs")}
                  />
                  <p>Ask for / upload teacher recommendations</p>
                </div>
                <div className="row col-7 text-center">
                  <div className="col-2 position-relative">
                    {noteAreaVisibility.teacherRecs && (
                      <NoteArea
                        showNoteArea={showNoteArea}
                        setTodo={props.setTodo}
                        element={"teacherRecs"}
                        todo={todo}
                      />
                    )}
                    <JournalBookmarkFill
                      className="fs-5 c-pointer"
                      onClick={() => {
                        showNoteArea({
                          ...defaultNoteVisibilty,
                          teacherRecs: !noteAreaVisibility.teacherRecs,
                        });
                      }}
                    />
                  </div>

                  <div className="col-2">
                    <CalendarDate className="fs-5" />
                  </div>

                  <div className="col-6">
                    <button
                      className={"btn w-md " + elStyles.teacherRecs.btn}
                      onClick={() => completeTask("teacherRecs")}
                    >
                      {elStyles.teacherRecs.text}
                    </button>
                  </div>

                  <div className="col-2">
                    {isFlagLoading[4] ? (
                      <ProgressBar
                        height="2rem"
                        width="2rem"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass="progress-bar-wrapper"
                        borderColor="#910016"
                        barColor="#175e54"
                      />
                    ) : todo[4]?.flag ? (
                      <FlagFill
                        className="fs-5 text-blue c-pointer"
                        onClick={() => changeFlag("teacherRecs")}
                      />
                    ) : (
                      <Flag
                        className="fs-5 c-pointer"
                        onClick={() => changeFlag("teacherRecs")}
                      />
                    )}
                    {todo.find((obj) => {
                      obj.task === "teacherRecs";
                    })}
                  </div>
                </div>
              </div>
            </a>

            <a className="list-group-item list-group-item-action rounded">
              <div className="row d-flex align-items-center">
                <div className="col-5 d-flex align-items-center">
                  <CircleFill
                    role="button"
                    className={"fs-8 me-2 " + elStyles.writingSupplement.bullet}
                    onClick={() => completeTask("writingSupplement")}
                  />
                  <p>Finish / upload writing supplement</p>
                </div>
                <div className="row col-7 text-center">
                  <div className="col-2 position-relative">
                    {noteAreaVisibility.writingSupplement && (
                      <NoteArea
                        showNoteArea={showNoteArea}
                        setTodo={props.setTodo}
                        element={"writingSupplement"}
                        todo={todo}
                      />
                    )}
                    <JournalBookmarkFill
                      className="fs-5 c-pointer"
                      onClick={() => {
                        showNoteArea({
                          ...defaultNoteVisibilty,
                          writingSupplement:
                            !noteAreaVisibility.writingSupplement,
                        });
                      }}
                    />
                  </div>

                  <div className="col-2">
                    <CalendarDate className="fs-5" />
                  </div>

                  <div className="col-6">
                    <button
                      className={"btn w-md " + elStyles.writingSupplement.btn}
                      onClick={() => completeTask("writingSupplement")}
                    >
                      {elStyles.writingSupplement.text}
                    </button>
                  </div>

                  <div className="col-2">
                    {isFlagLoading[5] ? (
                      <ProgressBar
                        height="2rem"
                        width="2rem"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass="progress-bar-wrapper"
                        borderColor="#910016"
                        barColor="#175e54"
                      />
                    ) : todo[5]?.flag ? (
                      <FlagFill
                        className="fs-5 text-blue c-pointer"
                        onClick={() => changeFlag("writingSupplement")}
                      />
                    ) : (
                      <Flag
                        className="fs-5 c-pointer"
                        onClick={() => changeFlag("writingSupplement")}
                      />
                    )}
                    {todo.find((obj) => {
                      obj.task === "writingSupplement";
                    })}
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </>
    );
  }
};

const NoteArea = (props) => {
  const element = props.element;
  const taskIdx = props.todo.findIndex((obj) => obj.task === element);
  const task = props.todo[taskIdx];
  const setTodo = props.setTodo;

  const defaultVal = task.notes;

  const [buttonVis, showButton] = useState(false);
  const [noteContent, changeContent] = useState(defaultVal);

  const handleChange = (event) => {
    changeContent(event.target.value);
    showButton(true);
  };

  const handleSubmit = async () => {
    const res = await axios.patch(
      `http://${import.meta.env.VITE_IP}:5000/api/users/editNote`,
      {
        userID: localStorage.getItem("userID"),
        task: task.task,
        note: noteContent,
      }
    );

    setTodo(res.data.todo);
    const defaultNoteVisibilty = {
      commonAppEssay: false,
      satUpload: false,
      actUpload: false,
      extracurriculars: false,
      teacherRecs: false,
      writingSupplement: false,
    };
    props.showNoteArea({
      defaultNoteVisibilty,
    });
  };

  return (
    <div className="position-absolute position-relative z-3 notes ">
      <textarea
        className="w-100 h-100 note-text p-2"
        defaultValue={defaultVal}
        onChange={(e) => handleChange(e)}
      ></textarea>
      {buttonVis && (
        <button
          className="btn btn-primary position-absolute note-save rounded-1 py-1"
          onClick={handleSubmit}
        >
          Save
        </button>
      )}
    </div>
  );
};

const SuppEssays = (props) => {
  const todo = props.todo;
  const updateTodo = props.updateTodo;

  const essayObj = todo.find((task) => {
    return task.task === "suppEssays";
  });

  const suppEssays = essayObj?.suppEssays;

  return (
    <>
      <div className="container-xxl my-5 px-md-5">
        <div className="list-group">
          <div className="list-group-item list-group-item-action p-0 border-0">
            <div className="row d-flex align-items-center pe-2">
              <div className="col-5">
                <a
                  aria-current="true"
                  className="list-group-item list-group-item-action w-max-content px-md-5 px-3 py-2 rounded-top bg-orange text-white"
                >
                  College Essays
                </a>
              </div>
              <div className="col-7 row pe-5 text-center">
                <div className="col-2">Notes</div>
                <div className="col-2">Target Date</div>
                <div className="col-6 pe-4">Application Type</div>
                <div className="col-2">Completion</div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion">
          <div className="accordion">
            {suppEssays?.map((college, idx) => {
              return (
                <CollegeQs
                  college={college}
                  key={idx}
                  updateTodo={updateTodo}
                  idx={idx}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const CollegeQs = (props) => {
  const { college, updateTodo, idx } = props;
  const [_, rerender] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(Math.round(college.percentCompleted * 100));
  }, []);

  const style = (status) => {
    let btn;
    let bullet;
    let text;

    switch (status) {
      case 0:
        btn = "btn-danger";
        bullet = "text-danger";
        text = "Not Started";
        break;
      case 1:
        btn = "btn-warning";
        bullet = "text-warning";
        text = "In Progress";
        break;
      case 2:
        btn = "btn-success";
        bullet = "text-success";
        text = "Completed";
        break;
      default:
        btn = "btn-secondary";
        bullet = "text-secondary";
        text = "Error";
    }

    return {
      status,
      btn,
      bullet,
      text,
    };
  };

  const questionClasses = (idx, arr) => {
    const length = arr.length;

    if (idx === 0 && idx === length - 1) {
      return "rounded-end rounded-bottom border-top border-start-0 border-round-start-0 border-bottom-0";
    } else if (idx === 0) {
      return "rounded-end rounded-bottom border-top border-start-0 border-round-start-0";
    } else if (idx === length - 1) {
      return "rounded border-0 border-end";
    } else {
      return "rounded border-start-0";
    }
  };

  const completeQuestion = async (question) => {
    const res = await axios.patch(
      `http://${import.meta.env.VITE_IP}:5000/api/users/completeQuestion`,
      {
        userID: window.localStorage.getItem("userID"),
        questionToUpdate: question,
        collegeName: college.collegeName,
      }
    );

    rerender((_) => _ + 1); // Force rerender via state update or else todo list will be one update behind
    setPercentage(res.data.completion);
    updateTodo([""]);
  };

  const getColor = (percentage) => {
    if (percentage < 33) {
      return {
        textColor: "#fb4e4b",
        pathColor: "#fb4e4b",
      };
    } else if (percentage < 67) {
      return {
        textColor: "#ffbd44",
        pathColor: "#ffbd44",
      };
    } else {
      return {
        textColor: "#00ca4e",
        pathColor: "#00ca4e",
      };
    }
  };

  return (
    <>
      {/* <>
        <h3>{college.collegeName}</h3>
        {college.questions?.map((questionObj, idx) => {
          return (
            <Fragment key={idx}>
              <p
                style={questionStyle(questionObj)}
                onClick={() => completeQuestion(questionObj.question)}
              >
                {questionObj.question}
              </p>
              <br />
            </Fragment>
          );
        })}
      </> */}
      <div className="accordion-item border-round-start-0">
        <h2 className="accordion-header my-0">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#collapse" + idx}
            aria-expanded="false"
            aria-controls={"#collapse" + idx}
          >
            <div className="w-100 row">
              <p className="col-5 d-flex flex-column justify-content-center">
                {college.collegeName}
              </p>
              <div className="col-7 row text-center">
                <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                  <JournalBookmarkFill className="fs-5 c-pointer" />
                </div>
                <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                  <CalendarDate className="fs-5" />
                </div>
                <div className="col-6 d-flex flex-column justify-content-center">
                  Single Choice Early Action
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                  <div className="h-50 w-50 d-flex align-items-center justify-content-center">
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      strokeWidth={10}
                      styles={buildStyles(getColor(percentage))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </button>
        </h2>

        <div
          id={"collapse" + idx}
          className="accordion-collapse collapse border-round-start-0"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body ps-0 py-0 pe-4">
            <div className="list-group">
              {college.questions.map((question, idx, arr) => {
                return (
                  // <a className="list-group-item list-group-item-action rounded-end rounded-bottom border-top border-start-0 border-round-start-0">
                  <a
                    key={idx}
                    className={
                      "list-group-item list-group-item-action " +
                      questionClasses(idx, arr)
                    }
                  >
                    <div className="row d-flex align-items-center">
                      <div className="col-5 row d-flex align-items-center p-0">
                        {/* <div className="col-1"></div> */}
                        <CircleFill
                          className={
                            "fs-7 c-pointer col-1 ms-3 " +
                            style(question.status).bullet
                          }
                        />

                        <p className="col-9">{question.question}</p>
                      </div>
                      <div className="row col-7 text-center">
                        <div className="col-2"></div>
                        <div className="col-2"></div>
                        <div className="col-6">
                          <button
                            onClick={() => {
                              completeQuestion(question.question);
                            }}
                            className={"btn w-md " + style(question.status).btn}
                          >
                            {style(question.status).text}
                          </button>
                        </div>
                        <div className="col-2 d-flex align-items-center justify-content-center">
                          <Flag
                            className="fs-5 c-pointer"
                            onClick={() => changeFlag("satUpload")}
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
