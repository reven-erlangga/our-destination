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
router.post("/store", placeControllers.storePlace);

module.exports = router;
