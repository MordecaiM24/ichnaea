import { useState, useEffect, Fragment, useRef } from "react";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";
import {
  CalendarDate,
  CircleFill,
  Flag,
  FlagFill,
  JournalBookmarkFill,
} from "react-bootstrap-icons";
import { ProgressBar } from "react-loader-spinner";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Calendar } from "react-calendar";
import "./calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../App";

export const User_Old = () => {
  const [todo, setTodo] = useState([]);

  const [savedColleges, setSavedColleges] = useState([]);

  const [updateSaved, shouldUpdate] = useState(0);

  const [todoReq, updateTodo] = useState([]);

  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    if (userID) {
      const getSavedColleges = async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_IP}/api/users/savedColleges/${userID}`,
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
          `${import.meta.env.VITE_IP}/api/users/todo/${userID}`,
        );

        setTodo(res.data);
      };

      getTodo();
    }
  }, [todoReq]);
  //Only have dependency for todos because todos depends on savedColleges but not vice versa

  const logout = async () => {
    const res = await supabase.auth.signOut();
    // await signOut(auth);
    console.log(JSON.stringify(res));
  };

  return (
    <div className="position-relative">
      <button
        onClick={logout}
        style={{ position: "absolute", top: "-2rem", right: "1rem" }}
        className="btn btn-primary z-high"
      >
        Logout
      </button>

      <TodoList todo={todo} updateTodo={updateTodo} setTodo={setTodo} />

      <SuppEssays todo={todo} updateTodo={updateTodo} setTodo={setTodo} />
    </div>
  );
};

const TodoList = (props) => {
  const { todo, updateTodo, setTodo } = props;

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

  const [calendar, setCalendar] = useState({
    isVisible: false,
  });

  const calendarVal = (idx) => {
    return { isVisible: true, taskIdx: idx };
  };

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

  useEffect(() => {
    const setInitialStyles = async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_IP
        }/api/users/todo/${window.localStorage.getItem("userID")}`,
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

  const completeTask = async (event, task) => {
    const e = event.currentTarget;

    e.disabled = true;
    setTodoLoading(true);
    const res = await axios.patch(
      `${import.meta.env.VITE_IP}/api/users/completetask`,
      {
        userID: window.localStorage.getItem("userID"),
        taskToComplete: task,
      },
    );
    const elIndex = res.data.findIndex((obj) => {
      return obj.task === task;
    });

    const status = res.data[elIndex].status;
    const styles = style(status);

    e.disabled = false;

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
      `${import.meta.env.VITE_IP}/api/users/changeFlag`,
      {
        userID: localStorage.getItem("userID"),
        task,
        flag:
          todo.find((obj) => obj.task == task).flag === "blue" ? "" : "blue",
      },
    );
    updateTodo([...todo]);

    setTimeout(() => {
      setFlagLoading([false, false, false, false, false, false]);
    }, 250);

    return;
  };

  return (
    <>
      <div className="container-xxl my-5 px-md-5">
        {calendar.isVisible && (
          <TaskCalendar
            taskIdx={calendar.taskIdx}
            setCalendar={setCalendar}
            todo={todo}
            setTodo={setTodo}
          />
        )}
        <div className="list-group">
          <div className="list-group-item list-group-item-action p-0 border-0">
            <div className="row d-flex align-items-center">
              <div className="col-5">
                <a className="list-group-item list-group-item-action active w-max-content px-md-5 px-3 rounded-top z-0">
                  Common App
                </a>
              </div>
              <div className="row col-7 pe-4 text-center">
                <div className="col-2 d-none d-md-block">Notes</div>
                <div className="col-2 d-none d-md-block overflow-24">
                  Target Date
                </div>
                <div className="col-6 pe-4 d-none d-md-block">Status</div>
                <div className="col-2 d-none d-md-block">Priority</div>
              </div>
            </div>
          </div>

          <a className="list-group-item list-group-item-action rounded-end rounded-bottom border-top">
            <div className="row d-flex align-items-center">
              <div className="col-5 d-flex align-items-center">
                <div>
                  <CircleFill
                    role="button"
                    className={"fs-8 me-2 " + elStyles.commonAppEssay.bullet}
                    onClick={(e) => completeTask(e, "commonAppEssay")}
                  />
                </div>
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
                  <CalendarDate
                    className="fs-5 c-pointer"
                    onClick={() => {
                      setCalendar(calendarVal(0));
                    }}
                  />
                </div>
                <div className="col-6">
                  <button
                    className={"btn w-md " + elStyles.commonAppEssay.btn}
                    onClick={(e) => completeTask(e, "commonAppEssay")}
                  >
                    {elStyles.commonAppEssay.text}
                  </button>
                </div>
                <div className="col-2 d-none d-sm-block">
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
                  onClick={(e) => completeTask(e, "satUpload")}
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
                  <CalendarDate
                    className="fs-5 c-pointer"
                    onClick={() => {
                      setCalendar(calendarVal(1));
                    }}
                  />
                </div>
                <div className="col-6">
                  <button
                    className={"btn w-md " + elStyles.satUpload.btn}
                    onClick={(e) => completeTask(e, "satUpload")}
                  >
                    {elStyles.satUpload.text}
                  </button>
                </div>
                <div className="col-2 d-none d-sm-block">
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
                  onClick={(e) => completeTask(e, "actUpload")}
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
                  <CalendarDate
                    className="fs-5 c-pointer"
                    onClick={() => {
                      setCalendar(calendarVal(2));
                    }}
                  />
                </div>
                <div className="col-6">
                  <button
                    className={"btn w-md " + elStyles.actUpload.btn}
                    onClick={(e) => completeTask(e, "actUpload")}
                  >
                    {elStyles.actUpload.text}
                  </button>
                </div>
                <div className="col-2 d-none d-sm-block">
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
                <div>
                  <CircleFill
                    role="button"
                    className={"fs-8 me-2 " + elStyles.extracurriculars.bullet}
                    onClick={(e) => completeTask(e, "extracurriculars")}
                  />
                </div>
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
                        extracurriculars: !noteAreaVisibility.extracurriculars,
                      });
                    }}
                  />
                </div>

                <div className="col-2">
                  <CalendarDate
                    className="fs-5 c-pointer"
                    onClick={() => {
                      setCalendar(calendarVal(3));
                    }}
                  />
                </div>
                <div className="col-6">
                  <button
                    className={"btn w-md " + elStyles.extracurriculars.btn}
                    onClick={(e) => completeTask(e, "extracurriculars")}
                  >
                    {elStyles.extracurriculars.text}
                  </button>
                </div>
                <div className="col-2 d-none d-sm-block">
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
                <div>
                  <CircleFill
                    role="button"
                    className={"fs-8 me-2 " + elStyles.teacherRecs.bullet}
                    onClick={(e) => completeTask(e, "teacherRecs")}
                  />
                </div>
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
                  <CalendarDate
                    className="fs-5 c-pointer"
                    onClick={() => {
                      setCalendar(calendarVal(4));
                    }}
                  />
                </div>

                <div className="col-6">
                  <button
                    className={"btn w-md " + elStyles.teacherRecs.btn}
                    onClick={(e) => completeTask(e, "teacherRecs")}
                  >
                    {elStyles.teacherRecs.text}
                  </button>
                </div>

                <div className="col-2 d-none d-sm-block">
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
                <div>
                  <CircleFill
                    role="button"
                    className={"fs-8 me-2 " + elStyles.writingSupplement.bullet}
                    onClick={(e) => completeTask(e, "writingSupplement")}
                  />
                </div>
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
                  <CalendarDate
                    className="fs-5 c-pointer"
                    onClick={() => {
                      setCalendar(calendarVal(5));
                    }}
                  />
                </div>

                <div className="col-6">
                  <button
                    className={"btn w-md " + elStyles.writingSupplement.btn}
                    onClick={(e) => completeTask(e, "writingSupplement")}
                  >
                    {elStyles.writingSupplement.text}
                  </button>
                </div>

                <div className="col-2 d-none d-sm-block">
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
};

const TaskCalendar = (props) => {
  const { setCalendar, todo, setTodo, taskIdx } = props;

  const [task, setTask] = useState(todo[taskIdx]);

  const [date, setDate] = useState(new Date(task.targetDate));
  const [isBlocked, setBlockage] = useState(false);

  const changeDate = async (date) => {
    setBlockage(true);
    setDate(date);
    const tempTask = { ...task };
    tempTask.targetDate = date;

    const res = await axios.patch(
      `${import.meta.env.VITE_IP}/api/users/editTaskDate`,
      {
        taskIdx,
        newTask: tempTask,
        userID: window.localStorage.getItem("userID"),
      },
    );

    console.log(res.data);

    setTodo(res.data.todo);

    setBlockage(false);
  };

  return (
    <div
      className="calendar-container container-fluid vh-100 vw-100 position-fixed d-flex justify-content-center align-items-center top-0 start-0 position-relative"
      onClick={(e) => {
        e.stopPropagation();
        setCalendar(false);
      }}
    >
      <div
        className=" d-flex align-items-center justify-content-center mb-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Calendar
          onChange={changeDate}
          value={date}
          maxDate={new Date("2024-02-01")}
          minDate={new Date()}
        />
        {isBlocked && (
          <div
            className="blocker h-100 w-100 position-absolute"
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></div>
        )}
      </div>
    </div>
  );
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
      `${import.meta.env.VITE_IP}/api/users/editNote`,
      {
        userID: localStorage.getItem("userID"),
        task: task.task,
        note: noteContent,
      },
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
    <div className="position-absolute position-relative z=high notes">
      <textarea
        className="w-100 h-100 note-text p-2 border-primary outline-primary"
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
  const setTodo = props.setTodo;

  const essayObj = todo.find((task) => {
    return task.task === "suppEssays";
  });

  const suppEssays = essayObj?.suppEssays;

  const clearColleges = async (event) => {
    const e = event.currentTarget;

    e.disabled = true;
    const res = await axios.patch(
      `${import.meta.env.VITE_IP}/api/users/clearColleges`,
      { userID: window.localStorage.getItem("userID") },
    );
    toast.info("Colleges cleared!", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTodo(res.data.todo);
    e.disabled = false;
    return;
  };

  return (
    <div className="container-xxl my-5 px-md-5 text-center">
      <ToastContainer />
      <div className="list-group">
        <div className="list-group-item list-group-item-action p-0 border-0">
          <div className="row d-flex align-items-center pe-2">
            <div className="col-5 d-flex align-items-center">
              <a
                aria-current="true"
                className="list-group-item list-group-item-action w-max-content px-md-5 px-3 py-2 rounded-top bg-orange text-white "
              >
                College Essays
              </a>
            </div>
            <div className="col-7 row pe-5 text-center">
              <div className="col-2 d-none d-md-block">Notes</div>
              <div className="col-2 d-none d-md-block overflow-24">
                {" "}
                Target Date{" "}
              </div>
              <div className="col-6 pe-4 d-none d-md-block">
                Application Type
              </div>
              <div className="col-2 d-none d-md-block">Completion</div>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion">
        <div className="accordion">
          {suppEssays?.length === 0 && (
            <p className="lead border rounded rounded-top-0 py-5 px-3">
              {" "}
              Start Adding Colleges!{" "}
            </p>
          )}
          {suppEssays?.map((college, idx) => {
            return (
              <CollegeQs
                college={college}
                key={idx}
                updateTodo={updateTodo}
                idx={idx}
                setTodo={props.setTodo}
                todo={todo}
              />
            );
          })}
        </div>
      </div>
      <button
        className="btn btn-outline-primary w-100 mt-3"
        onClick={(e) => clearColleges(e)}
      >
        Clear
      </button>
    </div>
  );
};

const CollegeQs = (props) => {
  const { college, updateTodo, idx, setTodo, todo } = props;

  const [percentCompleted, setPercentCompleted] = useState(0);

  useEffect(() => {
    setPercentCompleted(Math.round(college.percentCompleted * 100));
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

  const completeQuestion = async (event, question) => {
    const e = event.currentTarget;

    e.disabled = true;
    const res = await axios.patch(
      `${import.meta.env.VITE_IP}/api/users/completeQuestion`,
      {
        userID: window.localStorage.getItem("userID"),
        questionToUpdate: question,
        collegeName: college.collegeName,
      },
    );

    setPercentCompleted(res.data.percentCompleted);

    setTodo(res.data.user.todo);

    e.disabled = false;
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

  const [calendar, setCalendar] = useState({
    isVisible: false,
  });

  const [noteAreaVisibility, setNoteAreaVisiblity] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="accordion-item border-round-start-0">
      {calendar.isVisible && (
        <CollegeCalendar
          collegeIdx={calendar.collegeIdx}
          setCalendar={setCalendar}
          todo={todo}
          setTodo={setTodo}
        />
      )}
      <h2 className="accordion-header my-0">
        <a
          className="accordion-button collapsed text-reset text-decoration-none fw-normal"
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
              <div className="col-2 d-none d-md-flex flex-column justify-content-center align-items-center position-relative ">
                <JournalBookmarkFill
                  className="fs-5 c-pointer"
                  data-bs-toggle="collapse"
                  data-bs-target
                  onClick={() => {
                    setNoteAreaVisiblity(!noteAreaVisibility);
                  }}
                />
                {noteAreaVisibility && (
                  <CollegeNote
                    college={college}
                    setNoteAreaVisiblity={setNoteAreaVisiblity}
                    setTodo={props.setTodo}
                  />
                )}
              </div>
              <div className="col-2 d-none d-md-flex flex-column justify-content-center align-items-center">
                <CalendarDate
                  className="fs-5"
                  data-bs-toggle="collapse"
                  data-bs-target
                  onClick={() => {
                    setCalendar({ isVisible: true, collegeIdx: idx });
                  }}
                />
              </div>
              <div className="col-6 d-flex flex-column justify-content-center">
                {college.decision.specialName}
              </div>
              <div className="col-6 col-md-2 d-flex align-items-center justify-content-center">
                <div className="h-50 w-50 d-flex align-items-center justify-content-center">
                  <CircularProgressbar
                    value={percentCompleted}
                    text={`${percentCompleted}%`}
                    strokeWidth={10}
                    styles={buildStyles(getColor(percentCompleted))}
                  />
                </div>
              </div>
            </div>
          </div>
        </a>
      </h2>

      <div
        id={"collapse" + idx}
        className="accordion-collapse collapse border-round-start-0"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body ps-0 py-0 pe-0 pe-md-4">
          <div className="list-group">
            {college.questions.map((question, idx, arr) => {
              return (
                <a
                  key={idx}
                  className={
                    "list-group-item list-group-item-action " +
                    questionClasses(idx, arr)
                  }
                >
                  <div className="row align-items-center">
                    <div className="col-7 row d-flex align-items-center p-0">
                      <p className="overflow-64 text-start ms-3">
                        {question.question}
                      </p>
                    </div>

                    <div className="col-1"></div>

                    {/* These attributes are interchangeable for essay and status */}
                    <div className="d-none d-lg-block col-lg-2">
                      <button
                        className="btn w-md btn-primary d-none d-lg-block"
                        onClick={() => {
                          navigate(`/profile/${question._id}`, {
                            replace: true,
                            state: { prompt: question.question },
                          });
                        }}
                      >
                        Open essay
                      </button>
                    </div>

                    <div className="col-4 col-lg-2 text-center pe-5 ">
                      <div>
                        <button
                          onClick={(e) => {
                            completeQuestion(e, question.question);
                          }}
                          className={"btn w-md " + style(question.status).btn}
                        >
                          {style(question.status).text}
                        </button>
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
  );
};

const CollegeCalendar = (props) => {
  const { setCalendar, todo, setTodo, collegeIdx } = props;

  const [college, setCollege] = useState(todo[6].suppEssays[collegeIdx]);

  const [date, setDate] = useState(new Date(college.decision.date));

  const [isBlocked, setBlockage] = useState(false);

  const changeDate = async (date) => {
    setBlockage(true);
    setDate(date);
    const tempCollege = { ...college };
    tempCollege.decision.date = date;
    console.log(tempCollege);

    const res = await axios.patch(
      `${import.meta.env.VITE_IP}/api/users/editCollegeDate`,
      {
        collegeIdx,
        newCollege: tempCollege,
        userID: window.localStorage.getItem("userID"),
      },
    );

    console.log(res.data);

    setTodo(res.data.todo);

    setBlockage(false);
  };

  return (
    <div
      className="calendar-container container-fluid vh-100 vw-100 position-fixed d-flex justify-content-center align-items-center top-0 start-0 position-relative"
      onClick={(e) => {
        e.stopPropagation();
        setCalendar(false);
      }}
    >
      <div
        className=" d-flex align-items-center justify-content-center mb-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Calendar
          onChange={changeDate}
          value={date}
          maxDate={new Date("2024-02-01")}
          minDate={new Date()}
        />
        {isBlocked && (
          <div
            className="blocker h-100 w-100 position-absolute"
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

const CollegeNote = (props) => {
  const { college, setNoteAreaVisiblity, setTodo } = props;

  const [buttonVis, showButton] = useState(false);
  const [noteContent, setContent] = useState(college.notes);

  useEffect(() => {
    setContent(college.note);
  }, []);

  const handleChange = (event) => {
    setContent(event.target.value);
    showButton(true);
  };

  const handleSubmit = async () => {
    const res = await axios.patch(
      `${import.meta.env.VITE_IP}/api/users/editCollegeNote`,
      {
        userID: localStorage.getItem("userID"),
        college: college.collegeName,
        note: noteContent,
      },
    );

    setTodo(res.data.todo);
    setNoteAreaVisiblity(false);
  };

  return (
    <div
      className="position-absolute position-relative z-3 notes"
      data-bs-toggle="collapse"
      data-bs-target
    >
      <textarea
        className="w-100 h-100 note-text p-2 border-primary outline-primary"
        data-bs-toggle="collapse"
        data-bs-target=""
        onChange={handleChange}
        defaultValue={noteContent}
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
