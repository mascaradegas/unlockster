/**
 * Brevo Email Subscription Handler
 * This is a Vercel/Netlify Function that handles email subscriptions
 *
 * Set environment variable: BREVO_API_KEY
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Validate email
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Get API key from environment
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Send to Brevo API
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        email: email,
        listIds: [parseInt(process.env.BREVO_LIST_ID || '2')], // Default list ID = 2 (All Contacts)
        updateEnabled: true // Update if contact already exists
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Brevo API error:', error);

      // Handle specific error: contact already exists
      if (response.status === 400 && error.code === 'duplicate_parameter') {
        return res.status(200).json({
          message: 'Email already subscribed',
          alreadySubscribed: true
        });
      }

      return res.status(response.status).json({
        error: error.message || 'Failed to subscribe'
      });
    }

    const data = await response.json();
    return res.status(200).json({
      message: 'Successfully subscribed',
      contactId: data.id
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({
      error: 'Failed to process subscription'
    });
  }
}
