import React from 'react';
import { Sparkles, MapPin, Calendar, Flame, CheckCircle2, ArrowRight, Sigma, Code2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 p-8"
    >
      <div className="max-w-[1080px] mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="font-display text-4xl text-primary font-bold tracking-tight">歡迎回到學習空間，林同學</h1>
            <p className="text-lg text-outline mt-2">今天是展現專注力的一天，以下是為您整理的學習動態摘要。</p>
          </div>
          
          <div className="flex gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-container text-secondary rounded-full text-sm font-bold border border-secondary/10">
              <Flame size={16} className="fill-secondary/20" />
              連續學習 14 天
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-highest text-primary rounded-full text-sm font-bold border border-outline-variant">
              <CheckCircle2 size={16} />
              本週任務 8/10
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-min">
          {/* AI 助教卡片 */}
          <section className="md:col-span-8 bg-tertiary text-white rounded-3xl p-8 blackboard-glow relative overflow-hidden flex flex-col justify-between min-h-[360px] border border-white/5">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div>
              <div className="flex items-center gap-3 mb-6 text-inverse-primary">
                <Sparkles size={28} className="fill-inverse-primary/20" />
                <h2 className="font-display text-2xl font-bold">AI 助教個人化指導</h2>
              </div>
              
              <p className="text-lg text-on-tertiary/80 max-w-2xl leading-relaxed">
                根據您昨晚完成的「線性代數」測驗結果，系統偵測到您在處理特徵值（Eigenvalues）計算時花費了較長時間。建議您進入虛擬輔導室進行針對性演練。
              </p>
              
              <div className="mt-8 p-6 bg-tertiary-container/30 backdrop-blur-sm rounded-2xl border border-white/10 font-mono text-inverse-primary inline-flex items-center gap-4 text-xl italic tracking-widest">
                <span className="text-white/30 font-sans">$$</span> {"A\\mathbf{v} = \\lambda\\mathbf{v}"} <span className="text-white/30 font-sans">$$</span>
              </div>
            </div>
            
            <div className="mt-8">
              <button className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-container transition-all duration-300 inline-flex items-center gap-3 group shadow-xl">
                啟動互動學習
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* 今日課表 */}
          <section className="md:col-span-4 bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant ambient-shadow flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-xl font-bold text-primary">今日課表</h2>
              <Calendar className="text-outline" size={20} />
            </div>
            
            <div className="flex-1 flex flex-col gap-8 relative pb-2">
              <div className="absolute left-[11px] top-2 bottom-4 w-[2px] bg-surface-container-highest"></div>
              
              <div className="relative z-10 flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center border-4 border-surface-container-lowest shadow-sm mt-1 sm:mt-0">
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                </div>
                <div>
                  <p className="text-xs font-bold text-outline uppercase tracking-wider">10:00 - 12:00</p>
                  <h3 className="text-lg font-bold text-primary mt-1">進階演算法設計</h3>
                  <p className="text-sm text-outline mt-1 flex items-center gap-1">
                    <MapPin size={14} /> 虛擬講堂 A
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex gap-4 items-start opacity-50">
                <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center border-4 border-surface-container-lowest mt-1 sm:mt-0"></div>
                <div>
                  <p className="text-xs font-bold text-outline uppercase tracking-wider">14:00 - 15:30</p>
                  <h3 className="text-lg font-bold text-primary mt-1">計算機結構專題</h3>
                  <p className="text-sm text-outline mt-1 flex items-center gap-1">
                    <MapPin size={14} /> 研究室 302
                  </p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 text-primary font-bold text-sm py-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors">
              查看完整行事曆
            </button>
          </section>

          {/* 進度總覽 */}
          <section className="md:col-span-12 bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant ambient-shadow mt-4">
            <h2 className="font-display text-xl font-bold text-primary mb-8">課程進度總覽</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: '高等微積分', unit: '單元 4: 多變數函數', progress: 65, icon: Sigma, color: 'text-primary', bg: 'bg-primary-container' },
                { title: '機器學習導論', unit: '單元 2: 監督式學習', progress: 30, icon: Code2, color: 'text-secondary', bg: 'bg-secondary-container' }
              ].map((course, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 cursor-pointer flex gap-6 items-center group">
                  <div className={`w-16 h-16 rounded-2xl ${course.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner`}>
                    <course.icon size={32} className={course.color} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-primary">{course.title}</h3>
                    <div className="flex items-center justify-between mt-3 mb-2">
                      <span className="text-xs text-outline font-medium">{course.unit}</span>
                      <span className={`text-xs font-bold ${course.color}`}>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + idx * 0.2 }}
                        className={`h-full rounded-full ${course.color === 'text-primary' ? 'bg-primary' : 'bg-secondary'}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
