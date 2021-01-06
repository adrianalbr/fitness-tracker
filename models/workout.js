const mongoose = require("mongoose");
const Schema = mongoose.Schema;

Const workoutSchema = new Schema({
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
});

const workout = mongoose.model("workout", workoutSchema);
module.export = workout;