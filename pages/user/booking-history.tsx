import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  Loader2,
  ArrowLeft,
  FileText,
  Download,
} from "lucide-react";
import { Types } from "mongoose";

// Types
interface Booking {
  _id: string;
  userId: string;
  packageId: string;
  startDate: string;
  numberOfTravelers: number;
  totalAmount: string;
  paymentStatus: string;
  paymentId?: string;
  createdAt: string;
}

interface Package {
  _id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: string;
  discountPrice?: string;
  imageUrl: string;
  rating: string;
  featured: boolean; 
}

const BookingHistory = () => {
  const router = useRouter();
  const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  
  // Redirect if not logged in
  useEffect(() => {
    if (isUserLoaded && !isSignedIn) {
      router.replace("/sign-in?redirect=/user/profile");
    }
  }, [isUserLoaded, isSignedIn, router]);

  // Get user bookings
  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ['/api/bookings/user'],
    queryFn: async () => {
      if (!user?.id) throw new Error('Clerk ID is required.');
  
      const response = await fetch(`/api/bookings/user?clerkId=${user.id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user bookings');
      }
  
      const data = await response.json();
      // Extract user data from the response
      return data.bookings;
    },
    enabled: !!user,
  });
  
  // Get packages data to show details for each booking
  const { data: packages, isLoading: packagesLoading } = useQuery<Package[]>({
    queryKey: ['/api/packages'],
    queryFn: async () => {
      const response = await fetch(`/api/packages`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch packages data');
      }
      const data = await response.json();
      return data.packages;
    },
  });
  
  // Helper function to get package details by id
  const getPackage = (id: Types.ObjectId | string) => {
    if (!packages) {
      console.warn(`Packages data is not available yet.`);
      return null;
    }

    const foundPackage = packages.find((pkg) => pkg._id.toString() === id.toString());
    if (!foundPackage) console.warn(`Package not found for ID: ${id}`);

    return foundPackage;
  };
  

  // Calculate pagination
  const totalPages = bookings ? Math.ceil((bookings.length || 0) / ITEMS_PER_PAGE) : 0;
  const paginatedBookings = bookings ? 
    [...bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE) : [];

  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user && !isUserLoaded) {
    return null; // Will be redirected by useEffect
  }

  const isLoading = bookingsLoading || packagesLoading;

  return (
    <>
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-6">
            <Link href="/">
              <p className="text-gray-500 hover:text-gray-700">Home</p>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link href="/user/profile">
              <p className="text-gray-500 hover:text-gray-700">Profile</p>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium">Booking History</span>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
              <p className="text-gray-600">View and manage your travel bookings</p>
            </div>
            <Button variant="outline" onClick={() => router.push("/user/profile")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Travel History</CardTitle>
              <CardDescription>
                Review details of your past and upcoming trips
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
                </div>
              ) : bookings?.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Bookings Found</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    You haven&apos;t made any bookings yet. Explore our travel packages and start your adventure!
                  </p>
                  <Button onClick={() => router.push("/packages")}>
                    Explore Packages
                  </Button>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Booking ID</TableHead>
                          <TableHead>Package</TableHead>
                          <TableHead>Travel Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Payment Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedBookings.map((booking) => {
                          const packageInfo = getPackage(booking.packageId || "");
                          return (
                            <TableRow key={booking._id}>
                              <TableCell className="font-medium">#{booking._id}</TableCell>
                              <TableCell>
                                {packageInfo ? (
                                  <div>
                                    <p className="font-medium">{packageInfo.title}</p>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      <span>{packageInfo.location}</span>
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-gray-500">Unknown Package</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {format(new Date(booking.startDate || ""), "MMM dd, yyyy")}
                              </TableCell>
                              <TableCell>₹{parseInt(booking.totalAmount).toLocaleString()}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className={getStatusColor(booking.paymentStatus)}>
                                  {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => router.push(`/packages/${booking.packageId}`)}
                                  >
                                    View Package
                                  </Button>
                                  {booking.paymentStatus === "completed" && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-primary-600"
                                      onClick={() => {
                                        // In a real app, this would download a receipt
                                        toast({
                                          title: "Receipt Downloaded",
                                          description: `Receipt for booking #${booking.id} has been downloaded.`,
                                        });
                                      }}
                                    >
                                      <Download className="h-4 w-4 mr-1" />
                                      Receipt
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {totalPages > 1 && paginatedBookings.length > 0 && (
                    <div className="mt-6">
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
                  
                  {/* Booking Details */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
                    
                    {paginatedBookings.length > 0 ? (() => {
                    const booking = paginatedBookings[0];
                    const packageInfo = getPackage(booking.packageId);
                    return (
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Package Information</h4>
                            {packageInfo ? (
                              <div className="space-y-2">
                                <p className="text-lg font-semibold">{packageInfo.title}</p>
                                <div className="flex items-center text-gray-600">
                                  <MapPin className="h-4 w-4 mr-2 text-primary-500" />
                                  <span>{packageInfo.location}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="h-4 w-4 mr-2 text-primary-500" />
                                  <span>{packageInfo.duration}</span>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-500">Select a booking to view package details</p>
                            )}
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Booking Information</h4>
                            <div className="space-y-2">
                              <p>
                                <span className="font-medium">Booking Date: </span>
                                <span className="text-gray-600">
                                  {booking ? format(new Date(booking.createdAt), "MMMM dd, yyyy") : "--"}
                                </span>
                              </p>
                              <p>
                                <span className="font-medium">Travel Date: </span>
                                <span className="text-gray-600">
                                  {booking ? format(new Date(booking.startDate), "MMMM dd, yyyy") : "--"}
                                </span>
                              </p>
                              <div className="flex items-center">
                                <span className="font-medium mr-2">Travelers: </span>
                                <div className="flex items-center text-gray-600">
                                  <Users className="h-4 w-4 mr-1 text-primary-500" />
                                  <span>{booking?.numberOfTravelers || "--"}</span>
                                </div>
                              </div>
                              <p>
                                <span className="font-medium">Total Amount: </span>
                                <span className="text-gray-600">
                                  {booking ? `₹${parseInt(booking.totalAmount).toLocaleString()}` : "--"}
                                </span>
                              </p>
                              <p>
                                <span className="font-medium">Payment Status: </span>
                                {booking ? (
                                  <Badge variant="outline" className={getStatusColor(booking.paymentStatus)}>
                                    {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                                  </Badge>
                                ) : (
                                  "--"
                                )}
                              </p>
                              {booking?.paymentId && (
                                <p>
                                  <span className="font-medium">Payment ID: </span>
                                  <span className="text-gray-600 font-mono text-xs">
                                    {booking.paymentId}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      )})()  
                  : <p className="text-gray-500">Select a booking to view details</p>}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BookingHistory;
