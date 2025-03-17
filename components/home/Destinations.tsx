import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Types
interface Destination {
  id: number;
  name: string;
  country: string;
  imageUrl: string;
  popular: boolean;
}

const Destinations = () => {
  const { data: destinations, isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations/popular'],
  });

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">Error loading destinations. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Popular Destinations</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Explore our most sought-after destinations loved by travelers worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            // Loading skeleton
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden h-64">
                <Skeleton className="h-full w-full" />
              </div>
            ))
          ) : (
            destinations?.map((destination) => (
              <Link key={destination.id} href={`/packages?destination=${encodeURIComponent(destination.name)}`}>
                <div className="relative rounded-xl overflow-hidden group h-64 cursor-pointer">
                  <img 
                    src={destination.imageUrl} 
                    alt={`${destination.name}, ${destination.country}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" /> {destination.country}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/packages">
            <Button variant="outline" className="bg-white border-primary-500 text-primary-600 hover:bg-primary-50">
              Explore All Destinations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
