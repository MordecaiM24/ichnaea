import express from "express";
import { createCollege, getColleges } from "../controllers/colleges.js";
const router = express.Router();

router.post("/create", createCollege);
router.get("/", getColleges);

export { router as collegeRouter };
