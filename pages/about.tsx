import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Award, Heart, Clock, Target } from "lucide-react";

const About = () => {
  // Team members
  const teamMembers = [
    {
      name: "Rahul Sharma",
      position: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "With over 15 years in the travel industry, Rahul founded TravelEase with a vision to make authentic travel experiences accessible to everyone."
    },
    {
      name: "Priya Patel",
      position: "Chief Experience Officer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Priya oversees all aspects of customer experience, ensuring each journey is personalized and memorable."
    },
    {
      name: "Arjun Singh",
      position: "Head of Destinations",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      bio: "Arjun's extensive knowledge of global destinations helps us curate off-the-beaten-path experiences."
    },
    {
      name: "Neha Gupta",
      position: "Customer Relations Manager",
      image: "https://randomuser.me/api/portraits/women/17.jpg",
      bio: "Neha ensures every traveler receives prompt, personalized support throughout their journey."
    }
  ];

  // Milestones
  const milestones = [
    {
      year: "2010",
      title: "Founded in New Delhi",
      description: "TravelEase was established with a mission to revolutionize the travel experience."
    },
    {
      year: "2013",
      title: "Expanded to International Destinations",
      description: "Added our first international packages, starting with Southeast Asia."
    },
    {
      year: "2016",
      title: "Launched Digital Platform",
      description: "Introduced our online booking system to streamline customer experience."
    },
    {
      year: "2018",
      title: "100,000 Happy Travelers",
      description: "Reached a major milestone of serving one hundred thousand satisfied customers."
    },
    {
      year: "2020",
      title: "Sustainable Tourism Initiative",
      description: "Launched our eco-friendly travel program supporting local communities."
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description: "Received Travel Excellence Award for innovation in customer experience."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - TravelEase</title>
        <meta name="description" content="Learn about TravelEase's journey, our passionate team, and our commitment to creating unforgettable travel experiences." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-900 to-indigo-800">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" 
            alt="Team of travel experts" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Journey To Redefine Travel
            </h1>
            <p className="text-xl text-blue-100">
              Since 2010, we've been crafting unforgettable experiences for adventurers around the world
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600">
              TravelEase was born from a simple yet powerful idea: that travel should be transformative, 
              accessible, and stress-free. What began as a small team working from a tiny office in New Delhi 
              has evolved into a trusted travel partner for thousands of explorers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1515898913320-f38370edab7a" 
                alt="Our journey" 
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">From Passion to Purpose</h3>
              <p className="text-gray-600 mb-4">
                Our founder, Rahul Sharma, started TravelEase after years of helping friends and family 
                plan their perfect vacations. His passion for discovering hidden gems and creating 
                tailored itineraries soon became the foundation of our company philosophy.
              </p>
              <p className="text-gray-600 mb-4">
                We began by offering curated experiences across India, focusing on authentic local 
                connections rather than standard tourist routes. As word spread about our unique approach, 
                we expanded to international destinations while maintaining our commitment to thoughtful, 
                immersive travel.
              </p>
              <p className="text-gray-600">
                Today, TravelEase serves travelers from around the world, but our core mission remains 
                unchanged: to transform ordinary trips into extraordinary journeys.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
                <p className="text-gray-600">
                  We believe in real experiences that connect travelers with local cultures, traditions, and people.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Personalization</h3>
                <p className="text-gray-600">
                  Every traveler is unique, and we take pride in crafting journeys that reflect individual preferences and dreams.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  From the first inquiry to the journey home, we're committed to providing outstanding service and attention to detail.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary-600 mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">13+</div>
              <p className="text-blue-200">Years of Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">250k+</div>
              <p className="text-blue-200">Happy Travelers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">45+</div>
              <p className="text-blue-200">Destinations</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8/5</div>
              <p className="text-blue-200">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Company Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="tab1" className="mb-10">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tab1">2010-2015</TabsTrigger>
                <TabsTrigger value="tab2">2016-2020</TabsTrigger>
                <TabsTrigger value="tab3">2021-Present</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tab1" className="mt-6">
                <div className="space-y-8">
                  {milestones.slice(0, 2).map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-700 font-bold">{milestone.year}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{milestone.title}</h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tab2" className="mt-6">
                <div className="space-y-8">
                  {milestones.slice(2, 4).map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-700 font-bold">{milestone.year}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{milestone.title}</h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tab3" className="mt-6">
                <div className="space-y-8">
                  {milestones.slice(4, 6).map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-700 font-bold">{milestone.year}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{milestone.title}</h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-primary-50 p-8 rounded-lg">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To transform the way people experience the world by crafting journeys that inspire, 
                educate, and connect. We strive to make authentic travel accessible to all, while 
                supporting local communities and preserving cultural heritage.
              </p>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To become the most trusted travel partner globally, known for creating transformative 
                experiences that respect local cultures and environments. We envision a world where 
                travel bridges divides, broadens perspectives, and fosters global citizenship.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Office Locations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Where to Find Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-primary-500 mr-2" />
                  <h3 className="text-xl font-semibold">New Delhi</h3>
                </div>
                <p className="text-gray-600 mb-2">123 Travel Plaza,</p>
                <p className="text-gray-600 mb-2">Sector 15, New Delhi</p>
                <p className="text-gray-600 mb-2">110001, India</p>
                <p className="text-gray-600">+91 98765 43210</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-primary-500 mr-2" />
                  <h3 className="text-xl font-semibold">Mumbai</h3>
                </div>
                <p className="text-gray-600 mb-2">456 Traveler's Hub,</p>
                <p className="text-gray-600 mb-2">Bandra West, Mumbai</p>
                <p className="text-gray-600 mb-2">400050, India</p>
                <p className="text-gray-600">+91 91234 56789</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-primary-500 mr-2" />
                  <h3 className="text-xl font-semibold">Bangalore</h3>
                </div>
                <p className="text-gray-600 mb-2">789 Voyage Center,</p>
                <p className="text-gray-600 mb-2">Indiranagar, Bangalore</p>
                <p className="text-gray-600 mb-2">560038, India</p>
                <p className="text-gray-600">+91 87654 32109</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
