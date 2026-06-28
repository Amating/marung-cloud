import 

const GREEN = "#1a4731";
const GOLD = "#d4a017";

const slide: React.CSSProperties = {
  width: "100%",
  minHeight: "100vh",
  pageBreakAfter: "always",
  breakAfter: "page",
  display: "flex",
  flexDirection: "column",
  padding: "56px 64px",
  boxSizing: "border-box",
  backgroundColor: "#ffffff",
  color: "#0f1a14",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  position: "relative",
};

const accent: React.CSSProperties = {
  color: GREEN,
};

const tag: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: GREEN,
  marginBottom: "20px",
};

const h1: React.CSSProperties = {
  fontFamily: "'Clash Display', 'Plus Jakarta Sans', sans-serif",
  fontSize: "52px",
  fontWeight: 800,
  lineHeight: 1.08,
  margin: "0 0 24px",
  color: "#0f1a14",
};

const h2: React.CSSProperties = {
  fontFamily: "'Clash Display', 'Plus Jakarta Sans', sans-serif",
  fontSize: "38px",
  fontWeight: 800,
  lineHeight: 1.12,
  margin: "0 0 20px",
  color: "#0f1a14",
};

const body: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.7,
  color: "#4a5e51",
};

const card: React.CSSProperties = {
  border: "1px solid #d6e6dc",
  borderRadius: "12px",
  padding: "20px 24px",
  backgroundColor: "#f7faf8",
};

const slideNum: React.CSSProperties = {
  fontFamily: "'Clash Display', 'Plus Jakarta Sans', sans-serif",
  fontSize: "80px",
  fontWeight: 800,
  color: "rgba(26,71,49,0.12)",
  lineHeight: 1,
  marginBottom: "4px",
};

const slideTag: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: GREEN,
  marginBottom: "20px",
};

const divider: React.CSSProperties = {
  width: "100%",
  height: "1px",
  backgroundColor: "#d6e6dc",
  margin: "16px 0",
};

const footer: React.CSSProperties = {
  marginTop: "auto",
  paddingTop: "24px",
  borderTop: "1px solid #d6e6dc",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "11px",
  color: "#8aaa96",
};

function SlideFooter({ page }: { page: string }) {
  return (
    <div style={footer}>
      <span>Marung Sebaka Technologies (Pty) Ltd · Reg. 2026/221199/07</span>
      <span style={{ color: GREEN, fontWeight: 700 }}>CONFIDENTIAL — {page}</span>
    </div>
  );
}

export default function PitchPDF() {
  return (
    <div style={{ backgroundColor: "#e8ede9" }}>
      {/* Print button — hidden when printing */}
      <div
        className="no-print"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 999,
          display: "flex",
          gap: "12px",
        }}
      >
        <button
          onClick={() => window.print()}
          style={{
            backgroundColor: GREEN,
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          ⬇ Save as PDF
        </button>
        <a
          href="/pitch"
          style={{
            backgroundColor: "#fff",
            color: GREEN,
            border: "1px solid #d6e6dc",
            borderRadius: "8px",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          ← Back
        </a>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; background: white; }
          @page { size: A4 landscape; margin: 0; }
        }
      `}</style>

      {/* ── SLIDE 1: COVER ── */}
      <div style={{ ...slide, background: `linear-gradient(135deg, ${GREEN} 0%, #0d2d1e 100%)`, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "auto" }}>
          <img src={logoImg} alt="Marung" style={{ height: "36px", width: "36px", objectFit: "contain" }} />
          <span style={{ fontFamily: "'Clash Display','Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "18px", color: "#fff" }}>Marung</span>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "40px", paddingBottom: "40px" }}>
          <p style={{ ...tag, color: GOLD, marginBottom: "24px" }}>Pre-Seed Investment Opportunity · April 2026</p>
          <h1 style={{ ...h1, color: "#fff", fontSize: "56px", maxWidth: "680px" }}>
            Money sent to your phone<br />should be{" "}
            <span style={{ color: GOLD }}>easier to use.</span>
          </h1>
          <p style={{ ...body, color: "rgba(255,255,255,0.75)", fontSize: "15px", maxWidth: "520px", marginBottom: "40px" }}>
            Marung Sebaka Technologies is building a simpler digital money journey for
            11 million South Africans who receive money on their mobile — but are forced
            to withdraw it as cash before they can use it.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {[
              { label: "Pre-Seed Ask", value: "R 3 Million" },
              { label: "Registered", value: "2026/221199/07" },
              { label: "Launch Target", value: "October 2026" },
              { label: "SADC Cross-Border", value: "November 2026" },
            ].map((s) => (
              <div key={s.label} style={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", padding: "16px 20px", backgroundColor: "rgba(255,255,255,0.08)", minWidth: "130px" }}>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
                <p style={{ fontFamily: "'Clash Display','Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "16px", color: GOLD }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...footer, borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" }}>
          <span>Marung Sebaka Technologies (Pty) Ltd · Reg. 2026/221199/07</span>
          <span style={{ color: GOLD, fontWeight: 700 }}>CONFIDENTIAL — 1 / 8</span>
        </div>
      </div>

      {/* ── SLIDE 2: PROBLEM ── */}
      <div style={slide}>
        <div style={slideNum}>01</div>
        <p style={slideTag}>Problem</p>
        <h2 style={h2}>Receiving money is easy.<br /><span style={accent}>Using it is not.</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "28px" }}>
          <p style={body}>South Africa's four major banks allow anyone to send money directly to a mobile number — no bank account required for the recipient. This reaches 11 million unbanked South Africans where they already are: their phones.</p>
          <p style={body}>But the money arrives as a "cash send" — it can only be accessed by withdrawing physical cash at an ATM or retail point. The money is already digital. The infrastructure is already there. Yet every rand is forced back into cash before it can be spent.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
          {[
            { stat: "11M", label: "South Africans without a bank account", detail: "The largest financially excluded population in Southern Africa" },
            { stat: "R60+", label: "Average cost of an ATM cash withdrawal", detail: "A real cost burden for recipients of small, frequent transfers" },
            { stat: "3–5km", label: "Average travel to access a withdrawal point", detail: "Peri-urban and rural communities travel far just to get their own money" },
          ].map((item, i) => (
            <div key={i} style={card}>
              <p style={{ fontFamily: "'Clash Display','Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "36px", color: GREEN, marginBottom: "6px" }}>{item.stat}</p>
              <p style={{ fontWeight: 600, fontSize: "13px", marginBottom: "4px" }}>{item.label}</p>
              <p style={{ fontSize: "12px", color: "#6b8577" }}>{item.detail}</p>
            </div>
          ))}
        </div>
        <SlideFooter page="2 / 8" />
      </div>

      {/* ── SLIDE 3: SOLUTION ── */}
      <div style={slide}>
        <div style={slideNum}>02</div>
        <p style={slideTag}>Solution</p>
        <h2 style={h2}>Keep the money digital.<br /><span style={accent}>From the moment it arrives.</span></h2>
        <p style={{ ...body, maxWidth: "600px", marginBottom: "24px" }}>
          Marung is a digital wallet that intercepts cash-send transfers before they become cash. The recipient accesses and uses their money through Marung — without withdrawing, without queuing, without a bank account.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          {[
            { step: "01", title: "Cash send arrives on the mobile number", desc: "Any of South Africa's 6 major banks sends a cash-send transfer to a mobile number — as millions of people already do every day." },
            { step: "02", title: "It lands in the Marung wallet", desc: "The funds arrive in a Marung digital wallet — visible, accessible, and ready to use. R10/month keeps the wallet active. No ATM. No queue." },
            { step: "03", title: "Spend it via Visa or Mastercard", desc: "The wallet balance is linked to Visa or Mastercard. Transact in-store, online, or send to anyone — no bank account required." },
          ].map((item, i) => (
            <div key={i} style={{ ...card, display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "'Clash Display','Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "22px", color: "rgba(26,71,49,0.25)", flexShrink: 0, marginTop: "2px" }}>{item.step}</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>{item.title}</p>
                <p style={{ fontSize: "13px", color: "#6b8577" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
          {[
            { label: "Price point", value: "R10 / month", note: "Flat fee — keeps the wallet active for 30 days" },
            { label: "Spend method", value: "Visa & Mastercard", note: "Wallet balance linked — transact anywhere, no bank account" },
            { label: "Regulatory basis", value: "SARB Draft Exemption", note: "National Payment System Act framework" },
          ].map((item, i) => (
            <div key={i} style={{ border: `1px solid rgba(26,71,49,0.25)`, borderRadius: "10px", padding: "16px 18px", backgroundColor: "rgba(26,71,49,0.04)" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: GREEN, marginBottom: "6px" }}>{item.label}</p>
              <p style={{ fontFamily: "'Clash Display','Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "18px", marginBottom: "4px" }}>{item.value}</p>
              <p style={{ fontSize: "12px", color: "#6b8577" }}>{item.note}</p>
            </div>
          ))}
        </div>
        <SlideFooter page="3 / 8" />
      </div>

      {/* ── SLIDE 4: MARKET ── */}
      <div style={slide}>
        <div style={slideNum}>03</div>
        <p style={slideTag}>Market</p>
        <h2 style={h2}>South Africa first.<br /><span style={accent}>SADC corridor next.</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { label: "Total Addressable Market — South Africa", value: "11 Million", note: "Unbanked adults actively receiving mobile money transfers" },
              { label: "Serviceable Addressable Market — Year 1", value: "800K Wallets", note: "R10/month × 800,000 = R96M ARR at full Year 1 penetration" },
              { label: "SADC Corridor Expansion — 2027", value: "R 3.9 Billion", note: "Addressable market across Zimbabwe, Lesotho, Mozambique, Botswana" },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b8577", marginBottom: "4px" }}>{item.label}</p>
                <p style={{ fontFamily: "'Clash Display','Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "28px", color: GREEN, marginBottom: "4px" }}>{item.value}</p>
                <p style={{ fontSize: "13px", color: "#6b8577" }}>{item.note}</p>
                {i < 2 && <div style={divider} />}
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b8577", marginBottom: "16px" }}>Why now — structural tailwinds</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { title: "SARB regulatory window is open", desc: "The SARB Draft Exemption Notice under the National Payment System Act creates the legal basis for non-bank wallet operators like Marung for the first time." },
                { title: "Bank infrastructure already built", desc: "South Africa's major banks already run cash-send infrastructure at scale. Marung sits at the receiving end — no bank partnerships required to launch Phase 1." },
                { title: "Feature phone penetration is 94%", desc: "USSD works on every mobile. Marung does not require a smartphone, data, or literacy — by design." },
                { title: "NDP 2030 and SDG alignment", desc: "Marung directly contributes to South Africa's NDP goal of financial inclusion, and to SDG 8 and SDG 10." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ height: "8px", width: "8px", borderRadius: "50%", backgroundColor: GREEN, flexShrink: 0, marginTop: "5px" }} />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "13px", marginBottom: "3px" }}>{item.title}</p>
                    <p style={{ fontSize: "12px", color: "#6b8577", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <SlideFooter page="4 / 8" />
      </div>

      {/* ── SLIDE 5: BUSINESS MODEL ── */}
      <div style={slide}>
        <div style={slideNum}>04</div>
        <p style={slideTag}>Business Model</p>
        <h2 style={h2}>Simple pricing.<br /><span style={accent}>Predictable revenue.</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", flex: 1 }}>
          <div>
            <div style={{ ...card, backgroundColor: `rgba(26,71,49,0.06)`, borderColor: `rgba(26,71,49,0.2)`, marginBottom: "20px" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: GREEN, marginBottom: "8px" }}>Core Revenue</p>
              <p style={{ fontFamily: "'Clash Display','Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "32px", color: GREEN }}>R10 / month</p>
              <p style={{ fontSize: "13px", color: "#6b8577", marginTop: "6px" }}>Flat subscription per active wallet. No transaction fees. No hidden costs. Affordable by design — under the price of a single ATM withdrawal.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Phase 1 (Oct 2026)", value: "15K wallets → R1.8M ARR", note: "South Africa pilot" },
                { label: "Growth (FY 2027)", value: "800K wallets → R96M ARR", note: "National + SADC corridors" },
                { label: "Scale (FY 2028)", value: "2M wallets → R240M ARR", note: "Full SADC + ancillary revenue" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "12px 16px", border: "1px solid #d6e6dc", borderRadius: "10px" }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "13px" }}>{item.label}</p>
                    <p style={{ fontSize: "11px", color: "#8aaa96" }}>{item.note}</p>
                  </div>
                  <p style={{ fontWeight: 800, fontSize: "13px", color: GREEN }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b8577", marginBottom: "16px" }}>Revenue streams</p>
            {[
              { icon: "💳", title: "Wallet subscription", desc: "R10/month per active wallet — primary revenue driver. Recurring, predictable, SaaS-style." },
              { icon: "🌍", title: "Cross-border remittance corridor", desc: "Competitive FX spread on SADC transfers. Launches November 2026." },
              { icon: "🏪", title: "Merchant payments", desc: "QR / USSD merchant payment network. Revenue share on transaction volume." },
              { icon: "💰", title: "Savings & micro-credit", desc: "Phase 3 product layer. Interest margin on Marung-facilitated savings." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "16px" }}>
                <span style={{ fontSize: "20px" }}>{item.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "13px", marginBottom: "3px" }}>{item.title}</p>
                  <p style={{ fontSize: "12px", color: "#6b8577", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <SlideFooter page="5 / 8" />
      </div>

      {/* ── SLIDE 6: TRACTION ── */}
      <div style={slide}>
        <div style={slideNum}>05</div>
        <p style={slideTag}>Traction</p>
        <h2 style={h2}>Pre-launch.<br /><span style={accent}>Not pre-validated.</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", flex: 1 }}>
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b8577", marginBottom: "16px" }}>Milestones achieved</p>
            {[
              { date: "Jan 2026", label: "Company registered", detail: "Marung Sebaka Technologies (Pty) Ltd — Reg. 2026/221199/07" },
              { date: "Feb 2026", label: "Legal counsel engaged", detail: "CMS South Africa retained — regulatory structuring underway" },
              { date: "Mar 2026", label: "Sponsor bank pathway identified", detail: "Tier 1 South African bank identified as Phase 1 partner (NDA)" },
              { date: "Apr 2026", label: "Technology partner engaged", detail: "AWS Partner (Cape Town) on board — infrastructure design phase" },
              { date: "Apr 2026", label: "Pre-seed fundraise launched", detail: "R3M pre-seed round open — first investor conversations underway" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "14px" }}>
                <div style={{ flexShrink: 0, textAlign: "right", minWidth: "60px" }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: GREEN }}>{item.date}</p>
                </div>
                <div style={{ flex: 1, paddingBottom: "10px", borderBottom: "1px solid #e8ede9" }}>
                  <p style={{ fontWeight: 700, fontSize: "13px", marginBottom: "2px" }}>{item.label}</p>
                  <p style={{ fontSize: "12px", color: "#6b8577" }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b8577", marginBottom: "16px" }}>Validation signals</p>
            {[
              { cat: "Regulatory", items: ["SARB Draft Exemption Notice confirms the legal pathway", "National Payment System Act framework identified", "FAIS & FICA compliance pathway mapped with CMS"] },
              { cat: "Market", items: ["11M unbanked South Africans — TAM confirmed by third-party sources", "R10/month pricing validated against consumer research", "Tier 1 sponsor bank (Phase 1) pathway confirmed (NDA)"] },
              { cat: "Technical", items: ["USSD architecture scoped with AWS Partner", "KYC/AML module design complete", "AWS Africa (Cape Town) region — ZA data sovereignty"] },
            ].map((section, i) => (
              <div key={i} style={{ marginBottom: "20px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: GREEN, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{section.cat}</p>
                {section.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "6px" }}>
                    <div style={{ height: "6px", width: "6px", borderRadius: "50%", backgroundColor: GREEN, flexShrink: 0, marginTop: "5px" }} />
                    <p style={{ fontSize: "12px", color: "#4a5e51", lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <SlideFooter page="6 / 8" />
      </div>

      {/* ── SLIDE 7: TEAM ── */}
      <div style={slide}>
        <div style={slideNum}>06</div>
        <p style={slideTag}>Team</p>
        <h2 style={h2}>Built on the right<br /><span style={accent}>foundations.</span></h2>
        <p style={{ ...body, maxWidth: "560px", marginBottom: "28px" }}>Marung is backed by partners who understand the legal, technical, and commercial realities of building fintech infrastructure in South Africa.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", flex: 1 }}>
          {[
            {
              initials: "M",
              name: "Madichaba",
              role: "Founder & CEO",
              sub: "Strategy · Vision · Execution",
              desc: "Originator of the Marung concept, responsible for product strategy, regulatory engagement, and investor relations. Deep knowledge of South Africa's unbanked population and the pain points Marung is solving.",
            },
            {
              initials: "CMS",
              name: "CMS South Africa",
              role: "Legal Counsel",
              sub: "cms.law/en/zaf",
              desc: "One of the world's largest law firms with a significant South African practice. Advises Marung on regulatory structuring under the National Payment System Act, SARB Draft Exemption compliance, and corporate governance.",
            },
            {
              initials: "AWS",
              name: "AWS Partner",
              role: "Technology Partner · Cape Town",
              sub: "Cape Town — ZA data sovereignty",
              desc: "A Cape Town-based Amazon Web Services Partner delivering Marung's cloud infrastructure and technology stack. AWS-certified expertise purpose-built for African financial services workloads.",
            },
          ].map((item, i) => (
            <div key={i} style={card}>
              <div style={{ height: "48px", width: "48px", borderRadius: "50%", backgroundColor: "rgba(26,71,49,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                <span style={{ fontFamily: "'Clash Display','Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "15px", color: GREEN }}>{item.initials}</span>
              </div>
              <p style={{ fontFamily: "'Clash Display','Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "17px", marginBottom: "4px" }}>{item.name}</p>
              <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: GREEN, marginBottom: "12px" }}>{item.role}</p>
              <p style={{ fontSize: "12px", color: "#6b8577", lineHeight: 1.6 }}>{item.desc}</p>
              <p style={{ fontSize: "11px", color: "#8aaa96", marginTop: "10px" }}>{item.sub}</p>
            </div>
          ))}
        </div>
        <SlideFooter page="7 / 8" />
      </div>

      {/* ── SLIDE 8: THE ASK ── */}
      <div style={{ ...slide, pageBreakAfter: "avoid", breakAfter: "avoid" }}>
        <div style={slideNum}>07</div>
        <p style={slideTag}>The Ask</p>
        <h2 style={h2}>Raising <span style={accent}>R 3 Million</span> pre-seed.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", flex: 1 }}>
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b8577", marginBottom: "16px" }}>Use of funds</p>
            {[
              { label: "Product build — USSD layer, wallet engine, KYC module", pct: 40 },
              { label: "Regulatory compliance — SARB Exemption, legal, audit", pct: 25 },
              { label: "Market activation — pilot cohort, community launch", pct: 20 },
              { label: "Team & operations — first hires, Cape Town HQ", pct: 15 },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontSize: "12px", color: "#4a5e51" }}>{item.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: GREEN }}>{item.pct}%</span>
                </div>
                <div style={{ height: "6px", borderRadius: "4px", backgroundColor: "#d6e6dc", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${item.pct}%`, backgroundColor: GREEN, borderRadius: "4px" }} />
                </div>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b8577", marginBottom: "16px" }}>Milestones this round unlocks</p>
            {[
              { date: "Oct 2026", milestone: "Product launch — first wallets live, Tier 1 sponsor bank (Phase 1)" },
              { date: "Nov 2026", milestone: "Cross-border SADC corridor live — Zimbabwe, Lesotho, Mozambique" },
              { date: "Q1 2027", milestone: "100,000 active wallets — Series A raise begins" },
              { date: "Q4 2027", milestone: "800,000 wallets — Tier 2 sponsor bank (Phase 2) integration, SADC at scale" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "14px", paddingBottom: "14px", borderBottom: "1px solid #e8ede9" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: GREEN, flexShrink: 0, minWidth: "56px" }}>{item.date}</span>
                <p style={{ fontSize: "13px", color: "#4a5e51", lineHeight: 1.5 }}>{item.milestone}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: `rgba(26,71,49,0.06)`, border: `1px solid rgba(26,71,49,0.2)`, borderRadius: "14px", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: GREEN, marginBottom: "6px" }}>Get in touch</p>
            <p style={{ fontFamily: "'Clash Display','Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "18px" }}>Ready to be part of South Africa's financial inclusion story?</p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "24px" }}>
            <p style={{ fontWeight: 700, fontSize: "14px", color: GREEN }}>hello@marung.co.za</p>
            <p style={{ fontSize: "12px", color: "#6b8577", marginTop: "4px" }}>Madichaba · Founder & CEO</p>
          </div>
        </div>
        <SlideFooter page="8 / 8" />
      </div>
    </div>
  );
}
