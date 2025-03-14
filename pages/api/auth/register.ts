import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

interface RegisterValues {
  email: string;
  password: string;
  username: string;
  name: string;
  provider?: string;
  providerId?: string | number;
  image?: string;
}

async function register(values: RegisterValues) {
  const { email, password, name, provider, providerId, image, username } = values;

  try {
    await connectDB();

    const userFound = await User.findOne({ email });
    if (userFound) {
      return { error: "Email already exists!" };
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const user = new User({
      name,
      email,
      username,
      password: hashedPassword,
      provider,
      providerId,
      image,
    });

    const savedUser = await user.save();

    return {
      user: savedUser,
      error: null,
    };
  } catch (e) {
    console.error("Registration error:", e);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

// ✅ Add the correct Next.js API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const result = await register(req.body);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({ user: result.user });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
