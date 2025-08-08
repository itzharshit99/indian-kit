# indiaKit 🇮🇳

[![npm version](https://img.shields.io/npm/v/indiankit)](https://www.npmjs.com/package/indiankit)
[![npm downloads](https://img.shields.io/npm/dw/indiankit)](https://www.npmjs.com/package/indiankit)
[![License](https://img.shields.io/npm/l/indiankit)](LICENSE)

**indiaKit** is a Node.js utility package for **🇮🇳 Indian address parsing, 📞 phone number validation, 📮 PIN code validation**, and **🗺️ geocoding** — built to save time for developers working with Indian datasets.

---

## ✨ Features
- 📍 **Parse Indian addresses** into structured data (state, city, pincode)
- 📞 **Validate Indian phone numbers**
- 📮 **Validate Indian PIN codes** with details (city, state, locality)
- 🗺️ **Geocode addresses** into latitude & longitude
- ✅ **100% unit test coverage** with Jest (37 test cases)
- ⚡ Lightweight & easy-to-use API

---

## 📦 Installation

```bash
npm install indiankit
```
or
```bash
yarn add indiankit
```

---

## 🚀 Usage

```javascript
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

---

## 📚 API Reference

### `parseIndianAddress(address: string) => object`
Parses an Indian address string into structured fields.

**Returns:**
```json
{
  "rawAddress": "string",
  "pincode": "string",
  "state": "string",
  "city": "string"
}
```

### `validateIndianPhone(phone: string) => boolean`
Checks if a given phone number is a valid Indian number.

### `validatePincode(pincode: string) => Promise<object>`
Validates a 6-digit PIN code and returns location details using **India Post API**.

### `geocodeAddress(address: string) => Promise<object>`
Geocodes an address into **latitude**, **longitude**, and **display name** using **Nominatim**.

---

## 🧪 Tests

```bash
npm test
```
- 🧾 **37 test cases**
- ✅ **100% coverage** with Jest

---

## 🤝 Contributing

We welcome contributions!  

1. Fork the repository  
2. Create a feature branch  
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes  
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch  
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a Pull Request

---

## 📜 License
MIT License © [Harshit Jain](https://github.com/itzharshit99)

---

## 📊 Stats
- 📈 **Weekly Downloads:** 100+ (within 2 days of publishing)
- 💻 **GitHub:** [https://github.com/itzharshit99/indian-kit](https://github.com/itzharshit99/indian-kit)
- 📦 **npm:** [https://www.npmjs.com/package/indiankit](https://www.npmjs.com/package/indiankit)
