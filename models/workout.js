import mongoose from "mongoose";
import { User } from "./user.js";

const workoutSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    NoOfPushups: {
      type: Number,
      required: true,
    },
    NoOfPullups: {
      type: Number,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

 const Workout = mongoose.model("Workout",workoutSchema);
 export default Workout