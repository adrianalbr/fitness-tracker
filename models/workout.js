const opts = { toJSON: { virtuals: true } };
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
        unique: true
    },
    exercises: [
        {
            type: {
                type: String,
                unique: false
            },
            name: {
                type: String
            },
            duration: {
                type: Number
            },
            distance: {
                type: Number
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            }
        },
    ]
},opts);

WorkoutSchema.virtual('totalDuration').get(function() {
    let totalTime = 0
    for (let i = 0; i < this.exercises.length; i++){
        totalTime += this.exercises[i].duration;
    }
    return totalTime;
  });

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports= Workout;