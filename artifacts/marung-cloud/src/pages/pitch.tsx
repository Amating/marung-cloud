import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function SlideLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-display font-bold text-5xl md:text-7xl text-primary/20 leading-none select-none tabular-nums">
        {number}
      </span>
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-primary">{label}</p>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="w-full h-px bg-border my-0" />;
}

export default function Pitch() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between bg-background/80 backdrop-blur-lg border-b border-border">
        <a href="/" className="flex items-center gap-
       <span className="font-display font-semibold text-lg tracking-wide">Marung</span>
        </a>
        <div className="flex items-center gap-3">
          <a
            href="/pitch-pdf"
            target="_blank"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-lg border border-border hover:bg-card transition-colors"
          >
            Download PDF
          </a>
          <a
            href="mailto:hello@marung.co.za"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Contact Us <Mail className="h-4 w-4" />
          </a>
        </div>
      </nav>

      <main className="pt-24 pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-0">

          {/* ── COVER ── */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="min-h-[70vh] flex flex-col justify-center py-20 border-b border-border"
            data-testid="pitch-cover"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-primary mb-6">
              Pre-Seed Investment Opportunity · April 2026
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-8">
              Money sent to your<br />phone should be<br />
              <span className="text-primary">easier to use.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
              Marung Sebaka Technologies is building a simpler digital money journey for
              11 million South Africans who receive money on their mobile — but are forced
              to withdraw it as cash before they can use it.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 text-sm">
              {[
                { label: "Pre-Seed Ask", value: "R 3 Million" },
                { label: "Registered", value: "2026/221199/07" },
                { label: "Launch Target", value: "October 2026" },
                { label: "SADC Cross-Border", value: "November 2026" },
              ].map((s) => (
                <div key={s.label} className="bg-card border border-border rounded-xl px-5 py-4 min-w-[140px]">
                  <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                  <p className="font-display font-bold text-lg text-primary">{s.value}</p>
                </div>
              ))}
            </motion.div>
          </motion.section>

          {/* ── 01 PROBLEM ── */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="py-20 border-b border-border"
            data-testid="pitch-problem"
          >
            <motion.div variants={fadeUp}>
              <SlideLabel number="01" label="Problem" />
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-display font-bold leading-tight mb-8">
              Receiving money is easy.<br />
              <span className="text-primary">Using it is not.</span>
            </motion.h2>

            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                South Africa's four major banks allow anyone to send money directly to a mobile number —
                no bank account required for the recipient. This reaches 11 million unbanked South Africans
                where they already are: their phones.
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                But the money arrives as a "cash send" — it can only be accessed by withdrawing physical
                cash at an ATM or retail point. The money is already digital. The infrastructure is already
                there. Yet every rand is forced back into cash before it can be spent.
              </motion.p>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  stat: "11M",
                  label: "South Africans without a bank account",
                  detail: "The largest financially excluded population in Southern Africa",
                },
                {
                  stat: "R60+",
                  label: "Average cost of an ATM cash withdrawal",
                  detail: "A real cost burden for recipients of small, frequent transfers",
                },
                {
                  stat: "3–5km",
                  label: "Average travel to access a withdrawal point",
                  detail: "Peri-urban and rural communities travel far just to get their own money",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-card border border-border rounded-2xl p-6 space-y-2"
                >
                  <p className="text-4xl font-display font-bold text-primary">{item.stat}</p>
                  <p className="font-semibold text-sm leading-snug">{item.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                </motion.div>as const
              ))}
            </motion.div>
          </motion.section>

          {/* ── 02 SOLUTION ── */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="py-20 border-b border-border"
            data-testid="pitch-solution"
          >
            <motion.div variants={fadeUp}>
              <SlideLabel number="02" label="Solution" />
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-display font-bold leading-tight mb-8">
              Keep the money digital.<br />
              <span className="text-primary">From the moment it arrives.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-12">
              Marung is a digital wallet that intercepts cash-send transfers the moment they land on a mobile number.
              The balance is kept digital and linked to Visa or Mastercard — so the recipient can
              transact anywhere, without an ATM, without a queue, without a bank account. R10/month keeps the wallet active.
            </motion.p>

            <motion.div variants={stagger} className="space-y-4 mb-12">
              {[
                {
                  step: "01",
                  title: "Cash send arrives on the mobile number",
                  desc: "Any of South Africa's 6 major banks sends a cash-send transfer to a mobile number — as millions of people already do every day.",
                },
                {
                  step: "02",
                  title: "It lands in the Marung wallet",
                  desc: "The funds arrive in a Marung digital wallet — visible, accessible, and ready to use. R10/month keeps the wallet active. No ATM. No queue.",
                },
                {
                  step: "03",
                  title: "Spend it via Visa or Mastercard",
                  desc: "The wallet balance is linked to Visa or Mastercard. The recipient can transact in-store, online, or send to anyone — no bank account required.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex gap-6 items-start bg-card border border-border rounded-xl p-6"
                >
                  <span className="font-display font-bold text-2xl text-primary/30 shrink-0 leading-none mt-1">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-bold text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={stagger} className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Price point", value: "R10 / month", note: "Flat fee — keeps the wallet active for 30 days" },
                { label: "Spend method", value: "Visa & Mastercard", note: "Wallet balance linked — transact anywhere, no bank account" },
                { label: "Regulatory basis", value: "SARB Draft Exemption", note: "National Payment System Act framework" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="border border-primary/30 rounded-xl p-5 bg-primary/5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">{item.label}</p>
                  <p className="font-display font-bold text-xl mb-1">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.note}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* ── 03 MARKET ── */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="py-20 border-b border-border"
            data-testid="pitch-market"
          >
            <motion.div variants={fadeUp}>
              <SlideLabel number="03" label="Market" />
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-display font-bold leading-tight mb-8">
              South Africa first.<br />
              <span className="text-primary">SADC corridor next.</span>
            </motion.h2>

            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div variants={fadeUp} className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Total Addressable Market — South Africa
                  </p>
                  <p className="text-4xl font-display font-bold text-primary">11 Million</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Unbanked adults actively receiving mobile money transfers
                  </p>
                </div>
                <Divider />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Serviceable Addressable Market — Year 1
                  </p>
                  <p className="text-4xl font-display font-bold text-primary">800K Wallets</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    R10/month × 800,000 wallets = <strong className="text-foreground">R96M ARR</strong> at full Year 1 penetration
                  </p>
                </div>
                <Divider />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    SADC Corridor Expansion — 2027
                  </p>
                  <p className="text-4xl font-display font-bold text-primary">R 3.9 Billion</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Estimated addressable market across Zimbabwe, Lesotho, Mozambique, Botswana
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Why now — structural tailwinds
                </p>
                {[
                  {
                    title: "SARB regulatory window is open",
                    desc: "The SARB Draft Exemption Notice under the National Payment System Act creates the legal basis for non-bank wallet operators like Marung for the first time.",
                  },
                  {
                    title: "Bank infrastructure already built",
                    desc: "South Africa's major banks already run cash-send infrastructure at scale. Marung sits at the receiving end — no bank partnerships required to launch Phase 1.",
                  },
                  {
                    title: "Feature phone penetration is 94%",
                    desc: "USSD works on every mobile. Marung does not require a smartphone, data connectivity, or literacy — by design.",
                  },
                  {
                    title: "NDP 2030 and SDG alignment",
                    desc: "Marung directly contributes to South Africa's National Development Plan goal of financial inclusion, and to SDG 8 (decent work) and SDG 10 (reduced inequalities).",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.section>

          {/* ── 04 TEAM ── */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="py-20 border-b border-border"
            data-testid="pitch-team"
          >
            <motion.div variants={fadeUp}>
              <SlideLabel number="04" label="Team" />
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4">
              Built on the right<br />
              <span className="text-primary">foundations.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-12">
              Marung is backed by partners who understand the legal, technical, and commercial
              realities of building fintech infrastructure in South Africa.
            </motion.p>

            <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">

              {/* Founder */}
              <motion.div
                variants={fadeUp}
                className="bg-card border border-border rounded-2xl p-7 space-y-4 col-span-1"
              >
                <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-display font-bold text-xl text-primary">M</span>
                </div>
                <div>
                  <p className="font-display font-bold text-xl">Madichaba</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mt-1">Founder &amp; CEO · Strategy · Vision · Execution</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Originator of the Marung concept, responsible for product strategy, regulatory
                  engagement, and investor relations. Deep knowledge of South Africa's unbanked
                  population and the pain points Marung is solving.
                </p>
              </motion.div>

              {/* Legal — CMS */}
              <motion.div
                variants={fadeUp}
                className="bg-card border border-border rounded-2xl p-7 space-y-4"
              >
                <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-display font-bold text-lg text-primary">CMS</span>
                </div>
                <div>
                  <p className="font-display font-bold text-xl">CMS South Africa</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mt-1">Legal Counsel</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  One of the world's largest law firms with a significant South African practice.
                  CMS advises Marung on regulatory structuring under the National Payment
                  System Act, SARB Draft Exemption compliance, and corporate governance.
                </p>
                <a
                  href="https://cms.law/en/zaf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  cms.law/en/zaf <ExternalLink className="h-3 w-3" />
                </a>
              </motion.div>

              {/* Tech — AWS Partner */}
              <motion.div
                variants={fadeUp}
                className="bg-card border border-border rounded-2xl p-7 space-y-4"
              >
                <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-display font-bold text-lg text-primary">AWS</span>
                </div>
                <div>
                  <p className="font-display font-bold text-xl">AWS Partner</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mt-1">Technology Partner · Cape Town</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A Cape Town-based Amazon Web Services Partner delivering Marung's cloud
                  infrastructure and technology stack. AWS-certified expertise purpose-built
                  for African financial services workloads — secure, scalable, and compliant.
                </p>
                <p className="text-xs text-muted-foreground">
                  Hosted on AWS Africa (Cape Town) region — ZA data sovereignty
                </p>
              </motion.div>

            </motion.div>
          </motion.section>

          {/* ── 05 ASK ── */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="py-20"
            data-testid="pitch-ask"
          >
            <motion.div variants={fadeUp}>
              <SlideLabel number="05" label="The Ask" />
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-display font-bold leading-tight mb-8">
              Raising <span className="text-primary">R 3 Million</span><br />
              pre-seed.
            </motion.h2>

            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-10 mb-12">

              <motion.div variants={fadeUp} className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Use of funds
                </p>
                {[
                  { label: "Product build — USSD layer, wallet engine, KYC module", pct: "40%", pctNum: 40 },
                  { label: "Regulatory compliance — SARB Exemption, legal, audit", pct: "25%", pctNum: 25 },
                  { label: "Market activation — pilot cohort, community launch", pct: "20%", pctNum: 20 },
                  { label: "Team & operations — first hires, Cape Town HQ", pct: "15%", pctNum: 15 },
                ].map((item, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/80 leading-snug pr-4">{item.label}</span>
                      <span className="font-bold text-primary shrink-0">{item.pct}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pctNum}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Milestones this round unlocks
                </p>
                {[
                  { date: "Oct 2026", milestone: "Product launch — first wallets live, Tier 1 sponsor bank (Phase 1, early-stage engagement)" },
                  { date: "Nov 2026", milestone: "Cross-border SADC corridor live — Zimbabwe, Lesotho, Mozambique" },
                  { date: "Q1 2027", milestone: "100,000 active wallets — Series A raise begins" },
                  { date: "Q4 2027", milestone: "800,000 wallets — Tier 2 sponsor bank (Phase 2) integration, SADC at scale" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-xs font-bold text-primary shrink-0 mt-0.5 w-16">{item.date}</span>
                    <div className="flex-1 pb-4 border-b border-border last:border-0">
                      <p className="text-sm text-foreground/80 leading-relaxed">{item.milestone}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              className="bg-primary/10 border border-primary/30 rounded-2xl p-8 md:p-12 text-center space-y-6"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Get in touch
              </p>
              <h3 className="text-2xl md:text-4xl font-display font-bold">
                Ready to be part of<br />South Africa's financial inclusion story?
              </h3>
              <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                We are meeting with seed investors now. If you would like to receive our full
                deck, financial model, or arrange a call — reach out directly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:hello@marung.co.za?subject=Marung Pre-Seed Enquiry"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                  data-testid="btn-pitch-email"
                >
                  hello@marung.co.za <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/traction"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  View traction &amp; validation <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Legal footer */}
            <motion.p
              variants={fadeUp}
              className="text-xs text-muted-foreground text-center mt-10 leading-relaxed"
            >
              This document is a pre-seed investment overview prepared by Marung Sebaka Technologies (Pty) Ltd (Reg.
              2026/221199/07), Cape Town, South Africa. It is provided for information purposes only and does not
              constitute an offer to sell or a solicitation of an offer to buy any securities. Forward-looking
              statements involve risk and uncertainty. Figures are projections only.
            </motion.p>

          </motion.section>

        </div>
      </main>
    </div>
  );
}
