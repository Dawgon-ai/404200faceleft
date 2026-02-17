import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

const Hero = ({ onInitChat }: { onInitChat: () => void }) => {
    const [isError, setIsError] = useState(true);

    // Faster transitions config
    const fastTransition = { duration: 0.25, ease: [0.23, 1, 0.32, 1] };

    const scanlineVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 0.15, y: [0, 400], transition: { repeat: Infinity, duration: 1.5, ease: "linear" } }
    };

    const terminalLineVariants = {
        hidden: { opacity: 0, x: -5 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.2, duration: 0.3 }
        })
    };

    return (
        <section className="hero-section" style={{ overflow: 'hidden', position: 'relative' }}>
            <AnimatePresence>
                {isError && (
                    <motion.div
                        className="scanlines-overlay"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={scanlineVariants}
                        style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'linear-gradient(to bottom, transparent 50%, rgba(204,255,0,0.02) 51%)',
                            backgroundSize: '100% 2px',
                            pointerEvents: 'none',
                            zIndex: 0,
                            opacity: 0.5
                        }}
                    />
                )}
            </AnimatePresence>

            <div className="container" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="hero-grid" style={{ width: '100%' }}>
                    <motion.div
                        className="hero-text-content"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div
                            className={`protocol-badge ${isError ? 'err' : 'ok'}`}
                            onClick={() => setIsError(!isError)}
                        >
                            {isError ? 'CRITICAL_SYSTEM_FAILURE_DETECTED' : 'OPTIMIZATION_PROTOCOL_ENGAGED'}
                        </div>

                        <h1 className={`hero-title ${isError ? 'glitch-active' : 'resolved-active'}`}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={isError ? "404" : "200"}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ display: 'block' }}
                                >
                                    {isError ? "404_NOT_FOUND" : "200_STATUS_OK"}
                                </motion.span>
                            </AnimatePresence>
                        </h1>

                        <p className="hero-description">
                            Boring websites are a technical debt. We build animated, lightning-fast systems and AI-driven workflows that turn businesses into local legends. Identify the error. Deploy the solution.
                        </p>

                        <div className="hero-actions">
                            <MagneticButton className="btn-primary" onClick={onInitChat}>
                                {isError ? 'INIT_DEPLOYMENT' : 'INIT_SCALING'}
                            </MagneticButton>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-secondary"
                                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                VIEW_PROTOCOLS
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        <div className={`terminal-display ${isError ? 'err-state' : 'ok-state'}`}>
                            <div className="terminal-header">
                                <div className="dots">
                                    <span style={{ background: '#ff5f56' }}></span>
                                    <span style={{ background: '#ffbd2e' }}></span>
                                    <span style={{ background: '#27c93f' }}></span>
                                </div>
                                <span className="term-title">sys_monitor.sh</span>
                            </div>
                            <div className="terminal-body" style={{ fontSize: '0.85rem' }}>
                                <AnimatePresence mode="wait">
                                    {isError ? (
                                        <motion.div
                                            key="error-log"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={fastTransition}
                                        >
                                            <div className="line" style={{ color: '#ff5f56' }}>{'>'} checking_uplink... FAIL</div>
                                            <div className="line">{'>'} packet_loss: 44%</div>
                                            <div className="line">{'>'} error_code: 0x404</div>
                                            <div className="line">{'>'} system_unstable: true</div>
                                            <div className="line" style={{ marginTop: '12px' }}>{'>'} <span className="cursor">_</span></div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="success-log"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={fastTransition}
                                        >
                                            <div className="line" style={{ color: 'var(--accent)' }}>{'>'} syncing_nodes... OK</div>
                                            <div className="line">{'>'} integrity_check: 100%</div>
                                            <div className="line">{'>'} version: 2.4.0_STABLE</div>
                                            <div className="line">{'>'} system_status: nominal</div>
                                            <div className="line" style={{ marginTop: '12px' }}>{'>'} <span className="cursor">_</span></div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
