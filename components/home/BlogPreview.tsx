import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

// Types
interface Blog {
  id: number;
  title: string;
  content: string;
  summary: string;
  imageUrl: string;
  authorId: number;
  readTime: number;
  createdAt: string;
}

const BlogPreview = () => {
  const { data: blogs, isLoading, error } = useQuery<Blog[]>({
    queryKey: ['/api/blogs'],
  });

  // Get the most recent 3 blogs
  const recentBlogs = blogs?.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 3);

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">Error loading blogs. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold">Travel Inspiration</h2>
            <p className="text-gray-600 mt-2">Stories and tips from our travel experts</p>
          </div>
          <Link href="/blogs">
            <div className="text-primary-600 hover:text-primary-700 font-medium flex items-center cursor-pointer">
              View All Blogs <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))
          ) : (
            recentBlogs?.map((blog) => (
              <Card key={blog.id} className="overflow-hidden">
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{format(new Date(blog.createdAt), 'MMMM d, yyyy')}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{blog.readTime} min read</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>
                  <p className="text-gray-600 mb-4">{blog.summary}</p>
                  <Link href={`/blogs/${blog.id}`}>
                    <div className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center cursor-pointer">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
