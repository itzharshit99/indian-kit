const axios = require('axios');
const { geocodeAddress } = require('../src/geocoder');

jest.mock('axios');

describe('geocodeAddress', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('should geocode valid Indian address and return coordinates', async () => {
    // Mock API response for a valid address
    const mockResponse = {
      data: [{
        lat: '28.6138954',
        lon: '77.2090057',
        display_name: 'New Delhi, Delhi, India'
      }]
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await geocodeAddress('New Delhi, Delhi, India');
    expect(result).toEqual({
      latitude: 28.6138954,
      longitude: 77.2090057,
      displayName: 'New Delhi, Delhi, India'
    });
    expect(axios.get).toHaveBeenCalledWith('https://nominatim.openstreetmap.org/search', {
      params: { q: 'New Delhi, Delhi, India', format: 'json', limit: 1 }
    });
  });

  test('should return null for non-existent or invalid address', async () => {
    // Mock API response with empty data for invalid address
    const mockResponse = { data: [] };
    axios.get.mockResolvedValue(mockResponse);

    const result = await geocodeAddress('Invalid Address, Nowhere');
    expect(result).toBeNull();
    expect(axios.get).toHaveBeenCalledWith('https://nominatim.openstreetmap.org/search', {
      params: { q: 'Invalid Address, Nowhere', format: 'json', limit: 1 }
    });
  });

  test('should handle API request failure', async () => {
    // Mock API error
    axios.get.mockRejectedValue(new Error('Network Error'));

    const result = await geocodeAddress('Mumbai, Maharashtra, India');
    expect(result).toEqual({ error: 'Geocoding failed' });
    expect(axios.get).toHaveBeenCalledWith('https://nominatim.openstreetmap.org/search', {
      params: { q: 'Mumbai, Maharashtra, India', format: 'json', limit: 1 }
    });
  });

  test('should handle empty address input', async () => {
    // Mock API response for empty input
    const mockResponse = { data: [] };
    axios.get.mockResolvedValue(mockResponse);

    const result = await geocodeAddress('');
    expect(result).toBeNull();
    expect(axios.get).toHaveBeenCalledWith('https://nominatim.openstreetmap.org/search', {
      params: { q: '', format: 'json', limit: 1 }
    });
  });

  test('should handle non-string address input', async () => {
    // Mock API response for non-string input
    const mockResponse = { data: [] };
    axios.get.mockResolvedValue(mockResponse);

    const result = await geocodeAddress(123456);
    expect(result).toBeNull();
    expect(axios.get).toHaveBeenCalledWith('https://nominatim.openstreetmap.org/search', {
      params: { q: '123456', format: 'json', limit: 1 }
    });
  });

  test('should geocode address with PIN code', async () => {
    // Mock API response for address with PIN code
    const mockResponse = {
      data: [{
        lat: '19.0759837',
        lon: '72.8776559',
        display_name: 'Mumbai, Maharashtra, 400001, India'
      }]
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await geocodeAddress('Mumbai, Maharashtra, 400001');
    expect(result).toEqual({
      latitude: 19.0759837,
      longitude: 72.8776559,
      displayName: 'Mumbai, Maharashtra, 400001, India'
    });
    expect(axios.get).toHaveBeenCalledWith('https://nominatim.openstreetmap.org/search', {
      params: { q: 'Mumbai, Maharashtra, 400001', format: 'json', limit: 1 }
    });
  });

  test('should handle partial address', async () => {
    // Mock API response for partial address
    const mockResponse = {
      data: [{
        lat: '13.0826802',
        lon: '80.2707184',
        display_name: 'Chennai, Tamil Nadu, India'
      }]
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await geocodeAddress('Chennai');
    expect(result).toEqual({
      latitude: 13.0826802,
      longitude: 80.2707184,
      displayName: 'Chennai, Tamil Nadu, India'
    });
    expect(axios.get).toHaveBeenCalledWith('https://nominatim.openstreetmap.org/search', {
      params: { q: 'Chennai', format: 'json', limit: 1 }
    });
  });

  test('should handle API response with unexpected data format', async () => {
    // Mock API response with invalid data format
    const mockResponse = { data: [{}] }; // No lat, lon, or display_name
    axios.get.mockResolvedValue(mockResponse);

    const result = await geocodeAddress('Bengaluru, Karnataka');
    expect(result).toBeNull();
    expect(axios.get).toHaveBeenCalledWith('https://nominatim.openstreetmap.org/search', {
      params: { q: 'Bengaluru, Karnataka', format: 'json', limit: 1 }
    });
  });
});