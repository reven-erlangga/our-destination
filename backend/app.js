const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-route");
const usersRoutes = require("./routes/users-route");
const HttpError = require("./models/http-error");

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const err = new HttpError("Could not find this route", 404);

  throw err;
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }

  res.status(err.code || 500);
  res.json({
    data: null,
    message: err.message || "An unknown error occurred",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
