import express from "express";
import { createCollege } from "../controllers/colleges.js";
const router = express.Router();

router.post("/create", createCollege);

export { router as collegeRouter };
