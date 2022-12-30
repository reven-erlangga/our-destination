const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-route");

const app = express();
const port = 5000;

app.use("/api/places", placesRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
