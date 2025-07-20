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
test('should handle ambiguous city/state names', () => {
  const address = '123, Green Park, Delhi, Delhi 110001';
  const result = parseIndianAddress(address);
  expect(result).toEqual({
    pincode: '110001',
    state: 'Delhi',
    city: 'Delhi',
    rawAddress: address
  });
});

// New Test: Address with missing pincode
test('should parse address with missing pincode', () => {
  const address = '123, MG Road, Mumbai, Maharashtra';
  const result = parseIndianAddress(address);
  expect(result).toEqual({
    pincode: null,
    state: 'Maharashtra',
    city: 'Mumbai',
    rawAddress: address
  });
});

// New Test: Address with missing state
test('should parse address with missing state', () => {
  const address = '123, MG Road, Chennai 600001';
  const result = parseIndianAddress(address);
  expect(result).toEqual({
    pincode: '600001',
    state: null,
    city: 'Chennai',
    rawAddress: address
  });
});

// New Test: Address with only city and pincode
test('should parse address with only city and pincode', () => {
  const address = 'Kolkata 700001';
  const result = parseIndianAddress(address);
  expect(result).toEqual({
    pincode: '700001',
    state: null,
    city: 'Kolkata',
    rawAddress: address
  });
});

// New Test: Address with invalid pincode
test('should handle invalid pincode', () => {
  const address = '123, MG Road, Bengaluru, Karnataka 12345'; // 5-digit pincode
  const result = parseIndianAddress(address);
  expect(result).toEqual({
    pincode: null,
    state: 'Karnataka',
    city: 'Bengaluru',
    rawAddress: address
  });
});

// New Test: Address with extra commas or spaces
test('should handle address with extra commas or spaces', () => {
  const address = '  Flat 4B, , Green Park,, Pune,  Maharashtra , 411001 ';
  const result = parseIndianAddress(address);
  expect(result).toEqual({
    pincode: '411001',
    state: 'Maharashtra',
    city: 'Pune',
    rawAddress: address
  });
});

// New Test: Address with city not in CSV
test('should return null for city not in CSV', () => {
  const address = '123, Unknown City, Tamil Nadu 600001';
  const result = parseIndianAddress(address);
  expect(result).toEqual({
    pincode: '600001',
    state: 'Tamil Nadu',
    city: null,
    rawAddress: address
  });
});

// New Test: Case-insensitive city/state matching
test('should handle case-insensitive city/state names', () => {
  const address = '123, MG Road, bengaluru, karnataka 560001';
  const result = parseIndianAddress(address);
  expect(result).toEqual({
    pincode: '560001',
    state: 'Karnataka',
    city: 'Bengaluru',
    rawAddress: address
  });
});

// New Test: Address with only pincode
test('should parse address with only pincode', () => {
  const address = '400001';
  const result = parseIndianAddress(address);
  expect(result).toEqual({
    pincode: '400001',
    state: null,
    city: null,
    rawAddress: address
  });
});

// New Test: Address with multiple cities in CSV for same state
test('should pick correct city when multiple cities exist for state', () => {
  const address = '123, MG Road, Ahmedabad, Gujarat 380001';
  const result = parseIndianAddress(address);
  expect(result).toEqual({
    pincode: '380001',
    state: 'Gujarat',
    city: 'Ahmedabad',
    rawAddress: address
  });
});