import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { 
  Zap, 
  ShieldCheck, 
  CheckCircle2,
  Bot,
  Wrench,
  TrendingUp,
  Settings,
  Users,
  Palette,
  ChevronDown,
  Quote,
  X,
  Send,
  MessageSquare,
  ShoppingBag
} from 'lucide-react';

const Header = ({ onInitChat }: { onInitChat: () => void }) => (
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

const ChatWidget = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      if (!chatRef.current) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatRef.current = ai.chats.create({
          model: 'gemini-3-pro-preview',
          config: {
            systemInstruction: "You are the specialized system interface for 404200, a high-performance digital agency. Your persona is technical, efficient, and slightly robotic (system-like). You assist users with inquiries about web development, speed optimization, and automation services. Keep responses concise and formatted like a system log or terminal output where appropriate.",
          }
        });
      }

      const result = await chatRef.current.sendMessageStream({ message: userText });
      
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of result) {
        fullText += chunk.text;
        setMessages(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].text = fullText;
          return newHistory;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'ERR: CONNECTION_LOST. PLEASE_RETRY.' }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <span className="chat-title">SYSTEM_CHAT_V3.0</span>
        <button onClick={onClose} className="chat-close"><X size={18} /></button>
      </div>
      <div className="chat-body">
        <div className="chat-welcome">
           {'>'} CONNECTION_ESTABLISHED<br/>
           {'>'} SYSTEM_READY. ASK_ABOUT_SERVICES.<br/>
           ----------------------------------
        </div>
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.role}`}>
            <span className="msg-prefix">{msg.role === 'user' ? '$' : '>'}</span>
            <span className="msg-content">{msg.text}</span>
          </div>
        ))}
        {loading && <div className="chat-loading">{'>'} PROCESSING_QUERY...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-footer">
        <span className="prompt-char">$</span>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="ENTER_COMMAND..."
          autoFocus
        />
        <button onClick={handleSend}><Send size={14} /></button>
      </div>
    </div>
  );
};

const Hero = ({ onInitChat }: { onInitChat: () => void }) => {
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsError(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section" onMouseEnter={() => setIsError(false)} onMouseLeave={() => setIsError(true)}>
      <div className="container">
        <div className="hero-grid">
          <div className="hero-text-content">
            <div className={`protocol-label ${isError ? 'err' : 'ok'}`}>
              {isError ? 'CRITICAL_SYSTEM_FAILURE_DETECTED' : 'OPTIMIZATION_PROTOCOL_ENGAGED'}
            </div>
            <h1 className={`hero-title ${isError ? 'glitch-active' : 'resolved-active'}`}>
              {isError ? "404_NOT_FOUND" : "200_STATUS_OK"}
            </h1>
            <p className="hero-description">
              Boring websites are a technical debt. We build animated, lightning-fast 
              systems and AI-driven workflows that turn businesses into local legends. 
              Identify the error. Deploy the solution. 
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={onInitChat}>INIT_DEPLOYMENT</button>
              <button className="btn-secondary" onClick={() => document.getElementById('process')?.scrollIntoView()}>VIEW_PROTOCOLS</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className={`terminal-display ${isError ? 'err-state' : 'ok-state'}`}>
              <div className="terminal-header">
                <div className="dots"><span></span><span></span><span></span></div>
                <span className="term-title">sys_monitor.sh</span>
              </div>
              <div className="terminal-body">
                <div className="line">{isError ? '> checking_uplink...' : '> optimizing_assets...'}</div>
                <div className="line">{isError ? '> packet_loss: 44%' : '> caching: enabled'}</div>
                <div className="line">{isError ? '> error_code: 0x404' : '> lighthouse_score: 100'}</div>
                <div className="cursor">_</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ClientMarquee = () => (
  <div className="client-marquee">
    <div className="marquee-label">TRUSTED_BY_NODES:</div>
    <div className="marquee-content">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="marquee-track">
          <span>PARTNER_01</span>
          <span>SYSTEM_CORP</span>
          <span>TECH_LIMASSOL</span>
          <span>SOLUTIONS_CY</span>
          <span>CYPRUS_DEV</span>
          <span>NODE_PRIME</span>
          <span>ALPHA_RETAIL</span>
        </div>
      ))}
    </div>
  </div>
);

const ServiceBlock = ({ icon: Icon, title, price, subtitle, items }: any) => (
  <div className="service-block">
    <div className="block-head">
      <div className="icon-box"><Icon size={20} /></div>
      <div className="price-tag">{price}</div>
    </div>
    <h3 className="block-title">{title}</h3>
    <p className="block-subtitle">{subtitle}</p>
    <div className="block-list">
      {items.map((it: string, idx: number) => (
        <div key={idx} className="block-item">
          <CheckCircle2 size={12} className="check" />
          <span>{it}</span>
        </div>
      ))}
    </div>
    <button className="btn-block-action">CONFIGURE_MODULE</button>
  </div>
);

const FAQTerminal = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "Why are you cheaper than other agencies?", a: "We're not cheap—we're efficient. No fancy office. No account managers. Just talented designers and developers who build great sites fast. You pay for quality work, not overhead." },
    { q: "Can you really deliver in 7-14 days?", a: "Yep! We've streamlined our process. Most delays at other agencies come from poor communication and scope creep. We're clear on what we're building, and we nail it." },
    { q: "What if I don't like the design?", a: "Unlimited revisions during the design phase. We don't move to development until you're 100% happy." },
    { q: "Do I own the website?", a: "100%. We hand over everything. You can take it anywhere you want (but we hope you'll stay for our ongoing services 😊)." },
    { q: "What about hosting?", a: "We can handle it (€15/month) or you can use your own. Your choice." },
    { q: "Can you update my existing site?", a: "Sometimes yes, sometimes starting fresh is better. We'll be honest about what makes sense for your budget and goals." },
    { q: "Do you write the content?", a: "We'll guide you on what content is needed. You provide the raw info about your business, we'll polish it to perfection." },
    { q: "What's included in 'animations'?", a: "Scroll effects, hover interactions, smooth transitions, animated stats, parallax backgrounds, and more. All lightweight and mobile-friendly." },
    { q: "How do you generate Google reviews?", a: "Automated email/SMS requests to happy customers, QR codes in-store, follow-up sequences. We handle the strategy, you provide the great service." },
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
           <span className="prompt">$</span> <span className="cmd-text">ls -la ./faq_database/</span>
        </div>
        <br />
        {faqs.map((item, i) => (
          <div key={i} className="terminal-entry">
            <div 
              className={`cmd-line clickable ${openIndex === i ? 'active' : ''}`} 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="prompt">{'>'}</span> 
              <span className="cmd-command">cat faq_{i+1}.txt --title "{item.q}"</span>
            </div>
            {openIndex === i && (
              <div className="cmd-response">
                {item.a}
              </div>
            )}
          </div>
        ))}
        <div className="cmd-line">
          <span className="prompt">$</span> <span className="cursor">_</span>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => (
  <section className="testimonials-section">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">NODE_FEEDBACK</h2>
        <p className="section-subtitle">Real feedback from deployed systems.</p>
      </div>
      <div className="testimonials-grid">
        {[
          { text: "404200 completely rebuilt our internal clock-in system. Efficiency increased by 40% overnight. No more manual logs.", author: "Logistics Manager, Limassol Hub" },
          { text: "The Website-in-a-Week was actually delivered in 6 days. The animations are so smooth they feel like native apps.", author: "Founder, Alpha Retail Group" },
          { text: "Our GMB reviews went from 3.2 to 4.8 in 3 months using their reputation system. Best ROI we've seen this year.", author: "Director, Coastal Real Estate" }
        ].map((t, i) => (
          <div key={i} className="testimonial-card">
            <Quote size={32} className="quote-icon" />
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <div className="author-line"></div>
              <span>{t.author}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQSection = () => (
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

const PricingMatrix = () => (
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

const App = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="app-root">
      <Header onInitChat={() => setChatOpen(true)} />
      <Hero onInitChat={() => setChatOpen(true)} />
      <ClientMarquee />
      
      <section id="services" className="services-container">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">ONE_TIME_MODULES</h2>
            <p className="section-subtitle">Structural engineering for high-performance digital deployment.</p>
          </div>
          <div className="services-grid">
            <ServiceBlock 
              icon={Zap} 
              title="WEBSITE-IN-A-WEEK" 
              price="$699 – $1,200" 
              subtitle="GSAP / Framer-style animations with 7-day delivery."
              items={["5–7 Pages Animated", "Mobile-first Architecture", "GA + Search Console Integration"]}
            />
            <ServiceBlock 
              icon={Bot} 
              title="WEBSITE + AI CHATBOT" 
              price="$899 – $1,500" 
              subtitle="Everything in Website-in-a-Week plus custom AI logic."
              items={["Trained on Website/FAQs", "Lead Capture Module", "GDPR-friendly Setup"]}
            />
            <ServiceBlock 
              icon={Wrench} 
              title="SMALL WEB APP / TOOLS" 
              price="$1,200 – $2,500" 
              subtitle="Dashboards, booking systems, or custom calculators."
              items={["Authentication Layer", "Secure Deployment", "Basic Documentation"]}
            />
            <ServiceBlock 
              icon={Users} 
              title="HR CORE / SMALL SYSTEMS" 
              price="$1,500 – $3,500" 
              subtitle="Custom internal systems for attendance, sick leave, and clocking."
              items={["Attendance tracking", "Clockin and out", "Sick leave management"]}
            />
            <ServiceBlock 
              icon={Palette} 
              title="FULL BRANDING" 
              price="$800 – $2,500" 
              subtitle="Complete visual identity and brand strategy systems."
              items={["Logo System", "Color Theory & Typography", "Brand Voice Guidelines"]}
            />
            <ServiceBlock 
              icon={TrendingUp} 
              title="SEO FOUNDATION" 
              price="$399 – $699" 
              subtitle="Deep technical site speed and indexing optimization."
              items={["Technical SEO Fixes", "GMB Optimization", "Keyword Setup (Local)"]}
            />
            <ServiceBlock 
              icon={ShieldCheck} 
              title="GMB + REPUTATION" 
              price="$299 – $499" 
              subtitle="Legitimate review funnel and automation systems."
              items={["Review Request Automation", "SMS / Email Follow-ups", "Review Filtering Funnel"]}
            />
            <ServiceBlock 
              icon={Settings} 
              title="AI AUTOMATION / MCPs" 
              price="$499 – $1,200" 
              subtitle="Zapier / Make / API-based workflow automation."
              items={["CRM Automation", "AI Lead Follow-ups", "Internal Process Flows"]}
            />
            <ServiceBlock 
              icon={ShoppingBag} 
              title="ECOMMERCE ARCHITECTURE" 
              price="$2,500 – $5,000" 
              subtitle="High-performance headless or Shopify storefronts."
              items={["Global Payment Gateways", "Inventory Sync", "Conversion Rate Optimization"]}
            />
          </div>
        </div>
      </section>

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

      <footer className="footer">
        <div className="container footer-grid">
          <div className="brand-stack">
            <span className="logo-text">404<span className="logo-accent">200</span></span>
            <p>This company understands systems.</p>
            <div className="contact-info">
              <span>systems@404200.agency</span>
              <span>Limassol, Cyprus</span>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h5>SYSTEM_LINKS</h5>
              <a href="#">About_Us</a>
              <a href="#">Portfolio_Log</a>
              <a href="#">Contact_Request</a>
            </div>
            <div>
              <h5>LEGAL_PROTOCOL</h5>
              <a href="#">Privacy_Notice</a>
              <a href="#">Terms_of_Service</a>
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);