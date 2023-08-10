import { useCookies } from "react-cookie";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  CalendarDate,
  CircleFill,
  Flag,
  JournalBookmarkFill,
} from "react-bootstrap-icons";
import { ColorRing, ProgressBar } from "react-loader-spinner";

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

      <TodoList todo={todo} updateTodo={updateTodo} />

      <h1>Saved Colleges:</h1>
      {savedColleges.map((college, idx) => {
        return <div key={idx}>{college.fullName}</div>;
      })}

      <h1>Supplemental Essays:</h1>

      <SuppEssays todo={todo} updateTodo={updateTodo} />
    </>
  );
};

const TodoList = (props) => {
  const todo = props.todo;

  const updateTodo = props.updateTodo;
  const [_, rerender] = useState([]);

  const [isTodoLoading, setTodoLoading] = useState(false);

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

  if (isTodoLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <ProgressBar
          height="25vh"
          width="25vh"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
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
                  <div className="col-2">
                    <JournalBookmarkFill className="fs-5" />
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
                    <Flag className="fs-5" />
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
                  <div className="col-2">
                    <JournalBookmarkFill className="fs-5" />
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
                    <Flag className="fs-5" />
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
                  <div className="col-2">
                    <JournalBookmarkFill className="fs-5" />
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
                    <Flag className="fs-5" />
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
                  <div className="col-2">
                    <JournalBookmarkFill className="fs-5" />
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
                    <Flag className="fs-5" />
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
                  <div className="col-2">
                    <JournalBookmarkFill className="fs-5" />
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
                    <Flag className="fs-5" />
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
                  <div className="col-2">
                    <JournalBookmarkFill className="fs-5" />
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
                    <Flag className="fs-5" />
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

const SuppEssays = (props) => {
  const todo = props.todo;
  const updateTodo = props.updateTodo;

  const essayObj = todo.find((task) => {
    return task.task === "suppEssays";
  });

  const suppEssays = essayObj?.suppEssays;

  return (
    <>
      {suppEssays?.map((college, idx) => {
        return (
          <CollegeQs college={college} key={idx} updateTodo={updateTodo} />
        );
      })}
    </>
  );
};

const CollegeQs = (props) => {
  const college = props.college;
  const updateTodo = props.updateTodo;
  const [_, rerender] = useState(0);

  const questionStyle = (question) => {
    const isCompleted = question.status === 2;
    const qStatus = question.status;

    let color;
    switch (qStatus) {
      case 0:
        color = "red";
        break;
      case 1:
        color = "yellow";
        break;
      case 2:
        color = "green";
        break;
      default:
        color = "black";
    }

    const textDecoration = isCompleted ? "line-through" : "none";

    return {
      color,
      textDecoration,
      cursor: "pointer",
      display: "inline-block",
    };
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
    updateTodo([""]);
  };

  return (
    <>
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
    </>
  );
};
