const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Griffin",
    email: "max_griffin@gmail.com",
    password: "max_griffin@gmail.com",
  },
];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    const err = new HttpError("Failed get users.", 500);

    return next(err);
  }

  res.json({
    data: {
      users: users.map((user) => user.toObject({ getters: true })),
    },
  });
};
const signUp = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new HttpError(
      "Invalid inputs passed, please check your data",
      422
    );

    return next(err);
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new HttpError(
      "Signing up failed, please try again later.",
      500
    );

    return next(err);
  }

  if (existingUser) {
    const err = new HttpError("User existing already.", 422);

    return next(err);
  }

  const createdUser = new User({
    name,
    email,
    image: "",
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    const err = new HttpError("Signing up failed, please try again.", 500);

    return next(err);
  }

  res.status(201).json({
    data: {
      user: createdUser.toObject({ getters: true }),
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new HttpError(
      "Logging in failed, please try again later.",
      500
    );

    return next(err);
  }

  if (!existingUser || existingUser.password != password) {
    const err = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );

    return next(err);
  }

  res.json({
    message: "Logged in",
  });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
