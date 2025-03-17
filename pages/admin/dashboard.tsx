import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  Legend
} from "recharts";
import { Loader2 } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import StatsCard from "@/components/admin/StatsCard";

// Types
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface Package {
  id: number;
  title: string;
  location: string;
  price: string;
  featured: boolean;
}

interface Booking {
  id: number;
  userId: number;
  packageId: number;
  startDate: string;
  totalAmount: string;
  paymentStatus: string;
  createdAt: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface Blog {
  id: number;
  title: string;
  createdAt: string;
}

const Dashboard = () => {
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  
  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      setLocation("/login?redirect=/admin");
    }
  }, [user, authLoading, isAdmin, setLocation]);

  // Fetch data for dashboard
  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ['/api/users'],
    enabled: !!isAdmin,
  });
  
  const { data: packages, isLoading: packagesLoading } = useQuery<Package[]>({
    queryKey: ['/api/packages'],
    enabled: !!isAdmin,
  });
  
  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ['/api/bookings'],
    enabled: !!isAdmin,
  });
  
  const { data: contacts, isLoading: contactsLoading } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
    enabled: !!isAdmin,
  });
  
  const { data: blogs, isLoading: blogsLoading } = useQuery<Blog[]>({
    queryKey: ['/api/blogs'],
    enabled: !!isAdmin,
  });

  // Check if all data is still loading
  const isLoading = authLoading || usersLoading || packagesLoading || bookingsLoading || contactsLoading || blogsLoading;
  
  // Redirect if not admin
  if (!authLoading && (!user || !isAdmin)) {
    return null;
  }
  
  // Calculate dashboard metrics
  const totalUsers = users?.length || 0;
  const totalPackages = packages?.length || 0;
  const totalBookings = bookings?.length || 0;
  const totalSales = bookings?.reduce((sum, booking) => sum + parseFloat(booking.totalAmount), 0) || 0;
  const pendingBookings = bookings?.filter(b => b.paymentStatus === "pending").length || 0;
  const completedBookings = bookings?.filter(b => b.paymentStatus === "completed").length || 0;
  const unreadMessages = contacts?.filter(c => !c.read).length || 0;
  const totalBlogs = blogs?.length || 0;
  
  // Prepare charts data
  const salesByMonth = [
    { name: 'Jan', sales: 0 },
    { name: 'Feb', sales: 0 },
    { name: 'Mar', sales: 0 },
    { name: 'Apr', sales: 0 },
    { name: 'May', sales: 0 },
    { name: 'Jun', sales: 0 },
    { name: 'Jul', sales: 0 },
    { name: 'Aug', sales: 0 },
    { name: 'Sep', sales: 0 },
    { name: 'Oct', sales: 0 },
    { name: 'Nov', sales: 0 },
    { name: 'Dec', sales: 0 },
  ];
  
  if (bookings) {
    bookings.forEach(booking => {
      const date = new Date(booking.createdAt);
      const month = date.getMonth(); // 0-based index
      salesByMonth[month].sales += parseFloat(booking.totalAmount);
    });
  }
  
  // Top destinations data (simulate with locations from packages)
  const destinationsMap = new Map();
  packages?.forEach(pkg => {
    const location = pkg.location.split(',')[0].trim(); // Get main location
    destinationsMap.set(location, (destinationsMap.get(location) || 0) + 1);
  });
  
  const topDestinations = Array.from(destinationsMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => (b.value as number) - (a.value as number))
    .slice(0, 5);
  
  // Payment status distribution
  const paymentStatusData = [
    { name: 'Completed', value: completedBookings },
    { name: 'Pending', value: pendingBookings },
  ];
  
  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - TravelEase</title>
        <meta name="description" content="Admin dashboard for TravelEase - manage packages, bookings, users, and more." />
      </Helmet>
      
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 mb-8">Welcome back, {user?.firstName}!</p>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
              </div>
            ) : (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatsCard 
                    title="Total Sales" 
                    value={`₹${totalSales.toLocaleString()}`} 
                    description="All-time revenue" 
                    icon="currency"
                    trend={+8.2}
                  />
                  <StatsCard 
                    title="Total Bookings" 
                    value={totalBookings.toString()} 
                    description={`${pendingBookings} pending`} 
                    icon="bookings"
                    trend={+12.5}
                  />
                  <StatsCard 
                    title="Active Users" 
                    value={totalUsers.toString()} 
                    description="Registered accounts" 
                    icon="users"
                    trend={+4.6}
                  />
                  <StatsCard 
                    title="Messages" 
                    value={unreadMessages.toString()} 
                    description="Unread contacts" 
                    icon="messages"
                    trend={-2.3}
                  />
                </div>
                
                {/* Charts */}
                <Tabs defaultValue="sales" className="mb-8">
                  <TabsList className="w-full grid grid-cols-3 mb-4">
                    <TabsTrigger value="sales">Sales & Revenue</TabsTrigger>
                    <TabsTrigger value="destinations">Popular Destinations</TabsTrigger>
                    <TabsTrigger value="bookings">Booking Status</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="sales">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-6">Sales Overview</h3>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={salesByMonth}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
                              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                              <Legend />
                              <Line 
                                type="monotone" 
                                dataKey="sales" 
                                name="Monthly Revenue" 
                                stroke="#8884d8" 
                                activeDot={{ r: 8 }} 
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="destinations">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-6">Popular Destinations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="h-80 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={topDestinations}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {topDestinations.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div>
                            <h4 className="font-medium mb-4">Top Destinations</h4>
                            <ul className="space-y-3">
                              {topDestinations.map((destination, index) => (
                                <li key={index} className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div 
                                      className="w-3 h-3 rounded-full mr-3" 
                                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    ></div>
                                    <span>{destination.name}</span>
                                  </div>
                                  <span className="font-medium">{destination.value} packages</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="bookings">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-6">Booking Status Distribution</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="h-80 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={paymentStatusData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  <Cell fill="#4CAF50" />
                                  <Cell fill="#FFC107" />
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={[
                                  { name: 'Completed', value: completedBookings },
                                  { name: 'Pending', value: pendingBookings },
                                ]}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" name="Number of Bookings" fill="#8884d8" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Package Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Packages</span>
                          <span className="font-medium">{totalPackages}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Featured Packages</span>
                          <span className="font-medium">{packages?.filter(p => p.featured).length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Average Price</span>
                          <span className="font-medium">
                            ₹{Math.round(packages?.reduce((sum, p) => sum + parseFloat(p.price), 0) / totalPackages).toLocaleString() || 0}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Blog Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Blogs</span>
                          <span className="font-medium">{totalBlogs}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Recent Posts</span>
                          <span className="font-medium">
                            {blogs?.filter(b => new Date(b.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Categories</span>
                          <span className="font-medium">4</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Contact Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Messages</span>
                          <span className="font-medium">{contacts?.length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Unread Messages</span>
                          <span className="font-medium">{unreadMessages}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Response Rate</span>
                          <span className="font-medium">
                            {contacts?.length ? 
                              `${Math.round(((contacts.length - unreadMessages) / contacts.length) * 100)}%` 
                              : "0%"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
