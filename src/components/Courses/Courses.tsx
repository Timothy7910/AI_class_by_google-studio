import React from 'react';
import { 
  BookOpen, 
  Users, 
  Clock, 
  BarChart, 
  PlayCircle, 
  Search, 
  Filter, 
  Star,
  ChevronRight,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

/**
 * 所有課程 (Courses) 組件
 * 展示學習進度、熱門課程與學科分類
 */
export default function Courses() {
  const categories = ['全部', '科學', '數學', '工程', '人文', '藝術'];
  
  const myCourses = [
    { 
      title: '高等微積分', 
      instructor: 'Dr. Zhang', 
      progress: 65, 
      nextUnit: '多變數函數的極值', 
      students: 124, 
      rating: 4.8,
      img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400&h=250&auto=format&fit=crop'
    },
    { 
      title: '機器學習導論', 
      instructor: 'Prof. Li', 
      progress: 30, 
      nextUnit: 'SVM 核函數原理', 
      students: 2156, 
      rating: 4.9,
      img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=400&h=250&auto=format&fit=crop'
    },
    { 
      title: '近代世界史', 
      instructor: 'Dr. Anderson', 
      progress: 95, 
      nextUnit: '冷戰時期的全球格局', 
      students: 890, 
      rating: 4.7,
      img: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=400&h=250&auto=format&fit=crop'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 p-8 bg-background"
    >
      <div className="max-w-[1280px] mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl text-primary font-bold tracking-tight">我的課程中心</h1>
            <p className="text-lg text-outline mt-2">持續探索知識，實現學術目標。</p>
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
              <input 
                type="text" 
                placeholder="搜尋我的課程..." 
                className="pl-10 pr-4 py-2.5 rounded-xl bg-white border border-outline-variant text-sm focus:ring-2 focus:ring-primary w-64 shadow-sm"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-outline-variant rounded-xl text-sm font-bold text-primary hover:bg-surface-container transition-colors shadow-sm">
              <Filter size={18} />
              篩選
            </button>
          </div>
        </header>

        {/* 分類標籤 */}
        <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat, idx) => (
            <button key={cat} className={cn(
              "px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm",
              idx === 0 ? "bg-primary text-white" : "bg-white text-outline border border-outline-variant hover:border-primary hover:text-primary"
            )}>
              {cat}
            </button>
          ))}
        </div>

        {/* 課程列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myCourses.map((course, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-outline-variant shadow-lg hover:shadow-2xl transition-all group flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                   <div className="flex items-center gap-1.5 text-white/90 text-sm font-bold">
                    <Star className="text-amber-400 fill-amber-400" size={16} />
                    {course.rating}
                   </div>
                   <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider">進行中</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display text-xl font-bold text-primary mb-1">{course.title}</h3>
                <p className="text-sm text-outline mb-6">講者：{course.instructor}</p>

                <div className="mb-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-outline uppercase tracking-wider">課程進度</span>
                    <span className="text-primary">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(0,32,69,0.3)]"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-outline bg-surface-container-low p-3 rounded-xl border border-outline-variant/10 italic">
                    <PlayCircle size={14} className="text-secondary" />
                    下一單元：{course.nextUnit}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-outline-variant flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-outline font-medium">
                    <span className="flex items-center gap-1.5"><Users size={14} /> {course.students}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> 12h</span>
                  </div>
                  <button className="p-2 bg-primary/5 text-primary rounded-full hover:bg-primary hover:text-white transition-all group/btn">
                    <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* 加入更多課程按鈕 */}
          <button className="rounded-3xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center p-8 gap-4 hover:bg-surface-container-low transition-colors group">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={32} className="text-outline" />
            </div>
            <div className="text-center">
              <p className="font-display text-lg font-bold text-primary">探索更多課程</p>
              <p className="text-sm text-outline mt-1">超過 500+ 學科資源等你加入</p>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
