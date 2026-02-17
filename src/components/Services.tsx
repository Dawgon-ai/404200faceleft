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
                    <h3 className="market-title">:: CATEGORY: AI_STRATEGY_&_AGENTS ::</h3>
                </div>
                <div className="services-grid">
                    <ServiceBlock
                        icon={Bot}
                        title="AI_CONSULTANTS"
                        price="$1,500+"
                        subtitle="We train your team for a competitive edge."
                        items={["Strategic AI Implementation", "Workplace Efficiency Audits", "Fun-to-learn Team Training"]}
                        delay={1}
                    />
                    <ServiceBlock
                        icon={Cpu}
                        title="INTELLIGENT_AGENTS"
                        price="$2,200+"
                        subtitle="Task-doers integratable with API MCPs."
                        items={["Big Data Communication", "Voice-Prompted Task Execution", "Automated CRM Logic"]}
                        delay={2}
                    />
                    <ServiceBlock
                        icon={Database}
                        title="MASSIVE_SCRAPING"
                        price="$800+"
                        subtitle="Data extraction at massive magnitude."
                        items={["High-Scale Data Pipelines", "Competitor Intelligence", "Automated Market Sync"]}
                        delay={3}
                    />
                </div>

                <br /><br />
                <div className="market-focus">
                    <h3 className="market-title">:: CATEGORY: SYSTEMS_&_MARKETING ::</h3>
                </div>
                <div className="services-grid">
                    <ServiceBlock
                        icon={Zap}
                        title="MARKETING_AUTO_FLOWS"
                        price="$1,200+"
                        subtitle="Smart content flows & high-conversion emails."
                        items={["H.O.R Optimized Content", "Automated Lead Nurturing", "Smart Campaign Logic"]}
                        delay={4}
                    />
                    <ServiceBlock
                        icon={TrendingUp}
                        title="DOMINANT_SEO"
                        price="$500/mo"
                        subtitle="No expensive SaaS needed. Google has it all."
                        items={["Native Search Dominance", "Zero-SaaS Infrastructure", "Competitive Keyword Hijacking"]}
                        delay={5}
                    />
                    <ServiceBlock
                        icon={Layout}
                        title="PREMIUM_MOBILE_APPS"
                        price="$3,000+"
                        subtitle="Aesthetic-first design that converts."
                        items={["High-Status UI/UX", "Offline Persistence Logic", "App Store Compliance"]}
                        delay={6}
                    />
                </div>

                <br /><br />
                <div className="market-focus">
                    <h3 className="market-title">:: CATEGORY: SECURE_INFRASTRUCTURE ::</h3>
                </div>
                <div className="services-grid">
                    <ServiceBlock
                        icon={Lock}
                        title="SECURE_SYSTEMS_VC"
                        price="$2,500+"
                        subtitle="Hardened architecture for high-risk data."
                        items={["AES-256 Encryption", "Virtual IT / MSP Support", "Total Data Sovereignty"]}
                        delay={7}
                    />
                    <ServiceBlock
                        icon={Network}
                        title="VIRTUAL_IT_UPLINK"
                        price="$1,200/mo"
                        subtitle="24/7 shielding and infrastructure management."
                        items={["Remote Workspace Setup", "Access Control (IAM)", "Uptime Monitoring"]}
                        delay={8}
                    />
                    <ServiceBlock
                        icon={Globe}
                        title="WEB_SYSTEMS_CORE"
                        price="$1,400+"
                        subtitle="Full-scale web applications and dashboards."
                        items={["Tailwind + React Stack", "Edge Deployment", "Scalable Logic Boards"]}
                        delay={9}
                    />
                </div>
            </div>
        </section>
    );
};

export default Services;
