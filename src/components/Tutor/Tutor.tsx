import React, { useState } from 'react';
import { 
  Bot, 
  Search, 
  History, 
  MessageSquarePlus, 
  BookOpen, 
  Atom, 
  Calculator,
  MessageCircle,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { simulateStreamingResponse, Message } from '../../services/aiService';
import MarkdownRenderer from '../Common/MarkdownRenderer';
import { cn } from '@/src/lib/utils';

/**
 * AI 導師 (AI Tutor) 組件
 * 提供全螢幕的 AI 教學諮詢體驗
 */
export default function Tutor() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'init', 
      role: 'ai', 
      content: '你好！我是你的 7x24 小時智慧導師。你可以問我任何學術問題，或者讓我幫你規劃學習路徑。今天想聊聊什麼？',
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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

    const aiMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', content: '', timestamp: new Date() }]);

    try {
      await simulateStreamingResponse(userMsg.content, (chunk) => {
        setMessages(prev => prev.map(msg => 
          msg.id === aiMsgId ? { ...msg, content: chunk } : msg
        ));
      });
    } finally {
      setIsTyping(false);
    }
  };

  const currentSubjects = [
    { name: '高等微積分', icon: Calculator, color: 'text-primary' },
    { name: '應用物理', icon: Atom, color: 'text-secondary' },
    { name: '世界歷史', icon: BookOpen, color: 'text-amber-600' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col h-full bg-background"
    >
      <div className="flex-1 flex overflow-hidden">
        {/* 左側：對話歷史與主題 */}
        <aside className="w-72 border-r border-outline-variant bg-surface-container-lowest hidden lg:flex flex-col p-6 gap-8">
          <div>
            <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-4">目前的學科 context</h3>
            <div className="space-y-2">
              {currentSubjects.map(sub => (
                <button key={sub.name} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container transition-colors text-sm font-medium text-primary">
                  <sub.icon size={18} className={sub.color} />
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-4">歷史對話</h3>
            <div className="space-y-1">
              {['相對論公式推導', '線性代數特徵值', '工業革命的影響'].map(title => (
                <button key={title} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container text-xs text-outline transition-colors">
                  <History size={14} />
                  {title}
                </button>
              ))}
            </div>
          </div>

          <button className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-container transition-all active:scale-95">
            <MessageSquarePlus size={18} />
            新諮詢會話
          </button>
        </aside>

        {/* 右側：主聊天介面 */}
        <div className="flex-1 flex flex-col items-center relative overflow-hidden bg-white/50 backdrop-blur-sm">
          <div className="w-full max-w-3xl flex-1 overflow-y-auto px-6 py-8 no-scrollbar scroll-smooth">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "mb-8 flex gap-4 max-w-full",
                    msg.role === 'user' ? "flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-lg border",
                    msg.role === 'ai' ? "bg-primary text-white border-primary/20" : "bg-white border-outline-variant"
                  )}>
                    {msg.role === 'ai' ? <Bot size={20} /> : <MessageCircle size={20} className="text-primary" />}
                  </div>
                  <div className={cn(
                    "p-6 rounded-3xl shadow-sm border leading-relaxed",
                    msg.role === 'ai' ? "bg-white border-outline-variant" : "bg-primary text-white border-transparent"
                  )}>
                    {msg.content ? (
                      <MarkdownRenderer content={msg.content} className={msg.role === 'user' ? 'prose-p:text-white prose-strong:text-white' : ''} />
                    ) : (
                      <div className="flex gap-1.5 py-2">
                        <div className="w-2 h-2 rounded-full bg-primary/30 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-primary/30 animate-bounce delay-150"></div>
                        <div className="w-2 h-2 rounded-full bg-primary/30 animate-bounce delay-300"></div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* 輸入區 */}
          <div className="w-full max-w-3xl p-6 bg-white/80 backdrop-blur-xl border-t border-outline-variant lg:border-none lg:bg-transparent lg:mb-4">
            <div className="bg-white rounded-2xl border-2 border-outline-variant p-2 flex items-end gap-2 shadow-2xl focus-within:border-primary/30 transition-all">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="輸入學術問題，例如：如何理解量子糾纏？"
                className="flex-1 bg-transparent border-none focus:ring-0 text-primary p-3 resize-none max-h-40 min-h-[48px]"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={cn(
                  "p-3 rounded-xl transition-all shadow-lg active:scale-95",
                  input.trim() && !isTyping ? "bg-primary text-white" : "bg-outline/20 text-outline"
                )}
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-center text-[10px] text-outline mt-3 font-medium tracking-wider">
              AI 導師會持續學習您的課程教材，以提供更精準的回答
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
