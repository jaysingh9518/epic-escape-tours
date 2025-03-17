import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; 
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Calendar, Star, SearchIcon, FilterIcon } from "lucide-react";

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
}

const Packages = () => {
  const router = useRouter();
  // Get search params from current URL
  const initialDestination = typeof window !== "undefined"
  ? new URLSearchParams(window.location.search).get("destination") || ""
  : "";
  const [searchTerm, setSearchTerm] = useState<string>(initialDestination);
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterDuration, setFilterDuration] = useState("any");
  const [filterPriceRange, setFilterPriceRange] = useState("any");
  const [sortBy, setSortBy] = useState("featured");

  const { data: allPackages, isLoading, error } = useQuery<Package[]>({
    queryKey: ['/api/packages'],
    queryFn: async () => {
      const response = await fetch('/api/packages');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data?.packages) ? data.packages : [];
    },
  });

  const handlePackageClick = (id) => {
    router.push(`?packageId=${id}`); // Using query param to open on the same page
  };

  // Apply filters and sorting
  const filteredPackages = Array.isArray(allPackages) 
  ? allPackages.filter(pkg => {
      const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            pkg.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = filterLocation === "all" || !filterLocation || pkg.location.includes(filterLocation);

      const matchesDuration = filterDuration === "any" || !filterDuration || pkg.duration.includes(filterDuration);

      let matchesPrice = true;
      if (filterPriceRange && filterPriceRange !== "any") {
        const price = parseFloat(pkg.discountPrice || pkg.price);
        switch (filterPriceRange) {
          case "under25k":
            matchesPrice = price < 25000;
            break;
          case "25k-50k":
            matchesPrice = price >= 25000 && price <= 50000;
            break;
          case "50k-75k":
            matchesPrice = price >= 50000 && price <= 75000;
            break;
          case "above75k":
            matchesPrice = price > 75000;
            break;
        }
      }

      return matchesSearch && matchesLocation && matchesDuration && matchesPrice;
    })
  : [];

  
  // Sort packages
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case "priceAsc":
        return parseFloat(a.discountPrice || a.price) - parseFloat(b.discountPrice || b.price);
      case "priceDesc":
        return parseFloat(b.discountPrice || b.price) - parseFloat(a.discountPrice || a.price);
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      case "featured":
      default:
        return b.featured ? 1 : -1;
    }
  });

  // Location options
  const locationOptions = allPackages ? 
    Array.from(new Set(allPackages.map(pkg => pkg.location.split(",")[0].trim()))) : [];
  
  // Duration options
  const durationOptions = allPackages ?
    Array.from(new Set(allPackages.map(pkg => pkg.duration.split(",")[0].trim()))) : [];

  return (
    <>
      <section className="bg-gradient-to-r from-blue-900 to-indigo-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Explore Our Travel Packages
          </h1>
          <p className="text-xl text-blue-100 text-center max-w-2xl mx-auto">
            Discover the perfect getaway with our carefully curated packages
          </p>
        </div>
      </section>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-grow">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search packages, destinations..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => document.getElementById('filtersCollapsible')?.classList.toggle('hidden')}
              >
                <FilterIcon className="h-4 w-4 mr-2" /> Filters
              </Button>
            </div>
            
            <div id="filtersCollapsible" className="hidden md:block">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="locationFilter">Location</Label>
                  <Select value={filterLocation} onValueChange={setFilterLocation}>
                    <SelectTrigger id="locationFilter">
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      {locationOptions.map(loc => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="durationFilter">Duration</Label>
                  <Select value={filterDuration} onValueChange={setFilterDuration}>
                    <SelectTrigger id="durationFilter">
                      <SelectValue placeholder="Any duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any duration</SelectItem>
                      {durationOptions.map(dur => (
                        <SelectItem key={dur} value={dur}>{dur}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="priceFilter">Price Range</Label>
                  <Select value={filterPriceRange} onValueChange={setFilterPriceRange}>
                    <SelectTrigger id="priceFilter">
                      <SelectValue placeholder="Any price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any price</SelectItem>
                      <SelectItem value="under25k">Under ₹25,000</SelectItem>
                      <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                      <SelectItem value="50k-75k">₹50,000 - ₹75,000</SelectItem>
                      <SelectItem value="above75k">Above ₹75,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="sortBy">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sortBy">
                      <SelectValue placeholder="Featured" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                      <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results Status */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {isLoading ? (
                <Skeleton className="h-8 w-48" />
              ) : (
                `${sortedPackages.length} packages found`
              )}
            </h2>
          </div>
          
          {/* Packages Grid */}
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Error loading packages. Please try again later.</p>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-60 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-7 w-3/4 mb-4" />
                    <Skeleton className="h-5 w-1/2 mb-4" />
                    <Skeleton className="h-5 w-1/2 mb-6" />
                    <div className="flex justify-between items-center">
                      <div>
                        <Skeleton className="h-6 w-20 mb-1" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-10 w-28" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : sortedPackages.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No packages found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                We couldn&apos;t find any packages matching your search criteria. Try adjusting your filters or search for something else.
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setFilterLocation("all");
                setFilterDuration("any");
                setFilterPriceRange("any");
              }}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative">
                  <Image 
                    src={pkg.imageUrl} 
                    alt={pkg.title} 
                    width={400} 
                    height={300}
                    className="w-full h-60 object-cover"
                  />
                    
                    {pkg.discountPrice && (
                      <div className="absolute top-4 right-4 bg-secondary-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        {Math.round((1 - parseFloat(pkg.discountPrice) / parseFloat(pkg.price)) * 100)}% OFF
                      </div>
                    )}
                    
                    {pkg.featured && !pkg.discountPrice && (
                      <div className="absolute top-4 right-4 bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        FEATURED
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{pkg.title}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-gray-700">{pkg.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="text-primary-500 mr-2 h-4 w-4" />
                      <span>{pkg.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-6">
                      <Calendar className="text-primary-500 mr-2 h-4 w-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        {pkg.discountPrice ? (
                          <>
                            <span className="text-gray-500 line-through">₹{pkg.price}</span>
                            <p className="text-xl font-bold text-gray-900">₹{pkg.discountPrice}</p>
                          </>
                        ) : (
                          <p className="text-xl font-bold text-gray-900">₹{pkg.price}</p>
                        )}
                        <span className="text-sm text-gray-600">per person</span>
                      </div>
                      
                      <Button 
                        className="bg-primary-500 hover:bg-primary-600"
                        onClick={() => handlePackageClick(pkg.id)}
                      >
                        View Details
                      </Button>
                    </div>
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

export default Packages;
