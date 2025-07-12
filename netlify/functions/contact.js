import axios from 'axios';

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }

  const { HUBSPOT_PORTAL_ID, HUBSPOT_FORM_GUID } = process.env;
  if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_GUID) {
    return { statusCode: 500, body: JSON.stringify({ success: false, message: 'Server config error.' }) };
  }
  
  // Parse event.body because it's a string.
  const { formData } = JSON.parse(event.body);
  if (!formData) {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Form data missing.' }) };
  }
  
  const HUBSPOT_API_URL = `https://api.hsforms.com/submissions/v3/portal/${HUBSPOT_PORTAL_ID}/forms/${HUBSPOT_FORM_GUID}`;

  const fields = [
    { name: 'firstname', value: formData.name },
    { name: 'email', value: formData.email },
    { name: 'phone', value: formData.phone },
    { name: 'business_type', value: formData.businessType },
    { name: 'message', value: formData.message }
  ].filter(field => field.value);

  const submissionData = { fields, context: { pageUri: event.headers.referer } };

  try {
    await axios.post(HUBSPOT_API_URL, submissionData);
    // On success, return a 200 status code.
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Submission successful!' })
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to submit to HubSpot.';
    console.error('HubSpot API Error:', error.response?.data || error.message);
    // On failure, return the error status code.
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ success: false, message: errorMessage })
    };
  }
};