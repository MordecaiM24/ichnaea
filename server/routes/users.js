import express from "express";
import {
  login,
  createUser,
  saveCollege,
  getSavedColleges,
  removeCollege,
  getTodo,
} from "../controllers/users.js";
const router = express.Router();

router.post("/register", createUser);

router.post("/login", login);

router.patch("/saveCollege", saveCollege);

router.get("/savedColleges/:userID", getSavedColleges);

router.delete("/removeCollege/:userID/:collegeID", removeCollege);

router.get("/todo/:userID", getTodo);

export { router as userRouter };
