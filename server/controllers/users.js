import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import { UserModel } from "../models/User.js";
import "dotenv/config";
import { CollegeModel } from "../models/College.js";

const createUser = async (req, res) => {
  const newUser = await UserModel.create({
    _id: req.body.user.uid,
    firstName: req.body._tokenResponse.firstName,
    lastName: req.body._tokenResponse.lastName,
    userName:
      req.body._tokenResponse.firstName +
      " " +
      req.body._tokenResponse.lastName,
    email: req.body.user.email,
    savedColleges: [],
    todo: [
      { task: "commonAppEssay", status: 0 },
      { task: "satUpload", status: 0 },
      { task: "actUpload", status: 0 },
      { task: "extracurriculars", status: 0 },
      { task: "teacherRecs", status: 0 },
      { task: "writingSupplement", status: 0 },
      { task: "suppEssays", suppEssays: [] },
    ],
  });

  res.status(200).json(newUser);
};

const login = async (req, res) => {
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
      return { question: question, status: 0 };
    });

    user.todo[essayIdx].suppEssays.push({
      collegeName,
      questions,
      percentCompleted: 0,
      notes: `These are your notes for ${college.shortName}. Write about ${college.shortName}, ${college.shortName}'s supplemental questions, or whatever else comes to mind!`,
    });

    user.markModified("todo");

    const newRes = await user.save();

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
  const collegeToRemove = await CollegeModel.findOne({
    _id: req.params.collegeID,
  });
  const userID = req.params.userID;

  const response = await UserModel.updateOne(
    { _id: userID },
    { $pull: { savedColleges: req.params.collegeID } }
  );

  const user = await UserModel.findOne({
    _id: userID,
  });

  const currentEssays = user.todo[6].suppEssays;

  const newEssays = currentEssays.filter((essay) => {
    return essay.collegeName !== collegeToRemove.fullName;
  });

  user.todo[6].suppEssays = newEssays;

  user.markModified("todo");
  user.save();

  res.status(200).json(response);
};

const getSavedColleges = async (req, res, next) => {
  const userID = req.params.userID;
  const savedColleges = await UserModel.findOne({ _id: userID })
    .select("savedColleges")
    .populate("savedColleges", ["suppEssays", "fullName"]);

  return res.status(200).json(savedColleges.savedColleges); //Original json returns full user with all fields except savedColleges omitted. Using ".savedColleges" returns only the array of colleges
};

const completeTask = async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.body.userID });
  const taskToComplete = req.body.taskToComplete;

  const taskIndex = user.todo.findIndex((obj) => {
    return obj.task === taskToComplete;
  });
  const taskStatus = user.todo[taskIndex].status;

  user.todo[taskIndex].status = (taskStatus + 1) % 3; // Increments status until > 2 where it resets

  user.markModified("todo");

  await user.save();

  return res.status(200).json(user.todo);
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
    user.todo[taskIndex].suppEssays[collegeIndex].questions[qIndex].status;

  const newQStatus = (qStatus + 1) % 3;

  user.todo[taskIndex].suppEssays[collegeIndex].questions[qIndex].status =
    newQStatus;

  let percentCompleted =
    user.todo[taskIndex].suppEssays[collegeIndex].percentCompleted;

  const questionValue =
    1 / user.todo[taskIndex].suppEssays[collegeIndex].questions.length;

  if (newQStatus === 2 || newQStatus === 1) {
    percentCompleted += questionValue / 2;
    // Only need to add half because questionstatus can only go from 0 to 1 and 1 to 2, so adding full will cause too much addition
  } else if (newQStatus === 0) {
    percentCompleted -= questionValue;
  }

  user.todo[taskIndex].suppEssays[collegeIndex].percentCompleted =
    percentCompleted;

  user.markModified("todo");
  user.save();

  res
    .status(200)
    .json({ percentCompleted: Math.round(percentCompleted * 100) });
};

const editNote = async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.body.userID });
  const task = req.body.task;
  const newNote = req.body.note;

  const taskIndex = user.todo.findIndex((obj) => {
    return obj.task === task;
  });

  user.todo[taskIndex].notes = newNote;
  user.markModified("todo");

  await user.save();

  res.status(200).json(user);
};

const changeFlag = async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.body.userID });
  const task = req.body.task;
  const newFlag = req.body.flag;

  const taskIndex = user.todo.findIndex((obj) => {
    return obj.task === task;
  });

  user.todo[taskIndex].flag = newFlag;
  user.markModified("todo");

  await user.save();

  res.status(200).json(user);
};

const editCollegeNote = async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.body.userID });
  const college = req.body.college;
  const newNote = req.body.note;

  const suppEssayIdx = user.todo.findIndex((obj) => obj.task === "suppEssays");

  // const taskIndex = user.todo.findIndex((obj) => {
  //   return obj.task === task;
  // });

  const collegeIndex = user.todo[suppEssayIdx].suppEssays.findIndex(
    (obj) => obj.collegeName === college
  );

  user.todo[suppEssayIdx].suppEssays[collegeIndex].notes = newNote;

  user.markModified("todo");

  await user.save();

  res.status(200).json(user);
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
  editNote,
  changeFlag,
  editCollegeNote,
};
