import React, { useState } from 'react';
import { Header, ClientMarquee, PricingMatrix, Testimonials, FAQSection, Footer } from './components/Sections';
import Hero from './components/Hero';
import Services from './components/Services';
import RentalDemo from './components/RentalDemo';
import ChatWidget from './components/ChatWidget';

const App = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="app-root">
      <Header onInitChat={() => setChatOpen(true)} />
      
      {/* Hero with new Animations */}
      <Hero onInitChat={() => setChatOpen(true)} />
      
      {/* Marquee */}
      <ClientMarquee />
      
      {/* New Rental Client Demo Showcase */}
      <RentalDemo />

      {/* Services with Cyprus Market Focus */}
      <Services />

      {/* Modules & Pricing */}
      <PricingMatrix />

      <section id="process" className="protocol-section">
        <div className="container">
          <div className="protocol-log">
            <div className="log-line"><span>[01]</span> CHAT: Discovery & Requirement Gathering</div>
            <div className="log-line"><span>[02]</span> DESIGN: Prototype & Logic Mapping</div>
            <div className="log-line"><span>[03]</span> BUILD: Animation & Structural Coding</div>
            <div className="log-line"><span>[04]</span> LAUNCH: Performance Validation & Deployment</div>
            <div className="log-line active"><span>[05]</span> GROW: Continuous SEO & System Scaling...</div>
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQSection />

      <Footer />

      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default App;
