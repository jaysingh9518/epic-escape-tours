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
  CardDescription,
  CardFooter 
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/admin/Sidebar";
import { 
  Search, 
  MoreVertical, 
  Trash2, 
  Loader2, 
  ArrowUpDown,
  Calendar,
  CheckCircle,
  Eye,
  MailOpen,
  Mail
} from "lucide-react";

// Types
interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const ManageContacts = () => {
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  const { toast } = useToast();
  
  // State
  const [tab, setTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  const ITEMS_PER_PAGE = 10;
  
  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      setLocation("/login?redirect=/admin/contacts");
    }
  }, [user, authLoading, isAdmin, setLocation]);

  // Fetch contacts
  const { data: contacts, isLoading: contactsLoading } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
    enabled: !!isAdmin,
  });
  
  // Delete contact mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/contacts/${id}`, undefined);
    },
    onSuccess: () => {
      toast({
        title: "Message Deleted",
        description: "The contact message has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete message.",
        variant: "destructive",
      });
    },
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest('PUT', `/api/contacts/${id}/read`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      
      // Don't show toast when viewing a message, only when using the mark as read button directly
      if (!isViewDialogOpen) {
        toast({
          title: "Message Marked as Read",
          description: "The message has been marked as read.",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Action Failed",
        description: error.message || "Failed to mark message as read.",
        variant: "destructive",
      });
    },
  });

  // Handle delete contact
  const handleDeleteContact = () => {
    if (selectedContact) {
      deleteMutation.mutate(selectedContact.id);
    }
  };

  // Handle mark as read
  const handleMarkAsRead = (id: number) => {
    markAsReadMutation.mutate(id);
  };
  
  // Handle view contact - also marks as read if needed
  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsViewDialogOpen(true);
    
    // Mark as read if currently unread
    if (!contact.read) {
      markAsReadMutation.mutate(contact.id);
    }
  };
  
  // Filter contacts based on tab and search term
  const filteredContacts = contacts?.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = tab === "all" || 
                      (tab === "unread" && !contact.read) || 
                      (tab === "read" && contact.read);
    
    return matchesSearch && matchesTab;
  }) || [];
  
  // Sort contacts
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (sortBy === "createdAt") {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }
    
    const valueA = a[sortBy as keyof Contact] as string | boolean;
    const valueB = b[sortBy as keyof Contact] as string | boolean;
    
    if (typeof valueA === "boolean" && typeof valueB === "boolean") {
      return sortOrder === "asc" ? (valueA ? 1 : -1) : (valueA ? -1 : 1);
    }
    
    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc" 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    return 0;
  });
  
  // Paginate contacts
  const totalPages = Math.ceil(sortedContacts.length / ITEMS_PER_PAGE);
  const paginatedContacts = sortedContacts.slice(
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
  
  // Count unread messages
  const unreadCount = contacts?.filter(contact => !contact.read).length || 0;
  
  // Redirect if not admin
  if (!authLoading && (!user || !isAdmin)) {
    return null;
  }
  
  const isLoading = authLoading || contactsLoading;

  return (
    <>
      <Helmet>
        <title>Manage Messages - TravelEase Admin</title>
        <meta name="description" content="Admin interface to manage customer messages and inquiries." />
      </Helmet>
      
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-1">Customer Messages</h1>
                <p className="text-gray-600">Manage and respond to customer inquiries</p>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>All Messages</CardTitle>
                <CardDescription>
                  {unreadCount > 0 ? (
                    <span>You have <span className="text-primary-600 font-medium">{unreadCount} unread</span> messages</span>
                  ) : (
                    "All messages have been read"
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="md:w-1/2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search messages..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Tabs value={tab} onValueChange={setTab} className="md:w-1/2">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="unread">
                        Unread
                        {unreadCount > 0 && <Badge className="ml-1 bg-primary-600">{unreadCount}</Badge>}
                      </TabsTrigger>
                      <TabsTrigger value="read">Read</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
                  </div>
                ) : paginatedContacts.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                      <Mail className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Messages Found</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      {searchTerm 
                        ? "We couldn't find any messages matching your search criteria." 
                        : tab === "unread" 
                          ? "You've read all your messages. Great job!" 
                          : "There are no messages in this category."}
                    </p>
                    {searchTerm && (
                      <Button onClick={() => setSearchTerm("")}>
                        Clear Search
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-10">Status</TableHead>
                            <TableHead>
                              <button 
                                className="flex items-center font-semibold"
                                onClick={() => toggleSort("name")}
                              >
                                Name
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                              </button>
                            </TableHead>
                            <TableHead>
                              <button 
                                className="flex items-center font-semibold"
                                onClick={() => toggleSort("subject")}
                              >
                                Subject
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                              </button>
                            </TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>
                              <button 
                                className="flex items-center font-semibold"
                                onClick={() => toggleSort("createdAt")}
                              >
                                Date
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                              </button>
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedContacts.map((contact) => (
                            <TableRow 
                              key={contact.id}
                              className={contact.read ? "" : "bg-blue-50"}
                            >
                              <TableCell>
                                {contact.read ? (
                                  <div className="text-green-500" title="Read">
                                    <MailOpen className="h-5 w-5" />
                                  </div>
                                ) : (
                                  <div className="text-blue-500" title="Unread">
                                    <Mail className="h-5 w-5" />
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="font-medium">{contact.name}</TableCell>
                              <TableCell>{contact.subject}</TableCell>
                              <TableCell className="font-mono text-sm">{contact.email}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                                  <span>{format(new Date(contact.createdAt), "MMM d, yyyy")}</span>
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
                                    <DropdownMenuItem
                                      onClick={() => handleViewContact(contact)}
                                    >
                                      <Eye className="h-4 w-4 mr-2" />
                                      <span>View</span>
                                    </DropdownMenuItem>
                                    
                                    {!contact.read && (
                                      <DropdownMenuItem
                                        onClick={() => handleMarkAsRead(contact.id)}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        <span>Mark as Read</span>
                                      </DropdownMenuItem>
                                    )}
                                    
                                    <DropdownMenuItem
                                      className="text-red-600 focus:text-red-600" 
                                      onClick={() => {
                                        setSelectedContact(contact);
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
              Are you sure you want to delete this message from {selectedContact?.name}? This action cannot be undone.
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
              onClick={handleDeleteContact}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>Delete Message</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Message Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedContact?.subject}</DialogTitle>
            <DialogDescription>
              From {selectedContact?.name} ({selectedContact?.email})
            </DialogDescription>
          </DialogHeader>
          
          <div>
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {selectedContact && format(new Date(selectedContact.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                </span>
              </div>
              <div>
                {selectedContact?.read ? (
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" /> Read
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    <Mail className="h-3 w-3 mr-1" /> Unread
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md min-h-[150px] mb-4">
              <p className="whitespace-pre-line">{selectedContact?.message}</p>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold mb-2">Quick Reply</h4>
              <div className="flex gap-2 mb-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    // In a real implementation, this would open the default email client
                    window.location.href = `mailto:${selectedContact?.email}?subject=Re: ${selectedContact?.subject}`;
                  }}
                >
                  Reply via Email
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageContacts;
