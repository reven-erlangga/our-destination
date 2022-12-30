const express = require("express");

const placeControllers = require("../controllers/place-controllers");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "Its work",
  });
});

router.get("/:pid", placeControllers.getPlaceById);

router.get("/user/:uid", placeControllers.getPlaceByUserId);

module.exports = router;
