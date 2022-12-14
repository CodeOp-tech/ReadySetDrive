var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors"); // add at the top

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var roadtripsRouter = require("./routes/roadtrips");
var stopsRouter = require("./routes/stops");
var authRouter = require("./routes/auth");
var favorite_roadtripsRouter = require("./routes/favorite_roadtrips");

var app = express();
app.use(cors()); // add after 'app' is created

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/stops", stopsRouter);
app.use("/roadtrips", roadtripsRouter);
app.use("/favorite_roadtrips", favorite_roadtripsRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
