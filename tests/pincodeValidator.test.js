const axios = require('axios');
const { validatePincode } = require('../src/pincodeValidator');

// Mock axios to avoid real API calls during tests
jest.mock('axios');

describe('validatePincode', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('should validate correct PIN code and return details', async () => {
    // Mock API response for a valid PIN code
    const mockResponse = {
      data: [{
        Status: 'Success',
        PostOffice: [{
          Name: 'Connaught Place',
          Division: 'New Delhi',
          State: 'Delhi'
        }]
      }]
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await validatePincode('110001');
    expect(result).toEqual({
      valid: true,
      details: {
        pincode: '110001',
        city: 'New Delhi',
        state: 'Delhi',
        locality: 'Connaught Place'
      }
    });
    expect(axios.get).toHaveBeenCalledWith('https://api.postalpincode.in/pincode/110001');
  });

  test('should return false for invalid PIN code format', async () => {
    const result = await validatePincode('12345'); // Too short
    expect(result).toEqual({
      valid: false,
      details: null
    });
    expect(axios.get).not.toHaveBeenCalled(); // API should not be called for invalid format
  });

  test('should return false for non-existent PIN code', async () => {
    // Mock API response for non-existent PIN code
    const mockResponse = {
      data: [{ Status: 'Error', PostOffice: null }]
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await validatePincode('999999');
    expect(result).toEqual({
      valid: false,
      details: null
    });
    expect(axios.get).toHaveBeenCalledWith('https://api.postalpincode.in/pincode/999999');
  });

  test('should handle API request failure', async () => {
    // Mock API error
    axios.get.mockRejectedValue(new Error('Network Error'));

    const result = await validatePincode('110001');
    expect(result).toEqual({
      valid: false,
      details: null,
      error: 'API request failed'
    });
    expect(axios.get).toHaveBeenCalledWith('https://api.postalpincode.in/pincode/110001');
  });

  test('should reject non-string PIN code inputs', async () => {
    const result = await validatePincode(123456); // Number instead of string
    expect(result).toEqual({
      valid: false,
      details: null
    });
    expect(axios.get).not.toHaveBeenCalled();
  });

  test('should reject empty or malformed PIN code inputs', async () => {
    const results = await Promise.all([
      validatePincode(''), // Empty string
      validatePincode('abc123'), // Non-numeric
      validatePincode('12345a'), // Mixed characters
      validatePincode('1234567') // Too long
    ]);

    results.forEach(result => {
      expect(result).toEqual({
        valid: false,
        details: null
      });
    });
    expect(axios.get).not.toHaveBeenCalled();
  });

  test('should handle multiple valid PIN codes', async () => {
    // Mock API response for another valid PIN code
    const mockResponse = {
      data: [{
        Status: 'Success',
        PostOffice: [{
          Name: 'Bandra',
          Division: 'Mumbai',
          State: 'Maharashtra'
        }]
      }]
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await validatePincode('400050');
    expect(result).toEqual({
      valid: true,
      details: {
        pincode: '400050',
        city: 'Mumbai',
        state: 'Maharashtra',
        locality: 'Bandra'
      }
    });
    expect(axios.get).toHaveBeenCalledWith('https://api.postalpincode.in/pincode/400050');
  });

  test('should handle API response with no PostOffice data', async () => {
    // Mock API response with empty PostOffice
    const mockResponse = {
      data: [{ Status: 'Success', PostOffice: [] }]
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await validatePincode('110001');
    expect(result).toEqual({
      valid: false,
      details: null
    });
    expect(axios.get).toHaveBeenCalledWith('https://api.postalpincode.in/pincode/110001');
  });
});