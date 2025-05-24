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
      return res.status(400).json({ message: 'Invalid verification token' });
    }

    const subscriber = await prisma.subscriber.findUnique({
      where: { verificationToken: token }
    });

    if (!subscriber) {
      return res.status(404).json({ message: 'Invalid verification token' });
    }

    if (subscriber.isVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    await prisma.subscriber.update({
      where: { id: subscriber.id },
      data: { isVerified: true }
    });

    // Redirect to success page
    res.redirect('/verification-success');
  } catch (error) {
    console.error('Error verifying email:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error'
    });
  }
} 