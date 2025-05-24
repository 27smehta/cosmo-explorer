import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: 'Unsubscribe token is required' });
  }

  try {
    const subscriber = await prisma.subscriber.findUnique({
      where: { unsubscribeToken: token as string }
    });

    if (!subscriber) {
      return res.status(400).json({ message: 'Invalid unsubscribe token' });
    }

    await prisma.subscriber.delete({
      where: { id: subscriber.id }
    });

    return res.redirect('/unsubscribe-success');
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 