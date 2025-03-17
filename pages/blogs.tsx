import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, SearchIcon, ArrowRight } from "lucide-react";
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

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const { data: blogs, isLoading, error } = useQuery<Blog[]>({
    queryKey: ['/api/blogs'],
  });

  // Filter blogs based on search term and category
  const filteredBlogs = blogs?.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For category filtering, we would normally filter by proper categories
    // but for this demo, we'll simulate it based on content keyword matching
    if (category === "all") return matchesSearch;
    if (category === "destinations" && 
        (blog.title.toLowerCase().includes("destination") || 
         blog.content.toLowerCase().includes("destination"))) {
      return matchesSearch;
    }
    if (category === "tips" && 
        (blog.title.toLowerCase().includes("guide") || 
         blog.content.toLowerCase().includes("guide"))) {
      return matchesSearch;
    }
    if (category === "experiences" && 
        (blog.title.toLowerCase().includes("experience") || 
         blog.content.toLowerCase().includes("experience"))) {
      return matchesSearch;
    }
    if (category === "food" && 
        (blog.title.toLowerCase().includes("food") || 
         blog.content.toLowerCase().includes("food"))) {
      return matchesSearch;
    }
    return category === "all" && matchesSearch;
  }) || [];

  return (
    <>
      <Helmet>
        <title>Travel Blog - TravelEase</title>
        <meta name="description" content="Explore travel tips, destination guides, and inspiring stories from our adventures around the world." />
      </Helmet>
      
      <section className="bg-gradient-to-r from-blue-900 to-indigo-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Travel Inspiration & Stories
          </h1>
          <p className="text-xl text-blue-100 text-center max-w-2xl mx-auto">
            Discover travel tips, destination guides, and inspiring stories from our adventures
          </p>
        </div>
      </section>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Categories Tabs */}
          <Tabs defaultValue="all" value={category} onValueChange={setCategory} className="mb-10">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="destinations">Destinations</TabsTrigger>
              <TabsTrigger value="tips">Travel Tips</TabsTrigger>
              <TabsTrigger value="experiences">Experiences</TabsTrigger>
              <TabsTrigger value="food">Food & Culture</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Blog Posts */}
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Error loading blogs. Please try again later.</p>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any blogs matching your search criteria. Try a different search term or browse all our blogs.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <Link href={`/blogs/${blog.id}`}>
                    <img 
                      src={blog.imageUrl} 
                      alt={blog.title} 
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </Link>
                  <CardContent className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{format(new Date(blog.createdAt), 'MMMM d, yyyy')}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{blog.readTime} min read</span>
                    </div>
                    
                    <Link href={`/blogs/${blog.id}`}>
                      <h3 className="text-xl font-semibold mb-3 hover:text-primary-600 transition-colors cursor-pointer">{blog.title}</h3>
                    </Link>
                    
                    <p className="text-gray-600 mb-4">{blog.summary}</p>
                    
                    <Link href={`/blogs/${blog.id}`}>
                      <span className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center cursor-pointer">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blogs;
