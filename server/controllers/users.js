import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import { UserModel } from "../models/User.js";
import "dotenv/config";
import { CollegeModel } from "../models/College.js";

const createUser = async (req, res) => {
  console.log("NEW USER CREATED");
  console.log(req.body);

  const newUser = await UserModel.create({
    _id: req.body.user.uid,
    firstName: req.body._tokenResponse.firstName,
    lastName: req.body._tokenResponse.lastName,
    email: req.body.user.email,
    savedColleges: [],
    todo: [
      { task: "commonAppEssay", completed: false },
      { task: "satUpload", completed: false },
      { task: "actUpload", completed: false },
      { task: "extracurriculars", completed: false },
      { task: "teacherRecs", completed: false },
      { task: "writingSupplement", completed: false },
      { task: "suppEssays", suppEssays: [] },
    ],
  });

  console.log(newUser);

  res.status(200).json(newUser);
};

const login = async (req, res) => {
  console.log("OLD USER LOGGED IN");
  res.status(200).send("received");
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const saveCollege = async (req, res, next) => {
  const collegeToSave = req.body.collegeToSave;
  const userID = req.body.userID;

  const response = await UserModel.updateOne(
    { _id: userID },
    { $addToSet: { savedColleges: collegeToSave } }
  );

  //Will only add supplemental essays to userTodo if the college isn't added yet
  if (response.modifiedCount) {
    //Get the college that im adding's supplemental essays
    const college = await CollegeModel.findOne({
      _id: collegeToSave,
    });
    const collegeName = college.fullName;
    const collegeQs = college.suppEssays;

    const user = await UserModel.findOne({ _id: userID });

    const essayIdx = user.todo.findIndex((obj) => {
      return obj.task == "suppEssays";
    });

    const questions = collegeQs.map((question) => {
      return { question: question, completed: false };
    });

    user.todo[essayIdx].suppEssays.push({ collegeName, questions });

    console.log(user.todo[7].suppEssays);
    user.markModified("todo");

    const newRes = await user.save();
    console.log(newRes.todo[7].suppEssays);

    res.status(200).json(newRes);
    return;
  }

  res.status(404).send("Did not update todo list");
};

const getTodo = async (req, res, next) => {
  const userID = req.params.userID;
  const response = await UserModel.find({ _id: userID });

  res.json(response[0].todo);
};

const removeCollege = async (req, res, next) => {
  const collegeToRemove = req.params.collegeID;
  const userID = req.params.userID;

  const response = await UserModel.updateOne(
    { _id: userID },
    { $pull: { savedColleges: collegeToRemove } }
  );

  res.status(200).json(response);
};

const getSavedColleges = async (req, res, next) => {
  const userID = req.params.userID;
  const savedColleges = await UserModel.findOne({ _id: userID })
    .select("savedColleges")
    .populate("savedColleges", ["suppEssays", "fullName"]);

  res.json(savedColleges.savedColleges); //Original json returns full user with all fields except savedColleges omitted. Using ".savedColleges" returns only the array of colleges
};

const completeTask = async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.body.userID });
  const taskToComplete = req.body.taskToComplete;

  const taskIndex = user.todo.findIndex((obj) => {
    return obj.task === taskToComplete;
  });
  const taskStatus = user.todo[taskIndex].completed;

  user.todo[taskIndex].completed = !taskStatus;
  user.markModified("todo");

  user.save();

  res.status(200).json({});
};

const completeQuestion = async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.body.userID });
  const questionCollege = req.body.collegeName;
  const question = req.body.questionToUpdate;

  const taskIndex = user.todo.findIndex((obj) => {
    return obj.task === "suppEssays";
  });

  const collegeIndex = user.todo[taskIndex].suppEssays.findIndex((college) => {
    return college.collegeName === questionCollege;
  });

  const qIndex = user.todo[taskIndex].suppEssays[
    collegeIndex
  ].questions.findIndex((q) => {
    return q.question === question;
  });

  const qStatus =
    user.todo[taskIndex].suppEssays[collegeIndex].questions[qIndex].completed;

  user.todo[taskIndex].suppEssays[collegeIndex].questions[qIndex].completed =
    !qStatus;

  user.markModified("todo");
  user.save();

  res.status(200).json({});
};

export {
  createUser,
  login,
  verifyToken,
  saveCollege,
  getSavedColleges,
  removeCollege,
  getTodo,
  completeTask,
  completeQuestion,
};
