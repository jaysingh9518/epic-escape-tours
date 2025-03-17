import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { Loader2 } from 'lucide-react';

interface RazorpayButtonProps {
  amount: number;
  packageId: number;
  packageName: string;
  travelers: number;
  startDate: Date;
}

interface PaymentVerificationData {
  bookingId: number;
  paymentId: string;
}

// Define window.Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export function RazorpayButton({ amount, packageId, packageName, travelers, startDate }: RazorpayButtonProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);
  
  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User must be logged in");
      
      const bookingData = {
        packageId,
        startDate: startDate.toISOString(),
        numberOfTravelers: travelers,
        totalAmount: amount.toString(),
        paymentStatus: "pending"
      };
      
      const res = await apiRequest('POST', '/api/bookings', bookingData);
      return res.json();
    },
    onSuccess: (data) => {
      setBookingId(data.id);
      initiateRazorpayPayment(data.id);
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Verify payment mutation
  const verifyPaymentMutation = useMutation({
    mutationFn: async (data: PaymentVerificationData) => {
      const res = await apiRequest('POST', '/api/payments/verify', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings/user'] });
      toast({
        title: "Payment Successful",
        description: "Your booking has been confirmed!",
      });
      setLocation("/booking-history");
    },
    onError: (error: any) => {
      toast({
        title: "Payment Verification Failed",
        description: error.message || "We couldn't verify your payment. Please contact support.",
        variant: "destructive",
      });
    },
  });
  
  const initiateRazorpayPayment = (bookingId: number) => {
    if (!window.Razorpay) {
      toast({
        title: "Payment Failed",
        description: "Payment gateway not loaded. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    // Format amount in paise (multiply by 100)
    const amountInPaise = amount * 100;
    
    const options = {
      key: "rzp_test_YOUR_KEY_ID", // This would be replaced with environment variable in production
      amount: amountInPaise,
      currency: "INR",
      name: "TravelEase",
      description: `Booking for ${packageName}`,
      order_id: bookingId.toString(), // This would be a real order ID in production
      handler: function (response: any) {
        // Handle successful payment
        if (response.razorpay_payment_id) {
          setPaymentId(response.razorpay_payment_id);
          verifyPaymentMutation.mutate({
            bookingId, 
            paymentId: response.razorpay_payment_id
          });
        }
      },
      prefill: {
        name: user ? `${user.firstName} ${user.lastName}` : '',
        email: user?.email || '',
        contact: '', // Would be filled from user profile in a real app
      },
      theme: {
        color: "#2563eb", // Primary color
      },
      modal: {
        ondismiss: function() {
          toast({
            title: "Payment Cancelled",
            description: "Your payment was cancelled. You can try again later.",
          });
        }
      }
    };
    
    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay initialization error:", error);
      toast({
        title: "Payment Error",
        description: "Could not initialize payment. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handlePayment = () => {
    createBookingMutation.mutate();
  };
  
  const isLoading = createBookingMutation.isPending || verifyPaymentMutation.isPending;

  return (
    <Button 
      className="w-full bg-primary-600 hover:bg-primary-700"
      onClick={handlePayment}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>Proceed to Payment</>
      )}
    </Button>
  );
}
