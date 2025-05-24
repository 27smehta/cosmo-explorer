import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // Try the primary API first
    try {
      const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544', {
        headers: {
          'User-Agent': 'CosmoExplorer/1.0',
          'Accept': 'application/json'
        },
        signal: controller.signal
      });

      if (response.ok) {
        const data = await response.json();
        clearTimeout(timeoutId);
        return res.status(200).json(data);
      }
    } catch (primaryError) {
      console.warn('Primary API failed, trying backup:', primaryError);
    }

    // If primary fails, try backup API
    const backupResponse = await fetch('https://api.n2yo.com/rest/v1/satellite/positions/25544/0/0/0/1/&apiKey=YOUR_API_KEY', {
      headers: {
        'User-Agent': 'CosmoExplorer/1.0',
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!backupResponse.ok) {
      throw new Error('Both APIs failed');
    }

    const backupData = await backupResponse.json();
    const formattedData = {
      latitude: backupData.positions[0].satlatitude,
      longitude: backupData.positions[0].satlongitude,
      altitude: backupData.positions[0].sataltitude,
      velocity: backupData.positions[0].velocity,
      visibility: 'daylight',
      timestamp: Math.floor(Date.now() / 1000)
    };

    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error fetching ISS data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch ISS data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 