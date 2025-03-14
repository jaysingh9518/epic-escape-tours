import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Ensure correct path

export default NextAuth(authOptions); // ✅ Correct export syntax for Pages Router
