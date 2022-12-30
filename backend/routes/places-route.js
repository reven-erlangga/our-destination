const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "Its work",
  });
});
router.get("/:id", (req, res, next) => {
  const placeId = req.params.id;
  res.json({
    message: placeId,
  });
});

module.exports = router;
