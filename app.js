const express = require("express");
const cors = require("cors");
const bookRouter = require("./routes/bookRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

// Start express app
const app = express();

// reading data from body into req.body
app.use(express.json());

// cors
app.use(cors());

// Route
app.use("/api/books", bookRouter);

// only runs when it's in heroku (production)
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(globalErrorHandler);

module.exports = app;
