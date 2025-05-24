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
    return res.status(400).json({ message: 'Verification token is required' });
  }

  try {
    const subscriber = await prisma.subscriber.findUnique({
      where: { verificationToken: token as string }
    });

    if (!subscriber) {
      return res.status(400).json({ message: 'Invalid verification token' });
    }

    await prisma.subscriber.update({
      where: { id: subscriber.id },
      data: {
        isVerified: true,
        verifiedAt: new Date(),
        verificationToken: null
      }
    });

    return res.redirect('/verification-success');
  } catch (error) {
    console.error('Error verifying subscription:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 