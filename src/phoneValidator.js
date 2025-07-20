function validateIndianPhone(phone) {
  if (typeof phone !== 'string') {
    throw new Error('Invalid phone number: Please provide a valid string');
  }

  const trimmed = phone.trim();

  if (trimmed.startsWith('-') || trimmed.endsWith('-')) {
    return false;
  }

  const cleaned = trimmed.replace(/[\s-]/g, '');

  const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
  return phoneRegex.test(cleaned);
}

module.exports = { validateIndianPhone };
