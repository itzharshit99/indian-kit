const { loadIndianCities } = require('./loadCities');

let indianCities = [];

(async () => {
  indianCities = await loadIndianCities();
})();

function parseIndianAddress(address) {
  if (!address || typeof address !== 'string') {
    throw new Error('Invalid address: Please provide a valid string');
  }

  const pincodeRegex = /\b\d{6}\b/;

  const states = [...new Set(indianCities.map(record => record.state))].join('|');
  const stateRegex = new RegExp(`\\b(?:${states})\\b`, 'i');

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

  for (const { city, state } of indianCities) {
    const cityRegex = new RegExp(`\\b${city}\\b(?=.*\\b${state}\\b)`, 'i');
    const cityMatch = address.match(cityRegex);
    if (cityMatch) {
      result.city = cityMatch[0];
      break;
    }
  }

  return result;
}

module.exports = { parseIndianAddress };