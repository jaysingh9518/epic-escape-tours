import { useState } from "react";
import { useLocation } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Users, Search } from "lucide-react";

const Hero = () => {
  const [, setLocation] = useLocation();
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [travelers, setTravelers] = useState("1 Adult");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/packages?destination=${encodeURIComponent(destination)}`);
  };

  return (
    <section className="relative h-[600px] bg-gradient-to-r from-blue-900 to-indigo-800 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" 
          alt="Beautiful beach destination" 
          className="object-cover w-full h-full opacity-40"
        />
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Your Perfect Getaway
          </h1>
          <p className="text-xl mb-8">
            Explore handpicked destinations and create memories that last a lifetime.
          </p>
          
          {/* Search Form */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Where to?"
                      className="pl-10"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Dates
                  </label>
                  <div className="relative">
                    <Calendar className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="When?"
                      className="pl-10"
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Travelers
                  </label>
                  <div className="relative">
                    <Users className="absolute top-3 left-3 h-4 w-4 text-gray-400 z-10" />
                    <Select value={travelers} onValueChange={setTravelers}>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select travelers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 Adult">1 Adult</SelectItem>
                        <SelectItem value="2 Adults">2 Adults</SelectItem>
                        <SelectItem value="2 Adults, 1 Child">2 Adults, 1 Child</SelectItem>
                        <SelectItem value="2 Adults, 2 Children">2 Adults, 2 Children</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Button 
                type="submit" 
                className="mt-4 w-full bg-secondary-500 hover:bg-secondary-600 text-white"
              >
                <Search className="mr-2 h-4 w-4" /> Search Packages
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
