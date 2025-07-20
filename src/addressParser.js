// src/addressParser.js
const { loadIndianCities } = require("./loadCities");

// Load cities at startup
const indianCities = loadIndianCities();

// Normalize case for consistent output
const normalizeCase = (str) => {
  if (!str) return str;
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

function parseIndianAddress(address) {
  if (!address || typeof address !== "string") {
    throw new Error("Invalid address: Please provide a valid string");
  }

  // Regex for pincode
  const pincodeRegex = /\b\d{6}\b/;

  // Escape special characters in regex
  const escapeRegex = (str) => str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

  // Create state regex from CSV
  const states = [...new Set(indianCities.map((record) => record.state))];
  const stateRegex = new RegExp(
    `\\b(${states.map(escapeRegex).join("|")})\\b`,
    "i"
  );

  const result = {
    pincode: null,
    state: null,
    city: null,
    rawAddress: address,
  };

  // Extract pincode
  const pincodeMatch = address.match(pincodeRegex);
  if (pincodeMatch) {
    result.pincode = pincodeMatch[0];
  }

  // Extract state
  let stateMatch = address.match(stateRegex);
  if (stateMatch) {
    result.state = normalizeCase(stateMatch[0]);
  }

  // Extract city: Check for cities in CSV
  const stateCities = result.state
    ? indianCities.filter(
        (record) => record.state.toLowerCase() === result.state.toLowerCase()
      )
    : indianCities;

  // Split address into parts to identify state position
  const addressParts = address
    .split(/[,;\s]+/)
    .map((part) => part.trim())
    .filter((part) => part);

  // Find state position (if state exists)
  let stateIndex = -1;
  if (result.state) {
    const stateRegexExact = new RegExp(
      `\\b${escapeRegex(result.state)}\\b`,
      "i"
    );
    const stateMatch = address.match(stateRegexExact);
    if (stateMatch) {
      stateIndex = address.indexOf(stateMatch[0]);
    }
  }

  // Check for cities in the full address string
  const cityMatches = [];
  for (const { city } of stateCities) {
    const cityRegex = new RegExp(`\\b${escapeRegex(city)}\\b`, "i");
    const cityMatch = address.match(cityRegex);
    if (cityMatch) {
      // Only skip city if it matches state at the same position
      if (result.state && city.toLowerCase() === result.state.toLowerCase()) {
        const cityIndex = address.toLowerCase().indexOf(city.toLowerCase());
        if (
          cityIndex === stateIndex &&
          addressParts[addressParts.length - 1].toLowerCase() ===
            result.state.toLowerCase()
        ) {
          continue;
        }
      }
      cityMatches.push({
        city: normalizeCase(city),
        index: cityMatch.index,
        length: cityMatch[0].length,
      });
    }
  }

  // Select the longest city match that appears first
  if (cityMatches.length > 0) {
    // Sort by position (earlier in string first) and then by length (longer matches first)
    cityMatches.sort((a, b) => {
      if (a.index !== b.index) return a.index - b.index;
      return b.length - a.length;
    });
    result.city = cityMatches[0].city;
  }

  return result;
}

module.exports = { parseIndianAddress };
