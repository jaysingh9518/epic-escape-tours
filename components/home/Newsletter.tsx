import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// Form validation schema
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const newsletterMutation = useMutation({
    mutationFn: async (data: NewsletterFormValues) => {
      // This endpoint doesn't exist yet, assuming it would be created
      // This is a mock subscription
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Subscription Successful",
        description: "Thank you for subscribing to our newsletter!",
      });
      setSubmitted(true);
    },
    onError: () => {
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NewsletterFormValues) => {
    newsletterMutation.mutate(data);
  };

  return (
    <section className="py-16 bg-primary-700">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Get Travel Inspiration & Special Offers
          </h2>
          <p className="mb-8">
            Subscribe to our newsletter and be the first to know about exclusive deals and seasonal specials
          </p>
          
          {submitted ? (
            <div className="bg-white/10 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-2">Thank You for Subscribing!</h3>
              <p>
                You're now on the list to receive our best travel deals and inspiration.
                Check your inbox soon for a welcome message from our team.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col md:flex-row gap-3"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input
                          placeholder="Your email address"
                          className="px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary-500 h-auto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-amber-200" />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="bg-secondary-500 hover:bg-secondary-600 px-6 py-3 rounded-lg font-semibold h-auto"
                  disabled={newsletterMutation.isPending}
                >
                  {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </Form>
          )}
          
          <p className="mt-4 text-sm text-blue-200">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
