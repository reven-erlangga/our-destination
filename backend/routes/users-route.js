const express = require("express");

const userControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "Its work",
  });
});

router.get("/", userControllers.getUsers);
router.get("/signup", userControllers.signUp);
router.post("/login", userControllers.login);

module.exports = router;
