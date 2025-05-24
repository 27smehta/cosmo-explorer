import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';

const prisma = new PrismaClient();
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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

    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8081';

    const verificationLink = `${baseUrl}/verify?token=${verificationToken}`;
    const unsubscribeLink = `${baseUrl}/unsubscribe?token=${unsubscribeToken}`;

    // Send verification email
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL as string,
      subject: 'Verify your subscription to Cosmo Explorer',
      html: `
        <h1>Welcome to Cosmo Explorer!</h1>
        <p>Thank you for subscribing to our newsletter. Please verify your email address by clicking the link below:</p>
        <p><a href="${verificationLink}">Verify Email</a></p>
        <p>If you didn't subscribe to our newsletter, you can ignore this email or <a href="${unsubscribeLink}">unsubscribe here</a>.</p>
      `,
    };

    await sgMail.send(msg);

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
} 