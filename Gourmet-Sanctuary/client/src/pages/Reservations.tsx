import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { useCreateReservation } from "@/hooks/use-reservations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertReservationSchema } from "@shared/routes";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, Users } from "lucide-react";

// Extend the shared schema to handle string parsing for guests if needed
const formSchema = insertReservationSchema.extend({
  guests: z.coerce.number().min(1, "At least 1 guest required").max(20, "For groups larger than 20, please contact us directly"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Reservations() {
  const { mutate, isPending } = useCreateReservation();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: 2,
      specialRequests: "",
    },
  });

  function onSubmit(data: FormValues) {
    mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="pt-40 pb-20 bg-foreground text-white text-center px-6">
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Reservations</h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
          Secure your table for an unforgettable evening.
        </p>
      </div>

      <div className="flex-grow container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
          
          {/* Info Side */}
          <div className="lg:w-1/3 space-y-10 order-2 lg:order-1">
            <div className="bg-secondary/30 p-8 rounded-sm border border-border">
              <h3 className="font-serif text-2xl font-bold mb-6">Reservation Policy</h3>
              <ul className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <li>• We hold tables for 15 minutes past the reservation time.</li>
                <li>• For groups larger than 10, please call us directly.</li>
                <li>• Cancellation requested 24 hours in advance.</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold">Direct Contact</h3>
              <p className="text-muted-foreground">Prefer to book by phone?</p>
              <p className="text-xl font-medium text-primary">Call Us at 011 03991537</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-2/3 order-1 lg:order-2">
            <div className="bg-white p-8 md:p-10 shadow-lg border border-border/50 rounded-sm">
              <SectionHeading title="Book a Table" subtitle="Online Booking" centered={false} className="mb-8" />
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+20..." {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Guests</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input type="number" min={1} {...field} className="pl-10 bg-background" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input type="date" {...field} className="pl-10 bg-background block" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input type="time" {...field} className="pl-10 bg-background" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Allergies, anniversaries, high chair needs..." 
                            className="resize-none bg-background min-h-[100px]" 
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full h-12 text-base uppercase tracking-widest font-semibold bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : "Confirm Reservation"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
