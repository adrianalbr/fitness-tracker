const db = require("../models");

module.exports = (app) => {
  // get all workouts
  app.get("/api/workouts", (req, res) => {
    console.log(db);
    db.Workout.find()
      .then((dbWorkouts) => {
        console.log("all dbWorkouts: ", dbWorkouts);
        res.json(dbWorkouts);
      })
      .catch((err) => {
        console.log("error GET /api/workouts: ", err);
        res.json(err);
      });
  });

  //create new workout
  app.post("/api/workouts", ({ body }, res) => {
    console.log("request /api/workouts: ", body);
    db.Workout.create(body)
      .then((dbWorkout) => {
        console.log("new workout has been created: ", dbWorkout);
        res.json(dbWorkout);
      })
      .catch(({ message }) => {
        console.log("error port/api/workouts", message);
      });
  });

  //Get route for chart
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .sort({ _id: -1 })
      .limit(7)
      .then((dbWorkouts) => {
        console.log("Look over here", dbWorkouts);
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // add new exercise to Workout
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } },
      function (err, result) {
        if (err) {
          console.log("Error: ", err);
          res.send(err);
        } else {
          console.log("Updated dbWorkout: ", result);
          res.send(result);
        }
      }
    );
  });
};


