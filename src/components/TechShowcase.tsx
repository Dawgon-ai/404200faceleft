import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Zap, Shield, Cloud, Database, Cpu, Network, Lock } from 'lucide-react';
import './TechShowcase.css';

const TechShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const techStack = [
        {
            icon: Code2,
            title: "NEXT_GEN_DEVELOPMENT",
            subtitle: "React + TypeScript + Tailwind",
            color: "#00ff88",
            features: ["Component Architecture", "Type Safety", "Rapid Prototyping"]
        },
        {
            icon: Zap,
            title: "PERFORMANCE_OPTIMIZED",
            subtitle: "Edge Computing & CDN",
            color: "#ffaa00",
            features: ["Sub-100ms Response", "Global Distribution", "Auto-Scaling"]
        },
        {
            icon: Shield,
            title: "SECURITY_FIRST",
            subtitle: "Enterprise-Grade Protection",
            color: "#ff0088",
            features: ["SSL/TLS Encryption", "DDoS Protection", "Regular Audits"]
        },
        {
            icon: Database,
            title: "DATA_INFRASTRUCTURE",
            subtitle: "Scalable Database Solutions",
            color: "#00aaff",
            features: ["PostgreSQL", "Real-time Sync", "Automated Backups"]
        }
    ];

    const currentTech = techStack[activeIndex];
    const Icon = currentTech.icon;

    return (
        <section className="tech-showcase-section">
            <motion.div
                className="container"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="section-header">
                    <h2 className="section-title">TECHNOLOGY_STACK</h2>
                    <p className="section-subtitle">Built with cutting-edge tools for maximum performance</p>
                </div>

                <div className="tech-showcase-grid">
                    {/* Left: Tech Cards */}
                    <div className="tech-cards">
                        {techStack.map((tech, idx) => {
                            const TechIcon = tech.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    className={`tech-card ${activeIndex === idx ? 'active' : ''}`}
                                    onClick={() => setActiveIndex(idx)}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    style={{
                                        borderColor: activeIndex === idx ? tech.color : 'rgba(255,255,255,0.1)'
                                    }}
                                >
                                    <div className="tech-card-icon" style={{ color: tech.color }}>
                                        <TechIcon size={24} />
                                    </div>
                                    <div className="tech-card-content">
                                        <h3>{tech.title}</h3>
                                        <p>{tech.subtitle}</p>
                                    </div>
                                    <motion.div
                                        className="tech-card-indicator"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: activeIndex === idx ? 1 : 0 }}
                                        style={{ backgroundColor: tech.color }}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right: Animated Visual */}
                    <div className="tech-visual">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                className="tech-visual-content"
                                initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                            >
                                {/* Glowing Icon */}
                                <motion.div
                                    className="tech-visual-icon"
                                    animate={{
                                        boxShadow: [
                                            `0 0 20px ${currentTech.color}40`,
                                            `0 0 40px ${currentTech.color}80`,
                                            `0 0 20px ${currentTech.color}40`
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{ borderColor: currentTech.color }}
                                >
                                    <Icon size={64} color={currentTech.color} />
                                </motion.div>

                                {/* Feature List */}
                                <div className="tech-features">
                                    {currentTech.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="tech-feature"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 + 0.2 }}
                                        >
                                            <span className="feature-bullet" style={{ backgroundColor: currentTech.color }}>›</span>
                                            <span className="feature-text">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Animated Grid Background */}
                                <div className="tech-grid-bg">
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="grid-line"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ delay: i * 0.02, duration: 0.5 }}
                                            style={{ backgroundColor: `${currentTech.color}20` }}
                                        />
                                    ))}
                                </div>

                                {/* Floating Particles */}
                                <div className="tech-particles">
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="particle"
                                            style={{ backgroundColor: currentTech.color }}
                                            animate={{
                                                y: [0, -30, 0],
                                                x: [0, Math.sin(i) * 20, 0],
                                                opacity: [0.3, 0.8, 0.3]
                                            }}
                                            transition={{
                                                duration: 2 + i * 0.3,
                                                repeat: Infinity,
                                                delay: i * 0.2
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Auto-rotate indicator */}
                <div className="tech-progress">
                    {techStack.map((_, idx) => (
                        <motion.div
                            key={idx}
                            className="progress-dot"
                            onClick={() => setActiveIndex(idx)}
                            animate={{
                                scale: activeIndex === idx ? 1.3 : 1,
                                backgroundColor: activeIndex === idx ? techStack[idx].color : 'rgba(255,255,255,0.2)'
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default TechShowcase;
