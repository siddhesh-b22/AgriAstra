
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Mic, Brain, Globe, Zap, ExternalLink } from 'lucide-react';
import { advisorService } from '../services/geminiService';
import { ChatMessage } from '../types';

export const SmartAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'fast' | 'thinking' | 'search'>('fast');
  const [messages, setMessages] = useState<(ChatMessage & { sources?: any[] })[]>([
    { role: 'model', text: 'Namaste! I am your AgriAstra Advisor. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleMicClick = () => {
    // WebSpeech API would go here, providing feedback for now.
    setInput('Voice recognition initializing...');
    setTimeout(() => {
      setInput('How is the mandi price today?');
    }, 1500);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    let response;
    try {
      if (mode === 'thinking') {
        response = await advisorService.getThinkingAdvice(userMsg, messages);
      } else if (mode === 'search') {
        response = await advisorService.getSearchAdvice(userMsg);
      } else {
        response = await advisorService.getFastAdvice(userMsg);
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: response.text, 
        sources: (response as any).sources 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "I encountered an error. Please check your connection." }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 flex items-center gap-2 group border-4 border-white"
        >
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap">Ask AgriAstra AI</span>
          <Bot className="w-7 h-7" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-200 w-[380px] sm:w-[450px] h-[650px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
          {/* Header */}
          <div className="bg-slate-900 p-6 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-xl">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-black leading-none text-lg">Advisor OS</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mt-1">Intelligence Layer Active</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mode Selector */}
          <div className="bg-slate-50 p-2 flex gap-1 border-b border-slate-200">
            {[
              { id: 'fast', label: 'Fast', icon: <Zap className="w-3.5 h-3.5" /> },
              { id: 'thinking', label: 'Deep Thinking', icon: <Brain className="w-3.5 h-3.5" /> },
              { id: 'search', label: 'Search', icon: <Globe className="w-3.5 h-3.5" /> }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  mode === m.id ? 'bg-white shadow-sm text-emerald-700 border border-slate-200' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {m.icon} {m.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-3xl flex flex-col gap-2 ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none shadow-xl' 
                    : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'
                }`}>
                  <div className="whitespace-pre-wrap text-sm font-medium leading-relaxed">
                    {msg.text}
                  </div>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                      <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Sources Verified:</div>
                      {msg.sources.map((s, i) => (
                        <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 p-2 bg-white rounded-xl border border-slate-100 hover:border-emerald-300 transition-colors">
                           <span className="text-[10px] font-bold text-slate-700 truncate">{s.title || s.uri}</span>
                           <ExternalLink className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl rounded-tl-none">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 bg-emerald-300 rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-3 animate-pulse">
                    {mode === 'thinking' ? 'Deep Reasoning Active...' : mode === 'search' ? 'Scanning Global Data...' : 'Generating Response...'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-3 bg-slate-100 rounded-[32px] p-2 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all border-2 border-transparent focus-within:border-emerald-500">
              <button onClick={handleMicClick} className="p-3 text-slate-400 hover:text-emerald-600 transition-colors">
                <Mic className="w-6 h-6" />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={mode === 'search' ? "Search real-time mandi prices..." : "Ask your Agri Advisor..."}
                className="flex-1 bg-transparent border-none px-2 py-3 text-slate-900 font-bold placeholder:text-slate-400 outline-none text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-slate-900 disabled:bg-slate-300 text-white p-4 rounded-2xl transition-all active:scale-95 shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
