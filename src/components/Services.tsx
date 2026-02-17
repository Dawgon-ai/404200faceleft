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
    Lock,
    Users
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
                    <p className="section-subtitle">Engineered for absolute reliability and massive magnitude.</p>
                </div>

                <div className="market-focus">
                    <h3 className="market-title">:: CATEGORY: AI_STRATEGY_&_AGENTS ::</h3>
                </div>
                <div className="services-grid">
                    <ServiceBlock
                        icon={Users}
                        title="AI_CONSULTANTS"
                        price="$1,500+"
                        subtitle="Full team training on cutting-edge AI strategy. We find what's hidden online and make it fun to learn."
                        items={["Workplace Efficiency Audits", "Competitive Edge Strategy", "Interactive AI Workshops"]}
                        delay={1}
                    />
                    <ServiceBlock
                        icon={Cpu}
                        title="INTELLIGENT_AGENTS"
                        price="$2,200+"
                        subtitle="Smart bots integratable with API MCPs. Communicating and doing tasks based on big data."
                        items={["Voice-Prompted Task Execution", "Auto-CRM & Auditions", "Data-Driven Logic Engines"]}
                        delay={2}
                    />
                    <ServiceBlock
                        icon={Database}
                        title="MASSIVE_SCRAPING"
                        price="$800+"
                        subtitle="Scraping systems with massive magnitude. High-velocity data extraction and sync."
                        items={["High-Scale Pipelines", "Market Competitor Scrapes", "Massive Data Archiving"]}
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
                        subtitle="Smart content flows & high-conversion emails. H.O.R optimized content for empire growth."
                        items={["Email Campaign Logic", "Smart Content Pipelines", "Automated Lead Nurturing"]}
                        delay={4}
                    />
                    <ServiceBlock
                        icon={TrendingUp}
                        title="DOMINANT_SEO"
                        price="$500/mo"
                        subtitle="Stop paying for expensive SaaS. Google has everything—we just know how to use it dude."
                        items={["Zero-SaaS Infrastructure", "Native Google Visibility", "Market Hierarchy Hijacking"]}
                        delay={5}
                    />
                    <ServiceBlock
                        icon={Layout}
                        title="HIGH_STATUS_MOBILE"
                        price="$3,000+"
                        subtitle="Design aspects prioritized over simple notifications. Prestige that converts users."
                        items={["Ultra-Premium UI/UX", "Offline Persistence", "Brand Status Architecture"]}
                        delay={6}
                    />
                </div>

                <br /><br />
                <div className="market-focus">
                    <h3 className="market-title">:: CATEGORY: CORE_INFRASTRUCTURE ::</h3>
                </div>
                <div className="services-grid">
                    <ServiceBlock
                        icon={Lock}
                        title="SECURE_SYSTEM_VAULTS"
                        price="$2,500+"
                        subtitle="Total data sovereignty. Don't touch web systems? We build core fortresses."
                        items={["Hardened AES-256 Layers", "Virtual IT / MSP Support", "Confidential Logic Boards"]}
                        delay={7}
                    />
                    <ServiceBlock
                        icon={Network}
                        title="VIRTUAL_IT_UPLINK"
                        price="$1,200/mo"
                        subtitle="24/7 shielding. We don't 'touch' your site, we protect your empire from the outside in."
                        items={["Access Control (IAM)", "Uptime Monitoring", "Remote Core Setup"]}
                        delay={8}
                    />
                    <ServiceBlock
                        icon={Globe}
                        title="CORE_LOGIC_ENGINE"
                        price="$1,400+"
                        subtitle="Absolute reliability for high-status systems. Not just another web app."
                        items={["Protocol Integration", "Edge Deployment", "Scalable Business Logic"]}
                        delay={9}
                    />
                </div>
            </div>
        </section>
    );
};

export default Services;
