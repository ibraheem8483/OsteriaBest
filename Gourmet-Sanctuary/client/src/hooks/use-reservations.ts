import { useMutation } from "@tanstack/react-query";
import { api, type CreateReservationInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateReservation() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: CreateReservationInput) => {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.reservations.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create reservation");
      }

      return api.reservations.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Reservation Received",
        description: "Thank you! We will confirm your table shortly.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit reservation. Please try again.",
        variant: "destructive",
      });
    },
  });
}
