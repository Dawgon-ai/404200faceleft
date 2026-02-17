import React, { useState } from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = ({ onInitChat }: { onInitChat: () => void }) => (
  <nav className="header-nav">
    <div className="container nav-content">
      <div className="logo-group">
        <span className="logo-text">404<span className="logo-accent">200</span></span>
        <div className="status-badge">
          <div className="status-dot"></div>
          <span>SYSTEM_STABLE_V1.0</span>
        </div>
      </div>
      <div className="nav-links">
        <a href="#services">SERVICES</a>
        <a href="#packages">SUBSCRIPTIONS</a>
        <a href="#process">PROTOCOL</a>
        <button className="btn-primary" onClick={onInitChat}>INIT_CHAT</button>
      </div>
    </div>
  </nav>
);

export const ClientMarquee = () => (
  <div className="client-marquee">
    <div className="marquee-label">TRUSTED_BY_NODES:</div>
    <div className="marquee-content">
      {[...Array(2)].map((_, i) => (
        <React.Fragment key={i}>
          <div className="marquee-track">
            <span>AMSA_ARCHITECTS</span>
            <span>MEMA_ARCHITECTS</span>
            <span>MARIOS_ECONOMIDES_+_MARIA_AKKELIDOU</span>
            <span>MIX_AND_MATCH_EGYPT</span>
            <span>EMAAR</span>
            <span>CONCORDE</span>
            <span>ORASCOM</span>
            <span>MERCEDES_BENZ_EGYPT</span>
            <span>LIMASSOL_HUB</span>
            <span>ALPHA_RETAIL_GROUP</span>
            <span>COASTAL_REAL_ESTATE</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
);

export const FAQTerminal = () => {
  const faqs = [
    { q: "Why are you cheaper than other agencies?", a: "We're not cheap—we're efficient. No fancy office. No account managers. Just talented designers and developers who build great sites fast. You pay for quality work, not overhead." },
    { q: "Can you really deliver in 7-14 days?", a: "Yep! We've streamlined our process. Most delays at other agencies come from poor communication and scope creep. We're clear on what we're building, and we nail it." },
    { q: "Can you update my existing site?", a: "Sometimes yes, sometimes starting fresh is better. We'll be honest about what makes sense for your budget and goals." },
    { q: "Do I need to sign a long contract?", a: "Website builds are one-time projects. Monthly services (SEO, reviews, social) are month-to-month. Cancel anytime with 30 days notice." }
  ];

  return (
    <div className="faq-terminal-window">
      <div className="faq-header">
        <div className="window-controls">
          <span className="dot close"></span>
          <span className="dot minimize"></span>
          <span className="dot expand"></span>
        </div>
        <div className="window-title">admin@404200:~/knowledge_base</div>
      </div>
      <div className="faq-content-scroll">
        <div className="cmd-line">
          <span className="prompt">$</span> <span className="cmd-text">cat ./faq_database/*</span>
        </div>
        <br />
        {faqs.map((item, i) => (
          <div key={i} className="terminal-entry" style={{ marginBottom: '24px' }}>
            <div className="cmd-line">
              <span className="prompt">{'>'}</span>
              <span className="cmd-command" style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{item.q}</span>
            </div>
            <div className="cmd-response" style={{ opacity: 1, margin: '8px 0 0 24px' }}>
              {item.a}
            </div>
          </div>
        ))}
        <div className="cmd-line">
          <span className="prompt">$</span> <span className="cursor">_</span>
        </div>
      </div>
    </div>
  );
};

export const Testimonials = () => (
  <section className="testimonials-section">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">NODE_FEEDBACK</h2>
        <p className="section-subtitle">Real feedback from deployed systems.</p>
      </div>
      <div className="testimonials-grid">
        {[
          { text: "404200 fixed our software clutter. They cleaned the mess of multiple platforms into one unified dashboard, accessible via mobile by everyone, everywhere.", author: "Operations Director, Limassol Hub" },
          { text: "The Website-in-a-Week was actually delivered in 6 days. The animations are so smooth they feel like native apps.", author: "Founder, Alpha Retail Group" },
          { text: "Our GMB reviews went from 3.2 to 4.8 in 3 months using their reputation system. Best ROI we've seen this year.", author: "Director, Coastal Real Estate" }
        ].map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="testimonial-card"
          >
            <Quote size={32} className="quote-icon" />
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <div className="author-line"></div>
              <span>{t.author}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const FAQSection = () => (
  <section className="faq-section">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">SYSTEM_KNOWLEDGE_BASE</h2>
        <p className="section-subtitle">Transparent protocols for smooth collaboration.</p>
      </div>
      <FAQTerminal />
    </div>
  </section>
);

export const PricingMatrix = () => (
  <section id="packages" className="matrix-section">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">MONTHLY_SUBSCRIPTIONS</h2>
        <p className="section-subtitle">Scalable maintenance and recurring growth systems.</p>
      </div>
      <div className="matrix-grid">
        {[
          { name: "Starter Care Plan", price: "$79/mo", focus: "Maintenance", updates: "Security", extra: "Monitoring" },
          { name: "Growth Plan", price: "$199/mo", focus: "2 SEO Blogs", updates: "Bot Improvements", extra: "GMB Posts" },
          { name: "Reputation Plan", price: "$249/mo", focus: "Review Automation", updates: "GMB Optimization", extra: "Local SEO Signals" },
          { name: "Social Auto", price: "$199-$299/mo", focus: "8-12 AI Posts", updates: "Captions/Hashtags", extra: "Brand Voice Training" },
          { name: "Full Growth System", price: "$399-$599/mo", focus: "Full Maintenance", updates: "SEO + Social", extra: "Priority Support" },
          { name: "Ecom Starter", price: "$149/mo", focus: "Store Maintenance", updates: "Product Updates", extra: "Uptime Guarantee" },
          { name: "Ecom Scale", price: "$349/mo", focus: "CRO & SEO", updates: "Funnel Optimization", extra: "Ad Asset Creation" },
          { name: "Enterprise Node", price: "Custom", focus: "Dedicated Team", updates: "Full CI/CD Pipeline", extra: "24/7 SLA" }
        ].map((pkg, i) => (
          <div key={i} className="matrix-card">
            <div className="matrix-name">{pkg.name}</div>
            <div className="matrix-price">{pkg.price}</div>
            <div className="matrix-details">
              <div>CORE: {pkg.focus}</div>
              <div>PROTOCOLS: {pkg.updates}</div>
              <div>EXTRAS: {pkg.extra}</div>
            </div>
            <button className="btn-matrix">SELECT_PACKAGE</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-top">
        <div className="spacer"></div>
        <div className="footer-logo">
          <span className="logo-text">
            404
            <span className="logo-accent">
              2
              <motion.span
                className="eye-char"
                style={{ position: 'relative', display: 'inline-block' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                0
                <motion.span
                  className="eye-pupil"
                  style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    width: '3px',
                    height: '3px',
                    background: 'var(--accent)',
                    borderRadius: '50%',
                  }}
                  animate={{
                    x: [-2, 2, -2],
                    y: [-1, 1, -1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.span>
              <motion.span
                className="eye-char"
                style={{ position: 'relative', display: 'inline-block' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                0
                <motion.span
                  className="eye-pupil"
                  style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    width: '3px',
                    height: '3px',
                    background: 'var(--accent)',
                    borderRadius: '50%',
                  }}
                  animate={{
                    x: [2, -2, 2],
                    y: [1, -1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.span>
            </span>
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-col">
          <div className="col-label">LOCATION</div>
          <div>Limassol, Cyprus</div>
        </div>

        <div className="footer-col">
          <div className="col-label">BUSINESS_INQUIRIES</div>
          <a href="mailto:404200ssh@proton.me">404200ssh@proton.me</a>
        </div>

        <div className="footer-col">
          <div className="col-label">DIRECT_UPLINK</div>
          <a href="tel:+35794488699">Contact_Us</a>
        </div>

        <div className="footer-col copyright-col">
          <div>
            404200<span style={{ color: 'var(--accent)' }}>©</span>2026<span style={{ color: 'var(--accent)' }}>.</span>ALL RIGHTS RESERVED<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
