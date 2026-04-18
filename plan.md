# ARCHITECTURE PLAN: BARE-METAL TO ZERO-TRUST PORTFOLIO

## 1. THE FOUNDATION (React + Vite)
We use React powered by Vite. `create-react-app` is dead bloatware. Vite uses native ES modules for instant hot module replacement (HMR) and insanely fast compilation. 
*   **Execution:** The app will be initialized using `npx create-vite@latest` inside this directory.

## 2. THE HOSTING (GitHub Pages via Fastly Edge)
GitHub Pages is the optimal free tier. It serves static assets through their Fastly-backed CDN edge nodes, meaning your portfolio loads globally with microsecond latency. Because it's entirely static HTML/JS, the server-side attack surface is effectively zero.

## 3. THE CI/CD PIPELINE (GitHub Actions)
You are an aspiring DevSecOps specialist. You do not manually build and push code. 
*   **Execution:** We will write a `.github/workflows/deploy.yml` pipeline. Every time you push to the `main` branch, the GitHub Action container will automatically spin up, install dependencies, run `npm run build`, and push the compiled static bundle to the `gh-pages` branch. Absolute zero-touch automated deployment.

## 4. THE CONTENT & NARRATIVE
**Primary Header:**
*DevOps | Infrastructure | Platform Engineer*
*Automating infrastructure, optimizing deployments, and building scalable cloud solutions*

**Core Tagline:** *"your favorite devops tools engineer"*

**The Professional Evolution (Visual Timeline):**
1.  **Bare-Metal (Firmware):** C/C++, Embedded processing, Printers. You know how the hardware thinks before the OS even boots.
2.  **User-Space (OTT / Set-Top Box / Frontend):** High-traffic streaming platforms, UI/UX, and end-to-end full-stack interaction.
3.  **The Root Administrator (Current - DevSecOps / Tools Engineer):** 
    *   **Kubernetes HA:** Multi-node, Multi-master infrastructure and robust platforming.
    *   **SecOps:** Zero-Trust pipelines and infrastructure hardening.
    *   **AI Integration:** MCP (Model Context Protocol) AI deployments for automated telemetry and operations.

## 5. UI / UX ARCHITECTURE (SPLIT-SCREEN DESIGN)
The design must be incredibly premium, dynamic, and ruthless. Dark mode by default, utilizing a highly responsive split-screen grid architecture on desktop (stacking vertically on mobile). We use Vanilla CSS for granular DOM control, bypassing utility-class bloat.

**The Left Panel (Static Visual Focus):**
*   **The Root Fractal (p5.js):** A hardware-accelerated p5.js canvas rendering an exploding Mandelbrot loop on a pure black background.
*   **The Identity:** Primary headers ("DevOps | Infrastructure..."), your Google profile image, and the core tagline.
*   **The Arsenal (Infinite Marquee):** A continuous, smooth-scrolling horizontal segment displaying the core stack (K3s, K8s, Python, Bash, etc.) integrated seamlessly into the visual flow.

**The Right Panel (Scrollable Content):**
*   This half of the screen will be an independently scrollable vertical area. It will house the deep explanations, the "Bare-Metal to Zero-Trust" timeline, and real-world DevSecOps case studies, allowing the user to read while the left panel's fractal explodes infinitely.
