import React from 'react';
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
    ShoppingBag,
    FileSignature,
    Building
} from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceBlock = ({ icon: Icon, title, price, subtitle, items, delay }: any) => (
    <motion.div
        className="service-block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay * 0.1 }}
    >
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
    </motion.div>
);

const Services = () => {
    return (
        <section id="services" className="services-container">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">ONE_TIME_MODULES</h2>
                    <p className="section-subtitle">Structural engineering for high-performance digital deployment.</p>
                </div>

                {/* CYPRUS MARKET SPECIALS */}
                <div className="market-focus">
                    <h3 className="market-title">:: TARGET_KEY: CYPRUS_MARKET ::</h3>
                </div>

                <div className="services-grid">
                    <ServiceBlock
                        icon={Building}
                        title="REAL ESTATE / RENTALS"
                        price="$2,500+"
                        subtitle="Centralized dashboard for properties, tenants, and maintenance."
                        items={["Unified '3-Screen' Dashboard", "Tenant Ticket System", "Auto-Lease Generation (PDF)"]}
                        delay={1}
                    />
                    <ServiceBlock
                        icon={FileSignature}
                        title="CORP. SERVICES & FOREX"
                        price="$1,800+"
                        subtitle="Secure document portals and automated compliance workflows."
                        items={["Document E-Signatures", "Encrypted Client Chat", "KYC Document Uploads"]}
                        delay={2}
                    />
                    <ServiceBlock
                        icon={Users}
                        title="HR CORE / PAYROLL"
                        price="$1,500 – $3,500"
                        subtitle="Custom internal systems for attendance and payroll sync."
                        items={["Direct Payroll Sync", "AI Performance Reviews", "Sick Leave Auto-approval"]}
                        delay={3}
                    />
                </div>

                <div className="separator-line"></div>

                {/* STANDARD SERVICES */}
                <div className="services-grid">
                    <ServiceBlock
                        icon={Zap}
                        title="WEBSITE-IN-A-WEEK"
                        price="$699 – $1,200"
                        subtitle="GSAP / Framer-style animations with 7-day delivery."
                        items={["5–7 Pages Animated", "Mobile-first Architecture", "GA + Search Console Integration"]}
                        delay={4}
                    />
                    <ServiceBlock
                        icon={Bot}
                        title="WEBSITE + AI CHATBOT"
                        price="$899 – $1,500"
                        subtitle="Everything in Website-in-a-Week plus custom AI logic."
                        items={["Trained on Website/FAQs", "Lead Capture Module", "GDPR-friendly Setup"]}
                        delay={5}
                    />
                    <ServiceBlock
                        icon={Wrench}
                        title="SMALL WEB APP / TOOLS"
                        price="$1,200 – $2,500"
                        subtitle="Dashboards, booking systems, or custom calculators."
                        items={["Authentication Layer", "Secure Deployment", "Basic Documentation"]}
                        delay={6}
                    />
                    <ServiceBlock
                        icon={Palette}
                        title="FULL BRANDING"
                        price="$800 – $2,500"
                        subtitle="Complete visual identity and brand strategy systems."
                        items={["Logo System", "Color Theory & Typography", "Brand Voice Guidelines"]}
                        delay={7}
                    />
                    <ServiceBlock
                        icon={TrendingUp}
                        title="SEO FOUNDATION"
                        price="$399 – $699"
                        subtitle="Deep technical site speed and indexing optimization."
                        items={["Technical SEO Fixes", "GMB Optimization", "Keyword Setup (Local)"]}
                        delay={8}
                    />
                    <ServiceBlock
                        icon={ShieldCheck}
                        title="GMB + REPUTATION"
                        price="$299 – $499"
                        subtitle="Legitimate review funnel and automation systems."
                        items={["Review Request Automation", "SMS / Email Follow-ups", "Review Filtering Funnel"]}
                        delay={9}
                    />
                    <ServiceBlock
                        icon={Settings}
                        title="AI AUTOMATION / MCPs"
                        price="$499 – $1,200"
                        subtitle="Zapier / Make / API-based workflow automation."
                        items={["CRM Automation", "AI Lead Follow-ups", "Internal Process Flows"]}
                        delay={10}
                    />
                    <ServiceBlock
                        icon={ShoppingBag}
                        title="ECOMMERCE ARCHITECTURE"
                        price="$2,500 – $5,000"
                        subtitle="High-performance headless or Shopify storefronts."
                        items={["Global Payment Gateways", "Inventory Sync", "Conversion Rate Optimization"]}
                        delay={11}
                    />
                </div>
            </div>
        </section>
    );
};

export default Services;
