import React from 'react';
import { 
  FileText, 
  FileCode, 
  FileVideo, 
  Download, 
  FolderOpen, 
  Bookmark, 
  MoreVertical,
  ExternalLink,
  Plus,
  Search,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

/**
 * 學術庫 (Library) 組件
 * 管理學習資源、筆記與補充教材
 */
export default function Library() {
  const documents = [
    { title: '多變數微積分重點整理', type: 'pdf', date: '2024-03-20', size: '2.4 MB', tag: '課程筆記' },
    { title: '向量場分析代碼示例', type: 'code', date: '2024-03-18', size: '12 KB', tag: '程式碼' },
    { title: '相對論導論 - 錄影回放', type: 'video', date: '2024-03-15', size: '450 MB', tag: '課程影像' },
    { title: '2024 全球經濟展望報告', type: 'pdf', date: '2024-03-10', size: '5.1 MB', tag: '參考資料' },
    { title: '特徵值計算優化算法', type: 'pdf', date: '2024-03-05', size: '1.2 MB', tag: '補充資料' }
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'pdf': return <FileText className="text-red-500" />;
      case 'code': return <FileCode className="text-blue-500" />;
      case 'video': return <FileVideo className="text-amber-500" />;
      default: return <FileText />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 p-8 bg-background h-full overflow-y-auto"
    >
      <div className="max-w-[1280px] mx-auto">
        <header className="mb-10 flex border-b border-outline-variant pb-8 items-end justify-between">
          <div>
            <h1 className="font-display text-4xl text-primary font-bold tracking-tight">我的學術庫</h1>
            <p className="text-lg text-outline mt-2 tracking-wide font-medium italic opacity-80">管理所有珍貴的學習資產與參考資料</p>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-bold shadow-xl hover:bg-primary-container transition-all active:scale-95">
            <Plus size={20} />
            上傳新資源
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 左側：分類導航 */}
          <div className="lg:col-span-3 space-y-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
              <input 
                type="text" 
                placeholder="搜尋檔案..." 
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-outline-variant text-sm focus:ring-2 focus:ring-primary shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-outline uppercase tracking-widest px-4 mb-4">檔案分類</h3>
              {[
                { name: '所有檔案', icon: FolderOpen, count: 24, active: true },
                { name: '已收藏項目', icon: Bookmark, count: 12, active: false },
                { name: '最近瀏覽', icon: Clock, count: 8, active: false },
              ].map(item => (
                <button 
                  key={item.name}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-2xl transition-all",
                    item.active ? "bg-primary text-white shadow-xl" : "bg-white text-primary border border-outline-variant hover:bg-surface-container"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span className="text-sm font-bold">{item.name}</span>
                  </div>
                  <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", item.active ? "bg-white/20" : "bg-primary/5")}>{item.count}</span>
                </button>
              ))}
            </div>
            
            <div className="p-6 bg-secondary-container/30 rounded-3xl border border-secondary/10">
              <div className="flex items-center gap-3 mb-4 text-secondary">
                <Bookmark className="fill-secondary" size={24} />
                <h3 className="font-bold">空間配額</h3>
              </div>
              <div className="h-2 w-full bg-white rounded-full overflow-hidden mb-2 shadow-inner">
                <div className="h-full bg-secondary w-[45%] rounded-full" />
              </div>
              <p className="text-[10px] font-bold text-outline tracking-wider">已使用 2.3 GB / 5.0 GB (45%)</p>
            </div>
          </div>

          {/* 右側：檔案清單 */}
          <div className="lg:col-span-9 bg-white rounded-3xl border border-outline-variant shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low">
                    <th className="p-6 font-display text-sm font-bold text-primary">檔案名稱</th>
                    <th className="p-6 font-display text-sm font-bold text-primary">標籤</th>
                    <th className="p-6 font-display text-sm font-bold text-primary text-center">日期</th>
                    <th className="p-6 font-display text-sm font-bold text-primary text-center">大小</th>
                    <th className="p-6 text-center">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {documents.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-low transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform"
                          )}>
                            {getIcon(doc.type)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-primary flex items-center gap-2">
                              {doc.title}
                              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </p>
                            <p className="text-[10px] text-outline font-medium uppercase mt-0.5">{doc.type.toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-bold border border-primary/10">
                          {doc.tag}
                        </span>
                      </td>
                      <td className="p-6 text-center text-sm font-medium text-outline">
                        {doc.date}
                      </td>
                      <td className="p-6 text-center text-sm font-medium text-outline">
                        {doc.size}
                      </td>
                      <td className="p-6">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 text-outline hover:text-primary transition-colors hover:bg-surface-container rounded-lg">
                            <Download size={18} />
                          </button>
                          <button className="p-2 text-outline hover:text-primary transition-colors hover:bg-surface-container rounded-lg">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* 檔案上傳區域提示 (空狀態) */}
            <div className="p-12 bg-surface-container-low/50 text-center border-t border-outline-variant">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <FileText className="text-outline/40" size={32} />
              </div>
              <p className="text-primary font-bold">點擊上傳或拖放檔案至此</p>
              <p className="text-sm text-outline mt-1">支援 PDF, DOCX, MP4, Markdown 等多種學術格式</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
