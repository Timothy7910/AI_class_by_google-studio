import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  MoreVertical, 
  Plus, 
  Sigma, 
  Sparkles, 
  Copy, 
  Maximize2, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MarkdownRenderer from '../Common/MarkdownRenderer';
import { simulateStreamingResponse, Message } from '../../services/aiService';
import { cn } from '@/src/lib/utils';

export default function Classroom() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1',
      role: 'ai', 
      content: '同學你好！我是你的物理 AI 助教。我們今天正在探討相對論。關於黑板上的內容，你有任何疑問嗎？',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 處理自動捲動
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, autoScroll]);

  // 全局檢測手動捲動以停止自動跟隨
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    if (isAtBottom) {
      setAutoScroll(true);
    } else if (autoScroll) {
      setAutoScroll(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setAutoScroll(true);

    const aiMsgId = (Date.now() + 1).toString();
    const aiPlaceholder: Message = {
      id: aiMsgId,
      role: 'ai',
      content: '', // 初始為空，準備接收流式內容
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiPlaceholder]);

    try {
      await simulateStreamingResponse(userMsg.content, (chunk) => {
        setMessages(prev => prev.map(msg => 
          msg.id === aiMsgId ? { ...msg, content: chunk } : msg
        ));
      });
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === aiMsgId ? { ...msg, content: '抱歉，系統目前不穩定，請稍後再試。' } : msg
      ));
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    '什麼是質量虧損？', 
    '請舉一個生活中的例子', 
    '光速 c 為什麼要平方？', 
    '矩陣的特徵值代表什麼？'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col md:flex-row overflow-hidden bg-background h-full"
    >
      {/* 左側：教學展示區（黑板） */}
      <section className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="bg-slate-900 text-slate-100 rounded-3xl shadow-2xl p-8 h-full flex flex-col relative border border-white/5 overflow-hidden blackboard-glow">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          {/* 黑板頂部資訊 */}
          <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg border border-white/5">
                <Sigma className="text-slate-400" size={24} />
              </div>
              <h2 className="font-display text-2xl text-slate-100 font-bold tracking-tight">高級物理：相對論導論</h2>
            </div>
            <span className="font-sans text-xs font-bold bg-slate-800 text-slate-400 px-4 py-2 rounded-full border border-white/5 tracking-wider uppercase">單元 3</span>
          </div>

          {/* 教學核心內容 */}
          <div className="flex-1 flex flex-col justify-center items-center text-center p-8 gap-10 relative z-10">
            <h3 className="font-display text-5xl text-white font-bold tracking-tight">能量與質量的等價性</h3>

            <div className="bg-slate-800/40 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl my-4 min-w-[360px]">
              <p className="font-display text-5xl text-emerald-400 font-bold tracking-[0.2em]">
                E = mc<sup className="text-2xl ml-1">2</sup>
              </p>
            </div>

            <div className="text-xl text-slate-300 max-w-2xl leading-relaxed text-left font-medium">
              <MarkdownRenderer 
                content="這個公式表明，任何有質量的物體都具有相應的固有能量。即使是處於靜止狀態的微小粒子，也蘊含著巨大的能量潛力。其中 $E$ 代表能量，$m$ 代表質量，$c$ 代表光速。" 
                className="prose-p:text-slate-300 prose-p:text-xl"
              />
            </div>

            {/* 視覺輔助圖像 */}
            <div className="w-full max-w-xl h-72 bg-slate-800/50 rounded-3xl border border-white/5 mt-8 relative overflow-hidden flex items-center justify-center group shadow-2xl">
              <img 
                alt="太空物理背景" 
                className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen scale-110 group-hover:scale-100 transition-transform duration-[20s] linear"
                src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1280&h=720&auto=format&fit=crop" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="relative z-10">
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 shadow-xl">
                  <span className="font-bold text-slate-100">質能轉換概念圖</span>
                </div>
              </div>
              <button className="absolute bottom-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 flex items-center gap-2 text-xs text-slate-400">
                <Maximize2 size={14} /> 點擊放大
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 右側：AI 助教討論區 */}
      <section className="w-full md:w-[420px] lg:w-[480px] bg-surface-container-lowest flex flex-col h-full border-l border-outline-variant shadow-2xl relative z-10">
        {/* 對話框頂部 */}
        <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-bright">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center shadow-inner">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-primary">AI 助教 - 智慧指導</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider">線上答疑中</span>
              </div>
            </div>
          </div>
          <button className="text-outline hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-high">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* 訊息顯示區 */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-background/50 relative no-scrollbar"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                layout
                className={cn(
                  "flex gap-3 max-w-[90%]",
                  msg.role === 'user' ? "self-end flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 shadow-sm border overflow-hidden",
                  msg.role === 'ai' ? "bg-primary-container text-primary border-primary/10" : "bg-surface-container-highest border-outline-variant"
                )}>
                  {msg.role === 'ai' ? (
                    <Bot size={16} />
                  ) : (
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCroCSuJRSr6xn3AX963XwCnqbidO8g2QjQP-jup4chvwggXbESBeX4_RxfADQbaUvwWJ6AoUeN_RWSa1lxqmUwMGxfwjFeY47CEt5PeJfXgmpOMbl4aDp9kvBYJIQGTdGq88KJUzaOgo-zN3dCT5d56CV7m5hAS7uROWXqpvstkXCQqawBSi4xYfmOTntKF4boMlEQ7c3I_ximZvGDnsP3jK-H5xyU7fQZqZtxLt7l310vt3av4V3rSI4-OAHCUkZ0Amcvo3HQnt9P" 
                      alt="Student"
                    />
                  )}
                </div>
                
                <div className={cn(
                  "shadow-md p-4 rounded-3xl",
                  msg.role === 'ai' 
                    ? "bg-white border border-outline-variant rounded-tl-sm" 
                    : "bg-primary text-white rounded-tr-sm"
                )}>
                  {msg.content ? (
                    <MarkdownRenderer 
                      content={msg.content} 
                      className={msg.role === 'user' ? 'prose-p:text-white' : ''}
                    />
                  ) : (
                    <div className="flex gap-1.5 py-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce"></span>
                       <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce delay-150"></span>
                       <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce delay-300"></span>
                    </div>
                  )}
                  
                  {msg.role === 'ai' && msg.content && (
                    <div className="mt-3 pt-3 border-t border-outline-variant/30 flex gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-bold text-outline hover:text-primary transition-colors">
                        <Copy size={12} /> 複製回答
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-bold text-outline hover:text-primary transition-colors">
                        <RefreshCw size={12} /> 重新生成
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
          
          {/* 自動捲動指示項 */}
          {!autoScroll && (
            <button 
              onClick={() => setAutoScroll(true)}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 hover:bg-primary-container transition-all animate-in fade-in slide-in-from-bottom-2"
            >
              檢視最新回覆 ↓
            </button>
          )}
        </div>

        {/* 輸入與捷徑區 */}
        <div className="border-t border-outline-variant bg-surface-bright p-4 flex flex-col gap-4 shadow-[0_-4px_24px_rgba(0,0,0,0.03)]">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {quickQuestions.map(q => (
              <button 
                key={q} 
                onClick={() => setInput(q)}
                className="whitespace-nowrap px-4 py-1.5 bg-white border border-outline-variant rounded-full text-outline font-bold text-[10px] hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95"
              >
                {q}
              </button>
            ))}
          </div>
          
          <div className="relative flex items-end bg-surface-container-low border-2 border-transparent focus-within:border-primary/20 rounded-2xl transition-all p-1.5 shadow-inner">
            <button className="p-2.5 text-outline hover:text-primary transition-colors hover:bg-white/50 rounded-xl">
              <Plus size={20} />
            </button>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none text-sm font-medium text-primary placeholder:text-outline/50 max-h-32 min-h-[48px] py-2.5" 
              placeholder="向助教提問... (支援 Markdown & LaTeX)"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={cn(
                "p-2.5 rounded-xl transition-all shadow-lg active:scale-95",
                input.trim() && !isTyping ? "bg-primary text-white" : "bg-outline/20 text-outline cursor-not-allowed shadow-none"
              )}
            >
              <Send size={20} />
            </button>
          </div>
          
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-1.5 text-[9px] text-outline/60 font-bold uppercase tracking-wider">
              <Sparkles size={10} />
              支援 LaTeX 公式 ($$ $$)
            </div>
            <span className="text-[9px] text-outline/60 font-medium">Enter 發送，Shift+Enter 換行</span>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
