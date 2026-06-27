import { motion } from "framer-motion";
import { ArrowRight, Mail, CheckCircle, Clock } from "lucide-react";
import logoImg from "@/assets/logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const  } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

/* ── Milestone timeline ── */
const milestones = [
  {
    date: "Jan 2026",
    done: true,
    title: "Company incorporated",
    detail: "Marung Sebaka Technologies (Pty) Ltd registered with the CIPC. Reg. 2026/221199/07.",
  },
  {
    date: "Feb 2026",
    done: true,
    title: "CMS South Africa engaged as legal counsel",
    detail: "One of the world's largest law firms retained for regulatory structuring under the National Payment System Act and SARB Draft Exemption compliance.",
  },
  {
    date: "Feb 2026",
    done: true,
    title: "AWS Partner confirmed as technology partner",
    detail: "Cape Town-based AWS Partner engaged for cloud infrastructure. South Africa (Cape Town) region — ZA data sovereignty.",
  },
  {
    date: "Mar 2026",
    done: true,
    title: "SARB regulatory window confirmed",
    detail: "Legal analysis confirms Marung can operate under the SARB Draft Exemption Notice to the National Payment System Act — without requiring a full banking licence at launch.",
  },
  {
    date: "Mar 2026",
    done: true,
    title: "Sponsor bank (Phase 1) pathway identified",
    detail: "A Tier 1 South African bank identified as the Phase 1 sponsor-bank partner. Early-stage engagement underway. Details under NDA.",
  },
  {
    date: "Apr 2026",
    done: true,
    title: "Pre-seed raise initiated — R 3M target",
    detail: "Pitch deck, financial model, and investor research list completed. Active outreach to Tier 1 Africa-focused seed VCs underway.",
  },
  {
    date: "Q3 2026",
    done: false,
    title: "Product build complete — USSD + wallet engine",
    detail: "Core wallet ledger, USSD layer, KYC module, and rules engine in development. AWS Cape Town infrastructure provisioned.",
  },
  {
    date: "Oct 2026",
    done: false,
    title: "Product launch — first wallets live",
    detail: "Phase 1 go-live with Tier 1 sponsor bank. First community pilot cohort onboarded.",
  },
  {
    date: "Nov 2026",
    done: false,
    title: "SADC cross-border corridor live",
    detail: "Zimbabwe, Lesotho, Mozambique corridors activated. Cross-border mobile money flows begin.",
  },
  {
    date: "Q1 2027",
    done: false,
    title: "100,000 active wallets — Series A raise",
    detail: "Series A fundraise initiated at 100K wallet milestone. Tier 2 sponsor bank (Phase 2) engagement begins.",
  },
];

/* ── Forward metrics (what we will track) ── */
const metrics = [
  {
    label: "Active Wallets",
    current: "Pre-launch",
    target: "100K by Q1 2027",
    note: "Unique wallets with at least one transaction in the last 30 days",
  },
  {
    label: "Monthly Recurring Revenue",
    current: "Pre-revenue",
    target: "R 1M / month by Q2 2027",
    note: "R10/month × active wallet count",
  },
  {
    label: "Gross Transaction Volume (GTV)",
    current: "Pre-launch",
    target: "R 500M / month by Q4 2027",
    note: "Total rand value of transfers processed through Marung wallets",
  },
  {
    label: "Gross Margin",
    current: "Modelled: 72%",
    target: "75%+ by FY2028",
    note: "Revenue minus network, compliance, and support costs per wallet",
  },
  {
    label: "Pilot Community Customers",
    current: "Recruiting",
    target: "500 pilot wallets at launch",
    note: "First cohort: Cape Town communities, delivery workers, and salon operators",
  },
  {
    label: "SADC Corridor Transactions",
    current: "Pre-launch",
    target: "Live from November 2026",
    note: "Cross-border flows: ZA → Zimbabwe, Lesotho, Mozambique",
  },
];

/* ── Validation signals ── */
const signals = [
  {
    category: "Regulatory",
    items: [
      "SARB Draft Exemption Notice confirms non-bank wallet operator path",
      "National Payment System Act framework — no full banking licence required at launch",
      "SA data sovereignty — AWS Africa (Cape Town) region",
    ],
  },
  {
    category: "Legal",
    items: [
      "CMS South Africa engaged — one of the world's top 10 law firms",
      "Corporate governance, SARB compliance, and NPS Act structuring underway",
      "Company registered and in good standing (CIPC — Reg. 2026/221199/07)",
    ],
  },
  {
    category: "Technology",
    items: [
      "AWS Partner (Cape Town) confirmed as infrastructure partner",
      "AWS-certified fintech workloads — built for African financial services",
      "USSD-native architecture — works on 100% of SA mobile phones",
    ],
  },
  {
    category: "Market",
    items: [
      "11M unbanked South Africans — TAM confirmed by multiple third-party sources",
      "R10/month flat-fee pricing validated against consumer research",
      "Tier 1 sponsor bank (Phase 1) pathway confirmed — early-stage engagement underway (NDA)",
    ],
  },
];

export default function Traction() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between bg-background/80 backdrop-blur-lg border-b border-border">
        <a href="/" className="flex items-center gap-3">
          <img src={logoImg} alt="Marung" className="h-8 w-8 object-contain" />
          <span className="font-display font-semibold text-lg tracking-wide">Marung</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/pitch" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pitch</a>
          <a href="/model" className="text-sm text-muted-foreground hover:text-primary transition-colors">Model</a>
          <a
            href="mailto:hello@marung.co.za?subject=Marung Traction Enquiry"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Contact <Mail className="h-4 w-4" />
          </a>
        </div>
      </nav>

      <main className="pt-24 pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-16">

          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 border-b border-border pb-12"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-primary">
              Traction &amp; Validation · Pre-Launch · April 2026
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-display font-bold leading-tight">
              Where We Are
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Marung launches October 2026. We are pre-revenue and pre-launch. This page shows
              the real validation work completed to date — regulatory, legal, technical, and
              market — plus the metrics we will track from day one.
            </motion.p>

            {/* Stage badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-5 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-sm font-semibold">Pre-launch · Pre-revenue · Seed raise in progress</span>
            </motion.div>
          </motion.div>

          {/* Validation signals */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Early Validation</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold">De-risking completed to date</h2>
              <p className="text-sm text-muted-foreground mt-1">
                What we have confirmed before writing a line of product code.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {signals.map((group, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-card border border-border rounded-2xl p-6 space-y-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">{group.category}</p>
                  <ul className="space-y-3">
                    {group.items.map((item, j) => (
                      <li key={j} className="flex gap-3 items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground/80 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Milestone timeline */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Timeline</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Progress to Launch</h2>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />

              <div className="space-y-0">
                {milestones.map((m, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex gap-5 pb-8 last:pb-0 relative"
                  >
                    {/* Dot */}
                    <div className={`h-6 w-6 rounded-full border-2 shrink-0 mt-0.5 z-10 flex items-center justify-center ${
                      m.done
                        ? "bg-primary border-primary"
                        : "bg-background border-border"
                    }`}>
                      {m.done
                        ? <CheckCircle className="h-3.5 w-3.5 text-primary-foreground" />
                        : <Clock className="h-3 w-3 text-muted-foreground" />
                      }
                    </div>

                    <div className="flex-1 pt-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-xs font-bold ${m.done ? "text-primary" : "text-muted-foreground"}`}>
                          {m.date}
                        </span>
                        {m.done && (
                          <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full font-semibold">
                            Done
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-sm mb-1">{m.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{m.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Metrics dashboard — forward-looking */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Metrics</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Key Metrics Dashboard</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Live from October 2026. These are the numbers we will report publicly from launch day.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {metrics.map((m, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-card border border-border rounded-2xl p-6 space-y-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.label}</p>
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="text-2xl font-display font-bold text-primary">{m.current}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Target: {m.target}</p>
                    </div>
                    <span className="text-xs bg-secondary border border-border rounded-full px-3 py-1 text-muted-foreground shrink-0">
                      Live Oct 2026
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground border-t border-border pt-3 leading-relaxed">{m.note}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Why pre-launch is the right time */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="bg-card border border-border rounded-2xl p-8 md:p-12 space-y-8"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Investor Note</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Why pre-launch is the right entry point</h2>
            </motion.div>

            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Regulatory window is open now",
                  body: "The SARB Draft Exemption Notice creates a legal path for Marung that did not exist two years ago. This window is time-sensitive — first-movers who establish market position before the regulatory landscape crystallises will have durable advantages.",
                },
                {
                  title: "Infrastructure partners are already committed",
                  body: "CMS South Africa and our AWS Partner are engaged. A Tier 1 sponsor bank pathway is confirmed (early-stage, NDA). The pre-seed round funds product build — the scaffolding is already in place.",
                },
                {
                  title: "Market is proven — product is new",
                  body: "South Africa's major banks already process millions of cash-send transactions monthly. The problem is validated at scale. Marung does not need to create the behaviour — it needs to intercept it.",
                },
                {
                  title: "Pre-launch equity is the most attractive entry",
                  body: "Series A will be priced on 100,000+ active wallets. The pre-seed round is the only opportunity to enter at pre-revenue valuation before live traction data sets a higher floor.",
                },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="space-y-2">
                  <div className="h-1 w-8 rounded-full bg-primary" />
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold">
              Questions about our traction or validation?
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              We are happy to walk you through the regulatory analysis, partner engagements,
              and market validation in a call. Reach out directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:hello@marung.co.za?subject=Marung Traction &amp; Validation Call"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                data-testid="btn-traction-email"
              >
                hello@marung.co.za <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/model"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                See revenue model <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Marung Sebaka Technologies (Pty) Ltd · Reg. 2026/221199/07 · Cape Town, South Africa ·
            hello@marung.co.za · Pre-seed stage · April 2026
          </p>

        </div>
      </main>
    </div>
  );
}
