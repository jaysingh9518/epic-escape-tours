import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/admin/Sidebar";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Loader2, 
  ArrowUpDown,
  Clock,
  Calendar
} from "lucide-react";

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
}

const ManageBlogs = () => {
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  const { toast } = useToast();
  
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const ITEMS_PER_PAGE = 10;
  
  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      setLocation("/login?redirect=/admin/blogs");
    }
  }, [user, authLoading, isAdmin, setLocation]);

  // Fetch blogs
  const { data: blogs, isLoading: blogsLoading } = useQuery<Blog[]>({
    queryKey: ['/api/blogs'],
    enabled: !!isAdmin,
  });
  
  // Fetch users to display author names
  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ['/api/users'],
    enabled: !!isAdmin,
  });
  
  // Delete blog mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/blogs/${id}`, undefined);
    },
    onSuccess: () => {
      toast({
        title: "Blog Deleted",
        description: "The blog has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete blog.",
        variant: "destructive",
      });
    },
  });

  // Handle delete blog
  const handleDeleteBlog = () => {
    if (selectedBlog) {
      deleteMutation.mutate(selectedBlog.id);
    }
  };
  
  // Get author name
  const getAuthorName = (authorId: number) => {
    const author = users?.find(u => u.id === authorId);
    return author ? `${author.firstName} ${author.lastName}` : "Unknown Author";
  };
  
  // Filter and sort blogs
  const filteredBlogs = blogs?.filter(blog => {
    return blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           blog.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
           blog.content.toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];
  
  // Sort blogs
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortBy === "createdAt") {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }
    
    if (sortBy === "readTime") {
      return sortOrder === "asc" ? a.readTime - b.readTime : b.readTime - a.readTime;
    }
    
    // Sort by title
    const valueA = a[sortBy as keyof Blog] as string;
    const valueB = b[sortBy as keyof Blog] as string;
    
    return sortOrder === "asc" 
      ? valueA.localeCompare(valueB) 
      : valueB.localeCompare(valueA);
  });
  
  // Paginate blogs
  const totalPages = Math.ceil(sortedBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = sortedBlogs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  
  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };
  
  // Redirect if not admin
  if (!authLoading && (!user || !isAdmin)) {
    return null;
  }
  
  const isLoading = authLoading || blogsLoading || usersLoading;

  return (
    <>
      <Helmet>
        <title>Manage Blogs - TravelEase Admin</title>
        <meta name="description" content="Admin interface to manage travel blog posts - create, edit, and delete blog articles." />
      </Helmet>
      
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-1">Manage Blogs</h1>
                <p className="text-gray-600">Create and manage your travel blog articles</p>
              </div>
              <Button onClick={() => setLocation("/admin/blogs/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Blog
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>All Blog Posts</CardTitle>
                <CardDescription>
                  {filteredBlogs.length} blog post{filteredBlogs.length !== 1 ? 's' : ''} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="mb-6 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search blogs..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
                  </div>
                ) : paginatedBlogs.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Blogs Found</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      We couldn't find any blog posts matching your search criteria. Try adjusting your search or create a new blog post.
                    </p>
                    <Button onClick={() => setSearchTerm("")}>
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>
                              <button 
                                className="flex items-center font-semibold"
                                onClick={() => toggleSort("title")}
                              >
                                Title
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                              </button>
                            </TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>
                              <button 
                                className="flex items-center font-semibold"
                                onClick={() => toggleSort("readTime")}
                              >
                                Read Time
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                              </button>
                            </TableHead>
                            <TableHead>
                              <button 
                                className="flex items-center font-semibold"
                                onClick={() => toggleSort("createdAt")}
                              >
                                Published
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                              </button>
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedBlogs.map((blog) => (
                            <TableRow key={blog.id}>
                              <TableCell>
                                <img 
                                  src={blog.imageUrl} 
                                  alt={blog.title} 
                                  className="w-14 h-14 object-cover rounded-md"
                                />
                              </TableCell>
                              <TableCell className="font-medium max-w-xs truncate">
                                {blog.title}
                              </TableCell>
                              <TableCell>{getAuthorName(blog.authorId)}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                  <span>{blog.readTime} min</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                                  <span>{format(new Date(blog.createdAt), "MMM d, yyyy")}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setLocation(`/blogs/${blog.id}`)}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      <span>View</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setLocation(`/admin/blogs/${blog.id}`)}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      <span>Edit</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600 focus:text-red-600" 
                                      onClick={() => {
                                        setSelectedBlog(blog);
                                        setIsDeleteDialogOpen(true);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      <span>Delete</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-6 flex justify-center">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                              />
                            </PaginationItem>
                            
                            {Array.from({ length: totalPages }).map((_, index) => {
                              const pageNumber = index + 1;
                              
                              // Display current page, first, last, and adjacent pages
                              if (
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                (pageNumber >= page - 1 && pageNumber <= page + 1)
                              ) {
                                return (
                                  <PaginationItem key={pageNumber}>
                                    <PaginationLink
                                      isActive={page === pageNumber}
                                      onClick={() => setPage(pageNumber)}
                                    >
                                      {pageNumber}
                                    </PaginationLink>
                                  </PaginationItem>
                                );
                              }
                              
                              // Add ellipsis between page groups
                              if (
                                (pageNumber === 2 && page > 3) ||
                                (pageNumber === totalPages - 1 && page < totalPages - 2)
                              ) {
                                return (
                                  <PaginationItem key={`ellipsis-${pageNumber}`}>
                                    <PaginationEllipsis />
                                  </PaginationItem>
                                );
                              }
                              
                              return null;
                            })}
                            
                            <PaginationItem>
                              <PaginationNext 
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedBlog?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteBlog}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>Delete</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageBlogs;
