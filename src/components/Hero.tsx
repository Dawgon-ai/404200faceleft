import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

const Hero = ({ onInitChat }: { onInitChat: () => void }) => {
    const [isError, setIsError] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsError(prev => !prev);
        }, 3500); // Faster toggle for more dynamic feel
        return () => clearInterval(interval);
    }, []);

    const scanlineVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 0.1, y: [0, 500], transition: { repeat: Infinity, duration: 2, ease: "linear" } }
    };

    return (
        <section
            className="hero-section"
            onMouseEnter={() => setIsError(false)}
            onMouseLeave={() => setIsError(true)}
        >
            {/* Background Effects */}
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
                            background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 51%)',
                            backgroundSize: '100% 4px',
                            pointerEvents: 'none',
                            zIndex: 0
                        }}
                    />
                )}
            </AnimatePresence>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="hero-grid">
                    <motion.div
                        className="hero-text-content"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={`protocol-label ${isError ? 'err' : 'ok'}`}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={isError ? "fail" : "opt"}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isError ? 'CRITICAL_SYSTEM_FAILURE_DETECTED' : 'OPTIMIZATION_PROTOCOL_ENGAGED'}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <h1 className={`hero-title ${isError ? 'glitch-active' : 'resolved-active'}`} style={{ minHeight: '1.2em' }}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={isError ? "404" : "200"}
                                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, filter: 'blur(5px)' }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {isError ? "404_NOT_FOUND" : "200_STATUS_OK"}
                                </motion.span>
                            </AnimatePresence>
                        </h1>

                        <p className="hero-description">
                            Boring websites are a technical debt. We build animated, lightning-fast
                            systems and AI-driven workflows that turn businesses into local legends.
                            Identify the error. Deploy the solution.
                        </p>

                        <div className="hero-actions">
                            <MagneticButton className="btn-primary" onClick={onInitChat}>
                                INIT_DEPLOYMENT
                            </MagneticButton>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-secondary"
                                onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                VIEW_PROTOCOLS
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className={`terminal-display ${isError ? 'err-state' : 'ok-state'}`}>
                            <div className="terminal-header">
                                <div className="dots"><span></span><span></span><span></span></div>
                                <span className="term-title">sys_monitor.sh</span>
                            </div>
                            <div className="terminal-body">
                                <AnimatePresence mode="wait">
                                    {isError ? (
                                        <motion.div
                                            key="error-log"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="line">{'>'} checking_uplink... <span style={{ color: 'var(--error)' }}>FAIL</span></div>
                                            <div className="line">{'>'} packet_loss: 44%</div>
                                            <div className="line">{'>'} error_code: 0x404</div>
                                            <div className="line">{'>'} system_unstable: true</div>
                                            <div className="line">{'>'} <span className="cursor">_</span></div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="success-log"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="line">{'>'} optimizing_assets... <span style={{ color: 'var(--accent)' }}>DONE</span></div>
                                            <div className="line">{'>'} caching: enabled</div>
                                            <div className="line">{'>'} core_vitals: 100</div>
                                            <div className="line">{'>'} deployment: ready</div>
                                            <div className="line">{'>'} <span className="cursor">_</span></div>
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
