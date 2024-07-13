import express from "express";
import { auth } from "../authentication/auth.js";
import {updateWorkout,createWorkout ,getAllWorkouts,getWorkout,deleteWorkout} from '../controllers/workout.js'

const router = express.Router();

// Route to create a workout and a progress of that workout

router.post("/", auth, createWorkout);

// Route to get a workout by id

router.get("/:id", auth, getWorkout);

// Route to get all workouts of a user

router.get("/", auth,getAllWorkouts );

// Route to delete a workout

router.delete("/:id", auth, deleteWorkout);

// Route to update workout
router.patch("/:id", auth, updateWorkout);

export default router;
