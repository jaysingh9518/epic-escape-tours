import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import User from '@/models/User';
import Package from '@/models/Package';
import Destination from '@/models/Destination';
import Blog from '@/models/Blog';
import Testimonial from '@/models/Testimonial';
import Booking from '@/models/Booking';
import Contact from '@/models/Contact';

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URI as string || 'mongodb://localhost:27017/your-database-name');
  };

  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      await connectDB();

    // Clear existing data
    // await User.deleteMany({});
    await Package.deleteMany({});
    await Destination.deleteMany({});
    await Blog.deleteMany({});
    await Testimonial.deleteMany({});
    await Booking.deleteMany({});
    await Contact.deleteMany({});

    await User.insertMany([
        {
        clerkId: "user1",
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        imageUrl: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2",
        phone: "1234567890",
        email: "5g9bD@example.com",
        role: "admin",
        active: true,
        },
        {
        clerkId: "user2",
        firstName: "Jane",
        lastName: "Smith",
        username: "janesmith",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        phone: "9876543210",
        email: "2W2dN@example.com",
        role: "user",
        active: true,
        },
    ]);

  
    const [baliPackage, himalayanPackage, italianPackage] = await Package.insertMany([
        {
        title: "Bali Paradise Beach Resort",
        description: "Experience the ultimate tropical getaway in beautiful Bali...",
        location: "Bali, Indonesia",
        duration: "5 Days, 4 Nights",
        price: 65000,
        discountPrice: 52000,
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
        rating: 4.8,
        featured: true
        },
        {
        title: "Himalayan Adventure Trek",
        description: "Embark on a thrilling journey through the majestic Himalayas...",
        location: "Nepal",
        duration: "7 Days, 6 Nights",
        price: 48000,
        imageUrl: "https://images.unsplash.com/photo-1444525873963-75d329ef9e1b",
        rating: 4.7,
        featured: true
        },
        {
        title: "Italian Countryside Tour",
        description: "Discover the charm of rural Italy on this idyllic countryside tour...",
        location: "Tuscany, Italy",
        duration: "10 Days, 9 Nights",
        price: 85000,
        imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
        rating: 4.9,
        featured: true
        }
    ]);

    await Destination.insertMany([
        { name: 'Santorini', country: 'Greece', imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9', popular: true },
        { name: 'Jaipur', country: 'India', imageUrl: 'https://images.unsplash.com/photo-1598346762291-aee88549193f', popular: true },
        { name: 'Kyoto', country: 'Japan', imageUrl: 'https://images.unsplash.com/photo-1582470713749-c751dcbec97e', popular: true },
        { name: 'Bora Bora', country: 'French Polynesia', imageUrl: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd', popular: true }
    ]);

    const adminUser = await User.findOne({ username: 'jaysingh9518' });
        if (!adminUser) throw new Error("Admin user not found.");

    const adminUserId = adminUser._id;


    await Blog.insertMany([
        {
            title: "10 Hidden Beaches in Thailand You Must Visit",
            content: "<h2>Discovering Thailand's Secret Shores</h2>...",
            summary: "Discover secluded paradises away from tourist crowds...",
            imageUrl: "https://images.unsplash.com/photo-1527631746610-bca00a040d60",
            authorId: adminUserId,
            readTime: 5
        },
        {
            title: "A Food Lover's Guide to South Indian Cuisine",
            content: "<h2>Exploring the Rich Flavors of South India</h2>...",
            summary: "Explore the rich flavors, aromatic spices, and cultural significance behind South India's most beloved dishes...",
            imageUrl: "https://images.unsplash.com/photo-1517401613994-e7b2a4ab3697",
            authorId: adminUserId,
            readTime: 7
        },
        {
            title: "Ultimate Packing Guide for Long-Term Travel",
            content: "<h2>Packing Efficiently for Extended Adventures</h2>...",
            summary: "Master the art of packing efficiently for extended adventures...",
            imageUrl: "https://images.unsplash.com/photo-1598888596170-573df3c5fe68",
            authorId: adminUserId,
            readTime: 6
        }
    ]);

    await Testimonial.insertMany([
        {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 5,
        review: "Absolutely loved our trip to Bali! The resort was amazing, and the staff was incredibly welcoming. Can't wait to book again!",
        packageName: "Bali Paradise Beach Resort"
        },
        {
        name: "David Thompson",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        rating: 4.5,
        review: "The Himalayan trek was challenging yet rewarding. The guides were professional, and the views were breathtaking!",
        packageName: "Himalayan Adventure Trek"
        },
        {
        name: "Emily Roberts",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        rating: 4.8,
        review: "Our Italian countryside tour was unforgettable. The food, wine, and beautiful villas made this trip exceptional!",
        packageName: "Italian Countryside Tour"
        }
    ]);

    // Sample Bookings
    await Booking.insertMany([
      {
        userId: adminUserId,
        packageId: baliPackage._id,
        startDate: new Date(),
        numberOfTravelers: 2,
        totalAmount: 104000,
        paymentStatus: "completed",
        paymentId: "PAY123456"
      },
      {
        userId: adminUserId,
        packageId: himalayanPackage._id,
        startDate: new Date(),
        numberOfTravelers: 1,
        totalAmount: 48000,
        paymentStatus: "pending"
      },
      {
        userId: adminUserId,
        packageId: italianPackage._id,
        startDate: new Date(),
        numberOfTravelers: 3,
        totalAmount: 72000,
        paymentStatus: "completed",
        paymentId: "PAY789012"
      }
    ]);

    await Contact.insertMany([
      {
        name: "John Doe",
        email: "2E2Qa@example.com",
        subject: "Package Inquiry",
        message: "I would like to book a package for my family.",
        read: false
      },
      {
        name: "Jane Smith",
        email: "l0K0K@example.com",
        subject: "Payment Confirmation",
        message: "I've completed my payment for the package.",
        read: false
      },
      {
        name: "Michael Johnson",
        email: "7lM4R@example.com",
        subject: "Cancellation Request",
        message: "I need to cancel my booking.",
        read: false
      }
    ]);
  
    console.log('Database seeded successfully!');
    mongoose.disconnect();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Seed Data Status</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .success { color: green; }
          .error { color: red; }
        </style>
      </head>
      <body>
        <h1 class="success">Database seeded successfully!</h1>
        <p>Your sample data has been added to the database.</p>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error seeding database:', error);
    res.setHeader('Content-Type', 'text/html');
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Seed Data Status</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .error { color: red; }
        </style>
      </head>
      <body>
        <h1 class="error">Error seeding database!</h1>
        <p>${error instanceof Error ? error.message : 'Unknown error occurred'}</p>
      </body>
      </html>
    `);
  }
}
