const { parseIndianAddress } = require('./addressParser');
const { validateIndianPhone } = require('./phoneValidator');
const {validatePincode} = require('./pincodeValidator')
const {geocodeAddress} = require('./geocoder')
const {validatePanCard} = requiure('./panValidator.js');
module.exports = {
  parseIndianAddress,
  validateIndianPhone,
  validatePincode,
  geocodeAddress,
  validatePanCard
};