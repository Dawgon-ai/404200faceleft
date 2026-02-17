import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, BarChart3, MessageSquare, Plus, Bell, Search, Menu, FileSpreadsheet, Mail, StickyNote, AlertCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';

const ChaosView = ({ onResolve }: { onResolve: () => void }) => {
    return (
        <motion.div
            className="chaos-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
        >
            <div className="chaos-container" style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
                {/* Excel Sheets */}
                <motion.div className="chaos-card excel" style={{ top: '10%', left: '5%', rotate: '-5deg', zIndex: 1 }}
                    animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                    <div className="card-head"><FileSpreadsheet size={16} color="#1D6F42" /> Rent_Tracking_2025.xlsx</div>
                    <div className="card-body">
                        <div className="row"><span>Jan</span><span>€42,000</span></div>
                        <div className="row"><span>Feb</span><span>ERROR</span></div>
                        <div className="row"><span>Mar</span><span>...</span></div>
                    </div>
                </motion.div>

                {/* Emails */}
                <motion.div className="chaos-card email" style={{ top: '30%', right: '10%', rotate: '3deg', zIndex: 2 }}
                    animate={{ y: [0, 10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                    <div className="card-head"><Mail size={16} color="#d93025" /> URGENT: Leak in 302</div>
                    <div className="card-body">
                        <p>Tenant is complaining about water damage. Please fix ASAP!</p>
                    </div>
                </motion.div>

                {/* Sticky Notes */}
                <motion.div className="chaos-card sticky" style={{ bottom: '20%', left: '15%', rotate: '2deg', zIndex: 3 }}
                    animate={{ rotate: [2, 0, 2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                    <StickyNote size={24} color="#f59e0b" className="pin" />
                    <p>Call Electrician<br />Reminder: Tax filing due!<br />Where is key for 105?</p>
                </motion.div>

                {/* WhatsApp/SMS */}
                <motion.div className="chaos-card chat" style={{ bottom: '30%', right: '20%', rotate: '-3deg', zIndex: 2 }}
                    animate={{ x: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
                    <div className="card-head"><MessageSquare size={16} color="#25D366" /> WhatsApp (12 unread)</div>
                    <div className="card-body">
                        <div className="msg">Tenant: Door stuck again...</div>
                        <div className="msg">Owner: Did you get the transfer?</div>
                    </div>
                </motion.div>

                <div className="chaos-overlay">
                    <h3 className="chaos-title" style={{ color: 'white', textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>SYSTEM_FRAGMENTATION_DETECTED</h3>
                    <MagneticButton className="btn-primary" onClick={onResolve}>
                        DEPLOY_UNIFIED_OS
                    </MagneticButton>
                </div>
            </div>
        </motion.div>
    );
};

const RentalDemo = () => {
    const [viewMode, setViewMode] = useState<'chaos' | 'cure'>('chaos');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showChat, setShowChat] = useState(false);

    return (
        <section className="rental-demo-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">CLIENT_CASE_STUDY: RENTALS_CY</h2>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={viewMode}
                            className="section-subtitle"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                        >
                            {viewMode === 'chaos'
                                ? "Problem: 3 fragmented screens. 12 missed calls. Total Chaos."
                                : "Solution: 1 Unified Operating System. Zero headaches."}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <div className="demo-window">
                    <div className="window-bar">
                        <div className="window-dots">
                            <span className="dot close"></span>
                            <span className="dot min"></span>
                            <span className="dot max"></span>
                        </div>
                        <div className="window-address">
                            {viewMode === 'chaos' ? 'ERROR_404_ORGANIZATION_NOT_FOUND' : '200_RENTAL_OS_V1.0'}
                        </div>
                    </div>

                    <div className="demo-interface-wrapper" style={{ position: 'relative', height: '600px', overflow: 'hidden', background: '#0a0a0a' }}>
                        <AnimatePresence mode="wait">
                            {viewMode === 'chaos' ? (
                                <ChaosView key="chaos" onResolve={() => setViewMode('cure')} />
                            ) : (
                                <motion.div
                                    key="cure"
                                    className="demo-interface"
                                    style={{ height: '100%', display: 'flex' }}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                >
                                    {/* Sidebar */}
                                    <div className="demo-sidebar">
                                        <div className="demo-logo">R_OS</div>
                                        <div className="demo-nav">
                                            <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                                                <Home size={18} />
                                            </div>
                                            <div className={`nav-item ${activeTab === 'tenants' ? 'active' : ''}`} onClick={() => setActiveTab('tenants')}>
                                                <Users size={18} />
                                            </div>
                                            <div className={`nav-item ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => setActiveTab('finance')}>
                                                <BarChart3 size={18} />
                                            </div>
                                        </div>
                                        <div className="demo-nav-bottom">
                                            <div className="nav-item" onClick={() => setShowChat(!showChat)}>
                                                <MessageSquare size={18} />
                                                <span className="notification-dot"></span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="demo-main">
                                        <header className="demo-header">
                                            <div className="header-search">
                                                <Search size={14} />
                                                <input type="text" placeholder="Search properties, tenants, or tickets..." />
                                            </div>
                                            <div className="header-profile">
                                                <Bell size={16} />
                                                <div className="avatar">AD</div>
                                            </div>
                                        </header>

                                        <div className="demo-content">
                                            <div className="dashboard-grid">
                                                <div className="stat-card">
                                                    <h3>Occupancy Rate</h3>
                                                    <div className="value">94%</div>
                                                    <div className="trend up">+2.4% vs last month</div>
                                                </div>
                                                <div className="stat-card">
                                                    <h3>Pending Tickets</h3>
                                                    <div className="value warning">0</div>
                                                    <div className="trend up">All Systems Normal</div>
                                                </div>
                                                <div className="stat-card">
                                                    <h3>Revenue (Feb)</h3>
                                                    <div className="value">€42,500</div>
                                                    <div className="trend up">On Track</div>
                                                </div>
                                            </div>

                                            <div className="recent-activity">
                                                <h3>Recent Activity</h3>
                                                <div className="activity-list">
                                                    <div className="activity-item">
                                                        <span className="tag new">LEASE</span>
                                                        <div className="details">
                                                            <span className="title">New Lease Generated</span>
                                                            <span className="desc">Unit 402 - Andreas P.</span>
                                                        </div>
                                                        <span className="time">2m ago</span>
                                                    </div>
                                                    <div className="activity-item">
                                                        <span className="tag pay">PAYMENT</span>
                                                        <div className="details">
                                                            <span className="title">Rent Received</span>
                                                            <span className="desc">Unit 301 - €1,200</span>
                                                        </div>
                                                        <span className="time">1h ago</span>
                                                    </div>
                                                    <div className="activity-item">
                                                        <span className="tag alert">AUTO</span>
                                                        <div className="details">
                                                            <span className="title">Maintenance Dispatched</span>
                                                            <span className="desc">Unit 302 Leak - Auto-assigned to Mario</span>
                                                        </div>
                                                        <span className="time">Just now</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* AI Overlay */}
                                        <AnimatePresence>
                                            {showChat && (
                                                <motion.div
                                                    className="ai-overlay"
                                                    initial={{ x: 300, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    exit={{ x: 300, opacity: 0 }}
                                                >
                                                    <div className="ai-header">AI_ASSISTANT</div>
                                                    <div className="ai-body">
                                                        <div className="ai-msg">Hello Admin. I noticed a lease expires in 30 days for Unit 202. Should I draft a renewal?</div>
                                                        <div className="ai-actions">
                                                            <button>Draft Renewal</button>
                                                            <button>Remind Later</button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RentalDemo;
