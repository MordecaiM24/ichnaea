import { useCookies } from "react-cookie";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

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

  const findTaskStatus = (taskToFind) => {
    const taskIdx = todo.findIndex((obj) => {
      return obj.task == taskToFind;
    });

    return todo[taskIdx]?.status;
  };

  const elementStyle = (elementName) => {
    const isCompleted = findTaskStatus(elementName);
    const status = findTaskStatus(elementName);

    let color;
    switch (status) {
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
    //Should replade with something else b/c textdecoration isn't gonna apply to final v.

    return {
      color,
      textDecoration,
      cursor: "pointer",
      display: "inline-block",
    };
  };

  const completeTask = async (task) => {
    const res = await axios.patch(
      `http://${import.meta.env.VITE_IP}:5000/api/users/completetask`,
      {
        userID: window.localStorage.getItem("userID"),
        taskToComplete: task,
      }
    );
    rerender([..._]); // Force rerender via state update or else todo list will be one update behind
    updateTodo([...todo]);
  };

  return (
    <>
      <h1>General TODO list: </h1>
      <a
        style={elementStyle("commonAppEssay")}
        onClick={() => {
          completeTask("commonAppEssay");
        }}
      >
        Finish Personal Statement
      </a>
      <br />

      <a
        style={elementStyle("actUpload")}
        onClick={() => {
          completeTask("actUpload");
        }}
      >
        Upload ACT
      </a>
      <br />

      <a
        style={elementStyle("satUpload")}
        onClick={() => {
          completeTask("satUpload");
        }}
      >
        Upload SAT
      </a>
      <br />

      <a
        style={elementStyle("extracurriculars")}
        onClick={() => {
          completeTask("extracurriculars");
        }}
      >
        Upload extracurriculars
      </a>
      <br />

      <a
        style={elementStyle("teacherRecs")}
        onClick={() => {
          completeTask("teacherRecs");
        }}
      >
        Ask for / upload teacher recommendations
      </a>
      <br />

      <a
        style={elementStyle("writingSupplement")}
        onClick={() => {
          completeTask("writingSupplement");
        }}
      >
        Finish / upload writing supplement
      </a>
    </>
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
