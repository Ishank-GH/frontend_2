import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { HUBSPOT_PORTAL_ID, HUBSPOT_FORM_GUID } = process.env;

  if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_GUID) {
    console.error('Server configuration error: HubSpot environment variables are not set.');
    return res.status(500).json({ success: false, message: 'Server is not configured correctly.' });
  }
  
  const { formData } = req.body;
  if (!formData) {
    return res.status(400).json({ success: false, message: 'Invalid form data provided.' });
  }
  
  const HUBSPOT_API_URL = `https://api.hsforms.com/submissions/v3/portal/${HUBSPOT_PORTAL_ID}/forms/${HUBSPOT_FORM_GUID}`;

  const fields = [
    { name: 'firstname', value: formData.name },
    { name: 'email', value: formData.email },
    { name: 'phone', value: formData.phone },
    { name: 'business_type', value: formData.businessType },
    { name: 'message', value: formData.message }
  ].filter(field => field.value);

  const submissionData = {
    fields,
    context: {
      pageUri: req.headers.referer || 'unknown',
      pageName: 'Contact Page'
    }
  };

  try {
    await axios.post(HUBSPOT_API_URL, submissionData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.status(200).json({ success: true, message: 'Form submitted successfully.' });
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to submit to HubSpot.';
    console.error('HubSpot API Error:', error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({ success: false, message: errorMessage });
  }
}