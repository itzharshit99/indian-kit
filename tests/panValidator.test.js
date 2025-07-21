const axios = require('axios');
const { validatePanCard } = require('../src/panValidator');

jest.mock('axios');

describe('validatePanCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should validate PAN number without image', async () => {
    const mockResponse = {
      data: {
        status: 'success',
        data: {
          verified: true,
          pan_number: 'ABCDE1234F',
          name: 'Rahul Sharma',
          dob: '1990-01-01',
          fathers_name: 'Mohan Sharma',
          address: '123, MG Road, Bengaluru, Karnataka'
        }
      }
    };
    axios.post.mockResolvedValue(mockResponse);

    const result = await validatePanCard('ABCDE1234F');
    expect(result).toEqual({
      valid: true,
      details: {
        panNumber: 'ABCDE1234F',
        name: 'Rahul Sharma',
        dob: '1990-01-01',
        fathersName: 'Mohan Sharma',
        address: '123, MG Road, Bengaluru, Karnataka'
      }
    });
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.surepass.io/api/v1/pan/verification',
      { pan_number: 'ABCDE1234F' },
      expect.any(Object)
    );
  });

  test('should validate PAN with OCR', async () => {
    const mockResponse = {
      data: {
        status: 'success',
        data: {
          verified: true,
          pan_number: 'ABCDE1234F',
          name: 'Rahul Sharma',
          dob: '1990-01-01',
          fathers_name: 'Mohan Sharma',
          address: '123, MG Road, Bengaluru, Karnataka'
        }
      }
    };
    axios.post.mockResolvedValue(mockResponse);

    const result = await validatePanCard('ABCDE1234F', './pan_card.jpg');
    expect(result).toEqual({
      valid: true,
      details: {
        panNumber: 'ABCDE1234F',
        name: 'Rahul Sharma',
        dob: '1990-01-01',
        fathersName: 'Mohan Sharma',
        address: '123, MG Road, Bengaluru, Karnataka'
      }
    });
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.surepass.io/api/v1/pan/pan-ocr',
      expect.any(Object),
      expect.any(Object)
    );
  });

  test('should handle invalid PAN format', async () => {
    const result = await validatePanCard('12345');
    expect(result).toEqual({
      valid: false,
      error: 'Invalid PAN number format'
    });
    expect(axios.post).not.toHaveBeenCalled();
  });

  test('should handle PAN number mismatch in OCR', async () => {
    const mockResponse = {
      data: {
        status: 'success',
        data: {
          verified: true,
          pan_number: 'XYZAB9876C',
          name: 'Rahul Sharma',
          dob: '1990-01-01',
          fathers_name: 'Mohan Sharma'
        }
      }
    };
    axios.post.mockResolvedValue(mockResponse);

    const result = await validatePanCard('ABCDE1234F', './pan_card.jpg');
    expect(result).toEqual({
      valid: false,
      error: 'PAN number mismatch with extracted data'
    });
  });

  test('should handle API failure', async () => {
    axios.post.mockRejectedValue(new Error('Network Error'));

    const result = await validatePanCard('ABCDE1234F');
    expect(result).toEqual({
      valid: false,
      error: 'PAN verification failed: Network Error'
    });
  });
});