import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Package from '@/models/Package';
import { connectDB } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { packageId } = req.query;

  // Ensure `packageId` is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(packageId as string)) {
    return res.status(400).json({ message: 'Invalid Package ID format.' });
  }

  try {
    await connectDB();

    const packageDetails = await Package.findById(packageId);

    if (!packageDetails) {
      return res.status(404).json({ message: 'Package not found.' });
    }

    res.status(200).json({ packageDetails });
  } catch (error) {
    console.error('Error fetching package details:', error);
    res.status(500).json({ message: 'Failed to fetch package details' });
  }
}
