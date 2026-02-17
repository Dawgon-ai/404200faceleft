import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
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
      if (!chatRef.current) {
        // Use environment variable or valid key
        const apiKey = "YOUR_API_KEY_HERE"; 
        // Note: process.env might not work in vanilla Vite without config. 
        // For demo, we might need to rely on a placeholder or properly configured env.
        
        const ai = new GoogleGenAI({ apiKey: apiKey }); 
        chatRef.current = ai.chats.create({
          model: 'gemini-3-pro-preview',
          config: {
            systemInstruction: "You are the specialized system interface for 404200, a high-performance digital agency. Your persona is technical, efficient, and slightly robotic (system-like). You assist users with inquiries about web development, speed optimization, and automation services. Keep responses concise and formatted like a system log or terminal output where appropriate.",
          }
        });
      }

      // Logic mock for now if no key
      // const result = await chatRef.current.sendMessageStream({ message: userText });
      
      // Simulate response for demo if API fails or is not set
      setTimeout(() => {
         setMessages(prev => [...prev, { role: 'model', text: `> MOCK_RESPONSE: SYSTEM_ACKNOWLEDGED: "${userText}". \n> AGENCY_OPERATIONAL. CONFIGURE_SERVICE? [Y/N]` }]);
         setLoading(false);
      }, 1000);

      /* 
      // REAL IMPLEMENTATION (Uncomment when API Key is set)
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      for await (const chunk of result) {
        fullText += chunk.text;
        setMessages(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].text = fullText;
          return newHistory;
        });
      }
      */
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
           {'>'} CONNECTION_ESTABLISHED<br/>
           {'>'} SYSTEM_READY. ASK_ABOUT_SERVICES.<br/>
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
