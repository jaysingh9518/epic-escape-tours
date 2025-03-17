import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { clerkClient } from '@clerk/express';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const { clerkId } = req.query;

    if (!clerkId) {
      return res.status(400).json({ message: 'Clerk ID is required.' });
    }

    try {
      const user = await User.findOne({ clerkId });

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      return res.status(200).json({ user });  // Wrapped in an object for clarity
    
    } catch (error) {
      console.error('MongoDB Error:', error);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }

  if (req.method === 'PUT') {
    const { clerkId } = req.query;
    const { firstName, lastName, email, username } = req.body;

    if (!clerkId) {
      return res.status(400).json({ message: 'Clerk ID is required.' });
    }

    try {
      // Update MongoDB User
      const updatedUser = await User.findOneAndUpdate(
        { clerkId },
        { firstName, lastName, email, username },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Get the current Clerk user to find the primary email ID
      const clerkUser = await clerkClient.users.getUser(clerkId as string);
      const primaryEmailId = clerkUser.emailAddresses[0]?.id;

      if (!primaryEmailId) {
        return res.status(400).json({ message: 'User does not have a primary email address.' });
      }

      // Update Clerk Profile
      await clerkClient.users.updateUser(clerkId as string, {
        firstName,
        lastName,
        username
      });

      return res.status(200).json({
        message: 'User updated successfully.',
        updatedUser,
      });
    } catch (error) {
      console.error('Update Error:', error);
      return res.status(500).json({ message: 'Failed to update user data.' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}