const { v4: uuid } = require("uuid");
const HttpError = require("../models/http-error");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Griffin",
    email: "max_griffin@gmail.com",
    password: "max_griffin@gmail.com",
  },
];

const getUsers = (req, res, next) => {
  const users = DUMMY_USERS;

  res.json({
    data: {
      users: users,
    },
  });
};
const signUp = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    throw new HttpError("Could not create user, email already exists.", 422);
  }

  const createUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createUser);

  res.status(201).json({
    data: {
      user: createUser,
    },
  });
};
const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credential seem be wrong",
      401
    );
  }

  res.json({
    message: "Logged in",
  });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
