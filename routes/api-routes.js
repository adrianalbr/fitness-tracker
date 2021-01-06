const db = require("../models");
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

module.exports = (app) => {

    // get all workouts
    app.get("/api/workouts", (req,res) => {
        db.Workout.find()
            .then(dbWorkouts => {
                console.log("all dbWorkouts: ", dbWorkouts);
                res.json(dbWorkouts);
            })
            .catch(err => {
                console.log("error GET /api/workouts: ", err);
                res.json(err);
            });



    })
}