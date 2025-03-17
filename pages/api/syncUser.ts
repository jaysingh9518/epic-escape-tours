import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method !== 'POST' && req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { clerkId, email, firstName, lastName, username, imageUrl } = req.body;

  if (!clerkId || !email) {
    return res.status(400).json({ message: 'Clerk ID and email are required.' });
  }

  try {
    const existingUser = await User.findOne({ clerkId });

    if (existingUser) {
      // Update only if the `username` is provided and different
      if (username?.trim() && existingUser.username !== username) {
        await User.findOneAndUpdate({ clerkId }, { username });
      }

      // Update other fields if provided and different
      if (imageUrl?.trim() && existingUser.imageUrl !== imageUrl) {
        await User.findOneAndUpdate({ clerkId }, { imageUrl });
      }

      if (firstName?.trim() && existingUser.firstName !== firstName) {
        await User.findOneAndUpdate({ clerkId }, { firstName });
      }

      if (lastName?.trim() && existingUser.lastName !== lastName) {
        await User.findOneAndUpdate({ clerkId }, { lastName });
      }

      return res.status(200).json({ message: 'User updated successfully in MongoDB.' });
    }

    const newUser = new User({
      clerkId,
      firstName,
      lastName,
      email,
      username,
      imageUrl,
      active: true,
      admin: false,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User successfully added to MongoDB!' });
  } catch (error) {
    console.error('MongoDB Error:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}
