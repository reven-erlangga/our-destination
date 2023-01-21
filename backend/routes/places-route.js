const express = require("express");
const { check } = require("express-validator");

const placeControllers = require("../controllers/places-controllers");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "Its working",
  });
});

router.get("/:pid", placeControllers.getPlaceById);
router.get("/user/:uid", placeControllers.getPlacesByUserId);

router.use(checkAuth);

router.post(
  "/store",
  fileUpload.single("image"),
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
router.delete("/:pid", placeControllers.destroyPlace);

module.exports = router;
