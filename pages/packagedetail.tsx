import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { format} from "date-fns";
import { Calendar as CalendarIcon, MapPin, Clock, Star, Star as StarIcon, ChevronRight, Share2, Bookmark, CheckCircle2, ArrowLeft, Tag, Router } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { RazorpayButton } from "@/components/ui/razorpay";

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
}

const PackageDetail = () => {
  const searchParams = useSearchParams();
  const [, router] = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  // Handle potential undefined id with a default or redirect
  const packageId = parseInt(searchParams.get("packageId") || "-1");
  
  // Redirect if we don't have a valid ID
  useEffect(() => {
    if (packageId === -1) {
      router.push('/packages');
    }
  }, [packageId, router]);
  
  const [tab, setTab] = useState("overview");
  const [date, setDate] = useState<Date>();
  const [travelers, setTravelers] = useState("1");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const { data: pkg, isLoading, error } = useQuery<Package>({
    queryKey: [`/api/packages/${packageId}`],
    queryFn: () => fetch(`/api/packages/${packageId}`).then((res) => res.json()),
  });
  
  const handleBookNow = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book this package",
        variant: "destructive",
      });
      router.push("/login?redirect=/packages/" + id);
      return;
    }
    
    if (!date) {
      toast({
        title: "Date Required",
        description: "Please select a travel date",
        variant: "destructive",
      });
      return;
    }
    
    setIsBookingOpen(true);
  };

  const formattedDate = date ? format(date, "PPP") : "";
  const price = pkg ? parseFloat(pkg.discountPrice || pkg.price) : 0;
  const numTravelers = parseInt(travelers);
  const totalAmount = price * numTravelers;

  // Placeholder images for itinerary
  const itineraryImages = [
    "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd",
    "https://images.unsplash.com/photo-1733706070950-9f974fe6af8d",
    "https://images.unsplash.com/photo-1499363536502-87642509e31b"
  ];

  // Mock facilities
  const facilities = [
    "Accommodation", "Airport Transfer", "Meals", "Sightseeing", 
    "Guide", "Transport", "Travel Insurance", "Taxes"
  ];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Error Loading Package</h2>
        <p className="text-gray-600 mb-6">We encountered an error while loading the package details.</p>
        <Button onClick={() => router.push("/packages")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Packages
        </Button>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        // Skeleton loader
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-3/4 max-w-2xl mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Skeleton className="h-[400px] w-full mb-6 rounded-lg" />
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-8" />
            </div>
            <div>
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      ) : pkg ? (
        <>
          {/* Breadcrumb */}
          <div className="bg-gray-100 py-4">
            <div className="container mx-auto px-4">
              <div className="flex items-center text-sm">
                <span className="text-gray-500">Home</span>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                <span className="text-gray-500">Packages</span>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                <span className="text-gray-800 font-medium">{pkg.title}</span>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{pkg.title}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-primary-500 mr-1" />
                    <span className="text-gray-600">{pkg.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary-500 mr-1" />
                    <span className="text-gray-600">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-gray-600">{pkg.rating} Rating</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" className="text-gray-600">
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
                <Button variant="outline" size="sm" className="text-gray-600">
                  <Bookmark className="h-4 w-4 mr-2" /> Save
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {/* Package Image */}
                <div className="mb-8">
                  <Image 
                    src={pkg.imageUrl} 
                    alt={pkg.title}
                    width={800}
                    height={400}
                    className="w-full h-[400px] object-cover rounded-lg" 
                  />
                </div>
                
                {/* Tabs */}
                <Tabs value={tab} onValueChange={setTab} className="mb-8">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                    <TabsTrigger value="policy">Policy</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">About This Package</h3>
                    <p className="text-gray-600 mb-6 whitespace-pre-line">{pkg.description}</p>
                    
                    <h3 className="text-xl font-semibold mb-4">What&apos;s Included</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                      {facilities.map((facility, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4">Highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                        <span>Explore the breathtaking landscapes and natural beauty</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                        <span>Experience authentic local cuisine and cultural traditions</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                        <span>Comfortable accommodations with stunning views</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                        <span>Expert guides to enhance your travel experience</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="itinerary" className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Day-by-Day Itinerary</h3>
                    
                    {/* Sample Itinerary - This would be dynamic in a real application */}
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <Image 
                            src={itineraryImages[0]} 
                            alt="Day 1"
                            width={800}
                            height={400}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <h4 className="text-lg font-semibold flex items-center">
                            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-md mr-3">Day 1</span>
                            Arrival and Welcome
                          </h4>
                          <p className="text-gray-600 mt-2">
                            Upon arrival at the airport, you&apos;ll be greeted by our representative and transferred to your hotel. Enjoy a welcome drink and orientation session, followed by leisure time to explore the surroundings. In the evening, savor a traditional welcome dinner.
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <Image 
                            src={itineraryImages[1]} 
                            alt="Day 2" 
                            width={800}
                            height={400}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <h4 className="text-lg font-semibold flex items-center">
                            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-md mr-3">Day 2</span>
                            Exploration and Adventure
                          </h4>
                          <p className="text-gray-600 mt-2">
                            After breakfast, embark on a guided tour of the main attractions. Visit historical landmarks, take in breathtaking viewpoints, and immerse yourself in the local culture. Lunch will be at a renowned local restaurant, followed by free time for shopping or relaxation.
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <Image 
                            src={itineraryImages[2]} 
                            alt="Day 3"
                            width={800}
                            height={400} 
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <h4 className="text-lg font-semibold flex items-center">
                            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-md mr-3">Day 3</span>
                            Nature and Relaxation
                          </h4>
                          <p className="text-gray-600 mt-2">
                            Today is dedicated to natural beauty. Trek through scenic trails, visit pristine beaches or mountain viewpoints, and enjoy a picnic lunch surrounded by nature. In the afternoon, indulge in optional spa treatments or continue exploring at your own pace.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="policy" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Cancellation Policy</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                          <li>Free cancellation up to 30 days before departure</li>
                          <li>50% refund for cancellations 15-29 days before departure</li>
                          <li>25% refund for cancellations 7-14 days before departure</li>
                          <li>No refund for cancellations less than 7 days before departure</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Payment Policy</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                          <li>20% advance payment required to confirm booking</li>
                          <li>Remaining payment due 30 days before departure</li>
                          <li>All prices are per person based on double occupancy</li>
                          <li>Single supplements apply for solo travelers</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Important Information</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                          <li>Valid passport required with minimum 6 months validity from return date</li>
                          <li>Travel insurance is mandatory for all travelers</li>
                          <li>Itinerary may be modified due to weather or unforeseen circumstances</li>
                          <li>Special dietary requirements must be informed at time of booking</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Booking Card */}
              <div>
                <Card className="sticky top-20">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl font-bold">
                          ₹{pkg.discountPrice || pkg.price}
                          <span className="text-sm font-normal text-gray-600"> / person</span>
                        </div>
                        {pkg.discountPrice && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 line-through">₹{pkg.price}</span>
                            <span className="bg-secondary-100 text-secondary-700 text-xs font-medium px-2 py-1 rounded">
                              <Tag className="h-3 w-3 inline mr-1" />
                              {Math.round((1 - parseFloat(pkg.discountPrice) / parseFloat(pkg.price)) * 100)}% OFF
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Rating stars */}
                      <div className="flex items-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={cn(
                              "h-5 w-5",
                              parseFloat(pkg.rating) >= star
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            )}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {pkg.rating} ({Math.round(parseFloat(pkg.rating) * 15)} reviews)
                        </span>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      {/* Date selection */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Select Date
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-gray-400"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select your travel date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      {/* Travelers selection */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Number of Travelers
                        </label>
                        <Select value={travelers} onValueChange={setTravelers}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select travelers" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Person</SelectItem>
                            <SelectItem value="2">2 People</SelectItem>
                            <SelectItem value="3">3 People</SelectItem>
                            <SelectItem value="4">4 People</SelectItem>
                            <SelectItem value="5">5 People</SelectItem>
                            <SelectItem value="6">6+ People (Group)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Price breakdown */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Base Price × {travelers}</span>
                          <span>₹{(parseFloat(pkg.discountPrice || pkg.price) * parseInt(travelers)).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Taxes & Fees</span>
                          <span>Included</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between font-semibold">
                          <span>Total</span>
                          <span>₹{(parseFloat(pkg.discountPrice || pkg.price) * parseInt(travelers)).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {!isBookingOpen ? (
                        <Button className="w-full bg-secondary-500 hover:bg-secondary-600" onClick={handleBookNow}>
                          Book Now
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Booking Summary</h4>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span>Package:</span>
                                <span>{pkg.title}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Date:</span>
                                <span>{formattedDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Travelers:</span>
                                <span>{travelers}</span>
                              </div>
                              <div className="flex justify-between font-medium mt-2">
                                <span>Amount:</span>
                                <span>₹{totalAmount.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          
                          <RazorpayButton 
                            amount={totalAmount} 
                            packageId={packageId}
                            packageName={pkg.title}
                            travelers={parseInt(travelers)}
                            startDate={date!}
                          />
                          
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => setIsBookingOpen(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default PackageDetail;
