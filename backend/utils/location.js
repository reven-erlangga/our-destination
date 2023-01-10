const axios = require("axios");
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicmV2ZW5lcmxhbmdnYSIsImEiOiJjbDBleHd3czYwbm9pM2pwbzRjb2szOG1uIn0.Q9n0DBrI00Huxwmld_RwSg";

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
  );

  const data = await response.data;
  const center = data.features[0].center;
  const coordinates = {
    lat: center[0],
    lng: center[1],
  };

  return coordinates;
}

module.exports = getCoordsForAddress;
