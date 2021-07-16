const router = require("express").Router();
const { Workout } = require("../models");

router.get("/api/workouts", async (req, res) => {
  try {
    const workoutData = await Workout.find({});
    res.json(workoutData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/api/workouts/:id", async (req, res) => {
  try {
    const editWorkout = await Workout.findByIdAndUpdate(
      { _id: req.params.id },
      { exercises: req.body }
    );
    res.json(editWorkout);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/api/workouts", async ({ body }, res) => {
  try {
    const newWorkout = await Workout.create(body);
    res.json(newWorkout);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
module.exports = router;
