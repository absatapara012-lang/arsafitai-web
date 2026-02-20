import { useMutation } from "@tanstack/react-query";
import { type InsertWaitlist } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// inferred API path based on requirements
const API_PATH = "/api/waitlist";

export function useJoinWaitlist() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertWaitlist) => {
      const res = await fetch(API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to join waitlist");
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "ACCESS GRANTED",
        description: "You have been added to the protocol queue.",
        variant: "default",
        className: "border-primary text-primary bg-background/90 font-mono",
      });
    },
    onError: (error) => {
      toast({
        title: "ACCESS DENIED",
        description: error.message,
        variant: "destructive",
        className: "font-mono border-destructive bg-background/90",
      });
    },
  });
}
