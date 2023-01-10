const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "Its working.",
  });
});

router.get("/", userControllers.getUsers);
router.get(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userControllers.signUp
);
router.post("/login", userControllers.login);

module.exports = router;
