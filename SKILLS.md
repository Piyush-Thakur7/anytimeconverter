# 🏛️ AI Engineering OS: Master Architecture & Tool Use-Case Guide

## 1. Permanent Team Structure & Capabilities

| Layer | System Tool | Primary Responsibility |
| :--- | :--- | :--- |
| **Primary Architect & CTO** | **Antigravity** | System Architecture, Full-Stack Code Generation, Code Review, Security Audits, Deployment Strategy. |
| **Automation Specialist** | **Hermes Agent** | Delegated for long CLI operations, headless browser automation, web scraping, multi-step workflows (`hermes -z`). |
| **Model Gateway & Token Router** | **OmniRoute** | `http://localhost:20128/v1` Proxy with 16 Pooled Keys across 8 Providers + ~89% Token Compression. |
| **Terminal Subsystem** | **WSL2 (Ubuntu 24.04 LTS)** | POSIX-compliant Linux execution, native Bash scripting, 3x–5x faster package compilation, `/mnt/c/` cross-file access. |
| **UI Partner Stack** | **shadcn/ui + 21st.dev + magicui** | Production-ready React/Next.js components, Bento grids, animated micro-interactions. |
| **Design System Link** | **Figma MCP** | Authenticated design token synchronization (`figd_...` token). |
| **Live Web Inspector** | **Playwright MCP** | Headless browser DOM inspection, screenshot capture, interactive web testing. |
| **Free External Data Layer** | **public-apis/public-apis** | Comprehensive catalog of free public REST APIs for live data integration. |
| **SaaS Foundation Blueprint** | **shadcn/taxonomy** | Next.js App Router, Supabase Auth, Stripe billing, and dashboard layout templates. |
| **Cloud Infrastructure** | **Vercel + Supabase** | Zero-cost serverless hosting and managed PostgreSQL cloud databases. |

---

## 2. Tool Use-Case & Execution Guide

### 🤖 A. Hermes Agent (Automation & Browser Worker)
* **When to Use**:
  * Headless browser web scraping (visiting dynamic websites, Figma Make boards, dashboards).
  * Long-running terminal or script executions that would block the primary agent turn.
  * Multi-step autonomous research and data extraction.
* **Execution Command**:
  ```powershell
  & "C:\Users\HP\AppData\Local\hermes\hermes-agent\venv\Scripts\hermes.exe" -z "Your task prompt here"
  ```

---

### 🗜️ B. OmniRoute Gateway (`http://localhost:20128/v1`)
* **When to Use**:
  * Universal multi-model routing across Gemini, Groq, Cerebras, OpenRouter, Mistral, Cohere, GitHub Models, and AgentRouter.
  * Compressing prompt tokens by ~89% using RTK/Caveman compression.
  * Automatic multi-key failover if any provider hits rate limits.
* **Base URL**: `http://localhost:20128/v1`
* **Import File**: `C:\Users\HP\.omniroute\providers_import.json`

---

### 🐧 C. WSL2 Ubuntu Linux Terminal
* **When to Use**:
  * Running Linux-native bash scripts, `curl`, `jq`, `grep`, and Python tooling without Windows pathing bugs.
  * Fast `npm install` and build compilation.
* **Windows Drive Mount**: `/mnt/c/Users/HP/...`
* **Linux Launch**: `wsl -d Ubuntu`

---

### 🏗️ D. Open-Source Starter Repositories (`C:\Users\HP\Development\templates\`)
1. **`taxonomy`**:
   * Use as the boilerplate for any new Next.js 14/15 App Router SaaS product (Auth + Stripe + Prisma/Drizzle).
2. **`magicui`**:
   * Source for animated Bento grids, glowing buttons, and particle canvas effects.
3. **`helicone`**:
   * Reference architecture for AI cost tracking and proxy telemetry.
4. **`public-apis`**:
   * Reference directory for free non-AI public APIs.

---

### 🎨 E. Figma MCP & Playwright MCP
* **Figma MCP**: Inspects UI frames, color tokens, and layout trees directly from Figma URLs.
* **Playwright MCP**: Automates browser navigation, UI testing, and captures screenshots for visual validation.

---

## 3. Mandatory 10-Step CTO Engineering Workflow

For every new project, major feature, or full-stack application:

$$\begin{aligned}
\text{1. Problem Analysis} &\longrightarrow \text{2. Competitor / Spec Audit} \longrightarrow \text{3. System Architecture} \\
&\longrightarrow \text{4. Spec Plan (implementation\_plan.md)} \longrightarrow \text{5. Task Breakdown} \\
&\longrightarrow \text{6. Implementation (Code Generation)} \longrightarrow \text{7. Security / SAST Audit} \\
&\longrightarrow \text{8. Automated Verification / Testing} \longrightarrow \text{9. Documentation (walkthrough.md)} \\
&\longrightarrow \text{10. Cloud Deployment (Vercel + Supabase)}
\end{aligned}$$

---

## 4. Mandatory Pre-Task Skill Protocol
1. **Analyze Requirements**: Determine which active core skill(s) or archived niche skills are needed.
2. **Explicit Skill Announcement**: State `[Skill Activated: <skill-name>]` at the beginning of each task response.
3. **Execute Strictly**: Follow the selected skill's quality standards and checklists.
