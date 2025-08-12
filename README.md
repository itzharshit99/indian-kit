# indiaKit
A Node.js package for Indian address parsing, phone validation, PIN code validation, and geocoding.

## Installation
```bash
npm install indiankit
```

## usage
```bash
const { parseIndianAddress, validateIndianPhone, validatePincode, geocodeAddress } = require('indiankit');

// 1. Parse an Indian address
const address = 'Flat 4B, Green Park, New Delhi, Delhi 110001';
console.log(parseIndianAddress(address));
// Output:
// {
//   rawAddress: 'Flat 4B, Green Park, New Delhi, Delhi 110001',
//   pincode: '110001',
//   state: 'Delhi',
//   city: 'New Delhi'
// }

// 2. Validate an Indian phone number
console.log(validateIndianPhone('+919876543210')); // true
console.log(validateIndianPhone('123456789'));    // false

// 3. Validate a PIN code
validatePincode('110001').then(result => {
  console.log(result);
  // {
  //   valid: true,
  //   details: {
  //     pincode: '110001',
  //     city: 'New Delhi Central',
  //     state: 'Delhi',
  //     locality: 'Baroda House'
  //   }
  // }
});

// 4. Geocode an address
geocodeAddress('Mumbai, Maharashtra, India').then(result => {
  console.log(result);
  // {
  //   latitude: 19.054999,
  //   longitude: 72.8692035,
  //   displayName: 'Mumbai Suburban, Maharashtra, India'
  // }
});
```