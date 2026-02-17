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
      const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || (import.meta as any).env.GEMINI_API_KEY || (window as any).process?.env?.GEMINI_API_KEY;

      if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
        console.warn('Gemini API Key missing or placeholder.');
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

        // Exclude the current message from history to avoid duplication
        const historyMessages = messages.slice(0, -1).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

        chatRef.current = model.startChat({
          history: historyMessages
        });
      }

      const result = await chatRef.current.sendMessage(userText);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', text: text }]);
      setLoading(false);

    } catch (error: any) {
      console.error('Detailed Gemini Error:', error);

      let errorMsg = 'ERR: UPLINK_LOST.';
      const msg = error?.message || '';

      if (msg.includes('403')) errorMsg = 'ERR: AUTH_DENIED. RECHECK_KEY.';
      else if (msg.includes('API_KEY_INVALID')) errorMsg = 'ERR: INVALID_KEY.';
      else if (msg.includes('network')) errorMsg = 'ERR: NETWORK_TIMEOUT.';
      else if (msg.includes('SAFETY')) errorMsg = 'ERR: RESPONSE_BLOCKED_BY_SAFETY.';

      const snippet = msg.substring(0, 40);
      setMessages(prev => [...prev, { role: 'model', text: `${errorMsg} [${snippet}...]` }]);
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
