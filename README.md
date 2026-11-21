# 🛡️ ISMS K9 — ISO/IEC 27001 Asset Register

A browser-based **Information Security Management System (ISMS)** asset register aligned to **ISO/IEC 27001 Annex A**. Track security assets, their classification, criticality, mapped controls, and compliance state — with **AI-style live translation across 36 languages**.

> Built as a single-page React + TypeScript + Tailwind app. No backend, no external API calls — everything runs in the browser.

---

## ✨ Features

- **Asset Register** — register and manage security assets with full metadata:
  - Name, category (Information, Hardware, Software, Service, Network, People, Facility, **K9 Unit**)
  - Classification (Public / Internal / Confidential / Restricted)
  - Criticality (1–4), risk rating (Low → Critical)
  - Owner, custodian, location, status
  - Mapped **ISO/IEC 27001 Annex A** controls (A.5.x, A.6.x, A.7.x, A.8.x)
  - Compliance state (Compliant / Partial / Non-Compliant / Not Assessed)
  - Last review & next review dates
- **Compliance Dashboard** — live stats for total assets, compliant count, compliance gaps, restricted assets, and mapped controls.
- **AI Translation Studio** — type any text and see it rendered across all 36 supported languages instantly.
- **Search & Filter** — search by asset name, owner, or control ID; filter by classification, status, and compliance state.
- **Asset Detail Panel** — click any row to inspect the full record and its mapped controls.

---

## 🌍 Supported Languages (36)

English, Español, Français, Deutsch, Português, Italiano, Nederlands, Dansk, Norsk, Svenska, Suomi, Polski, Čeština, Magyar, Română, Ελληνικά, Русский, Українська, Türkçe, עברית, العربية, فارسی, اردو, हिन्दी, বাংলা, தமிழ், ไทย, Tiếng Việt, Bahasa Indonesia, Bahasa Melayu, Filipino, 日本語, 한국어, 中文, Kiswahili, Afrikaans.

---

## 🧱 Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| UI primitives | shadcn/ui |
| Icons | lucide-react |
| State | React hooks (no external store) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm (or pnpm / yarn)

### Install & run
