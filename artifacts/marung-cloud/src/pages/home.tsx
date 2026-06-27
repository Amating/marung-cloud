import { motion } from "framer-motion";
import { useState } from "react";
import { Smartphone, ArrowRight, Users, Globe, ChevronDown, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImg from "@/assets/logo.png";
import heroImg from "@/assets/hero.png";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
};

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
      data-testid={`nav-${label.toLowerCase()}`}
    >
      {label}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
      {children}
    </p>
  );
}

export default function Home() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email) {
      setContactSent(true);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground overflow-x-hidden">

      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between bg-background/80 backdrop-blur-lg border-b border-border">
        <a href="#home" className="flex items-center gap-3 no-underline" data-testid="nav-logo">
          <img src={logoImg} alt="Marung" className="h-8 w-8 object-contain" />
          <span className="font-display font-semibold text-lg tracking-wide text-foreground">Marung</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#home" label="Home" />
          <NavLink href="#about" label="About" />
          <NavLink href="#product" label="Product" />
          <NavLink href="#contact" label="Contact" />
          <a
            href="/investors"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            data-testid="nav-investors"
          >
            Investors
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/pitch"
            data-testid="btn-nav-pitch"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
          >
            Pitch Deck
          </a>
        </div>

      </nav>

      <main className="pt-20">

        {/* ── HOME ── */}
        <section
          id="home"
          className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 text-center py-24"
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background z-10" />
            <img
              src={heroImg}
              alt="Community"
              className="w-full h-full object-cover opacity-25"
            />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="relative z-10 max-w-3xl mx-auto space-y-8"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary border border-primary/40 rounded-full px-4 py-1.5">
                Marung Sebaka Technologies
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-display font-bold leading-[1.1] text-foreground"
            >
              Marung
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-foreground/80 max-w-xl mx-auto leading-relaxed"
            >
              Money sent to your phone should be easier to use.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Marung Sebaka Technologies is building a simpler digital money journey for people
              who already receive money through their mobile numbers. No complexity. No
              unnecessary steps. Just a better way to use what you already receive.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href="#product"
                data-testid="btn-hero-learn"
                className="inline-flex items-center gap-2 px-8 h-13 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
              >
                See How It Works <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#about"
                data-testid="btn-hero-about"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Learn more <ChevronDown className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="py-24 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">

            {/* What Marung Is */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="mb-24 grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6">
                <motion.div variants={fadeUp}>
                  <SectionLabel>About</SectionLabel>
                  <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                    What Marung Is
                  </h2>
                </motion.div>
                <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                  Marung is built around a real everyday situation.
                </motion.p>
                <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                  Money is sent from a bank to a mobile number, but to use it, people often have
                  to withdraw cash first.
                </motion.p>
                <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                  Marung is designed to change that. It helps keep that money digital, visible,
                  and easier to use — without forcing people into queues, travel, or extra steps.
                </motion.p>
              </div>

              <motion.div
                variants={fadeUp}
                className="bg-card border border-border rounded-2xl p-8 space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Money comes to your number</h3>
                    <p className="text-sm text-muted-foreground">Sent from a bank, received on your mobile</p>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Linked to Visa or Mastercard</h3>
                    <p className="text-sm text-muted-foreground">Your wallet balance becomes spendable — anywhere</p>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Transact anywhere — R10/month</h3>
                    <p className="text-sm text-muted-foreground">In-store, online, or send to family. No bank account needed.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* For Our Communities */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="mb-24"
            >
              <motion.div variants={fadeUp} className="mb-10">
                <SectionLabel>Community</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-display font-bold">For Our Communities</h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                  Marung is shaped by real life. It lives where people already move money —
                  between family and friends, at salons and small businesses, with delivery
                  drivers and workers, and across communities.
                </motion.p>
                <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                  It is built to be simple enough for anyone to understand and use.
                </motion.p>
              </div>

              <motion.div
                variants={stagger}
                className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  { label: "Family & Friends", icon: Users },
                  { label: "Salons & Small Businesses", icon: Users },
                  { label: "Delivery Drivers", icon: Smartphone },
                  { label: "Across Communities", icon: Globe },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    data-testid={`community-card-${i}`}
                    className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3"
                  >
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium leading-snug">{item.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Financial Inclusion */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="bg-card border border-border rounded-2xl p-8 md:p-12"
            >
              <motion.div variants={fadeUp} className="mb-6">
                <SectionLabel>Impact</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-display font-bold">Financial Inclusion</h2>
              </motion.div>
              <motion.div variants={stagger} className="grid md:grid-cols-2 gap-8">
                <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                  Marung contributes to a broader shift toward a society where more people can
                  participate in the economy without barriers.
                </motion.p>
                <motion.div variants={fadeUp} className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-muted-foreground">
                      Aligned with the Sustainable Development Goals (SDGs)
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-muted-foreground">
                      Supports South Africa's National Development Plan 2030
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-muted-foreground">
                      Practical, everyday access to digital financial tools
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* ── PRODUCT ── */}
        <section id="product" className="py-24 px-6 md:px-12 bg-secondary/20 border-y border-border">
          <div className="max-w-5xl mx-auto">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="mb-16 text-center max-w-2xl mx-auto"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>Product</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-display font-bold">How It Works</h2>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid md:grid-cols-3 gap-6 mb-20"
            >
              {[
                {
                  step: "1",
                  title: "Cash send lands on your number",
                  desc: "Any of South Africa's 6 major banks sends a cash-send transfer to your mobile number — as people already do every day.",
                },
                {
                  step: "2",
                  title: "It lands in your Marung wallet",
                  desc: "Instead of forcing you to an ATM, the money arrives in your Marung digital wallet — visible and ready to use. R10/month keeps it active.",
                },
                {
                  step: "3",
                  title: "Spend it with Visa or Mastercard",
                  desc: "Your wallet balance is linked to Visa or Mastercard. Transact in-store, online, or send to anyone — no bank account needed.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  data-testid={`step-card-${i}`}
                  className="bg-card border border-border rounded-2xl p-8 space-y-4 relative overflow-hidden"
                >
                  <div className="text-7xl font-display font-bold text-primary/10 absolute top-4 right-6 leading-none select-none">
                    {item.step}
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{item.step}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl leading-snug">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Why It Matters */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-10 text-center">
                <SectionLabel>Why It Matters</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-display font-bold">
                  Receiving money is not the problem.
                  <br />
                  <span className="text-primary">Using it is.</span>
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Reduce unnecessary movement",
                    desc: "No long distances to travel just to access money you already received.",
                  },
                  {
                    title: "Fewer long queues",
                    desc: "Less time waiting in lines to withdraw or transfer — more time for what matters.",
                  },
                  {
                    title: "Less dependence on cash",
                    desc: "A smoother path between receiving money and using it — digital, visible, and yours.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    data-testid={`benefit-card-${i}`}
                    className="border border-border rounded-xl p-6 space-y-3 hover:border-primary/50 transition-colors"
                  >
                    <div className="h-2 w-8 rounded-full bg-primary" />
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid md:grid-cols-2 gap-16 items-start"
            >
              <div className="space-y-8">
                <motion.div variants={fadeUp}>
                  <SectionLabel>Contact</SectionLabel>
                  <h2 className="text-4xl md:text-5xl font-display font-bold">Get in Touch</h2>
                </motion.div>
                <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                  Whether you are interested in learning more, want to get early access, or want
                  to speak with us about partnerships — we would like to hear from you.
                </motion.p>
                <motion.div variants={fadeUp} className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-5 w-5 text-primary shrink-0" />
                    <span>hello@marung.co.za</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <span>Cape Town, South Africa</span>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={fadeUp}>
                {!contactSent ? (
                  <form
                    onSubmit={handleContactSubmit}
                    className="space-y-5 bg-card border border-border rounded-2xl p-8"
                    data-testid="contact-form"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Your Name</label>
                      <Input
                        type="text"
                        placeholder="Name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))}
                        className="bg-background border-border focus:border-primary"
                        required
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email Address</label>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
                        className="bg-background border-border focus:border-primary"
                        required
                        data-testid="input-contact-email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Message</label>
                      <textarea
                        placeholder="How can we help?"
                        value={contactForm.message}
                        onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
                        rows={4}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition resize-none"
                        data-testid="input-contact-message"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                      data-testid="btn-contact-submit"
                    >
                      Send Message <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card border border-border rounded-2xl p-8 text-center space-y-4"
                    data-testid="contact-success"
                  >
                    <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                      <ArrowRight className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-2xl">Message Received</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We will be in touch with you shortly.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-border py-10 px-6 md:px-12">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Marung" className="h-7 w-7 object-contain" />
              <span className="font-display font-semibold text-base">Marung</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#home" className="hover:text-primary transition-colors">Home</a>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#product" className="hover:text-primary transition-colors">Product</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
              <a href="/investors" className="hover:text-primary transition-colors">Investors</a>
              <a href="/pitch" className="hover:text-primary transition-colors">Pitch</a>
              <a href="/model" className="hover:text-primary transition-colors">Model</a>
              <a href="/traction" className="hover:text-primary transition-colors">Traction</a>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              &copy; 2026 Marung Sebaka Technologies (Pty) Ltd · Reg. 2026/221199/07
            </p>
          </div>
        </footer>

      </main>
    </div>
  );
}
