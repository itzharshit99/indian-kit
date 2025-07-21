const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function validatePanCard(panNumber, imagePath = null) {
  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
    return { valid: false, error: 'Invalid PAN number format' };
  }

  try {
    if (imagePath) {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(imagePath));
      formData.append('pan_number', panNumber);

      const response = await axios.post(
        'https://api.surepass.io/api/v1/pan/pan-ocr',
        formData,
        {
          headers: {
            'Authorization': `Bearer YOUR_SUREPASS_API_KEY`, 
            ...formData.getHeaders()
          }
        }
      );

      const data = response.data;
      if (data.status === 'success' && data.data.verified) {
        if (data.data.pan_number === panNumber) {
          return {
            valid: true,
            details: {
              panNumber: data.data.pan_number,
              name: data.data.name,
              dob: data.data.dob,
              fathersName: data.data.fathers_name,
              address: data.data.address
            }
          };
        }
        return { valid: false, error: 'PAN number mismatch with extracted data' };
      }
      return { valid: false, error: data.message || 'OCR verification failed' };
    }

    const response = await axios.post(
      'https://api.surepass.io/api/v1/pan/verification',
      { pan_number: panNumber },
      {
        headers: {
          'Authorization': `Bearer YOUR_SUREPASS_API_KEY`,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = response.data;
    if (data.status === 'success' && data.data.verified) {
      return {
        valid: true,
        details: {
          panNumber: data.data.pan_number,
          name: data.data.name,
          dob: data.data.dob,
          fathersName: data.data.fathers_name,
          address: data.data.address
        }
      };
    }
    return { valid: false, error: data.message || 'PAN verification failed' };
  } catch (error) {
    return { valid: false, error: 'PAN verification failed: ' + error.message };
  }
}

module.exports = { validatePanCard };