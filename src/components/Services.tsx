import React from 'react';
import {
    Zap,
    ShieldCheck,
    CheckCircle2,
    Bot,
    Wrench,
    TrendingUp,
    Settings,
    Layout,
    Cpu,
    Network,
    Mic,
    Database,
    Globe,
    Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceBlock = ({ icon: Icon, title, price, subtitle, items, delay }: any) => (
    <motion.div
        className="service-block"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.3, delay: delay * 0.05 }}
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
        <button className="btn-block-action">INIT_MODULE_SYNC</button>
    </motion.div>
);

const Services = () => {
    return (
        <section id="services" className="services-container">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">SYSTEM_MODULES</h2>
                    <p className="section-subtitle">Engineered for absolute reliability and high-speed delivery.</p>
                </div>

                <div className="market-focus">
                    <h3 className="market-title">:: CATEGORY: SECURE_ARCHITECTURE ::</h3>
                </div>
                <div className="services-grid">
                    <ServiceBlock
                        icon={Lock}
                        title="SECURE_SYSTEMS_VC"
                        price="$2,500+"
                        subtitle="Hardened infrastructure for fintech, legal, and high-risk data."
                        items={["AES-256 Encryption Layers", "Virtual IT / MSP Support", "GDPR/KYC Compliant Ops"]}
                        delay={1}
                    />
                    <ServiceBlock
                        icon={Network}
                        title="VIRTUAL_IT_SUPPORT"
                        price="$1,200/mo"
                        subtitle="Complete cloud infrastructure management and 24/7 shielding."
                        items={["Remote Workspace Setup", "Access Control (IAM)", "Uptime Monitoring"]}
                        delay={2}
                    />
                    <ServiceBlock
                        icon={Cpu}
                        title="MCP_SERVER_SYNC"
                        price="$1,800+"
                        subtitle="Model Context Protocol implementation for AI data bridges."
                        items={["Full DB Connector (Postgres/SQL)", "Custom API Middleware", "Real-time AI Indexing"]}
                        delay={3}
                    />
                </div>

                <br /><br />
                <div className="market-focus">
                    <h3 className="market-title">:: CATEGORY: AI_&_AUTOMATION ::</h3>
                </div>
                <div className="services-grid">
                    <ServiceBlock
                        icon={Mic}
                        title="AI_VOICE_ORDERS"
                        price="$1,500+"
                        subtitle="Let AI handle the boring jobs via direct voice interfaces."
                        items={["Voice Command Parsing", "Auto-CRM Entry", "Efficiency Audits"]}
                        delay={4}
                    />
                    <ServiceBlock
                        icon={Database}
                        title="SCRAPE_&_SYNC"
                        price="$800+"
                        subtitle="Automated data extraction and sync pipelines."
                        items={["Newsletter Archiving", "Market Competitor Scrapes", "Web-to-Sheet Automation"]}
                        delay={5}
                    />
                    <ServiceBlock
                        icon={Bot}
                        title="INTELLIGENT_AGENTS"
                        price="$1,200+"
                        subtitle="Autonomous agents that handle recurring business logic."
                        items={["Slack/Discord Integration", "Customer Support Brains", "AI Performance Reviews"]}
                        delay={6}
                    />
                </div>

                <br /><br />
                <div className="market-focus">
                    <h3 className="market-title">:: CATEGORY: FULL_STACK_DEPLOYMENT ::</h3>
                </div>
                <div className="services-grid">
                    <ServiceBlock
                        icon={Globe}
                        title="WEB_SYSTEMS_MVPS"
                        price="$1,400+"
                        subtitle="Fast delivery of full-scale web applications and dashboards."
                        items={["Tailwind + React Stack", "Edge Deployment (Vercel)", "Scalable Backend Architecture"]}
                        delay={7}
                    />
                    <ServiceBlock
                        icon={Layout}
                        title="MOBILE_APPS_NATIVE"
                        price="$2,800+"
                        subtitle="Cross-platform mobile systems with offline persistence."
                        items={["React Native / Expo", "Push Notification Logic", "App Store Compliance"]}
                        delay={8}
                    />
                    <ServiceBlock
                        icon={TrendingUp}
                        title="SEO_DOMINANCE"
                        price="$500/mo"
                        subtitle="Technical search engine control and visibility scaling."
                        items={["Real-time Indexing", "Local GMB Dominance", "Competitor Keyword Hijacking"]}
                        delay={9}
                    />
                </div>
            </div>
        </section>
    );
};

export default Services;
