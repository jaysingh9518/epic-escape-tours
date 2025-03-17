import { NextApiRequest, NextApiResponse } from 'next';
import Booking from '@/models/Booking';
import User from '@/models/User';
import { connectDB } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { clerkId } = req.query;

  if (!clerkId) {
    return res.status(400).json({ message: 'Clerk ID is required.' });
  }

  try {
    await connectDB();

    const user = await User.findOne({ clerkId });
    const userId = user._id;
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const bookings = await Booking.find({ userId: userId })
      .populate('packageId')
      .exec();

    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch user bookings' });
  }
}
