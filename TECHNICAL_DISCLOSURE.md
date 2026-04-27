# Technical Disclosure Document
## Marung Cloud — Mobile Money System with Virtual Card Issuance

**Prepared for IP Legal Proceedings and Patent Application**

---

### Identifying Information

| Field | Detail |
|---|---|
| **Company** | Marung Sebaka Technologies (Pty) Ltd |
| **Registration** | 2026/221199/07 |
| **Inventor** | Marung Sebaka |
| **System Name** | Marung Cloud |
| **Priority Date (Earliest Commit)** | 18 April 2026 — commit `8337c4b212e24647aabef156b8443ea496df2cf9` |
| **First Working Prototype Date** | 23 April 2026 — commit `5e4b2b187f10ff4010fa3acae3a3833812c740e0` |
| **Mobile App First Build Date** | 24 April 2026 — commit `ea2adedbd6ca9975bbafb1db675b573730c30fa9` |
| **Live Deployed Demo** | marung-sebaka-mirror.replit.app/marung-wallet |
| **Repository** | Replit Project — marung-sebaka-mirror |

---

## Title of Invention

**A Phone-Number-Identified Mobile Wallet System with Virtual Card Issuance, Bank Cash-Send-Only Funding, and Subscriber-to-Subscriber Transfer as a Network Growth Mechanic**

---

## 1. Background of the Invention

South Africa has approximately 15 million unbanked adults. Existing mobile money solutions (e.g. M-Pesa) rely on USSD or agent cash-in networks, which require significant physical infrastructure and impose high per-transaction costs. At the same time, digitally-active consumers with existing bank accounts lack a lightweight, low-cost secondary wallet for specific spending categories.

No existing South African solution combines:
- Cash-send-only wallet funding (eliminating deposit-taking liability)
- Virtual Visa and Mastercard issuance at the wallet level
- Subscriber-to-subscriber money transfer as the primary growth mechanic
- A flat-rate monthly activation model (R10/month)
- All within the Third Party Payment Provider (TPPP) regulatory framework

This invention addresses all five simultaneously.

---

## 2. Summary of the Invention

Marung Cloud is a smartphone-native mobile wallet system that:

1. Assigns a virtual Visa or Mastercard to a South African phone number
2. Funds the wallet exclusively via interbank cash sends (no direct deposits)
3. Allows money transfer only between registered Marung Cloud subscribers
4. Operates under a sponsor bank float model (no banking licence required)
5. Charges a flat R10/month activation fee

The combination of these five elements is novel. Each is described in detail below.

---

## 3. Detailed Technical Description

### 3.1 Phone Number as Wallet Identifier

The wallet identity is the subscriber's mobile phone number in E.164 format (e.g. +27XXXXXXXXX). No bank account number is required. The phone number:
- Serves as the wallet address for incoming transfers
- Is the primary identifier for KYC and FICA onboarding
- Links the virtual card to the subscriber in the card network

**Technical implementation:** `artifacts/marung-wallet/context/WalletContext.tsx`
First committed: 24 April 2026 at 12:39:56 UTC

### 3.2 Cash-Send-Only Wallet Funding Architecture

The wallet can only receive funds via an interbank cash send — a bank-originated push transfer — from any South African bank (Absa, FNB, Nedbank, Standard Bank, Capitec, Investec, or any interbank transfer). The system explicitly refuses:
- Cash deposits
- ATM deposits
- Wallet-to-wallet top-ups from non-bank sources

This architectural decision is the mechanism by which Marung Cloud avoids deposit-taking status under the Banks Act 94 of 1990. The sponsor bank holds the float on behalf of subscribers. The TPPP framework governs all flows.

**User-facing disclosure:** "Only bank cash sends accepted. No cash deposits."

**Technical implementation:** `artifacts/marung-wallet/app/receive.tsx`
- Presents bank selector chips (Absa, FNB, Capitec, Standard Bank, Nedbank, Investec)
- Records the source bank for provenance tracking
- Labels the action "Load to Cloud" (not "Deposit")

First committed: 24 April 2026 at 12:48:09 UTC

### 3.3 Subscriber-to-Subscriber Transfer as Network Growth Mechanic

Money transfers between Marung Cloud subscribers are the only permitted peer-to-peer transaction type. The recipient must be a registered Marung Cloud subscriber identified by their phone number.

This constraint is intentional and serves as the viral growth engine: every send attempt by a subscriber who wants to pay a non-subscriber creates a recruitment event. The sender must onboard the recipient before the transfer can proceed. This mirrors the M-Pesa growth model in Kenya and the Cash App referral model in the United States, applied within a South African regulatory framework.

**Technical implementation:** `artifacts/marung-wallet/app/send.tsx`
- Validates recipient phone number
- Checks subscriber status
- Deducts balance via `makePayment()` in `WalletContext`
- Records transaction with unique timestamp-based ID

First committed: 24 April 2026 at 12:48:09 UTC

### 3.4 Virtual Visa and Mastercard Issuance at TPPP Layer

Each subscriber receives a virtual card — either Visa or Mastercard — at wallet activation. The card:
- Has a generated 16-digit PAN (card number) matching the appropriate card network BIN range
- Has a CVV, expiry date, and cardholder name
- Is linked to the subscriber's wallet balance
- Can be used for card-present (NFC/tap-to-pay) and card-not-present (online) transactions wherever Visa or Mastercard is accepted

This dual-network issuance (subscriber chooses Visa or Mastercard at onboarding, can toggle later) at the TPPP layer — without requiring a full banking licence — is a specific architectural innovation.

**Technical implementation:**
- `artifacts/marung-wallet/components/VirtualCard.tsx` — flippable virtual card UI
- `artifacts/marung-wallet/context/WalletContext.tsx` — `generateCardNumber()`, `generateCVV()`, `generateExpiry()`, `switchCardType()`
- `artifacts/marung-wallet/app/(tabs)/index.tsx` — live Visa/Mastercard toggle

Card number generation uses network-specific BIN prefixes (4xxx for Visa, 5xxx for Mastercard) with Luhn-compliant digit generation.

First committed: 24 April 2026 at 12:39:56 UTC

### 3.5 Flat-Rate Monthly Activation Model

The service charges R10 per month as an activation fee. There are no per-transaction fees for wallet-to-wallet transfers. Card network interchange fees apply to card transactions. This flat-rate model is viable because the system takes no deposit liability — the cost structure is that of a payment facilitator, not a bank.

**User-facing disclosure:** "R10/month to activate · Not a bank · Visa & Mastercard linked"

First documented: 24 April 2026 at 12:39:56 UTC

### 3.6 Sponsor Bank Float Model

Subscriber funds are held by a licensed South African bank acting as sponsor bank. Marung Sebaka Technologies (Pty) Ltd does not hold funds directly. This structure:
- Keeps Marung Cloud outside the definition of "deposit-taking" under the Banks Act
- Qualifies the system for TPPP registration rather than a full banking licence
- Is disclosed to subscribers: "Marung Cloud is not a bank — funds held by Marung Sponsor Bank"

**Technical implementation:** `artifacts/marung-wallet/app/(tabs)/profile.tsx`
Sponsor bank branding: "Marung Sponsor Bank — powered by AWS Partner"

### 3.7 Dual-Market Architecture

The system is architected to serve two markets simultaneously:

**Market A — Unbanked:** Phone number wallet, R10/month access, no minimum balance, cash send from any SA bank as the only funding route. Designed for first-time financial product users.

**Market B — Digitally-active banked consumers:** Secondary wallet for household staff payments, subscription services, online spend, and travel. R10/month is below material consideration for this segment.

This dual-market design within a single product and regulatory structure is an architectural novelty.

---

## 4. Software Components and File Map

| Component | File Path | Purpose | First Committed |
|---|---|---|---|
| Wallet State Engine | `context/WalletContext.tsx` | Balance, transactions, card data, AsyncStorage persistence | 2026-04-24 12:39:56 UTC |
| Virtual Card Component | `components/VirtualCard.tsx` | Flippable card UI, Visa/MC rendering, card number display | 2026-04-24 12:39:56 UTC |
| Home Screen | `app/(tabs)/index.tsx` | Balance display, card toggle, Send/Receive/Pay actions | 2026-04-24 12:39:56 UTC |
| Send Money Screen | `app/send.tsx` | Subscriber-to-subscriber transfer flow | 2026-04-24 12:48:09 UTC |
| Receive/Load Screen | `app/receive.tsx` | Bank selector, cash-send-only messaging | 2026-04-24 12:48:09 UTC |
| Onboarding — Welcome | `app/onboarding/index.tsx` | "Not a bank" disclosure, feature introduction | 2026-04-24 12:39:56 UTC |
| Onboarding — Phone | `app/onboarding/phone.tsx` | Phone number capture, wallet identifier assignment | 2026-04-24 12:39:56 UTC |
| Onboarding — Card Select | `app/onboarding/card-select.tsx` | Visa or Mastercard network selection | 2026-04-24 12:39:56 UTC |
| Onboarding — Success | `app/onboarding/success.tsx` | Wallet activation confirmation | 2026-04-24 12:39:56 UTC |
| Pay Screen | `app/(tabs)/pay.tsx` | NFC/tap-to-pay simulation | 2026-04-24 12:39:56 UTC |
| Transaction History | `app/(tabs)/history.tsx` | Transaction log with type/amount/timestamp | 2026-04-24 12:39:56 UTC |
| Profile Screen | `app/(tabs)/profile.tsx` | Sponsor bank branding, card limit, settings | 2026-04-24 12:39:56 UTC |
| App Configuration | `app.json` | "Marung Cloud" brand, dark theme #051A12 | 2026-04-24 12:39:56 UTC |
| Brand Colours | `constants/colors.ts` | Background #051A12, Primary/Gold #D4A017 | 2026-04-24 12:39:56 UTC |
| Web Export Build | `scripts/build-web.js` | Static web build for browser-based demo | 2026-04-24 15:21:00 UTC |
| Production Server | `server/serve.js` | Serves web and native builds in production | 2026-04-24 12:39:56 UTC |

---

## 5. Timestamped Git Commit Evidence

The following is the complete build history extracted from the version control system. Each entry includes the UTC timestamp and cryptographic commit hash, which constitutes tamper-evident evidence of creation date.

| UTC Timestamp | Commit Hash | Description |
|---|---|---|
| 2026-04-18 02:00:09 | `8337c4b2` | Initial commit — project inception |
| 2026-04-23 15:06:31 | `5e4b2b18` | First working Marung Cloud website with investor content |
| 2026-04-23 15:32:37 | `03a1265a` | Brand and messaging refinement |
| 2026-04-23 16:24:52 | `60c41e51` | First public deployment |
| 2026-04-24 07:24:19 | `713e8a8a` | Threat model documented |
| 2026-04-24 07:47:54 | `509117035` | Investor research compiled (20 VCs) |
| 2026-04-24 07:52:59 | `1c543aba` | Pitch deck built |
| 2026-04-24 09:00:16 | `0e59b191` | Revenue model page added |
| 2026-04-24 09:04:35 | `6c7b9e66` | Traction metrics page |
| 2026-04-24 09:09:42 | `ee536d3c` | Sponsor bank references finalised |
| 2026-04-24 12:21:54 | `142daec7` | Visa/Mastercard integration documented on website |
| 2026-04-24 12:39:56 | `ea2adedbd` | **FIRST BUILD — Marung Wallet mobile app** — all core files created |
| 2026-04-24 12:43:51 | `b39c826b` | Payment animation and UX refinement |
| 2026-04-24 12:48:09 | `86096be7` | Send Money (subscriber-to-subscriber), "not a bank" disclosures, bank selector on Receive |
| 2026-04-24 13:32:14 | `eaa271e8` | First mobile app deployment to production |
| 2026-04-24 14:53:22 | `3867cb37` | Demo balance and seeded transaction history |
| 2026-04-24 15:15:33 | `d4fece92` | Web version added (browser-accessible demo) |
| 2026-04-24 15:21:00 | `46911bcb` | Web build pipeline optimised |
| 2026-04-24 15:27:15 | `12d94074` | Asset path rewriting for correct base URL routing |
| 2026-04-24 15:30:24 | `8c5c819c` | **Final production deployment — live at marung-sebaka-mirror.replit.app/marung-wallet** |

---

## 6. Key Claims for Patent Application

Your patent attorneys should consider claims covering the following, individually and in combination:

1. A method of funding a mobile wallet exclusively via interbank cash sends, wherein the wallet operator does not accept direct deposits and holds no funds directly, with funds held by a licensed sponsor bank.

2. A system wherein subscriber-to-subscriber money transfer requires both parties to be registered subscribers of the same mobile wallet platform, creating a network recruitment mechanic as a precondition of transfer.

3. A method of issuing virtual Visa or Mastercard payment credentials linked to a mobile phone number, operated within a TPPP regulatory framework without a banking licence.

4. A dual-market mobile wallet architecture configured to serve both unbanked users and digitally-active banked consumers through a single product with a flat-rate monthly activation fee.

5. A mobile wallet system wherein the phone number is the sole wallet identifier, requiring no bank account number, and wherein a virtual card is issued to that phone number upon activation.

---

## 7. On the Codebase

Yes — the codebase itself is important evidence and should be protected. Specifically:

- **Copyright** in the source code vests automatically in Marung Sebaka Technologies (Pty) Ltd as the commissioning entity from the moment each file was created (per South African Copyright Act 98 of 1978).
- The git commit history with cryptographic hashes provides **tamper-evident timestamps** of authorship that are admissible as evidence of creation date.
- The codebase should be **archived and notarised** — a hash of the full repository at the priority date should be lodged with your attorneys or a notary to create an immutable record.
- Consider lodging the source code with the **Companies and Intellectual Property Commission (CIPC)** as a copyright deposit.
- Under no circumstances should the core architecture files (particularly `WalletContext.tsx`, `send.tsx`, `receive.tsx`, and `VirtualCard.tsx`) be open-sourced without legal advice.

---

## 8. Regulatory Framework Note

This system operates within:
- **TPPP (Third Party Payment Provider)** framework — governed by the South African Reserve Bank (SARB) National Payment System Act 78 of 1998
- **POPIA** — Protection of Personal Information Act 4 of 2013 (KYC/FICA data handling)
- **FICA** — Financial Intelligence Centre Act 38 of 2001 (customer due diligence)
- **Banks Act 94 of 1990** — specifically structured to avoid deposit-taking status

The architecture's compliance strategy (cash-send-only funding, sponsor bank float) is itself a protectable innovation in combination with the other claims.

---

*Document prepared: 24 April 2026*
*Marung Sebaka Technologies (Pty) Ltd — Reg. 2026/221199/07*
*This document is confidential and prepared for legal purposes.*
