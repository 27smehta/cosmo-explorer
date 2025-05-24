import express, { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const router = express.Router();
const prisma = new PrismaClient();

interface SubscribeRequest extends Request {
  body: {
    email: string;
  };
}

router.post('/subscribe', async (req: SubscribeRequest, res: Response) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email }
    });

    if (existingSubscriber) {
      if (existingSubscriber.isVerified) {
        return res.status(400).json({ message: 'Email already subscribed' });
      }
      await prisma.subscriber.delete({
        where: { email }
      });
    }

    const verificationToken = crypto.randomUUID();
    const unsubscribeToken = crypto.randomUUID();

    const subscriber = await prisma.subscriber.create({
      data: {
        email,
        verificationToken,
        unsubscribeToken
      }
    });

    // For development, we'll return the verification link
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8081'}/verify?token=${verificationToken}`;
    console.log('Verification Link:', verificationLink);
    console.log('Unsubscribe Link:', `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8081'}/unsubscribe?token=${unsubscribeToken}`);

    return res.status(200).json({ 
      success: true,
      message: 'Verification email sent',
      verificationLink // For development only
    });
  } catch (error) {
    console.error('Error handling subscription:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router; 