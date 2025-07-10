const axios = require('axios');
const HttpError = require('../models/http-error');

async function getCoordsForAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'PostPlaceApp patilswarali0@gmail.com' 
      // 'User-Agent': 'Node.js Server'
    }
  });

  const data = response.data;

  if (!data || data.length === 0) {
    throw new HttpError('Could not find location for the specified address.', 422);
  }

  const coordinates = {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon)
  };

  return coordinates;
}

module.exports = getCoordsForAddress;
