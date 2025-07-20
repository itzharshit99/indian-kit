const fs = require('fs').promises;
const { parse } = require('csv-parse/sync');

async function loadIndianCities() {
  try {
    const fileContent = await fs.readFile('./data/india_cities_states.csv', 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
    return records.map(record => ({
      city: record.city,
      state: record.state
    }));
  } catch (error) {
    console.error('Error loading cities:', error);
    return [];
  }
}

module.exports = { loadIndianCities };