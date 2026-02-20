import { useState } from "react";
import {
  ScanFace,
  Utensils,
  Cpu,
  Activity,
  Zap,
  Mail,
  MapPin,
  User,
  ChevronDown,
  Phone,
  X,

  Shield,
} from "lucide-react";
import { HudButton } from "@/components/HudButton";
import { TechCard } from "@/components/TechCard";
import { SmartphoneFrame } from "@/components/SmartphoneFrame";
import { HudAnimation } from "@/components/HudAnimation";
import { Footer } from "@/components/Footer";
import { insertContactSchema, type InsertContact } from "@shared/schema";

const contacts: InsertContact[] = [];

export default function Landing() {
  const [formData, setFormData] = useState<InsertContact>({
    name: "",
    email: "",
    phone: "",
    topic: "General Inquiry",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successName, setSuccessName] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = insertContactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    contacts.push(result.data);

    setTimeout(() => {
      setSuccessName(result.data.name);
      setFormData({
        name: "",
        email: "",
        phone: "",
        topic: "General Inquiry",
        message: "",
      });
      setIsSubmitting(false);
    }, 600);
  }

  return (
    <div className="min-h-screen bg-white text-[#0F172A] overflow-x-hidden">
      <div className="fixed inset-0 hud-grid opacity-10 pointer-events-none z-0" />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-32 z-10">
        <div className="text-center max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 border border-[#22D3EE] glass-card px-4 py-1 text-sm font-mono tracking-widest text-[#22D3EE] mb-4">
            <span className="w-2 h-2 bg-[#22D3EE] rounded-full animate-pulse" />
            SYSTEM_ONLINE // V.1.0
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#0F172A] leading-tight">
            Arsa Fit AI
          </h1>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-light tracking-wider text-[#0F172A]/80">
            The Fitness Revolution is Coming.
          </h2>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#0F172A]/60 leading-relaxed">
            We are engineered to replace human trainers and automate gym
            intelligence. High-compute biomechanical form correction meets
            localized nutrition.
          </p>

          <div className="pt-4 flex justify-center">
            <div className="w-72 h-72 md:w-96 md:h-96">
              <HudAnimation />
            </div>
          </div>

          <div className="pt-4">
            <HudButton
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-lg px-12 py-5"
            >
              Join the Revolution
            </HudButton>
          </div>
        </div>
      </section>

      {/* ===== FEATURE SECTION 1: TRAINER REPLACEMENT ===== */}
      <section className="relative z-10 py-24 px-4 bg-[#F1F5F9]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-[#22D3EE]" />
            <h2 className="text-2xl md:text-4xl font-bold text-center shrink-0">
              Trainer Replacement
            </h2>
            <div className="h-px flex-1 bg-[#22D3EE]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <TechCard
                title="24/7 AI Coaching"
                icon={<Cpu className="w-6 h-6 text-[#22D3EE]" />}
              >
                No scheduling. No cancellations. Our AI coach is always
                available, providing personalized workout guidance,
                real-time form correction, and progressive overload
                tracking around the clock.
              </TechCard>
            </div>
            <div className="flex justify-center">
              <SmartphoneFrame label="Trainer AI">
                <div className="flex flex-col items-center justify-center gap-4 p-6 min-h-96">
                  <div className="w-20 h-20 rounded-full border-2 border-[#22D3EE] flex items-center justify-center">
                    <Activity className="w-10 h-10 text-[#22D3EE]" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/50">
                    Live Tracking
                  </p>
                  <div className="w-full space-y-2 px-4">
                    <div className="flex justify-between text-xs text-[#0F172A]/60">
                      <span>Squat Depth</span>
                      <span className="text-[#22D3EE]">94%</span>
                    </div>
                    <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#22D3EE] rounded-full" style={{ width: "94%" }} />
                    </div>
                    <div className="flex justify-between text-xs text-[#0F172A]/60">
                      <span>Back Angle</span>
                      <span className="text-[#22D3EE]">87%</span>
                    </div>
                    <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#22D3EE] rounded-full" style={{ width: "87%" }} />
                    </div>
                    <div className="flex justify-between text-xs text-[#0F172A]/60">
                      <span>Knee Alignment</span>
                      <span className="text-[#22D3EE]">91%</span>
                    </div>
                    <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#22D3EE] rounded-full" style={{ width: "91%" }} />
                    </div>
                  </div>
                  <div className="mt-2 px-3 py-1 bg-[#22D3EE]/10 border border-[#22D3EE] text-xs text-[#22D3EE] font-bold">
                    FORM: EXCELLENT
                  </div>
                </div>
              </SmartphoneFrame>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURE SECTION 2: LOCAL CUISINE INTELLIGENCE ===== */}
      <section className="relative z-10 py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-[#22D3EE]" />
            <h2 className="text-2xl md:text-4xl font-bold text-center shrink-0">
              Local Cuisine Intelligence
            </h2>
            <div className="h-px flex-1 bg-[#22D3EE]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <SmartphoneFrame label="Meal Scanner">
                <div className="flex flex-col items-center justify-center gap-4 p-6 min-h-96">
                  <div className="w-20 h-20 rounded-full border-2 border-[#22D3EE] flex items-center justify-center">
                    <Utensils className="w-10 h-10 text-[#22D3EE]" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/50">
                    AI Scanner
                  </p>
                  <div className="w-full space-y-3 px-4">
                    {[
                      { name: "Khichdi", cal: "320 kcal", pro: "12g" },
                      { name: "Kadhi", cal: "180 kcal", pro: "8g" },
                      { name: "Idli (3 pcs)", cal: "210 kcal", pro: "6g" },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between px-3 py-2 border border-[#22D3EE]/30 bg-[#F1F5F9]"
                      >
                        <span className="text-sm font-bold text-[#0F172A]">
                          {item.name}
                        </span>
                        <div className="text-right">
                          <p className="text-xs text-[#22D3EE] font-bold">
                            {item.cal}
                          </p>
                          <p className="text-xs text-[#0F172A]/50">
                            P: {item.pro}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 px-3 py-1 bg-[#22D3EE]/10 border border-[#22D3EE] text-xs text-[#22D3EE] font-bold">
                    99.8% ACCURACY
                  </div>
                </div>
              </SmartphoneFrame>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <TechCard
                title="Region-Locked Intelligence"
                icon={<Utensils className="w-6 h-6 text-[#22D3EE]" />}
              >
                Our Meal AI Scanner identifies complex local dishes like
                Khichdi, Kadhi, and Idli with 99.8% accuracy. No more
                guessing macros for regional cuisine.
              </TechCard>
              <TechCard
                title="Smart Macro Breakdown"
                icon={<Zap className="w-6 h-6 text-[#22D3EE]" />}
              >
                Instant protein, carbohydrate, and fat analysis for every
                meal. Our AI understands cooking methods and ingredient
                variations specific to Indian cuisine.
              </TechCard>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURE SECTION 3: PRO-ATHLETE LOGIC & KILL-SWITCH ===== */}
      <section className="relative z-10 py-24 px-4 bg-[#F1F5F9]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-[#22D3EE]" />
            <h2 className="text-2xl md:text-4xl font-bold text-center shrink-0">
              Pro-Athlete Logic
            </h2>
            <div className="h-px flex-1 bg-[#22D3EE]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <TechCard
                title="Sport-Specific Modes"
                icon={<Activity className="w-6 h-6 text-[#22D3EE]" />}
              >
                Specialized computational modes for high-performance
                athletes:
                <ul className="list-disc list-inside mt-2 text-[#0F172A]/70 space-y-1">
                  <li>Cricket Pacer Velocity Optimization</li>
                  <li>Football Striker Biomechanics</li>
                  <li>Sprint Acceleration Profiling</li>
                </ul>
              </TechCard>
              <TechCard
                title="The Kill-Switch"
                icon={<ScanFace className="w-6 h-6 text-[#22D3EE]" />}
              >
                <span className="text-[#0F172A] font-bold">
                  Automated Gateway.
                </span>{" "}
                Face-ID verification ensures absolute facility security.
                Unauthorized biological entities are rejected instantly.
                Fully automated gym access management.
              </TechCard>
            </div>
            <div className="flex justify-center">
              <SmartphoneFrame label="Kill-Switch">
                <div className="flex flex-col items-center justify-center gap-4 p-6 min-h-96">
                  <div className="w-20 h-20 rounded-full border-2 border-[#22D3EE] flex items-center justify-center">
                    <Shield className="w-10 h-10 text-[#22D3EE]" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/50">
                    Face-ID Gate
                  </p>
                  <div className="w-full px-4 space-y-3">
                    <div className="border border-[#22D3EE]/30 bg-[#F1F5F9] p-3 text-center">
                      <ScanFace className="w-12 h-12 text-[#22D3EE] mx-auto mb-2" />
                      <p className="text-xs text-[#0F172A]/70">
                        Scanning...
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs font-bold text-green-700">
                        ACCESS GRANTED
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-xs font-bold text-red-700">
                        UNAUTHORIZED
                      </span>
                    </div>
                  </div>
                </div>
              </SmartphoneFrame>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOUNDER'S NOTE ===== */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="glass-card p-12 relative cyan-glow">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#22D3EE]" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#22D3EE]" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#22D3EE]" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#22D3EE]" />

            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-[#0F172A]">
              Founder&apos;s Note
            </h3>
            <p className="text-xl md:text-2xl text-[#0F172A]/80 italic leading-relaxed">
              &ldquo;Managed by a 16-year-old visionary navigating the
              complexities of AI integration. We operate on the philosophy
              that a jack of all trades is a master of none, but oftentimes
              better than a master of one.&rdquo;
            </p>
            <div className="mt-8 space-y-1">
              <p className="font-bold text-[#22D3EE] text-lg tracking-widest">
                ARYAN SATAPARA
              </p>
              <p className="text-[#0F172A]/50 text-sm">
                Founder & CEO, Arsa Fit AI
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT & INQUIRY ===== */}
      <section id="contact" className="py-24 px-4 bg-[#F1F5F9]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-[#22D3EE]" />
            <h2 className="text-2xl md:text-4xl font-bold text-center shrink-0">
              Contact & Inquiry
            </h2>
            <div className="h-px flex-1 bg-[#22D3EE]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Contact Form */}
            <div className="glass-card p-8 cyan-glow">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/70">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#22D3EE] p-3 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50 transition-all"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/70">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#22D3EE] p-3 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50 transition-all"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/70">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#22D3EE] p-3 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50 transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/70">
                      Topic of Interest
                    </label>
                    <div className="relative">
                      <select
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#22D3EE] p-3 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50 appearance-none transition-all"
                      >
                        <option value="Gym Partnership">Gym Partnership</option>
                        <option value="Investment">Investment</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Beta Testing">Beta Testing</option>
                        <option value="Media & Press">Media & Press</option>
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#0F172A]/40"
                        size={16}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/70">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white border border-[#22D3EE] p-3 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50 resize-none transition-all"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>
                <HudButton
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  {isSubmitting ? "TRANSMITTING..." : "INITIALIZE CONTACT"}
                </HudButton>
              </form>
            </div>

            {/* Right: Direct Connect */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-[#0F172A]">
                Direct Connect
              </h3>
              <p className="text-lg text-[#0F172A]/60">
                Connect directly with our founder or the engineering team to
                discuss strategic partnerships and opportunities.
              </p>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-4 glass-card p-4 lift-hover cyan-glow">
                  <div className="w-12 h-12 border border-[#22D3EE] flex items-center justify-center text-[#22D3EE] shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/40">
                      Founder
                    </p>
                    <p className="text-lg font-bold text-[#0F172A]">
                      Aryan Satapara
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 glass-card p-4 lift-hover cyan-glow">
                  <div className="w-12 h-12 border border-[#22D3EE] flex items-center justify-center text-[#22D3EE] shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/40">
                      Email
                    </p>
                    <a
                      href="mailto:aryansatapara@arsafitai.com"
                      className="text-lg font-bold text-[#0F172A] hover:text-[#22D3EE] transition-colors"
                    >
                      aryansatapara@arsafitai.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 glass-card p-4 lift-hover cyan-glow">
                  <div className="w-12 h-12 border border-[#22D3EE] flex items-center justify-center text-[#22D3EE] shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/40">
                      Phone
                    </p>
                    <p className="text-lg font-bold text-[#0F172A]">
                      Available on request
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 glass-card p-4 lift-hover cyan-glow">
                  <div className="w-12 h-12 border border-[#22D3EE] flex items-center justify-center text-[#22D3EE] shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/40">
                      Location
                    </p>
                    <p className="text-lg font-bold text-[#0F172A]">
                      Rajkot, Gujarat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SUCCESS POPUP ===== */}
      {successName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-sm">
          <div className="glass-popup p-12 max-w-lg text-center relative cyan-glow">
            <button
              onClick={() => setSuccessName(null)}
              className="absolute top-4 right-4 text-[#0F172A]/40 hover:text-[#0F172A] transition-colors"
            >
              <X size={20} />
            </button>
            <div className="w-16 h-16 border-2 border-[#22D3EE] rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-[#22D3EE]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#0F172A]">
              Transmission Successful
            </h3>
            <p className="text-lg text-[#0F172A]/70 mb-8">
              Thank you for joining the revolution,{" "}
              <span className="font-bold text-[#22D3EE]">{successName}</span>!
              Aryan or the Arsa team will reach out to you shortly.
            </p>
            <HudButton onClick={() => setSuccessName(null)}>
              ACKNOWLEDGE
            </HudButton>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
