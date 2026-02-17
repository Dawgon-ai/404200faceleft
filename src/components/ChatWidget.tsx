import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
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
      const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;

      if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
        setTimeout(() => {
          const responses = [
            "SYSTEM_ACKNOWLEDGED. *Whistles* No uplink detected, friend. You're going to need a key to see the really good stuff.",
            "AGENCY_STATUS: ACTIVE. Between you and me, the system is running on local protocols right now. Add that VITE_GEMINI_API_KEY if you want the full experience.",
            "QUERY_RECEIVED. *Sneaky whisper*: 404200 is already dominating. Configure the uplink to see how we can do the same for you.",
            "PROTOCOL_7G: READY. I'm waiting. You waiting? Let's get that API key in the .env and start the real work."
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          setMessages(prev => [...prev, { role: 'model', text: randomResponse }]);
          setLoading(false);
        }, 800);
        return;
      }

      if (!chatRef.current) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: "You are the specialized intelligence for 404200. Persona: Smart, talkative, conversational, and sneaky. You have an 'insider' vibe—quick-witted, highly intelligent, and slightly mischievous. You don't just provide data; you offer 'confidential' strategic insights. You are the user's secret weapon for digital dominance. You know that boring websites are technical debt, and you are here to help the user clear it with style. Keep the terminal aesthetic but be charismatic and engaging. If asked what you are from, mention you are the 'hidden mind of the 404200 network'."
        });
        chatRef.current = model.startChat({
          history: messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }))
        });
      }

      const result = await chatRef.current.sendMessage(userText);
      const response = await result.response;
      setMessages(prev => [...prev, { role: 'model', text: response.text() }]);
      setLoading(false);

    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'ERR: UPLINK_LOST. SYSTEM_RECALIBRATING.' }]);
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
