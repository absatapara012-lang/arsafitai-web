import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWaitlistSchema, type InsertWaitlist } from "@shared/schema";
import { useJoinWaitlist } from "@/hooks/use-waitlist";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HudButton } from "@/components/HudButton";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export function WaitlistForm() {
  const [isOpen, setIsOpen] = useState(false);
  const mutation = useJoinWaitlist();

  const form = useForm<InsertWaitlist>({
    resolver: zodResolver(insertWaitlistSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const onSubmit = (data: InsertWaitlist) => {
    mutation.mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
        form.reset();
      },
    });
  };

  if (!isOpen) {
    return (
      <HudButton onClick={() => setIsOpen(true)} className="text-xl px-12 h-16">
        Join the Revolution
      </HudButton>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md bg-white border border-[#0F172A] p-8 relative mx-auto"
    >
      <div className="absolute top-0 left-0 bg-[#22D3EE] px-2 py-0.5 text-[10px] text-[#0F172A] font-bold">
        INPUT_REQUIRED
      </div>

      <h3 className="text-2xl mb-6 text-center font-bold">INITIALIZE_PROFILE</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="CODENAME (NAME)"
                    className="bg-white border-[#22D3EE] text-[#0F172A] placeholder:text-[#0F172A]/40 focus:border-[#0F172A] focus:ring-0 rounded-none h-12 font-mono"
                    {...field}
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage className="text-destructive font-mono text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="CONTACT_VECTOR (EMAIL)"
                    className="bg-white border-[#22D3EE] text-[#0F172A] placeholder:text-[#0F172A]/40 focus:border-[#0F172A] focus:ring-0 rounded-none h-12 font-mono"
                    {...field}
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage className="text-destructive font-mono text-xs" />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-2">
            <HudButton
              type="button"
              variant="secondary"
              onClick={() => setIsOpen(false)}
              className="flex-1"
              disabled={mutation.isPending}
            >
              ABORT
            </HudButton>
            <HudButton 
              type="submit" 
              className="flex-1"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "EXECUTE"
              )}
            </HudButton>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
