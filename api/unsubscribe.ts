import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ message: 'Invalid unsubscribe token' });
    }

    const subscriber = await prisma.subscriber.findUnique({
      where: { unsubscribeToken: token }
    });

    if (!subscriber) {
      return res.status(404).json({ message: 'Invalid unsubscribe token' });
    }

    await prisma.subscriber.delete({
      where: { id: subscriber.id }
    });

    // Redirect to success page
    res.redirect('/unsubscribe-success');
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error'
    });
  }
} 