import express from "express";
import { auth } from "../authentication/auth.js";
import Workout from "../models/workout.js";
import Progress from "../models/progress.js";

// Route to create a workout and a progress of that workout
export const createWorkout = async (req, res) => {
    try {
      const { title, description, NoOfPushups, NoOfPullups } = req.body;
      if (!title || !description || !NoOfPushups || !NoOfPullups) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
      const newWorkout = {
        title,
        description,
        NoOfPushups,
        NoOfPullups,
        userId: req.userId,
      };
      const workout = await Workout.create(newWorkout);
      await Progress.create({
        workoutId: workout._id,
        userId: req.userId,
        description: `Progress for workout ${workout._id}`,
      });
      return res.status(201).send("Workout created ");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error creating workout. Try again later.");
    }
  }

// Route to get a workout by id
export const getWorkout = async (req, res) => {
    try {
      const { id } = req.params;
      const workout = await Workout.findOne({
        _id: id,
        userId: req.userId,
      });
      if (!workout) return res.status(404).send("Workout not found");
      return res.status(200).send(workout);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error getting workout. Try again later.");
    }
  }

//route to get all workouts
export const getAllWorkouts = async (req, res) => {
    try {
      const workouts = await Workout.find({ userId: req.userId });
      if (!workouts || workouts.length === 0) return res.status(404).send("Workouts not found");
      return res.status(200).send(workouts);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error getting workouts. Try again later.");
    }
  }

//route to delete workout
export const deleteWorkout = async (req, res) => {
    try {
      const { id } = req.params;
      const workout = await Workout.findOneAndDelete({
        _id: id,
        userId: req.userId,
      });
      if (!workout) return res.status(404).send("Workout not found");
      await Progress.deleteMany({ workoutId: id, userId: req.userId });
      return res.status(200).send("Workout deleted");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error deleting workout. Try again later.");
    }
  }

//route to update workout
export const updateWorkout = async (req, res) => {
    try {
      const { title, description, NoOfPushUps, NoOfPullups } = req.body;
      if (!title || !description || !NoOfPushUps || !NoOfPullups) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
      const { id } = req.params;
      const workout = await Workout.findOneAndUpdate(
        { _id: id, userId: req.userId },
        req.body,
        { new: true }
      );
      if (!workout) return res.status(404).send("Workout not found");
      return res.status(200).send(workout);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error updating workout. Try again later.");
    }
  }