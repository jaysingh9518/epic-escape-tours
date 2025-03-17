import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Calendar, Clock, Share2, ArrowLeft } from "lucide-react";
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

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

const BlogDetail = () => {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const blogId = parseInt(id);
  
  const { data: blog, isLoading: isBlogLoading, error: blogError } = useQuery<Blog>({
    queryKey: [`/api/blogs/${blogId}`],
  });
  
  // Get author info
  const { data: author, isLoading: isAuthorLoading } = useQuery<User>({
    queryKey: [`/api/users/${blog?.authorId}`],
    enabled: !!blog?.authorId,
  });
  
  // Related blogs - normally would be a separate API call with proper logic
  const { data: relatedBlogs, isLoading: isRelatedLoading } = useQuery<Blog[]>({
    queryKey: ['/api/blogs'],
    select: (data) => data.filter(b => b.id !== blogId).slice(0, 3),
  });

  if (blogError) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Error Loading Blog</h2>
        <p className="text-gray-600 mb-6">We encountered an error while loading the blog post.</p>
        <Button onClick={() => navigate("/blogs")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
        </Button>
      </div>
    );
  }

  const isLoading = isBlogLoading || (blog && isAuthorLoading);

  return (
    <>
      <Helmet>
        <title>{isLoading ? "Loading..." : `${blog?.title} - TravelEase Blog`}</title>
        <meta 
          name="description" 
          content={isLoading ? "Loading blog post..." : blog?.summary} 
        />
      </Helmet>
      
      {isLoading ? (
        // Skeleton loader
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          <Skeleton className="h-[400px] w-full mb-8 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
          </div>
        </div>
      ) : blog ? (
        <>
          {/* Breadcrumb */}
          <div className="bg-gray-100 py-4">
            <div className="container mx-auto px-4">
              <div className="flex items-center text-sm">
                <span className="text-gray-500">Home</span>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                <span className="text-gray-500">Blogs</span>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                <span className="text-gray-800 font-medium">{blog.title}</span>
              </div>
            </div>
          </div>
          
          <article className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-primary-100 text-primary-600">
                      {author ? author.firstName.charAt(0) + author.lastName.charAt(0) : "AU"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{author ? `${author.firstName} ${author.lastName}` : "TravelEase Author"}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{format(new Date(blog.createdAt), 'MMMM d, yyyy')}</span>
                      <span className="mx-1">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{blog.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="text-gray-600">
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
            </div>
            
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8" 
            />
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            
            <Separator className="my-10" />
            
            {/* Author bio */}
            <div className="bg-gray-50 p-6 rounded-lg mb-10">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary-100 text-primary-600 text-xl">
                    {author ? author.firstName.charAt(0) + author.lastName.charAt(0) : "AU"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {author ? `${author.firstName} ${author.lastName}` : "TravelEase Author"}
                  </h3>
                  <p className="text-gray-600 mb-2">Travel Writer & Explorer</p>
                  <p className="text-gray-700">
                    Passionate about discovering hidden gems and sharing authentic travel experiences. 
                    Specializes in cultural immersion and sustainable tourism.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Related posts */}
            {relatedBlogs && relatedBlogs.length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {isRelatedLoading ? (
                    Array(3).fill(0).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-40 w-full rounded-lg" />
                        <Skeleton className="h-5 w-4/5" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    ))
                  ) : (
                    relatedBlogs.map((relatedBlog) => (
                      <div key={relatedBlog.id} className="group">
                        <a 
                          href={`/blogs/${relatedBlog.id}`} 
                          className="block mb-3 overflow-hidden rounded-lg"
                        >
                          <img 
                            src={relatedBlog.imageUrl} 
                            alt={relatedBlog.title} 
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </a>
                        <h4 className="font-semibold group-hover:text-primary-600 transition-colors">
                          <a href={`/blogs/${relatedBlog.id}`}>{relatedBlog.title}</a>
                        </h4>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{format(new Date(relatedBlog.createdAt), 'MMM d, yyyy')}</span>
                          <span className="mx-1">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{relatedBlog.readTime} min read</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            
            <div className="flex justify-center">
              <Button onClick={() => navigate("/blogs")}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Articles
              </Button>
            </div>
          </article>
        </>
      ) : null}
    </>
  );
};

export default BlogDetail;
