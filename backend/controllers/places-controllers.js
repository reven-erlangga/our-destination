const HttpError = require("../models/http-error");
const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../utils/location");
const Place = require("../models/place");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "P2",
    description: "p1",
    imageUrl:
      "https://images.unsplash.com/photo-1583022846753-83a4eba54ac1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    address: "p1",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(err);
  }

  if (!place) {
    const err = new HttpError(
      "Could not find a place for the provide id.",
      404
    );
    return next(err);
  }

  res.json({
    data: {
      place: place.toObject({ getters: true }),
    },
  });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );

    return next(err);
  }

  if (!places || places.length === 0) {
    const err = new HttpError(
      "Could not find a places for the provide user id.",
      500
    );

    return next(err);
  }

  res.json({
    data: {
      places: places.map((place) => place.toObject({ getters: true })),
    },
  });
};

const storePlace = async (req, res, next) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;

  try {
    coordinates = await getCoordsForAddress(address);
  } catch (err) {
    return next(err);
  }

  const storePlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://img.freepik.com/free-vector/college-entrance-exam-concept-illustration_114360-10502.jpg",
    creator,
  });

  try {
    storePlace.save();
  } catch (error) {
    const err = new HttpError("Creating place failed, please try again", 500);
    return next(err);
  }

  res.status(201).json({
    place: storePlace,
  });
};

const updatePlaceById = (req, res, next) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatePlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  updatePlace.title = title;
  updatePlace.description = description;

  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({
    place: updatePlace,
  });
};

const deletePlaceById = (req, res, next) => {
  const placeId = req.params.pid;

  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find a place for that id", 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({
    message: "Deleted place",
  });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.storePlace = storePlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
