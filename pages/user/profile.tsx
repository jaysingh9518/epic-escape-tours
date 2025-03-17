import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Loader2, User } from "lucide-react";
import DefaultAvatar from "@/public/profile.png";

// Form validation schema for profile update
const profileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const router = useRouter();
  const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();
  const { toast } = useToast();
  const [tab, setTab] = useState("profile");
  
  // Redirect if not logged in
  useEffect(() => {
    if (isUserLoaded && !isSignedIn) {
      router.replace("/sign-in?redirect=/user/profile");
    }
  }, [isUserLoaded, isSignedIn, router]);

  // Get user details from our database
  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    queryKey: ['userData', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('Clerk ID is required.');
  
      const response = await fetch(`/api/user?clerkId=${user.id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user data');
      }
  
      const data = await response.json();
      // Extract user data from the response
      return data.user;
    },
    enabled: !!user?.id,
  });  
  
  // Initialize profile form with proper default values
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
    },
    // Update form when user data loads
    values: userData ? {
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      username: userData.username || "",
    } : undefined,
  });

  // Profile update mutation
  const profileMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      if (!user?.id) throw new Error("User not authenticated");
      const res = await apiRequest('PUT', `/api/user?clerkId=${user.id}`, data);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "🎉 Profile Updated!",
        description: "Your profile is now up-to-date.",
        variant: "default",
        duration: 4000,
        className: "bg-green-500 text-white font-bold p-4 rounded-md shadow-md animate-bounce",
      });
      // Invalidate queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['userData', user?.id] });
    },
    onError: (error: unknown) => {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to update profile. Please try again.";

    toast({
      title: "Update Failed",
      description: errorMessage,
      variant: "destructive",
    });
  },

  });

  // Handle profile form submission
  const onProfileSubmit = (data: ProfileFormValues) => {
    profileMutation.mutate(data);
  };

  // Don't render anything while checking auth status or if not signed in
  if (!isUserLoaded || (isUserLoaded && !isSignedIn)) {
    return null;
  }

  const isLoading = isUserDataLoading;

  return (
    <>
      <div className="py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold  mb-2">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Manage your account settings and preferences
          </p>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile Summary Card */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Avatar className="h-24 w-24 mb-4 border border-primary-500 dark:border-primary-300">
                        {user?.imageUrl ? (
                          <Image src={user.imageUrl} alt="Avatar" width={100} height={100} />
                        ) : (
                          <Image src={DefaultAvatar} alt="Default Avatar" width={100} height={100} />
                        )}
                        <AvatarFallback className="bg-primary-100 dark:bg-primary-700 text-xl">
                          {userData?.firstName?.charAt(0) || user?.firstName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <h2 className="text-xl font-semibold">
                        {userData?.firstName || user?.firstName} {userData?.lastName || user?.lastName}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        {userData?.email || user?.primaryEmailAddress?.emailAddress}
                      </p>
                      <Separator className="my-4" />
                      <div className="w-full">
                        <p className="flex items-center justify-between text-sm mb-2 text-gray-600">
                          <span>Username:</span>
                          <span className="font-medium">{userData?.username || user?.username}</span>
                        </p>
                        <p className="flex items-center justify-between text-sm mb-2 text-gray-600">
                          <span>Account Type:</span>
                          <span className="capitalize font-medium">
                            {userData?.admin === true ? "Admin" : "User"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-4">
                  <Link href="/user/booking-history">
                    <Button variant="outline" className="w-full dark:bg-gray-800 dark:text-white">
                      View Booking History
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Settings Tabs */}
              <div className="md:col-span-2">
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList className="grid grid-cols-1 w-full">
                    <TabsTrigger value="profile" className="flex items-center border drop-shadow-lg shadow-gray-400">
                      <User className="h-4 w-4 mr-2" />
                      <span>Profile Information</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                          Update your personal information and contact details
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Form {...profileForm}>
                          <form
                            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                            className="space-y-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={profileForm.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={profileForm.control}
                                name="lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={profileForm.control}
                              name="username"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Username</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="flex justify-end">
                              <Button
                                type="submit"
                                disabled={profileMutation.isPending || !profileForm.formState.isDirty}
                                variant="outline"
                                className="dark:bg-gray-800 dark:text-white"
                              >
                                <span className="text-white">{profileMutation.isPending ? "Saving..." : "Save Changes"}</span>
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default Profile;