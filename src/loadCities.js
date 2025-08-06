const fs = require('fs');
const { parse } = require('csv-parse/sync');
const path = require('path');

function loadIndianCities() {
  try {
    const csvPath = path.join(__dirname, '../data/india_cities_states.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
    return records.map(record => ({
      city: record.city,
      state: record.state,
      pincode: record.pincode // Ensure pincode is included
    }));
  } catch (error) {
    console.error('Error loading cities:', error);
    return [];
  }
}

module.exports = { loadIndianCities };