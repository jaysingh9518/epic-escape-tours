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
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/admin/Sidebar";
import { ArrowLeft, Loader2, Save } from "lucide-react";

// Blog form validation schema
const blogSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  summary: z.string().min(20, { message: "Summary must be at least 20 characters" }),
  content: z.string().min(100, { message: "Content must be at least 100 characters" }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL" }),
  readTime: z.coerce.number().min(1, { message: "Read time must be at least 1 minute" }),
});

type BlogFormValues = z.infer<typeof blogSchema>;

const EditBlog = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  const { toast } = useToast();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const isNewBlog = id === "new";
  const blogId = isNewBlog ? undefined : parseInt(id);
  
  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      setLocation("/login?redirect=/admin/blogs");
    }
  }, [user, authLoading, isAdmin, setLocation]);

  // Fetch blog data if editing existing blog
  const { data: blog, isLoading: blogLoading } = useQuery({
    queryKey: [`/api/blogs/${blogId}`],
    enabled: !!blogId && !!isAdmin,
  });
  
  // Initialize form
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      imageUrl: "",
      readTime: 5,
    },
    values: blog ? {
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      imageUrl: blog.imageUrl,
      readTime: blog.readTime,
    } : undefined,
  });
  
  // Blog mutation - handles both create and update
  const blogMutation = useMutation({
    mutationFn: async (data: BlogFormValues) => {
      if (isNewBlog) {
        // Create new blog
        const blogData = {
          ...data,
          authorId: user?.id,
        };
        const res = await apiRequest('POST', '/api/blogs', blogData);
        return res.json();
      } else {
        // Update existing blog
        const res = await apiRequest('PUT', `/api/blogs/${blogId}`, data);
        return res.json();
      }
    },
    onSuccess: () => {
      toast({
        title: isNewBlog ? "Blog Created" : "Blog Updated",
        description: isNewBlog 
          ? "Your blog post has been created successfully." 
          : "Your blog post has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] });
      setLocation("/admin/blogs");
    },
    onError: (error: any) => {
      toast({
        title: isNewBlog ? "Creation Failed" : "Update Failed",
        description: error.message || `Failed to ${isNewBlog ? 'create' : 'update'} blog post.`,
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = (data: BlogFormValues) => {
    blogMutation.mutate(data);
  };
  
  const isLoading = authLoading || (blogId && blogLoading);
  
  // For content preview in preview mode
  const previewContent = () => {
    const contentValue = form.getValues("content");
    return { __html: contentValue };
  };

  return (
    <>
      <Helmet>
        <title>{isNewBlog ? "Create Blog" : "Edit Blog"} - TravelEase Admin</title>
        <meta 
          name="description" 
          content={isNewBlog 
            ? "Create a new blog post for your travel website" 
            : "Edit an existing blog post on your travel website"
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
                  onClick={() => setLocation("/admin/blogs")}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blogs
                </Button>
                <h1 className="text-3xl font-bold">{isNewBlog ? "Create New Blog" : "Edit Blog"}</h1>
                <p className="text-gray-600">
                  {isNewBlog 
                    ? "Create an engaging travel blog post" 
                    : "Update your travel blog post"
                  }
                </p>
              </div>
              
              {!isNewBlog && (
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
                      <CardDescription>{form.getValues("summary")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-8">
                        <img 
                          src={form.getValues("imageUrl")} 
                          alt={form.getValues("title")} 
                          className="w-full max-h-[400px] object-cover rounded-lg"
                        />
                      </div>
                      
                      <div 
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={previewContent()}
                      />
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
                        disabled={blogMutation.isPending}
                      >
                        {blogMutation.isPending ? (
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
                      <CardTitle>{isNewBlog ? "Blog Information" : "Edit Blog Details"}</CardTitle>
                      <CardDescription>
                        Fill in the details to {isNewBlog ? "create" : "update"} your blog post
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
                                <FormLabel>Blog Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter a catchy title" {...field} />
                                </FormControl>
                                <FormDescription>
                                  This will be displayed as the main title of your blog post
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="summary"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Summary</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Write a brief summary of your blog post" 
                                    className="resize-none"
                                    rows={3}
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  This summary appears on blog cards and previews (20-150 characters)
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
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
                                  Enter a URL for the featured image of your blog post
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="readTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Read Time (minutes)</FormLabel>
                                <FormControl>
                                  <Input type="number" min={1} max={60} {...field} />
                                </FormControl>
                                <FormDescription>
                                  Estimated time to read the article in minutes
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Separator />
                          
                          <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Blog Content</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Write your blog content here. HTML formatting is supported." 
                                    className="min-h-[300px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  Write your blog post content. HTML formatting is supported for headings, paragraphs, lists, etc.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end space-x-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setLocation("/admin/blogs")}
                            >
                              Cancel
                            </Button>
                            
                            {!isNewBlog && (
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
                              disabled={blogMutation.isPending}
                            >
                              {blogMutation.isPending ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  {isNewBlog ? "Creating..." : "Saving..."}
                                </>
                              ) : (
                                <>{isNewBlog ? "Create Blog" : "Save Changes"}</>
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

export default EditBlog;
