// tests/phoneValidator.test.js
const { validateIndianPhone } = require('../src/phoneValidator');

describe('validateIndianPhone', () => {
  test('should validate correct Indian phone number', () => {
    // Basic valid numbers
    expect(validateIndianPhone('+919876543210')).toBe(true);
    expect(validateIndianPhone('9876543210')).toBe(true);
  });

  test('should validate valid phone numbers with different formats', () => {
    // With spaces
    expect(validateIndianPhone('98765 43210')).toBe(true);
    expect(validateIndianPhone('+91 98765 43210')).toBe(true);
    // With hyphens
    expect(validateIndianPhone('98765-43210')).toBe(true);
    expect(validateIndianPhone('+91-98765-43210')).toBe(true);
    // Mixed formats
    expect(validateIndianPhone('987 654 3210')).toBe(true);
    expect(validateIndianPhone('+9198765-43210')).toBe(true);
    // Different valid starting digits (6, 7, 8, 9)
    expect(validateIndianPhone('6789012345')).toBe(true);
    expect(validateIndianPhone('7890123456')).toBe(true);
    expect(validateIndianPhone('8987654321')).toBe(true);
    expect(validateIndianPhone('+919123456789')).toBe(true);
  });

  test('should reject invalid phone number formats', () => {
    // Wrong starting digit (not 6, 7, 8, 9)
    expect(validateIndianPhone('1234567890')).toBe(false);
    expect(validateIndianPhone('+911234567890')).toBe(false);
    // Incorrect length (too short or too long)
    expect(validateIndianPhone('987654321')).toBe(false); // 9 digits
    expect(validateIndianPhone('98765432101')).toBe(false); // 11 digits
    expect(validateIndianPhone('+91987654321')).toBe(false); // 11 digits with +91
    // Non-numeric characters
    expect(validateIndianPhone('98765abcde')).toBe(false);
    expect(validateIndianPhone('98765@43210')).toBe(false);
    // Invalid country code
    expect(validateIndianPhone('+921234567890')).toBe(false); // Wrong country code
    expect(validateIndianPhone('+1239876543210')).toBe(false); // Invalid country code
  });

  test('should handle edge cases for invalid inputs', () => {
    // Empty string
    expect(validateIndianPhone('')).toBe(false);
    // Whitespace only
    expect(validateIndianPhone('   ')).toBe(false);
    // Only country code
    expect(validateIndianPhone('+91')).toBe(false);
    // Only special characters
    expect(validateIndianPhone('----')).toBe(false);
    // Random string
    expect(validateIndianPhone('abcdefghij')).toBe(false);
    // Numbers with spaces but invalid
    expect(validateIndianPhone('12345 67890')).toBe(false);
  });

  test('should throw error for non-string inputs', () => {
    // Non-string inputs
    expect(() => validateIndianPhone(123)).toThrow('Invalid phone number');
    expect(() => validateIndianPhone(null)).toThrow('Invalid phone number');
    expect(() => validateIndianPhone(undefined)).toThrow('Invalid phone number');
    expect(() => validateIndianPhone({})).toThrow('Invalid phone number');
    expect(() => validateIndianPhone([])).toThrow('Invalid phone number');
  });

  test('should handle case-insensitive country code and mixed formats', () => {
    // Case-insensitive country code
    expect(validateIndianPhone('+91 9876543210')).toBe(true);
    expect(validateIndianPhone('+91-9876543210')).toBe(true);
    // Mixed spaces and hyphens
    expect(validateIndianPhone('98765 432-10')).toBe(true);
    expect(validateIndianPhone('+91 98765-432 10')).toBe(true);
    // Extra spaces
    expect(validateIndianPhone('  9876543210  ')).toBe(true);
    expect(validateIndianPhone('  +919876543210  ')).toBe(true);
  });

  test('should reject phone numbers with invalid patterns', () => {
    // Invalid patterns with correct length
    expect(validateIndianPhone('9876543210a')).toBe(false); // Extra character
    expect(validateIndianPhone('9876543210-')).toBe(false); // Trailing hyphen
    expect(validateIndianPhone('-9876543210')).toBe(false); // Leading hyphen
    expect(validateIndianPhone('9876543210 ')).toBe(true); // Trailing space
    // Invalid country code format
    expect(validateIndianPhone('91-9876543210')).toBe(false); // Missing +
    expect(validateIndianPhone('+91987654321a')).toBe(false); // Invalid character
  });
});