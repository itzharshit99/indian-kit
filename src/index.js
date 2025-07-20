const { parseIndianAddress } = require('./addressParser');
const { validateIndianPhone } = require('./phoneValidator');
const {validatePincode} = require('./pincodeValidator')
const {geocodeAddress} = require('./geocoder')
module.exports = {
  parseIndianAddress,
  validateIndianPhone,
  validatePincode,
  geocodeAddress
};