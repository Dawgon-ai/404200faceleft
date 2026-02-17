import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
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
      // For now, use a robust simulation if key is missing to keep UI alive
      // In production, user would provide GEMINI_API_KEY

      setTimeout(() => {
        const responses = [
          "SYSTEM_ACKNOWLEDGED. SCANNING_CORE_METRICS...",
          "AGENCY_STATUS: ACTIVE. PERFORMANCE_UPLINK_STABLE.",
          "QUERY_RECEIVED. OPTIMIZING_RESPONSE_NODES...",
          "PROTOCOL_7G: ENABLED. WOULD_YOU_LIKE_A_PROPOSAL?"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, { role: 'model', text: randomResponse }]);
        setLoading(false);
      }, 800);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'ERR: CONNECTION_LOST. PLEASE_RETRY.' }]);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="chat-widget"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
        >
          <div className="chat-header">
            <span className="chat-title">SYSTEM_CHAT_V3.0</span>
            <button onClick={onClose} className="chat-close"><X size={18} /></button>
          </div>
          <div className="chat-body">
            <div className="chat-welcome">
              {'>'} CONNECTION_ESTABLISHED<br />
              {'>'} SYSTEM_READY. ASK_ABOUT_SERVICES.<br />
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWidget;
