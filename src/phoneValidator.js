function validateIndianPhone(phone) {
  if (typeof phone !== 'string') {
    throw new Error('Invalid phone number: Please provide a valid string');
  }

  // Trim leading/trailing spaces (allowed)
  const trimmed = phone.trim();

  // Reject leading/trailing hyphens
  if (trimmed.startsWith('-') || trimmed.endsWith('-')) {
    return false;
  }

  // Remove internal spaces and hyphens
  const cleaned = trimmed.replace(/[\s-]/g, '');

  const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
  return phoneRegex.test(cleaned);
}

module.exports = { validateIndianPhone };
