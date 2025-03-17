import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/admin/Sidebar";
import { ArrowLeft, Loader2, Save } from "lucide-react";

// Package form validation schema
const packageSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  location: z.string().min(3, { message: "Location is required" }),
  duration: z.string().min(3, { message: "Duration is required (e.g., '3 Days, 2 Nights')" }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a valid number greater than 0",
  }),
  discountPrice: z.string().optional().refine((val) => !val || (val && !isNaN(Number(val)) && Number(val) > 0), {
    message: "Discount price must be a valid number greater than 0 or left empty",
  }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL" }),
  rating: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 5, {
    message: "Rating must be a number between 0 and 5",
  }),
  featured: z.boolean().default(false),
});

type PackageFormValues = z.infer<typeof packageSchema>;

const EditPackage = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  const { toast } = useToast();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const isNewPackage = id === "new";
  const packageId = isNewPackage ? undefined : parseInt(id);
  
  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      setLocation("/login?redirect=/admin/packages");
    }
  }, [user, authLoading, isAdmin, setLocation]);

  // Fetch package data if editing existing package
  const { data: packageData, isLoading: packageLoading } = useQuery({
    queryKey: [`/api/packages/${packageId}`],
    enabled: !!packageId && !!isAdmin,
  });
  
  // Initialize form
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      duration: "",
      price: "",
      discountPrice: "",
      imageUrl: "",
      rating: "0",
      featured: false,
    },
    values: packageData ? {
      title: packageData.title,
      description: packageData.description,
      location: packageData.location,
      duration: packageData.duration,
      price: packageData.price,
      discountPrice: packageData.discountPrice || "",
      imageUrl: packageData.imageUrl,
      rating: packageData.rating,
      featured: packageData.featured,
    } : undefined,
  });
  
  // Package mutation - handles both create and update
  const packageMutation = useMutation({
    mutationFn: async (data: PackageFormValues) => {
      if (isNewPackage) {
        // Create new package
        const res = await apiRequest('POST', '/api/packages', data);
        return res.json();
      } else {
        // Update existing package
        const res = await apiRequest('PUT', `/api/packages/${packageId}`, data);
        return res.json();
      }
    },
    onSuccess: () => {
      toast({
        title: isNewPackage ? "Package Created" : "Package Updated",
        description: isNewPackage 
          ? "Your travel package has been created successfully." 
          : "Your travel package has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/packages'] });
      setLocation("/admin/packages");
    },
    onError: (error: any) => {
      toast({
        title: isNewPackage ? "Creation Failed" : "Update Failed",
        description: error.message || `Failed to ${isNewPackage ? 'create' : 'update'} package.`,
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = (data: PackageFormValues) => {
    packageMutation.mutate(data);
  };
  
  const isLoading = authLoading || (packageId && packageLoading);

  return (
    <>
      <Helmet>
        <title>{isNewPackage ? "Create Package" : "Edit Package"} - TravelEase Admin</title>
        <meta 
          name="description" 
          content={isNewPackage 
            ? "Create a new travel package for your website" 
            : "Edit an existing travel package on your website"
          } 
        />
      </Helmet>
      
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <Button 
                  variant="ghost" 
                  className="mb-2" 
                  onClick={() => setLocation("/admin/packages")}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Packages
                </Button>
                <h1 className="text-3xl font-bold">{isNewPackage ? "Create New Package" : "Edit Package"}</h1>
                <p className="text-gray-600">
                  {isNewPackage 
                    ? "Create a new travel package for your customers" 
                    : "Update the details of your travel package"
                  }
                </p>
              </div>
              
              {!isNewPackage && (
                <Button 
                  variant="outline"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                >
                  {isPreviewMode ? "Edit Mode" : "Preview Mode"}
                </Button>
              )}
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
              </div>
            ) : (
              <>
                {isPreviewMode ? (
                  // Preview mode
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">{form.getValues("title")}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center mt-2">
                          <span className="text-gray-600 mr-4">
                            {form.getValues("location")}
                          </span>
                          <span className="text-gray-600">
                            {form.getValues("duration")}
                          </span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-8">
                        <img 
                          src={form.getValues("imageUrl")} 
                          alt={form.getValues("title")} 
                          className="w-full max-h-[400px] object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Price</h3>
                        {form.getValues("discountPrice") ? (
                          <div>
                            <span className="line-through text-gray-500 text-lg">₹{form.getValues("price")}</span>
                            <span className="ml-2 text-2xl font-bold">₹{form.getValues("discountPrice")}</span>
                            <span className="text-sm text-gray-600 ml-2">per person</span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-2xl font-bold">₹{form.getValues("price")}</span>
                            <span className="text-sm text-gray-600 ml-2">per person</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Description</h3>
                        <p className="text-gray-700 whitespace-pre-line">{form.getValues("description")}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-500">Location</p>
                            <p className="font-medium">{form.getValues("location")}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Duration</p>
                            <p className="font-medium">{form.getValues("duration")}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Rating</p>
                            <p className="font-medium">{form.getValues("rating")} / 5</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Featured</p>
                            <p className="font-medium">{form.getValues("featured") ? "Yes" : "No"}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button 
                        variant="outline"
                        onClick={() => setIsPreviewMode(false)}
                        className="mr-2"
                      >
                        Edit Mode
                      </Button>
                      <Button 
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={packageMutation.isPending}
                      >
                        {packageMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  // Edit mode
                  <Card>
                    <CardHeader>
                      <CardTitle>{isNewPackage ? "Package Information" : "Edit Package Details"}</CardTitle>
                      <CardDescription>
                        Fill in the details to {isNewPackage ? "create" : "update"} your travel package
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Package Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter package title" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Give your package a descriptive and attractive title
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Bali, Indonesia" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    The destination for this travel package
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="duration"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Duration</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 5 Days, 4 Nights" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    How long the package will last
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Price (₹)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 45000" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Regular price per person
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="discountPrice"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Discount Price (₹) - Optional</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 39999" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Special offer price (leave empty if no discount)
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="imageUrl"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Featured Image URL</FormLabel>
                                  <FormControl>
                                    <Input placeholder="https://example.com/image.jpg" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    URL for the main package image
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="rating"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Rating (0-5)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      step="0.1" 
                                      min="0" 
                                      max="5" 
                                      placeholder="e.g., 4.8" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Average customer rating for this package
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="featured"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Featured Package</FormLabel>
                                  <FormDescription>
                                    This package will be displayed in featured sections on the website
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <Separator />
                          
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Package Description</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Provide a detailed description of the package..." 
                                    className="min-h-[200px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  Detailed information about the package, including activities, accommodations, and highlights
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end space-x-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setLocation("/admin/packages")}
                            >
                              Cancel
                            </Button>
                            
                            {!isNewPackage && (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsPreviewMode(true)}
                              >
                                Preview
                              </Button>
                            )}
                            
                            <Button 
                              type="submit"
                              disabled={packageMutation.isPending}
                            >
                              {packageMutation.isPending ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  {isNewPackage ? "Creating..." : "Saving..."}
                                </>
                              ) : (
                                <>{isNewPackage ? "Create Package" : "Save Changes"}</>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPackage;
