import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const [todo, setTodo] = useState([]);
  // Should I use savedColleges state or supp essay state?
  // If I connect supp essays to saved colleges in backend, then supp essays will have all information of saved colleges.
  // If I have both then I can set to only remove
  // Later add functionality to remove colleges from this page
  // Should have pop up that removing a college will remove the status of the essays
  // Likely will not need

  const [savedColleges, setSavedColleges] = useState([]);

  const [updateSaved, shouldUpdate] = useState(0);

  const [todoReq, updateTodo] = useState([]);

  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    if (userID) {
      const getSavedColleges = async () => {
        const res = await axios.get(
          `http://localhost:5000/api/users/savedColleges/${userID}`
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
          `http://localhost:5000/api/users/todo/${userID}`
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
      <button onClick={logout}>Logout</button>
      <h1>Saved Colleges:</h1>
      {savedColleges.map((college, idx) => {
        return <div key={idx}>{college.fullName}</div>;
      })}

      <TodoList todo={todo} updateTodo={updateTodo} />

      <h1>Supplemental Essays:</h1>

      <SuppEssays todo={todo} updateTodo={updateTodo} />
      {/* {savedColleges.map((college) => {
        return (
          <div>
            {Object.keys(todo.suppEssays[0])}: {college.Todo[0]}
          </div>
        );
      })} */}
    </>
  );
};

const TodoList = (props) => {
  const todo = props.todo;
  const updateTodo = props.updateTodo;

  const findTaskCompletion = (taskToFind) => {
    const taskIdx = todo.findIndex((obj) => {
      return obj.task == taskToFind;
    });

    return todo[taskIdx]?.completed;
  };

  const elementStyle = (elementName) => {
    const isCompleted = findTaskCompletion(elementName);

    const color = isCompleted ? "grey" : "black";
    const textDecoration = isCompleted ? "line-through" : "none";

    return {
      color,
      textDecoration,
      cursor: "pointer",
      display: "inline-block",
    };
  };

  const completeTask = async (task) => {
    const res = await axios.patch(
      "http://localhost:5000/api/users/completetask",
      {
        userID: window.localStorage.getItem("userID"),
        taskToComplete: task,
      }
    );

    updateTodo(["hello"]);
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

  const questionStyle = (question) => {
    const isCompleted = question.completed;

    const color = isCompleted ? "grey" : "black";
    const textDecoration = isCompleted ? "line-through" : "none";

    return { color, textDecoration, cursor: "pointer" };
  };

  const completeQuestion = async (question) => {
    const res = await axios.patch(
      "http://localhost:5000/api/users/completeQuestion",
      {
        userID: window.localStorage.getItem("userID"),
        questionToUpdate: question,
        collegeName: college.collegeName,
      }
    );

    console.log(res);
    updateTodo([""]);
  };

  return (
    <>
      <h3>{college.collegeName}</h3>
      {college.questions?.map((questionObj, idx) => {
        return (
          <p
            style={questionStyle(questionObj)}
            onClick={() => completeQuestion(questionObj.question)}
            key={idx}
          >
            {questionObj.question}
          </p>
        );
      })}
    </>
  );
};
