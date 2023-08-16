import express from "express";
import {
  login,
  createUser,
  saveCollege,
  getSavedColleges,
  removeCollege,
  getTodo,
  completeTask,
  completeQuestion,
  editNote,
  changeFlag,
  editCollegeNote,
  editTaskDate,
  editCollegeDate,
} from "../controllers/users.js";
const router = express.Router();

router.post("/register", createUser);

router.post("/login", login);

router.patch("/saveCollege", saveCollege);

router.get("/savedColleges/:userID", getSavedColleges);

router.delete("/removeCollege/:userID/:collegeID", removeCollege);

router.get("/todo/:userID", getTodo);

router.patch("/completeTask", completeTask);

router.patch("/completeQuestion", completeQuestion);

router.patch("/editNote", editNote);

router.patch("/changeFlag", changeFlag);

router.patch("/editCollegeNote", editCollegeNote);

router.patch("/editTaskDate", editTaskDate);

router.patch("/editCollegeDate", editCollegeDate);

export { router as userRouter };
