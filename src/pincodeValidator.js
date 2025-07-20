const axios = require('axios');

async function validatePincode(pincode) {
  if (!/^\d{6}$/.test(pincode)) {
    return { valid: false, details: null };
  }
  try {
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = response.data[0];
    if (data.Status === 'Success') {
      const postOffice = data.PostOffice[0];
      return {
        valid: true,
        details: {
          pincode,
          city: postOffice.Division,
          state: postOffice.State,
          locality: postOffice.Name
        }
      };
    }
    return { valid: false, details: null };
  } catch (error) {
    return { valid: false, details: null, error: 'API request failed' };
  }
}

module.exports = { validatePincode };