import axios from 'axios';

export default async function handler(req, res) {
  // Ensure the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Extract formData from the request body sent by React app
  // The React app sends { formData: { ... } }
  const { formData } = req.body;

  // --- HubSpot API Configuration ---
  const HUBSPOT_PORTAL_ID = '243272332'; 
  const HUBSPOT_FORM_GUID = '1ff828bf-c049-41e3-b223-529fe3d6e968'; 
  const HUBSPOT_API_URL = `https://api.hsforms.com/submissions/v3/portal/${HUBSPOT_PORTAL_ID}/forms/${HUBSPOT_FORM_GUID}`;

  // Map form data to HubSpot's expected internal property names
  const fields = [
    { name: 'firstname', value: formData.name },
    { name: 'email', value: formData.email },
    { name: 'phone', value: formData.phone },
    { name: 'business_type', value: formData.businessType }, // This matches HubSpot's internal name
    { name: 'message', value: formData.message }
  ];

  const submissionData = {
    fields: fields,
    context: {
      // Pass client-side context (like page URL) to HubSpot for better tracking
      // req.headers.referer is a common way to get the originating URL
      pageUri: req.headers.referer || 'https://lumens-agency.vercel.app/contact', 
      pageName: 'Contact Page (External Form)'
    }
  };

  try {
    // Make the server-to-server request to HubSpot's API using Axios
    const hubspotResponse = await axios.post(HUBSPOT_API_URL, submissionData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check for successful response from HubSpot (2xx status codes)
    if (hubspotResponse.status >= 200 && hubspotResponse.status < 300) {
      // Send success response back to your React app
      return res.status(200).json({ success: true, hubspotResponse: hubspotResponse.data });
    } else {
      // Handle non-2xx responses from HubSpot API
      console.error('Error from HubSpot:', hubspotResponse.status, hubspotResponse.data);
      return res.status(hubspotResponse.status).json({ success: false, message: 'Failed to submit to HubSpot', details: hubspotResponse.data });
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Proxy caught an error from HubSpot:', error.response.status, error.response.data);
      return res.status(error.response.status).json({ success: false, message: 'Failed to submit to HubSpot', details: error.response.data });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Proxy caught a network error:', error.request);
      return res.status(500).json({ success: false, message: 'Network error communicating with HubSpot' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Proxy caught an unexpected error:', error.message);
      return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
  }
}