import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) throw new Error("Wrong Email");
        
        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password as string
        );
        
        if (!credentials?.password) throw new Error("Password is required");
        if (!passwordMatch) throw new Error("Wrong Password");

        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await connectDB();
      if (account?.provider !== "credentials") {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            email: user.email,
            username: user.email?.split("@")[0] ? user.email.split("@")[0] : "user" + Date.now(),
            name: user.name ?? "",
            image: user.image ?? "",
            provider: account?.provider,
            providerId: account?.id as string,
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as typeof session.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },

  session: {
    strategy: "jwt",
  },
};