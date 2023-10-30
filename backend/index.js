let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
const studentRoute = require("./routes/student.routes");
// Connecting mongoDB Database
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then((x) => {
    console.log("Connected to Mongo!");
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/students", studentRoute);
// PORT
const port = 4000;

const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

app.use(function (err, res) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
