import express from "express";
import { Progress } from "../models/progress.js";

const router = express.Router();

//route to get progress of a specfic workout
router.get("/:workoutId", auth, getProgress);

//route to update progress
router.put("/:workoutId", auth, updateProgress);

export default router;
