const express = require("express");

const placeControllers = require("../controllers/places-controllers");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "Its working.",
  });
});

router.get("/:pid", placeControllers.getPlaceById);
router.get("/user/:uid", placeControllers.getPlacesByUserId);
router.post("/store", placeControllers.storePlace);
router.patch("/:pid", placeControllers.updatePlaceById);
router.delete("/:pid", placeControllers.deletePlaceById);

module.exports = router;
