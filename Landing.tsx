import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { 
  ScanFace, 
  Utensils, 
  Dumbbell, 
  Cpu, 
  Activity,
  Zap,
  Mail,
  MapPin,
  User,
  ChevronDown
} from "lucide-react";
import { HudButton } from "@/components/HudButton";
import { TechCard } from "@/components/TechCard";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{name: string, message: string} | null>(null);

  const contactForm = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      topic: "General Inquiry",
      message: ""
    }
  });

  async function onContactSubmit(data: any) {
    setIsSubmitting(true);
    try {
      const res = await apiRequest("POST", "/api/contacts", data);
      const result = await res.json();
      setSuccessData({ name: result.name, message: result.message });
      contactForm.reset();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-[#0F172A] overflow-x-hidden selection:bg-[#22D3EE]/20">
      {/* Background Grid */}
      <div className="fixed inset-0 hud-grid opacity-10 pointer-events-none z-0" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-32 z-10">
        <div className="text-center max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 border border-[#22D3EE] bg-white px-4 py-1 text-sm font-mono tracking-widest text-[#22D3EE] mb-4">
            <span className="w-2 h-2 bg-[#22D3EE] rounded-full" />
            SYSTEM_ONLINE // V.1.0.0 FLAT
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase text-[#0F172A]">
            ARSA FIT AI
          </h1>

          <h2 className="text-xl md:text-3xl font-light font-orbitron tracking-wider text-[#0F172A]">
            THE FITNESS REVOLUTION IS COMING
          </h2>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#0F172A]/70 font-rajdhani leading-relaxed">
            Engineered to replace human trainers. High-compute biomechanical form correction meets localized nutrition intelligence.
          </p>

          <div className="pt-8">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="relative z-10 py-24 px-4 bg-[#F1F5F9] border-y border-[#0F172A]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[1px] flex-1 bg-[#22D3EE]" />
            <h2 className="text-3xl md:text-5xl font-bold text-center shrink-0">
              CORE PROTOCOLS
            </h2>
            <div className="h-[1px] flex-1 bg-[#22D3EE]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <TechCard title="TRAINER REPLACEMENT" icon={<Cpu className="w-6 h-6 text-[#22D3EE]" />}>
                Deprecated: Human Staff. <br/>
                Our AI-driven skeletal tracking utilizes computer vision to provide 24/7 biomechanical coaching. It sees what humans miss.
              </TechCard>
              <TechCard title="LOCALIZED NUTRITION" icon={<Utensils className="w-6 h-6 text-[#22D3EE]" />}>
                <span className="text-[#22D3EE] font-bold">Region-Locked Intelligence.</span> <br/>
                Our Meal AI Scanner identifies complex local dishes like Khichdi, Kadhi, and Idli with 99.8% accuracy.
              </TechCard>
            </div>
            <div className="hidden lg:block">
              <div className="phone-frame w-[300px] h-[600px] mx-auto border-4 border-[#0F172A] relative bg-white">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0F172A]" />
                <div className="absolute inset-4 border border-[#22D3EE] flex flex-col items-center justify-center gap-4">
                  <Activity className="w-16 h-16 text-[#22D3EE]" />
                  <div className="w-3/4 h-2 bg-[#22D3EE]" />
                  <div className="w-1/2 h-2 bg-[#22D3EE]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 px-4 bg-white border-b border-[#0F172A]">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block p-12 border border-[#22D3EE] bg-white relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-[#22D3EE]" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-[#22D3EE]" />
            <h3 className="text-2xl font-bold mb-6">Founder's Note</h3>
            <p className="text-xl md:text-2xl text-[#0F172A] font-rajdhani italic leading-relaxed">
              "Managed by a 16-year-old visionary navigating the complexities of AI integration. We operate on the philosophy that a jack of all trades is a master of none, but oftentimes better than a master of one."
            </p>
            <p className="mt-6 font-bold text-[#22D3EE]">ARYAN SATAPARA</p>
          </div>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="relative z-10 py-24 px-4 bg-[#F1F5F9] border-b border-[#0F172A]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="hidden lg:block order-2 lg:order-1">
              <div className="phone-frame w-[300px] h-[600px] mx-auto border-4 border-[#0F172A] relative bg-white">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0F172A]" />
                <div className="absolute inset-4 border border-[#22D3EE] flex flex-col items-center justify-center gap-4">
                  <Zap className="w-16 h-16 text-[#22D3EE]" />
                  <div className="w-3/4 h-2 bg-[#22D3EE]" />
                  <div className="w-1/2 h-2 bg-[#22D3EE]" />
                </div>
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <TechCard title="PRO-ATHLETE LOGIC" icon={<Activity className="w-6 h-6 text-[#22D3EE]" />}>
                Specialized computational modes for high-performance vectors.<br/>
                <ul className="list-disc list-inside mt-2 text-[#0F172A]/80 marker:text-[#22D3EE]">
                  <li>Cricket Pacer Velocity Optimization</li>
                  <li>Football Striker Biomechanics</li>
                </ul>
              </TechCard>
              <TechCard title="THE KILL-SWITCH" icon={<ScanFace className="w-6 h-6 text-[#22D3EE]" />} className="border-[#22D3EE]">
                <span className="text-[#0F172A] font-bold uppercase">Automated Gateway.</span> <br/>
                Face-ID verification ensures absolute facility security. Unauthorized biological entities are rejected instantly.
              </TechCard>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">INQUIRY GATEWAY</h2>
              <p className="text-xl text-[#0F172A]/70">Connect directly with the engineering team or discuss strategic partnerships.</p>
              
              <div className="space-y-6 pt-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[#22D3EE] flex items-center justify-center text-[#22D3EE]">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold opacity-50 uppercase">Founder</p>
                    <p className="text-lg font-bold">Aryan Satapara</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[#22D3EE] flex items-center justify-center text-[#22D3EE]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold opacity-50 uppercase">Official Email</p>
                    <p className="text-lg font-bold">aryansatapara@arsafitai.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[#22D3EE] flex items-center justify-center text-[#22D3EE]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold opacity-50 uppercase">Location</p>
                    <p className="text-lg font-bold">Rajkot, Gujarat (HQ)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border border-[#0F172A]">
              <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase">Full Name</label>
                    <input {...contactForm.register("name")} className="w-full bg-white border border-[#22D3EE] p-3 focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase">Email Address</label>
                    <input {...contactForm.register("email")} type="email" className="w-full bg-white border border-[#22D3EE] p-3 focus:outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase">Phone Number</label>
                    <input {...contactForm.register("phone")} type="tel" className="w-full bg-white border border-[#22D3EE] p-3 focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase">Topic of Interest</label>
                    <div className="relative">
                      <select {...contactForm.register("topic")} className="w-full bg-white border border-[#22D3EE] p-3 focus:outline-none appearance-none">
                        <option value="Gym Partnership">Gym Partnership</option>
                        <option value="Investment">Investment</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Beta Testing">Beta Testing</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" size={16} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase">Message</label>
                  <textarea {...contactForm.register("message")} rows={4} className="w-full bg-white border border-[#22D3EE] p-3 focus:outline-none resize-none" />
                </div>
                <HudButton disabled={isSubmitting} type="submit" className="w-full">
                  {isSubmitting ? "SENDING..." : "INITIALIZE CONTACT"}
                </HudButton>
              </form>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {successData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-none"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white border-2 border-[#22D3EE] p-12 max-w-lg text-center relative"
            >
              <h3 className="text-2xl font-bold mb-4">SUCCESS</h3>
              <p className="text-lg mb-8">{successData.message}</p>
              <HudButton onClick={() => setSuccessData(null)}>ACKNOWLEDGE</HudButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
