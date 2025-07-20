const { parseIndianAddress } = require('../src/addressParser');

describe('parseIndianAddress', () => {
  test('should parse valid Indian address', () => {
    const address = '123, MG Road, Bengaluru, Karnataka 560001';
    const result = parseIndianAddress(address);
    expect(result).toEqual({
      pincode: '560001',
      state: 'Karnataka',
      city: 'Bengaluru',
      rawAddress: address
    });
  });

  test('should parse address with missing city', () => {
    const address = '123, MG Road, Karnataka 560001';
    const result = parseIndianAddress(address);
    expect(result).toEqual({
      pincode: '560001',
      state: 'Karnataka',
      city: null,
      rawAddress: address
    });
  });

  test('should parse address with different format', () => {
    const address = 'Flat 4B, Green Park, New Delhi, Delhi 110001';
    const result = parseIndianAddress(address);
    expect(result).toEqual({
      pincode: '110001',
      state: 'Delhi',
      city: 'New Delhi',
      rawAddress: address
    });
  });

  test('should throw error for invalid address', () => {
    expect(() => parseIndianAddress(123)).toThrow('Invalid address');
  });
});