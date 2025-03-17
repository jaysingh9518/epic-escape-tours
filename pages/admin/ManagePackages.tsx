import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Star, 
  Loader2, 
  ArrowUpDown,
  Filter
} from "lucide-react";

// Types
interface Package {
  id: number;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: string;
  discountPrice?: string;
  imageUrl: string;
  rating: string;
  featured: boolean;
  createdAt: string;
}

const ManagePackages = () => {
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  const { toast } = useToast();
  
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterFeatured, setFilterFeatured] = useState<string>("");
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [page, setPage] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const ITEMS_PER_PAGE = 10;
  
  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      setLocation("/login?redirect=/admin/packages");
    }
  }, [user, authLoading, isAdmin, setLocation]);

  // Fetch packages
  const { data: packages, isLoading: packagesLoading } = useQuery<Package[]>({
    queryKey: ['/api/packages'],
    enabled: !!isAdmin,
  });
  
  // Delete package mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/packages/${id}`, undefined);
    },
    onSuccess: () => {
      toast({
        title: "Package Deleted",
        description: "The package has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/packages'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete package.",
        variant: "destructive",
      });
    },
  });

  // Handle delete package
  const handleDeletePackage = () => {
    if (selectedPackage) {
      deleteMutation.mutate(selectedPackage.id);
    }
  };
  
  // Filter and sort packages
  const filteredPackages = packages?.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFeatured = filterFeatured === "" ? true : 
                           (filterFeatured === "featured" ? pkg.featured : !pkg.featured);
    
    const matchesLocation = filterLocation === "" ? true : pkg.location.includes(filterLocation);
    
    return matchesSearch && matchesFeatured && matchesLocation;
  }) || [];
  
  // Sort packages
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    let valueA: string | number | boolean | Date = a[sortBy as keyof Package] as string;
    let valueB: string | number | boolean | Date = b[sortBy as keyof Package] as string;
    
    // Handle number comparisons
    if (sortBy === "price" || sortBy === "discountPrice") {
      valueA = parseFloat(a[sortBy as keyof Package] as string || "0");
      valueB = parseFloat(b[sortBy as keyof Package] as string || "0");
    }
    
    // Handle date comparisons
    if (sortBy === "createdAt") {
      valueA = new Date(valueA);
      valueB = new Date(valueB);
    }
    
    // Handle boolean comparisons
    if (sortBy === "featured") {
      valueA = a.featured;
      valueB = b.featured;
    }
    
    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
  
  // Paginate packages
  const totalPages = Math.ceil(sortedPackages.length / ITEMS_PER_PAGE);
  const paginatedPackages = sortedPackages.slice(
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
  
  // Get location options from packages
  const locationOptions = packages ? 
    [...new Set(packages.map(pkg => pkg.location.split(',')[0].trim()))] : [];
  
  // Redirect if not admin
  if (!authLoading && (!user || !isAdmin)) {
    return null;
  }
  
  const isLoading = authLoading || packagesLoading;

  return (
    <>
      <Helmet>
        <title>Manage Packages - TravelEase Admin</title>
        <meta name="description" content="Admin interface to manage travel packages - create, edit, and delete packages." />
      </Helmet>
      
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-1">Manage Packages</h1>
                <p className="text-gray-600">Manage your travel packages and offers</p>
              </div>
              <Button onClick={() => setLocation("/admin/packages/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Package
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>All Packages</CardTitle>
                <CardDescription>
                  {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="md:w-1/3">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search packages..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Filters:</span>
                  </div>
                  
                  <div className="md:w-1/4">
                    <Select value={filterFeatured} onValueChange={setFilterFeatured}>
                      <SelectTrigger>
                        <SelectValue placeholder="Featured Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Packages</SelectItem>
                        <SelectItem value="featured">Featured Only</SelectItem>
                        <SelectItem value="notFeatured">Not Featured</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:w-1/4">
                    <Select value={filterLocation} onValueChange={setFilterLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Locations</SelectItem>
                        {locationOptions.map((location, index) => (
                          <SelectItem key={index} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
                  </div>
                ) : paginatedPackages.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Packages Found</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      We couldn't find any packages matching your criteria. Try adjusting your filters or create a new package.
                    </p>
                    <Button onClick={() => {
                      setSearchTerm("");
                      setFilterFeatured("");
                      setFilterLocation("");
                    }}>
                      Clear Filters
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
                            <TableHead>
                              <button 
                                className="flex items-center font-semibold"
                                onClick={() => toggleSort("location")}
                              >
                                Location
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                              </button>
                            </TableHead>
                            <TableHead>
                              <button 
                                className="flex items-center font-semibold"
                                onClick={() => toggleSort("price")}
                              >
                                Price
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                              </button>
                            </TableHead>
                            <TableHead>
                              <button 
                                className="flex items-center font-semibold"
                                onClick={() => toggleSort("featured")}
                              >
                                Featured
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                              </button>
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedPackages.map((pkg) => (
                            <TableRow key={pkg.id}>
                              <TableCell>
                                <img 
                                  src={pkg.imageUrl} 
                                  alt={pkg.title} 
                                  className="w-14 h-14 object-cover rounded-md"
                                />
                              </TableCell>
                              <TableCell className="font-medium">{pkg.title}</TableCell>
                              <TableCell>{pkg.location}</TableCell>
                              <TableCell>
                                {pkg.discountPrice ? (
                                  <>
                                    <span className="line-through text-gray-500">₹{pkg.price}</span>
                                    <span className="ml-2 font-medium">₹{pkg.discountPrice}</span>
                                  </>
                                ) : (
                                  <span>₹{pkg.price}</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {pkg.featured ? (
                                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                    <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                                    Featured
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-gray-500">
                                    Regular
                                  </Badge>
                                )}
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
                                    <DropdownMenuItem onClick={() => setLocation(`/packages/${pkg.id}`)}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      <span>View</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setLocation(`/admin/packages/${pkg.id}`)}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      <span>Edit</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600 focus:text-red-600" 
                                      onClick={() => {
                                        setSelectedPackage(pkg);
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
              Are you sure you want to delete "{selectedPackage?.title}"? This action cannot be undone.
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
              onClick={handleDeletePackage}
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

export default ManagePackages;
