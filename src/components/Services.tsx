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
                    <h3 className="market-title">:: CATEGORY: PREMIER_DEVELOPMENT ::</h3>
                </div>
                <div className="services-grid">
                    <ServiceBlock
                        icon={Layout}
                        title="WEB_&_MOBILE_APPS"
                        price="$3,000+"
                        subtitle="High-status design prioritized over simple notifications. Prestige that converts users on every platform."
                        items={["Ultra-Premium UI/UX", "Offline Persistence Logic", "App Store & Web Scale Architecture"]}
                        delay={1}
                    />
                    <ServiceBlock
                        icon={Globe}
                        title="WEB_SYSTEMS_CORE"
                        price="$1,400+"
                        subtitle="Absolute reliability for high-status websites and dashboards. Not just a site, but a core engine."
                        items={["Tailwind + React Architecture", "Edge Deployment", "Protocol Integration"]}
                        delay={2}
                    />
                    <ServiceBlock
                        icon={Cpu}
                        title="INTELLIGENT_AGENTS"
                        price="$2,200+"
                        subtitle="Smart bots integratable with API MCPs. Communicating and doing tasks based on big data."
                        items={["Voice-Prompted Task Execution", "Auto-CRM & Auditions", "Data-Driven Logic Engines"]}
                        delay={3}
                    />
                </div>

                <br /><br />
                <div className="market-focus">
                    <h3 className="market-title">:: CATEGORY: STRATEGIC_GROWTH ::</h3>
                </div>
                <div className="services-grid">
                    <ServiceBlock
                        icon={TrendingUp}
                        title="DOMINANT_SEO"
                        price="$500/mo"
                        subtitle="Stop paying for expensive SaaS. Google has everything—we just know how to use it dude."
                        items={["Zero-SaaS Infrastructure", "Native Google Visibility", "Market Hierarchy Hijacking"]}
                        delay={4}
                    />
                    <ServiceBlock
                        icon={Users}
                        title="AI_CONSULTANTS"
                        price="$1,500+"
                        subtitle="Full team training on cutting-edge AI strategy. We find what's hidden online and make it fun to learn."
                        items={["Workplace Efficiency Audits", "Competitive Edge Strategy", "Interactive AI Workshops"]}
                        delay={5}
                    />
                    <ServiceBlock
                        icon={Database}
                        title="MASSIVE_SCRAPING"
                        price="$800+"
                        subtitle="Scraping systems with massive magnitude. High-velocity data extraction and sync."
                        items={["High-Scale Pipelines", "Market Competitor Scrapes", "Massive Data Archiving"]}
                        delay={6}
                    />
                </div>

                <br /><br />
                <div className="market-focus">
                    <h3 className="market-title">:: CATEGORY: INFRASTRUCTURE_&_AUTO ::</h3>
                </div>
                <div className="services-grid">
                    <ServiceBlock
                        icon={Zap}
                        title="MARKETING_AUTO_FLOWS"
                        price="$1,200+"
                        subtitle="Smart content flows & high-conversion emails. H.O.R optimized content for empire growth."
                        items={["Email Campaign Logic", "Smart Content Pipelines", "Automated Lead Nurturing"]}
                        delay={7}
                    />
                    <ServiceBlock
                        icon={Lock}
                        title="SECURE_SYSTEM_VAULTS"
                        price="$2,500+"
                        subtitle="Total data sovereignty. Don't touch web systems? We build core fortresses from the ground up."
                        items={["Hardened AES-256 Layers", "Virtual IT / MSP Support", "Confidential Logic Boards"]}
                        delay={8}
                    />
                    <ServiceBlock
                        icon={Network}
                        title="VIRTUAL_IT_UPLINK"
                        price="$1,200/mo"
                        subtitle="24/7 shielding. We don't 'touch' your site, we protect your empire from the outside in."
                        items={["Access Control (IAM)", "Uptime Monitoring", "Remote Core Setup"]}
                        delay={9}
                    />
                </div>
            </div>
        </section>
    );
};

export default Services;
