// --- START OF FILE /netlify/functions/contact.js (HARDENED & CRASH-PROOF) ---
import axios from 'axios';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }

  // --- Check for Environment Variables ---
  const { HUBSPOT_PORTAL_ID, HUBSPOT_FORM_GUID } = process.env;
  if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_GUID) {
    console.error("Server configuration error: HubSpot environment variables are not set.");
    return { statusCode: 500, body: JSON.stringify({ success: false, message: 'Server configuration error.' }) };
  }
  
  // --- Safely Parse the Request Body ---
  let formData;
  try {
    // This prevents a crash if the body is empty or malformed.
    const parsedBody = JSON.parse(event.body);
    formData = parsedBody.formData;
    if (!formData) throw new Error("formData key is missing.");
  } catch (error) {
    console.error("Failed to parse request body:", error);
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Bad request: Invalid form data.' }) };
  }
  
  // --- Prepare HubSpot Submission ---
  const HUBSPOT_API_URL = `https://api.hsforms.com/submissions/v3/portal/${HUBSPOT_PORTAL_ID}/forms/${HUBSPOT_FORM_GUID}`;

  const fields = [
    { name: 'firstname', value: formData.name },
    { name: 'email', value: formData.email },
    { name: 'phone', value: formData.phone },
    { name: 'business_type', value: formData.businessType },
    { name: 'message', value: formData.message }
  ].filter(field => field.value);

  const submissionData = { fields, context: { pageUri: event.headers.referer } };

  // --- Safely Make the Request to HubSpot ---
  try {
    await axios.post(HUBSPOT_API_URL, submissionData);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Submission successful!' })
    };
  } catch (error) {
    // This prevents a crash if axios fails in an unexpected way.
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.message || 'Failed to submit to HubSpot.';
    console.error(`HubSpot API Error (${statusCode}):`, errorMessage);
    return {
      statusCode: statusCode,
      body: JSON.stringify({ success: false, message: errorMessage })
    };
  }
};