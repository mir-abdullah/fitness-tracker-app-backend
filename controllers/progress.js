import express from "express";
import { Progress } from "../models/progress.js";

//route to get progress of a specfic workout
export const getProgress = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const progress = await Progress.findOne({
      workoutId: workoutId,
      userId: rew.userId,
    });
    res.json(progress);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

//route to update progress
export const updateProgress = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const progress = await Progress.findOneAndUpdate({
      workoutId: workoutId,
      userId: req.userId,
    });
    res.json(progress);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
