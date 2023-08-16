import express from "express";
import {
  createCollege,
  getCollegeSearch,
  getColleges,
} from "../controllers/colleges.js";
const router = express.Router();

router.post("/create", createCollege);
router.get("/", getColleges);
router.get("/search", getCollegeSearch);

export { router as collegeRouter };
