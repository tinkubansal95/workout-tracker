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

router.get("/api/workouts/range", async (req, res) => {
  try {
    const workoutData = await Workout.find({})
      .sort({ day: -1 })
      .limit(7)
      .lean();

    const workoutDataWithDuration = workoutData.map((workout) => {
      const totalDuration = workout.exercises.reduce((acc, cur) => {
        acc.duration = (acc.duration || 0) + cur.duration;
        return acc;
      }, {}).duration;
      return { ...workout, totalDuration };
    });
    //  console.log(workoutDataWithDuration);
    res.json(workoutDataWithDuration);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/api/workouts/:id", async (req, res) => {
  try {
    const editWorkout = await Workout.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } }
    );
    res.json(editWorkout);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/api/workouts", async ({ body }, res) => {
  try {
    const newWorkout = await Workout.create({ ...body, day: new Date() });
    res.json(newWorkout);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
module.exports = router;
