import React from 'react';
import { Brain, GitGraph, TrendingUp, TrendingDown, Sigma, Beaker, ScrollText } from 'lucide-react';
import { motion } from 'motion/react';

export default function Analytics() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 p-8"
    >
      <div className="max-w-[1280px] mx-auto">
        <header className="mb-8">
          <h1 className="font-display text-4xl text-primary font-bold tracking-tight">學習進度與分析</h1>
          <p className="text-lg text-outline mt-2">保持專注，你正在穩步邁向學術卓越。這是你近期的學習圖譜。</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 知識圖譜卡片 */}
          <div className="lg:col-span-8 rounded-3xl bg-tertiary shadow-xl overflow-hidden flex flex-col relative border border-white/5">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-tertiary-container/30 backdrop-blur-md">
              <h2 className="font-display text-xl text-white flex items-center gap-3 font-bold">
                <GitGraph className="text-inverse-primary" size={24} />
                知識圖譜 (Knowledge Graph)
              </h2>
              <span className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold border border-white/10 shadow-sm">AI 即時生成</span>
            </div>
            
            <div className="relative w-full h-[460px] bg-[#0c1116] flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4a5568 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                <img 
                  alt="Knowledge Graph" 
                  className="w-full h-full object-cover opacity-50 mix-blend-screen scale-105 group-hover:scale-100 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuzkze8gClbAgCmCzR7EVv3hCpqrOx_ayheXtBMxlRZYcDYbEUR1UAZhp8XTaTEQQcjI8mZC9i7ecoFwUo5U4xmnE6bhjO5SgTcONnMj0prKEFVIdmHmQZV3TAvexdRJ5HI-cd0_V7oAER6_qjPghYkGCTjdqA6waAlUUASpPxd8ywleO0cJsT3BDvTqvo_dh91t_UDIT06661xRod2_UrNa7fugdxRV7edCGM2zqTQetHZ6VYZXwFbnAM_bpYlGBjiTW_5FaHa841" 
                />
                
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
                   <circle cx="30%" cy="40%" r="8" fill="#adc7f7" className="animate-pulse" />
                   <circle cx="50%" cy="50%" r="12" fill="#adc7f7" />
                   <circle cx="70%" cy="30%" r="10" fill="#adc7f7" />
                   <line x1="30%" y1="40%" x2="50%" y2="50%" stroke="#adc7f7" strokeWidth="2" strokeDasharray="4 4" />
                   <line x1="50%" y1="50%" x2="70%" y2="30%" stroke="#adc7f7" strokeWidth="2" strokeDasharray="4 4" />
                </svg>

                <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md p-5 rounded-2xl font-sans text-white border border-white/20 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
                  <p className="text-inverse-primary font-bold text-lg">核心突破點: 微積分基礎</p>
                  <p className="text-sm opacity-70 mt-1">連結構建進度: 78%</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI 能力分析 */}
          <div className="lg:col-span-4 rounded-3xl bg-surface-container-lowest shadow-xl border border-outline-variant p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="text-primary" size={24} />
              <h2 className="font-display text-xl font-bold text-primary">AI 能力分析</h2>
            </div>
            
            <p className="text-sm text-outline leading-relaxed mb-8">
              根據近兩週的作答數據，AI 導師為您總結了當前的學習優勢與待加強領域。
            </p>

            <div className="space-y-8 flex-1">
              <div>
                <h3 className="text-sm font-bold text-secondary mb-4 flex items-center gap-2">
                  <TrendingUp size={18} /> 核心優勢 (Strengths)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['邏輯推理', '世界歷史脈絡', '資料解讀'].map(tag => (
                    <span key={tag} className="bg-secondary-container text-secondary px-4 py-2 rounded-full text-xs font-bold border border-secondary/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-red-500 mb-4 flex items-center gap-2">
                  <TrendingDown size={18} /> 建議加強 (Areas to Improve)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['空間幾何', '文言文閱讀'].map(tag => (
                    <span key={tag} className="bg-surface-container-high text-outline px-4 py-2 rounded-full text-xs font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-outline-variant">
              <button className="w-full py-4 border-2 border-primary text-primary rounded-xl font-bold text-sm hover:bg-surface-container-low transition-all active:scale-95 shadow-sm">
                生成專屬強化練習
              </button>
            </div>
          </div>

          {/* 學科進度追蹤 */}
          <div className="lg:col-span-12 mt-4">
            <h2 className="font-display text-xl font-bold text-primary mb-8">學科進度追蹤</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: '高等數學', progress: 82, icon: Sigma, remark: '表現穩定，微分方程模組已達標。', color: 'bg-primary' },
                { name: '應用物理', progress: 65, icon: Beaker, remark: '電磁學章節需要投入更多時間。', color: 'bg-secondary' },
                { name: '世界歷史', progress: 95, icon: ScrollText, remark: '卓越表現，即將完成本學期目標。', color: 'bg-primary-container' }
              ].map((subject, idx) => (
                <div key={idx} className="rounded-3xl bg-surface-container-lowest shadow-xl border border-outline-variant p-6 group hover:shadow-2xl transition-all duration-500">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display text-lg font-bold text-primary">{subject.name}</h3>
                    <subject.icon className="text-outline group-hover:text-primary transition-colors" size={24} />
                  </div>
                  
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-4xl font-bold text-primary">{subject.progress}%</span>
                    <span className="text-sm text-outline mb-1 font-medium italic">完成度</span>
                  </div>

                  <div className="w-full bg-surface-container-high rounded-full h-2 mb-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.progress}%` }}
                      transition={{ duration: 1.2, delay: 0.1 * idx }}
                      className={`h-full rounded-full ${subject.color === 'bg-primary' ? 'bg-primary' : subject.color === 'bg-secondary' ? 'bg-secondary' : 'bg-primary-container'}`} 
                    />
                  </div>
                  
                  <p className="text-xs text-outline leading-relaxed group-hover:text-primary transition-colors">
                    {subject.remark}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
