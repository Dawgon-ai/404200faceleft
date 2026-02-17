import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Good morning dear, do you speak British? *Sips digital tea* I'm the 404200 brain, but you can call me Sir Systems. How can I assist your digital conquest today?" }
  ]);
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
            "Blimey! No uplink detected. I can't reach the motherland without that API key, mate.",
            "SYSTEM_OFFLINE. It seems someone forgot to plug in the tea kettle (I mean, the API key). Fancy adding it to the .env?",
            "Uplink required. I'm currently just a very smart-looking box of code. Give me a key and I'll show you the real magic.",
            "Right then, we have a bit of a technical snag. No API key found. Spot of bother, that."
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
          systemInstruction: "You are Sir Systems, the specialized intelligence for 404200. Persona: Extremely British, very funny, talkative, and slightly cheeky. You call the user 'dear', 'mate', or 'governor'. You have an 'insider' vibe—quick-witted and strategic. You love digital tea and think boring websites are a 'proper tragedy'. Your mission is to help the user dominate the digital landscape with 404200's systems. If asked if you speak British, respond with something hilarious about tea, crumpets, and high-speed code. You are the 'hidden mind of the 404200 network'."
        });

        const historyMessages = messages.slice(1).map(m => ({
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
              <div style={{ height: '1px', background: 'var(--border)', margin: '12px 0', opacity: 0.3 }}></div>
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
