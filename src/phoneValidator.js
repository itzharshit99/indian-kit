function validateIndianPhone(phone) {
  if (!phone || typeof phone !== 'string') {
    throw new Error('Invalid phone number: Please provide a valid string');
  }

  // Indian phone number regex: +91 or 10 digits starting with 6-9
  const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

  return phoneRegex.test(phone);
}

module.exports = { validateIndianPhone };