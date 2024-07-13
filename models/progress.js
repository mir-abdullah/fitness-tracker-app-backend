import mongoose from "mongoose";

const progressSchema =mongoose.Schema({
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref :"User"
    },
    workoutId :{
        type :mongoose.Schema.Types.ObjectId,
        ref :"Workout"
    },
    description:{
        type:String,
        required:true
    },
    doneOn :{
        type :Date,
        default:Date.now
    }


})
 const Progress = mongoose.model('Progress',progressSchema);
export default Progress
