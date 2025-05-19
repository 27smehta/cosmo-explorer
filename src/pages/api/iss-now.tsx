import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    const data = await response.json();
    
    // Transform the data to match the expected format
    const transformedData = {
      message: 'success',
      iss_position: {
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString()
      },
      timestamp: Math.floor(Date.now() / 1000),
      altitude: data.altitude,
      velocity: data.velocity
    };
    
    res.status(200).json(transformedData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ISS location.' });
  }
}
