const HttpError = require("../models/http-error");
const { v4: uuid } = require("uuid");

const DUMMY_PLACES = [
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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError("Could not find a place for the provide id.", 404);
  }

  res.json({
    data: {
      place: place,
    },
  });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    throw new HttpError("Could not find a place for the provide user id.", 404);
  }

  res.json({
    data: {
      place: place,
    },
  });
};

const storePlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const storePlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(storePlace);

  res.status(201).json({
    place: storePlace,
  });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.storePlace = storePlace;
