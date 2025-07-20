function parseIndianAddress(address) {
  if (!address || typeof address !== 'string') {
    throw new Error('Invalid address: Please provide a valid string');
  }

  const pincodeRegex = /\b\d{6}\b/;
  const stateRegex = /(Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chhattisgarh|Goa|Gujarat|Haryana|Himachal Pradesh|Jharkhand|Karnataka|Kerala|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Odisha|Punjab|Rajasthan|Sikkim|Tamil Nadu|Telangana|Tripura|Uttar Pradesh|Uttarakhand|West Bengal|Andaman and Nicobar|Chandigarh|Dadra and Nagar Haveli|Daman and Diu|Delhi|Jammu and Kashmir|Ladakh|Lakshadweep|Puducherry)/i;
  const cityRegex = /\b[A-Za-z\s]+(?=,\s*(?:Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chhattisgarh|Goa|Gujarat|Haryana|Himachal Pradesh|Jharkhand|Karnataka|Kerala|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Odisha|Punjab|Rajasthan|Sikkim|Tamil Nadu|Telangana|Tripura|Uttar Pradesh|Uttarakhand|West Bengal|Andaman and Nicobar|Chandigarh|Dadra and Nagar Haveli|Daman and Diu|Delhi|Jammu and Kashmir|Ladakh|Lakshadweep|Puducherry))/i;


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

  const cityMatch = address.match(cityRegex);
  if (cityMatch) {
    result.city = cityMatch[0].trim();
  }

  return result;
}

module.exports = { parseIndianAddress };