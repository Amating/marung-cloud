import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { ArrowRight, Mail } from "lucide-react";


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

/* ── Projection data ── */
const quarterlyData = [
  { quarter: "Q4 '26", wallets: 15_000,  revenueM: 0.45,  costsM: 0.13 },
  { quarter: "Q1 '27", wallets: 80_000,  revenueM: 2.40,  costsM: 0.67 },
  { quarter: "Q2 '27", wallets: 250_000, revenueM: 7.50,  costsM: 2.10 },
  { quarter: "Q3 '27", wallets: 500_000, revenueM: 15.00, costsM: 4.20 },
  { quarter: "Q4 '27", wallets: 800_000, revenueM: 24.00, costsM: 6.72 },
  { quarter: "Q1 '28", wallets: 1_200_000, revenueM: 36.00, costsM: 9.00 },
  { quarter: "Q2 '28", wallets: 1_800_000, revenueM: 54.00, costsM: 13.50 },
  { quarter: "Q3 '28", wallets: 2_500_000, revenueM: 75.00, costsM: 18.75 },
  { quarter: "Q4 '28", wallets: 3_500_000, revenueM: 105.00, costsM: 26.25 },
];

const walletsForChart = quarterlyData.map(d => ({
  quarter: d.quarter,
  "Wallets (thousands)": Math.round(d.wallets / 1000),
}));

const revenueForChart = quarterlyData.map(d => ({
  quarter: d.quarter,
  "Revenue (R million)": d.revenueM,
  "Operating Costs (R million)": d.costsM,
  "Gross Profit (R million)": parseFloat((d.revenueM - d.costsM).toFixed(2)),
}));

/* ── Annual summary ── */
const annuals = [
  {
    year: "FY 2026",
    label: "Launch year (3 months)",
    wallets: "15K peak",
    arr: "R 1.8M",
    revenue: "R 0.45M",
    margin: "71%",
    milestone: "Product live, Tier 1 sponsor bank (Phase 1)",
  },
  {
    year: "FY 2027",
    label: "Growth year",
    wallets: "800K peak",
    arr: "R 96M",
    revenue: "R 49.35M",
    margin: "72%",
    milestone: "Series A raise, Tier 2 sponsor bank (Phase 2) begins",
  },
  {
    year: "FY 2028",
    label: "Scale year",
    wallets: "3.5M peak",
    arr: "R 420M",
    revenue: "R 270M",
    margin: "75%",
    milestone: "Full SADC corridor, Series B opportunity",
  },
];

/* ── Unit economics ── */
const unitEcon = [
  { label: "Monthly subscription fee", value: "R 10.00", note: "Flat rate — no transaction %", positive: true },
  { label: "Network & infrastructure cost", value: "R 1.50", note: "USSD gateway, cloud (AWS ZA)", positive: false },
  { label: "Compliance & regulatory cost", value: "R 0.80", note: "SARB reporting, KYC, audit", positive: false },
  { label: "Support & operations", value: "R 0.50", note: "Per-wallet customer support", positive: false },
  { label: "Gross margin per wallet", value: "R 7.20", note: "72% gross margin at launch", positive: true },
];

/* ── Custom tooltip ── */
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-4 text-sm shadow-xl min-w-[160px]">
      <p className="font-bold text-foreground mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex justify-between gap-4">
          <span className="text-muted-foreground">{p.name}</span>
          <span className="font-semibold" style={{ color: p.color }}>
            {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── What-If calculator ── */
function WhatIfCalc() {
  const [wallets, setWallets] = useState(500_000);
  const [fee, setFee] = useState(10);
  const monthly = wallets * fee;
  const annual = monthly * 12;
  const grossProfit = annual * 0.72;

  return (
    <div className="bg-card border border-border rounded-2xl p-8 space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Interactive</p>
        <h3 className="text-2xl font-display font-bold">Revenue Calculator</h3>
        <p className="text-sm text-muted-foreground mt-1">Adjust the assumptions to model different scenarios.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Wallets slider */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <label className="font-medium">Active Wallets</label>
              <span className="font-bold text-primary">{wallets.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={5000000}
              step={10000}
              value={wallets}
              onChange={e => setWallets(Number(e.target.value))}
              className="w-full accent-primary h-2 rounded-full cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10K</span>
              <span>2.5M</span>
              <span>5M</span>
            </div>
          </div>

          {/* Fee slider */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <label className="font-medium">Monthly Fee (R)</label>
              <span className="font-bold text-primary">R {fee}</span>
            </div>
            <input
              type="range"
              min={5}
              max={25}
              step={1}
              value={fee}
              onChange={e => setFee(Number(e.target.value))}
              className="w-full accent-primary h-2 rounded-full cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>R5</span>
              <span>R15</span>
              <span>R25</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: "Monthly Revenue", value: `R ${(monthly / 1_000_000).toFixed(2)}M` },
            { label: "Annual Revenue (ARR)", value: `R ${(annual / 1_000_000).toFixed(1)}M` },
            { label: "Annual Gross Profit (72%)", value: `R ${(grossProfit / 1_000_000).toFixed(1)}M` },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between bg-secondary/40 rounded-xl px-5 py-4 border border-border">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="font-display font-bold text-xl text-primary">{item.value}</span>
            </div>
          ))}
          <p className="text-xs text-muted-foreground pt-1">
            Assumes 72% gross margin, flat-fee model, no transaction revenue (Phase 1).
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Model() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between bg-background/80 backdrop-blur-lg border-b border-border">
        <a href="/" className="flex items-center gap-3">
          <img src={logoImg} alt="Marung" className="h-8 w-8 object-contain" />
          <span className="font-display font-semibold text-lg tracking-wide">Marung</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/pitch" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Pitch Deck
          </a>
          <a
            href="mailto:hello@marung.co.za?subject=Marung Financial Model Enquiry"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Contact <Mail className="h-4 w-4" />
          </a>
        </div>
      </nav>

      <main className="pt-24 pb-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-16">

          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 border-b border-border pb-12"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-primary">
              Revenue Model · Confidential · April 2026
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-display font-bold leading-tight">
              Financial Model
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Base-case projections for Marung Cloud — R10/month flat-fee wallet subscription
              across South Africa and the SADC corridor. FY2026 launch through FY2028 scale.
            </motion.p>

            {/* Key metrics */}
            <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              {[
                { label: "Fee per wallet", value: "R 10 / mo", sub: "Flat — no tx %" },
                { label: "Gross margin", value: "72%", sub: "At launch" },
                { label: "TAM — South Africa", value: "11M", sub: "Unbanked adults" },
                { label: "Series A trigger", value: "100K wallets", sub: "Q1 2027" },
              ].map((s, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-card border border-border rounded-xl p-5">
                  <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                  <p className="font-display font-bold text-xl text-primary">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Annual summary table */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Overview</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Three-Year Summary</h2>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    {["Year", "Stage", "Peak Wallets", "ARR at Peak", "Full-Year Revenue", "Gross Margin", "Key Milestone"].map(h => (
                      <th key={h} className="text-left py-3 pr-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {annuals.map((row, i) => (
                    <motion.tr
                      key={i}
                      variants={fadeUp}
                      className="border-b border-border hover:bg-card transition-colors"
                    >
                      <td className="py-4 pr-6 font-display font-bold text-primary">{row.year}</td>
                      <td className="py-4 pr-6 text-muted-foreground">{row.label}</td>
                      <td className="py-4 pr-6 font-semibold">{row.wallets}</td>
                      <td className="py-4 pr-6 font-semibold text-primary">{row.arr}</td>
                      <td className="py-4 pr-6 font-semibold">{row.revenue}</td>
                      <td className="py-4 pr-6">{row.margin}</td>
                      <td className="py-4 pr-6 text-muted-foreground text-xs leading-relaxed max-w-[200px]">{row.milestone}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Wallet growth chart */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Growth</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Wallet Growth — Quarterly</h2>
              <p className="text-sm text-muted-foreground mt-1">Active wallet count per quarter, Q4 2026 → Q4 2028</p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={walletsForChart} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="walletGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(43 90% 50%)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="hsl(43 90% 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(156 40% 15%)" />
                  <XAxis
                    dataKey="quarter"
                    tick={{ fill: "hsl(45 33% 60%)", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(156 40% 20%)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "hsl(45 33% 60%)", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={v => `${v}K`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="Wallets (thousands)"
                    stroke="hsl(43 90% 50%)"
                    strokeWidth={2.5}
                    fill="url(#walletGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.section>

          {/* Revenue chart */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Financials</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Revenue vs. Operating Costs</h2>
              <p className="text-sm text-muted-foreground mt-1">Quarterly revenue and cost structure (R millions)</p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={revenueForChart} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(156 40% 15%)" vertical={false} />
                  <XAxis
                    dataKey="quarter"
                    tick={{ fill: "hsl(45 33% 60%)", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(156 40% 20%)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "hsl(45 33% 60%)", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={v => `R${v}M`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: "12px", color: "hsl(45 33% 70%)", paddingTop: "12px" }}
                  />
                  <Bar dataKey="Revenue (R million)" fill="hsl(43 90% 50%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Operating Costs (R million)" fill="hsl(156 40% 25%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Gross Profit (R million)" fill="hsl(156 55% 38%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.section>

          {/* Unit economics */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Unit Economics</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Per Wallet, Per Month</h2>
              <p className="text-sm text-muted-foreground mt-1">Cost structure and margin at the individual wallet level</p>
            </motion.div>

            <motion.div variants={stagger} className="space-y-3">
              {unitEcon.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`flex items-center justify-between rounded-xl px-6 py-4 border ${
                    item.positive
                      ? "bg-primary/10 border-primary/30"
                      : "bg-card border-border"
                  }`}
                >
                  <div>
                    <p className={`font-semibold text-sm ${item.positive ? "text-foreground" : "text-foreground/80"}`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.note}</p>
                  </div>
                  <p className={`font-display font-bold text-xl tabular-nums ${item.positive ? "text-primary" : "text-muted-foreground"}`}>
                    {item.positive ? "" : "− "}{item.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Key assumptions */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Assumptions</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Key Model Assumptions</h2>
            </motion.div>

            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Revenue model", value: "Subscription only (Phase 1)", detail: "No transaction fees, no interchange. Single flat monthly charge." },
                { label: "Churn rate", value: "< 5% monthly", detail: "Assumption based on mobile money retention benchmarks in SSA markets." },
                { label: "CAC (customer acquisition cost)", value: "R 15 – R 25 per wallet", detail: "Community agent model, USSD activation, telco co-marketing." },
                { label: "LTV at 72% margin", value: "R 86.40 / year", detail: "At average 12-month retention, R10 × 12 × 72% = R86.40 gross LTV." },
                { label: "Infrastructure cost basis", value: "AWS Cape Town region", detail: "Per-wallet costs decline as volumes scale — estimated R1.50 → R0.80 by 2028." },
                { label: "SADC expansion (Phase 2)", value: "R 5 – R 15 / wallet / mo", detail: "Corridor pricing varies by market. Zimbabwe and Lesotho modelled first." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-card border border-border rounded-xl p-6 space-y-2"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  <p className="font-bold text-lg text-primary">{item.value}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* What-if calculator */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <WhatIfCalc />
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary/10 border border-primary/30 rounded-2xl p-8 md:p-12 text-center space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold">
              Want the full financial model?
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              The complete Excel/Sheets model — including SADC corridor projections, sensitivity
              analysis, and cap table — is available on request.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:hello@marung.co.za?subject=Marung Full Financial Model Request"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                data-testid="btn-model-email"
              >
                Request full model <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/pitch"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Back to pitch deck <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Legal */}
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            All projections are forward-looking estimates based on market assumptions and internal modelling.
            They do not constitute a guarantee of performance. Marung Sebaka Technologies (Pty) Ltd · Reg.
            2026/221199/07 · Cape Town, South Africa.
          </p>

        </div>
      </main>
    </div>
  );
}
