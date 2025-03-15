import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { clerkId } = req.query;

  // Check if the clerkId is provided or logged in
  if (!clerkId) {
    return res.status(400).json({ message: 'Clerk ID is required.' });
  }

  try {
    const user = await User.find({ clerkId });
    return res.status(200).json(user);
  } catch (error) {
    console.error('MongoDB Error:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}
