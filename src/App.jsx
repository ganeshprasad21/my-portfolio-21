import React from 'react';
import FractalBackground from './components/FractalBackground';
import Marquee from './components/Marquee';
import Typewriter from './components/Typewriter';
import WordRotator from './components/WordRotator';
import TerminalBoot from './components/TerminalBoot';
import './index.css';

function App() {
  return (
    <div className="portfolio-container">
      {/* Left Panel - Visual Anchor */}
      <div className="left-panel">
        <FractalBackground />
        
        <TerminalBoot />
        <div className="identity-overlay">
          <h1 className="name">GANESH PRASAD R</h1>
          <h2 className="title">DevOps | Infrastructure | Platform Engineer</h2>
          <p className="subtitle">Automating infrastructure, optimizing deployments, and building scalable cloud solutions.</p>
          <WordRotator />
          <p className="tagline">
            <span className="terminal-prompt terminal-prompt--full">g@g-mac21 &gt;&gt;</span>
            <span className="terminal-prompt terminal-prompt--short">g@g &gt;&gt;</span>
            <Typewriter text='your favorite devops tools engineer...' />
          </p>
        </div>

        <Marquee />
      </div>

      {/* Right Panel - Scrollable Explanations */}
      <div className="right-panel">
        <nav className="top-nav">
          <a href="#about">&gt; ABOUT</a>
          <a href="#blog">&gt; BLOG</a>
          <a href="#links">&gt; LINKS</a>
          <a href="#contact">&gt; CONTACT</a>
        </nav>

        <section id="about" className="timeline-section">
          <h3>THE ARCHITECTURE OF A CAREER</h3>
          
          <div className="timeline-node">
            <div className="node-header">
              <span className="node-layer">LAYER 00</span>
              <h4>The Origin</h4>
            </div>
            <p>Target: Commanding the Inanimate.</p>
            <p>I started this career as a kid in awe of technology. I was obsessed with how nonliving things could be commanded to execute complex actions via spells—what we call code. That obsession became the root execution protocol for everything that followed.</p>
          </div>

          <div className="timeline-node">
            <div className="node-header">
              <span className="node-layer">LAYER 01</span>
              <h4>Bare-Metal Firmware Engineer</h4>
            </div>
            <p>Target: Printers, Set-Top Boxes & Embedded Systems.</p>
            <p>I did not start in the cloud; I started at the metal. My foundation is built on C/C++ firmware engineering. Before I orchestrated servers, I manipulated raw memory and executed logic directly on set-top box and printer hardware.</p>
          </div>

          <div className="timeline-node">
            <div className="node-header">
              <span className="node-layer">LAYER 02</span>
              <h4>DevOps Solutions & OTT Frontend</h4>
            </div>
            <p>Target: High-Traffic Streaming & CI/CD Automation.</p>
            <p>Moving up the stack, I started building DevOps solutions for OTT platforms and designing frontend interfaces. I transitioned into writing full-stack tools and framework automations that literally save development teams kilotonnes of hours.</p>
          </div>

          <div className="timeline-node">
            <div className="node-header">
              <span className="node-layer">LAYER 03</span>
              <h4>DevSecOps & Tools Engineer</h4>
            </div>
            <p>Target: K3s, FastAPI, React, AI & MCP Infrastructure.</p>
            <p>This is my current root execution state. I architect multi-node, multi-master K3s/Kubernetes clusters and enforce Zero-Trust SecOps pipelines. By synthesizing React frontends, FastAPI backends, and AI MCP (Model Context Protocol) integrations, I build autonomous systems that command and scale the platform.</p>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h3>ESTABLISH CONNECTION</h3>
          <a href="https://www.linkedin.com/in/ganeshprasadr/" target="_blank" rel="noreferrer" className="terminal-link">
            &gt; EXECUTE_HANDSHAKE: LinkedIn
          </a>
        </section>
      </div>
    </div>
  );
}

export default App;
