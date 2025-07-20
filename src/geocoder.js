const axios = require('axios');

async function geocodeAddress(address) {
  const query = typeof address !== 'string' ? String(address) : address;

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: { q: query, format: 'json', limit: 1 }
    });
    const data = response.data[0];
    // Check if data exists and has required fields
    if (data && data.lat && data.lon && data.display_name) {
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