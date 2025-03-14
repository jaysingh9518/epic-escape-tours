import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";

// Form validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loginError, setLoginError] = useState("");

  const redirectPath = (router.query.callbackUrl as string) || "/";

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    if (session && status === "authenticated") {
      router.push(redirectPath);
    }
  }, [session, status, router, redirectPath]);

  const onSubmit = async (data: LoginFormValues) => {
    setLoginError("");

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setLoginError(result.error || "Login failed. Please check your credentials.");
      form.reset({ email: data.email, password: "", rememberMe: data.rememberMe });
    }
  };

  if (session && status === "authenticated") {
    return null;
  }

  return (
    <>
      <div className="flex min-h-fit items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md px-4">
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>

            {loginError && (
              <div className="mb-4 text-sm text-red-500">{loginError}</div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...form.register("email")}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...form.register("password")}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  {...form.register("rememberMe")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">Remember me</label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-primary-200"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: redirectPath })}
                className="w-full py-2 border rounded-md shadow-sm text-gray-500 hover:bg-gray-50"
              >
                Google
              </button>

              <button
                type="button"
                onClick={() => signIn("facebook", { callbackUrl: redirectPath })}
                className="w-full py-2 border rounded-md shadow-sm text-gray-500 hover:bg-gray-50"
              >
                Facebook
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account? <Link href="/auth/register" className="text-primary-600">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
