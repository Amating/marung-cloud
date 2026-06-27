import { motion } from "framer-motion";
import { ExternalLink, Target, TrendingUp, Globe } from "lucide-react";


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const  } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

interface Investor {
  name: string;
  hq: string;
  focus: string;
  stage: string;
  checkSize: string;
  portfolio: string;
  whyFit: string;
  contact: string;
  contactUrl: string;
  pitchAngle: string;
}

const tier1: Investor[] = [
  {
    name: "4Di Capital",
    hq: "Cape Town, South Africa",
    focus: "Early-stage tech startups, Sub-Saharan Africa — 'nurture capital' model",
    stage: "Seed / Pre-Series A",
    checkSize: "~$250K – $2M",
    portfolio: "PocketLaw, Lumkani, Kibo Commerce",
    whyFit: "Cape Town-based, explicitly backs SA fintech at pre-seed and seed. Their hands-on 'nurture capital' model matches Marung's stage and need for local regulatory navigation expertise.",
    contact: "4dicapital.com",
    contactUrl: "https://www.4dicapital.com",
    pitchAngle: "We are a Cape Town-founded, SARB Draft Exemption-aligned mobile wallet infrastructure play — exactly the structural SA fintech opportunity 4Di's local expertise is built for.",
  },
  {
    name: "Knife Capital",
    hq: "Cape Town, South Africa",
    focus: "High-growth SA innovation businesses scaling internationally",
    stage: "Seed → Series A (Knife Fund III — $50M, IFC-backed)",
    checkSize: "~$500K – $5M",
    portfolio: "Aerobotics, Carscan, SnapnSave",
    whyFit: "SA-headquartered, IFC-backed, with an excellent network for regulatory navigation. Knife's IFC relationship is a natural bridge to sponsor-bank and SARB engagement.",
    contact: "knifecap.com",
    contactUrl: "https://knifecap.com",
    pitchAngle: "Marung targets 11M unbanked South Africans — a market larger than any existing SA fintech's user base. Knife's IFC relationship and SA regulatory network are exactly the scaffolding Marung needs for the Phase 1 sponsor-bank launch.",
  },
  {
    name: "Founders Factory Africa",
    hq: "Johannesburg, South Africa",
    focus: "Fintech, healthtech, agritech, logistics — studio model with operational support",
    stage: "Pre-seed / Seed",
    checkSize: "~$100K – $500K + studio support",
    portfolio: "Multiple SA fintech and healthtech startups across cohorts",
    whyFit: "Explicitly backs African fintech startups and offers operational studio support alongside capital — relevant for Marung's October 2026 launch timeline.",
    contact: "foundersfactory.africa",
    contactUrl: "https://www.foundersfactory.africa",
    pitchAngle: "Founders Factory's operational model — not just capital but active product and go-to-market support — matches Marung's October launch window. The studio relationship also opens telco and banking partner conversations.",
  },
  {
    name: "Partech Africa",
    hq: "Dakar (+ Lagos, Nairobi, Paris, Dubai)",
    focus: "Pan-African tech, seed to Series C — backing category leaders",
    stage: "Seed → Series C",
    checkSize: "$500K – $10M (seed entry from ~$500K)",
    portfolio: "Wave, Yoco, OPay, Djamo",
    whyFit: "Partech backed Wave — the flat-fee mobile money disruptor in West Africa. Marung is structurally the same story for the SADC corridor. A direct conversation point with a portfolio they already understand.",
    contact: "partechpartners.com",
    contactUrl: "https://partechpartners.com",
    pitchAngle: "You backed Wave's flat-fee disruption of mobile money in West Africa. Marung is that same structural story for the SADC corridor — starting with South Africa's 11M unbanked and a cross-border corridor opening 20 November 2026.",
  },
  {
    name: "TLcom Capital",
    hq: "Nairobi / Lagos / London",
    focus: "Africa seed and Series A tech — TIDE Africa Fund II ($154M, closed April 2024)",
    stage: "Seed / Series A",
    checkSize: "$500K – $5M",
    portfolio: "Andela, Twiga Foods, KUDI",
    whyFit: "Expanding into SADC markets, backed mobile-native businesses, and has deep East/West African operator networks that map directly to Marung's SADC corridor strategy.",
    contact: "tlcomcapital.com",
    contactUrl: "https://tlcomcapital.com",
    pitchAngle: "Marung opens the SADC corridor in a way that mirrors the East African mobile money revolution TLcom backed through Andela's ecosystem. South Africa + Lesotho/Zimbabwe/Mozambique is the next structural mobile money wave.",
  },
  {
    name: "Novastar Ventures",
    hq: "Lagos / London / Nairobi",
    focus: "Impact-first Africa VC — 'creates value for the many, not just the few'",
    stage: "Seed onwards",
    checkSize: "$500K – $5M",
    portfolio: "Apollo Agriculture, Pula, Tugende",
    whyFit: "ImpactAssets 50 listed, backed by British International Investment (BII). Explicit SDG mandate. Marung's financial inclusion story is their core thesis — informal economy, excluded populations, continental scale.",
    contact: "novastarventures.com",
    contactUrl: "https://www.novastarventures.com",
    pitchAngle: "Marung aligns precisely with Novastar's prosperity-for-all thesis — digitizing informal economy money flows for 11M excluded South Africans, with a measurable SDG 8 and SDG 10 impact case and a tested SADC corridor playbook.",
  },
  {
    name: "GreenHouse Capital",
    hq: "Lagos, Nigeria",
    focus: "Fintech-only Africa VC — payments infrastructure and financial stack",
    stage: "Seed",
    checkSize: "$250K – $2M",
    portfolio: "Fintech infrastructure plays across Nigeria and broader Africa",
    whyFit: "Africa's only fintech-specialist VC understands payments infrastructure deeply — not apps on top of it, the infrastructure itself. Marung's wallet ledger, rules engine, and USSD layer are exactly what GreenHouse backs.",
    contact: "greenhouse.capital",
    contactUrl: "https://greenhouse.capital",
    pitchAngle: "GreenHouse backs fintech infrastructure, not just apps. Marung's wallet ledger, rules engine, KYC module, and USSD layer are the infrastructure pipes for SADC digital money — bank-neutral, telco-neutral, built for scale.",
  },
  {
    name: "Seedstars Africa Ventures",
    hq: "Geneva (Africa mandate — Sub-Saharan Africa)",
    focus: "Early-stage high-growth companies in underserved African markets",
    stage: "Seed",
    checkSize: "~$300K – $1M",
    portfolio: "$42M first close, growing SSA portfolio",
    whyFit: "Specifically designed for underserved African markets, SDG-aligned, and targets the entry stage Marung is at now. The fund's LPs include development finance institutions with a financial inclusion mandate.",
    contact: "seedstars-africa.vc",
    contactUrl: "https://seedstars-africa.vc",
    pitchAngle: "Marung reaches exactly Seedstars' target user — economically active but financially excluded. The SARB regulatory window and our pre-seed timing match Seedstars' entry point criteria exactly.",
  },
];

const tier2: Investor[] = [
  {
    name: "Accion Ventures",
    hq: "Washington DC (global mandate)",
    focus: "Inclusive fintech seed — expanding financial access for underserved people",
    stage: "Seed / Series A",
    checkSize: "$500K – $2M (Fund II: $61.6M, closed 2024/2025)",
    portfolio: "Khazna (Egypt), Destacame, Kredivo — 60+ inclusive fintech companies globally",
    whyFit: "Mission is literally Marung's pitch: 'expanding access to financial services for people who lack it.' They have backed African inclusive fintech and have an explicit Sub-Saharan Africa allocation.",
    contact: "accion.org/accion-ventures",
    contactUrl: "https://www.accion.org/how-we-work/investment-strategies/accion-ventures",
    pitchAngle: "Marung's R10/month model solves the cost-of-financial-access problem Accion Ventures was created to fund. The SARB Draft Exemption Notice makes South Africa the most structurally timely inclusive fintech market in Africa right now.",
  },
  {
    name: "Flourish Ventures",
    hq: "San Francisco (global — backed by Pierre Omidyar, eBay founder)",
    focus: "Financial health for underserved people globally — evergreen fund",
    stage: "Seed / Series A",
    checkSize: "$1M – $5M",
    portfolio: "Peach Payments, Jumo (SA/SSA) — broad SSA fintech portfolio",
    whyFit: "Backed SA's Peach Payments and Jumo. Explicitly invests in companies improving financial health for people locked out of formal banking. Marung's core thesis matches their investment mandate word for word.",
    contact: "flourishventures.com",
    contactUrl: "https://flourishventures.com",
    pitchAngle: "Flourish has backed Peach Payments and Jumo in the SA stack. Marung is the missing piece — the wallet layer that makes existing cash-send flows usable for the 11M South Africans with no bank account. It completes your SA portfolio thesis.",
  },
  {
    name: "Quona Capital",
    hq: "Washington DC / global offices",
    focus: "Inclusive fintech in emerging markets — EMEA, LatAm, South Asia",
    stage: "Seed follow-on / Series A (sweet spot $2M–$10M)",
    checkSize: "$2M – $10M",
    portfolio: "Destacame, Konfío, NeoGrowth — $750M AUM",
    whyFit: "EMEA mandate covers Africa and Quona's book is underweight South Africa specifically. Mission-aligned on financial inclusion, experienced with mobile-first payment infrastructure globally.",
    contact: "quona.com",
    contactUrl: "https://quona.com",
    pitchAngle: "Quona's EMEA portfolio is underweight South Africa — the continent's second-largest economy. Marung is the most defensible fintech infrastructure opportunity in SA right now: flat-fee, SARB-compliant, with a SADC corridor ready to scale.",
  },
  {
    name: "Omidyar Network",
    hq: "Redwood City, California",
    focus: "Impact philanthropy + VC hybrid — financial inclusion, economic opportunity",
    stage: "Pre-seed → Growth (equity + grants)",
    checkSize: "$500K – $5M (equity and grant instruments)",
    portfolio: "Broad SSA impact tech portfolio — Flourish Ventures is a spin-out from ON",
    whyFit: "SDG-aligned, willing to invest at pre-revenue stage if thesis is strong. Financial inclusion mandate, patient capital model fits Marung's infrastructure-first approach.",
    contact: "omidyar.com",
    contactUrl: "https://omidyar.com",
    pitchAngle: "Omidyar Network targets systemic change. Marung is systemic — it changes the infrastructure layer for 11M excluded South Africans, with continental scalability across the SADC corridor that matches ON's long-term ambition.",
  },
  {
    name: "Norrsken Africa Seed",
    hq: "Kigali, Rwanda (Norrsken Foundation — Stockholm)",
    focus: "Impact tech seed for Africa — businesses solving critical problems",
    stage: "Seed",
    checkSize: "~$100K – $500K",
    portfolio: "Growing Africa impact tech portfolio across multiple sectors",
    whyFit: "Impact-first, Africa-dedicated seed fund with an SDG measurement framework. The separate seed vehicle (norrskenafricaseed.vc) is purpose-built for the stage Marung is at.",
    contact: "norrskenafricaseed.vc",
    contactUrl: "https://www.norrskenafricaseed.vc",
    pitchAngle: "Norrsken's impact thesis is built on businesses solving real problems for real people. Marung's problem statement — 11M people moving money daily but unable to keep it digital — is impact-measurable, commercially viable, and continental in scope.",
  },
  {
    name: "Catalyst Fund",
    hq: "BFA Global / Boston (global program — SSA focus)",
    focus: "Pre-commercial inclusive fintech infrastructure in frontier and emerging markets",
    stage: "Pre-seed / Seed (grant + equity hybrid)",
    checkSize: "$100K – $500K",
    portfolio: "Kenya, Nigeria, SA — inclusive fintech infrastructure plays",
    whyFit: "The Catalyst Fund (funded by Bill & Melinda Gates Foundation and FCDO) specifically targets inclusive fintech infrastructure in Sub-Saharan Africa. Marung's USSD-native, bank-neutral wallet architecture is their thesis in product form.",
    contact: "catalystfund.io",
    contactUrl: "https://catalystfund.io",
    pitchAngle: "The Catalyst Fund was designed for exactly this stage: pre-commercial inclusive fintech infrastructure in frontier markets. Marung's South Africa SARB regulatory opening, SADC corridor, and USSD architecture align with every criterion in your thesis.",
  },
  {
    name: "IFC (International Finance Corporation)",
    hq: "Washington DC — World Bank Group",
    focus: "Emerging markets financial inclusion — catalyst capital, DFI co-investment",
    stage: "Seed consortia participant → Series A",
    checkSize: "$3M – $15M (also LP in African VC funds)",
    portfolio: "Wave, Knife Capital Fund III, M-Pesa ecosystem, broad mobile money infrastructure",
    whyFit: "IFC backed Wave (WAEMU), is an LP in Knife Capital, and has explicitly funded mobile money infrastructure across SSA. The Tier 1 sponsor-bank engagement and SARB regulatory dialogue are exactly the risk-mitigation IFC looks for before leading.",
    contact: "ifc.org/fintech",
    contactUrl: "https://www.ifc.org/en/industries/financial-institutions/fintech",
    pitchAngle: "IFC's track record with mobile money infrastructure — from M-Pesa ecosystem to Wave — makes Marung the natural next bet. The SARB Draft Exemption Notice and Tier 1 sponsor-bank engagement (Phase 1) provide the regulatory de-risking IFC requires.",
  },
];

const tier3: Investor[] = [
  {
    name: "Y Combinator",
    hq: "San Francisco (global)",
    focus: "Any sector, seed accelerator — 92 African alumni, dominant Africa fintech track record",
    stage: "Pre-seed / Seed (accelerator model)",
    checkSize: "$500K standard deal (2024 structure)",
    portfolio: "Paystack (Stripe acquisition), Flutterwave, Chipper Cash, Mono",
    whyFit: "YC's Africa fintech alumni network is the fastest route to Series A introductions. The batch community and demo day exposure would accelerate Marung's institutional fundraise significantly.",
    contact: "ycombinator.com/apply",
    contactUrl: "https://www.ycombinator.com/apply",
    pitchAngle: "Paystack, Flutterwave, Chipper Cash, Mono — all YC DNA in your Africa fintech portfolio. Marung is the infrastructure layer beneath all of them, built for the 11M South Africans they cannot yet reach.",
  },
  {
    name: "Antler Africa",
    hq: "Johannesburg, South Africa (+ global network)",
    focus: "Pre-seed / seed — backs founders from day zero across sectors",
    stage: "Pre-seed / Seed",
    checkSize: "~$100K – $250K pre-seed, follow-on available",
    portfolio: "Growing SA and Africa portfolio across fintech and tech",
    whyFit: "Johannesburg-based, backs SA founders early, fintech-open, and has a global LP base that bridges to international Series A investors. Most relevant for early capital and network.",
    contact: "antler.co/location/south-africa",
    contactUrl: "https://www.antler.co/location/south-africa",
    pitchAngle: "Antler backs founders at the earliest stage. Marung's founder-led grassroots model and the SARB regulatory timing create a rare pre-seed entry point into infrastructure-grade African fintech before the October 2026 launch.",
  },
  {
    name: "500 Global",
    hq: "San Francisco (global programs)",
    focus: "Seed-stage global — active fintech vertical, Africa programs",
    stage: "Seed",
    checkSize: "$150K – $500K",
    portfolio: "Active Africa fintech portfolio through regional programs",
    whyFit: "500 Global's international LP and portfolio network provides the bridge to growth-stage investors Marung needs for the 2027 scale phase. Portfolio community also useful for SADC market expansion.",
    contact: "500.co/accelerator",
    contactUrl: "https://500.co/accelerator",
    pitchAngle: "500's global distribution network is Marung's Series A bridge. Your LP and portfolio base includes the growth-stage investors Marung will need for the Q4 2027 800,000-wallet scale phase.",
  },
  {
    name: "Plug and Play Fintech",
    hq: "Sunnyvale, CA (Africa program active)",
    focus: "Corporate-backed accelerator + seed — banking and payments vertical",
    stage: "Seed (accelerator + corporate partner investment)",
    checkSize: "$25K – $250K accelerator + partner follow-on",
    portfolio: "Broad global fintech portfolio, banking-industry connected",
    whyFit: "Plug and Play's banking partner network is strategically relevant for Marung's Phase 1 and Phase 2 sponsor-bank relationships. Corporate bank introductions from the cohort program accelerate the partner engagement.",
    contact: "plugandplaytechcenter.com/fintech",
    contactUrl: "https://www.plugandplaytechcenter.com/industries/fintech/",
    pitchAngle: "Plug and Play's Tier 1 banking partner network accelerates Marung's Phase 2 sponsor-bank conversation by 2027. A cohort placement puts Marung in front of the right bank decision-makers before the Series A raise.",
  },
  {
    name: "GSMA Ecosystem Accelerator",
    hq: "London (global program — SSA active)",
    focus: "Mobile money, USSD infrastructure, digital financial inclusion — grant instrument",
    stage: "Pre-seed / Seed (grant)",
    checkSize: "£100K – £500K (non-dilutive grant)",
    portfolio: "Mobile money infrastructure startups across SSA and South Asia",
    whyFit: "GSMA specifically funds USSD-based mobile money infrastructure and financial inclusion. Marung's tech stack — USSD layer, rules engine, network-neutral access — is GSMA's mandate in product form. Non-dilutive grant is additive to equity rounds.",
    contact: "gsma.com/ecosystem-accelerator",
    contactUrl: "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/ecosystem-accelerator/",
    pitchAngle: "GSMA's Ecosystem Accelerator was created for exactly this: USSD-native, network-neutral mobile money infrastructure serving unbanked populations in Sub-Saharan Africa. Marung is the programme's thesis in working product form.",
  },
];

function TierBadge({ tier }: { tier: 1 | 2 | 3 }) {
  const config = {
    1: { label: "Tier 1 — Top Fit", className: "bg-primary/20 text-primary border border-primary/30" },
    2: { label: "Tier 2 — Strong Fit", className: "bg-secondary text-foreground/80 border border-border" },
    3: { label: "Tier 3 — Open to Africa", className: "bg-muted text-muted-foreground border border-border" },
  };
  return (
    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${config[tier].className}`}>
      {config[tier].label}
    </span>
  );
}

function InvestorCard({ investor, tier }: { investor: Investor; tier: 1 | 2 | 3 }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5 hover:border-primary/40 transition-colors"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-bold text-xl">{investor.name}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{investor.hq}</p>
        </div>
        <TierBadge tier={tier} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Focus</p>
          <p className="text-foreground/80 leading-relaxed">{investor.focus}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Stage &amp; Check Size</p>
          <p className="text-foreground/80">{investor.stage}</p>
          <p className="text-primary font-semibold mt-0.5">{investor.checkSize}</p>
        </div>
      </div>

      <div className="text-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Notable Portfolio</p>
        <p className="text-foreground/80">{investor.portfolio}</p>
      </div>

      <div className="text-sm bg-secondary/40 rounded-xl p-4 border border-border">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Why Marung Fits</p>
        <p className="text-foreground/80 leading-relaxed">{investor.whyFit}</p>
      </div>

      <div className="text-sm bg-primary/10 rounded-xl p-4 border border-primary/20">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Pitch Angle</p>
        <p className="text-foreground/80 leading-relaxed italic">"{investor.pitchAngle}"</p>
      </div>

      <a
        href={investor.contactUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        data-testid={`link-investor-${investor.name.replace(/\s+/g, "-").toLowerCase()}`}
      >
        {investor.contact} <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </motion.div>
  );
}

function TierSection({
  tier,
  title,
  subtitle,
  icon: Icon,
  investors,
}: {
  tier: 1 | 2 | 3;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  investors: Investor[];
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger}
      className="space-y-8"
    >
      <motion.div variants={fadeUp} className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">{title}</h2>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </div>
        </div>
      </motion.div>
      <div className="grid gap-6">
        {investors.map((inv) => (
          <InvestorCard key={inv.name} investor={inv} tier={tier} />
        ))}
      </div>
    </motion.section>
  );
}

export default function Investors() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between bg-background/80 backdrop-blur-lg border-b border-border">
        <a href="/" className="flex items-center gap-3">
          
          <span className="font-display font-semibold text-lg tracking-wide">Marung</span>
        </a>
        <a
          href="/"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Back to site
        </a>
      </nav>

      <main className="pt-24 pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-20">

          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-primary">
              Confidential — Internal Use
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-display font-bold leading-tight">
              Seed Investor Outreach List
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              20 targeted seed-stage VCs and impact investors for Marung Cloud — researched,
              tiered by fit, and annotated with tailored pitch angles. South Africa fintech,
              financial inclusion, SADC corridor infrastructure.
            </motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 pt-2">
              {[
                { label: "Total Investors", value: "20" },
                { label: "Tier 1 (Top Fit)", value: "8" },
                { label: "Tiers 2 & 3", value: "12" },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 text-center">
                  <div className="text-2xl font-display font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-secondary/30 border border-border rounded-xl p-5 text-sm text-muted-foreground"
          >
            <strong className="text-foreground">Research note:</strong> Check sizes, fund stages,
            and portfolio details are based on publicly available information as of April 2026.
            Always verify current investment mandates directly before outreach, as fund cycles and
            focus areas change. This list is for outreach prioritization only — not financial or
            legal advice.
          </motion.div>

          {/* Tier 1 */}
          <TierSection
            tier={1}
            title="Tier 1 — Africa-Focused Fintech & Impact Funds"
            subtitle="Highest fit — explicit Africa / SA mandate, fintech or financial inclusion focus, right stage"
            icon={Target}
            investors={tier1}
          />

          {/* Tier 2 */}
          <TierSection
            tier={2}
            title="Tier 2 — Global Emerging Markets Financial Inclusion"
            subtitle="Strong fit — global mandate covering Africa, mission-aligned on financial inclusion and unbanked populations"
            icon={TrendingUp}
            investors={tier2}
          />

          {/* Tier 3 */}
          <TierSection
            tier={3}
            title="Tier 3 — General Fintech Seed Open to Africa"
            subtitle="Broader seed funds with Africa track records, accelerator routes, and non-dilutive options"
            icon={Globe}
            investors={tier3}
          />

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-border pt-10 text-sm text-muted-foreground space-y-2"
          >
            <p className="font-semibold text-foreground">Suggested outreach order</p>
            <p>
              Start with Tier 1 — 4Di Capital and Founders Factory Africa first (both Cape Town / Johannesburg, lowest
              friction). Partech Africa second (Wave comparison is a powerful anchor). Run Accion
              Ventures and Flourish Ventures in parallel as mission-aligned international validators.
              Use YC as a forcing function for timeline — a batch application creates a natural
              deadline that accelerates all other conversations.
            </p>
            <p className="pt-2">
              Marung Sebaka Technologies (Pty) Ltd · Reg. 2026/221199/07 · Cape Town, South Africa
            </p>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
