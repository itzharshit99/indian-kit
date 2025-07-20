const { loadIndianCities } = require('./loadCities');

const indianCities = loadIndianCities();

function parseIndianAddress(address) {
  if (!address || typeof address !== 'string') {
    throw new Error('Invalid address: Please provide a valid string');
  }

  const pincodeRegex = /\b\d{6}\b/;

  const escapeRegex = (str) => str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

  const states = [...new Set(indianCities.map(record => record.state))];
  const stateRegex = new RegExp(`\\b(${states.map(escapeRegex).join('|')})\\b`, 'i');

  const result = {
    pincode: null,
    state: null,
    city: null,
    rawAddress: address
  };

  const pincodeMatch = address.match(pincodeRegex);
  if (pincodeMatch) {
    result.pincode = pincodeMatch[0];
  }

  const stateMatch = address.match(stateRegex);
  if (stateMatch) {
    result.state = stateMatch[0];
  }

  const stateCities = result.state
    ? indianCities
        .filter(record => record.state.toLowerCase() === result.state.toLowerCase())
        .map(record => record.city)
    : indianCities.map(record => record.city);

  const addressParts = address.split(',').map(part => part.trim()).reverse();

  for (const city of stateCities) {
    for (const part of addressParts) {
      const cityRegex = new RegExp(`^${escapeRegex(city)}$`, 'i');
      if (cityRegex.test(part)) {
        if (result.state && city.toLowerCase() === result.state.toLowerCase()) {
          continue; 
        }
        result.city = city;
        break;
      }
    }
    if (result.city) break;
  }

  return result;
}

module.exports = { parseIndianAddress };