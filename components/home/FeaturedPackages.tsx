import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Star, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

const FeaturedPackages = () => {
  const { data: packages, isLoading, error } = useQuery<Package[]>({
    queryKey: ['/api/packages/featured'],
  });

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">Error loading packages. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Packages</h2>
            <p className="text-gray-600 mt-2">Explore our handpicked vacation packages</p>
          </div>
          <Link href="/packages">
            <div className="text-primary-600 hover:text-primary-700 font-medium flex items-center cursor-pointer">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, index) => (
              <Card key={index} className="overflow-hidden">
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
            ))
          ) : (
            packages?.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={pkg.imageUrl} 
                    alt={pkg.title} 
                    className="w-full h-60 object-cover"
                  />
                  
                  {pkg.discountPrice && (
                    <div className="absolute top-4 right-4 bg-secondary-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {Math.round((1 - parseFloat(pkg.discountPrice) / parseFloat(pkg.price)) * 100)}% OFF
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
                    
                    <Link href={`/packages/${pkg.id}`}>
                      <div className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded cursor-pointer inline-flex items-center justify-center font-medium text-sm">
                        View Details
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
