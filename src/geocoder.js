const axios = require('axios');

async function geocodeAddress(address) {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: { q: address, format: 'json', limit: 1 }
    });
    const data = response.data[0];
    if (data) {
      return {
        latitude: parseFloat(data.lat),
        longitude: parseFloat(data.lon),
        displayName: data.display_name
      };
    }
    return null;
  } catch (error) {
    return { error: 'Geocoding failed' };
  }
}

module.exports = { geocodeAddress };