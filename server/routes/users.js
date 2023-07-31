import express from "express";
import {
  login,
  createUser,
  saveCollege,
  getSavedColleges,
  removeCollege,
} from "../controllers/users.js";
const router = express.Router();

router.post("/register", createUser);

router.post("/login", login);

router.patch("/saveCollege", saveCollege);

router.get("/savedColleges/:userID", getSavedColleges);

router.delete("/removeCollege/:userID/:collegeID", removeCollege);

export { router as userRouter };
