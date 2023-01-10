const express = require("express");
const { check } = require("express-validator");

const placeControllers = require("../controllers/places-controllers");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "Its working",
  });
});

router.get("/:pid", placeControllers.getPlaceById);
router.get("/user/:uid", placeControllers.getPlacesByUserId);
router.post(
  "/store",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placeControllers.storePlace
);
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placeControllers.updatePlaceById
);
router.delete("/:pid", placeControllers.deletePlaceById);

module.exports = router;
