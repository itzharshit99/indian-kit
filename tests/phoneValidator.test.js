const { validateIndianPhone } = require('../src/phoneValidator');

describe('validateIndianPhone', () => {
  test('should validate correct Indian phone number', () => {
    expect(validateIndianPhone('+919876543210')).toBe(true);
    expect(validateIndianPhone('9876543210')).toBe(true);
  });

  test('should reject invalid phone number', () => {
    expect(validateIndianPhone('1234567890')).toBe(false);
    expect(() => validateIndianPhone(123)).toThrow('Invalid phone number');
  });
});