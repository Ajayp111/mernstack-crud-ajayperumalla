let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
let students = require("../Models/Student");

//Create student
router.route("/create-student").post(async (req, res, next) => {
  await students
    .create(req.body)
    .then((student) => {
      res.json({
        data: student,
        message: "Data successfully added!",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// READ Students
router.route("/").get(async (req, res, next) => {
  await students
    .find()
    .then((result) => {
      res.json({
        data: result,
        message: "All items successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
// Get Single Student
router.route("/get-student/:id").get(async (req, res, next) => {
  await students
    .findById(req.params.id)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
// Update Student
router.route("/update-student/:id").put(async (req, res, next) => {
  await students
    .findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
    .then((result) => {
      console.log(result);
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
// Delete Student
router.route("/delete-student/:id").delete(async (req, res, next) => {
  await students
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
