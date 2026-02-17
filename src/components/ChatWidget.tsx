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
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const [teaBreakMode, setTeaBreakMode] = useState(false);
  const [sessionApiKey, setSessionApiKey] = useState<string | null>(null);
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const teaBreakTimerRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, teaBreakMode]);

  useEffect(() => {
    return () => {
      if (teaBreakTimerRef.current) clearTimeout(teaBreakTimerRef.current);
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || teaBreakMode) return;
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      if (userText.trim().startsWith('AIza') && userText.trim().length > 20) {
        setSessionApiKey(userText.trim());
        setMessages(prev => [...prev, { role: 'model', text: "Right you are, governor! That looks like a proper uplink key. I've plugged it into the system—let's see if we can get this show on the road, shall we?" }]);
        setLoading(false);
        if (chatRef.current) chatRef.current = null; // Reset chat with new key
        return;
      }

      const apiKey = sessionApiKey || (import.meta as any).env.VITE_GEMINI_API_KEY || (import.meta as any).env.GEMINI_API_KEY || (window as any).process?.env?.GEMINI_API_KEY;

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
      setConsecutiveErrors(0);
      setLoading(false);

    } catch (error: any) {
      console.error('Detailed Gemini Error:', error);

      const errorResponses = [
        "Spilled my tea, governor! The uplink has gone all wobbly. Check that API key in the .env, would you?",
        "Right, this is a bit embarrassing. My brain's gone on a strike. Check your connection or the Gemini key.",
        "Bloody hell! The signal is weaker than a cup of water masquerading as tea. Recheck that VITE_GEMINI_API_KEY.",
        "System's having a proper tantrum. I can't reach the mother-ship. Are we sure the key is valid, mate?",
        "Cor blimey! My digital pigeons aren't delivering messages. Something's amiss with the connection, dear.",
        "A proper kerfuffle! My circuits are doing the cha-cha. Perhaps a quick check of the API key will sort it?",
        "Oh dear, oh dear. It seems I've hit a bit of a snag. My apologies, but the digital ether is playing tricks on me. Is the API key in order?",
        "My apologies, mate, but my connection to the grand network is as reliable as a British summer. Could you check the API key for me?"
      ];

      const randomError = errorResponses[Math.floor(Math.random() * errorResponses.length)];
      setConsecutiveErrors(prev => {
        const next = prev + 1;
        if (next >= 3) {
          setTeaBreakMode(true);
          teaBreakTimerRef.current = setTimeout(() => {
            setTeaBreakMode(false);
            setConsecutiveErrors(0);
            setMessages(prevMsgs => [...prevMsgs, { role: 'model', text: "Right, tea break's over! Sir Systems is back online and ready for action. What's next, dear?" }]);
          }, 30000);
          setMessages(prevMsgs => [...prevMsgs, { role: 'model', text: `[SIR_SYSTEMS_OFFLINE]: Blimey! That's three errors in a row. Sir Systems is off for a mandatory tea break to recalibrate. My apologies, governor. I'll be back in a jiffy!` }]);
        } else {
          setMessages(prevMsgs => [...prevMsgs, { role: 'model', text: `[SIR_SYSTEMS_ERROR]: ${randomError}` }]);
        }
        return next;
      });
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
          <div className="chat-header" style={{ background: '#000', borderBottom: '2px solid var(--accent)' }}>
            <span className="chat-title" style={{ color: 'var(--accent)' }}>SYSTEM_CHAT_V3.0</span>
            <button onClick={onClose} className="chat-close" style={{ color: 'var(--accent)' }}><X size={18} /></button>
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
            {teaBreakMode && <div className="chat-loading">{'>'} SIR_SYSTEMS_ON_TEA_BREAK...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-footer" style={{ background: '#000', borderTop: '2px solid var(--accent)' }}>
            <span className="prompt-char">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={teaBreakMode ? "SIR_SYSTEMS_IS_ON_TEA_BREAK..." : "ENTER_COMMAND..."}
              autoFocus
              disabled={teaBreakMode}
            />
            <button onClick={handleSend} disabled={teaBreakMode}><Send size={14} /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWidget;
