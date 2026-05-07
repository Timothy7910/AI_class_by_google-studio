import React from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Bot, 
  BarChart3, 
  HelpCircle, 
  LogOut, 
  Plus,
  BookMarked,
  LibraryBig
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: '學習總覽' },
    { id: 'courses', icon: BookMarked, label: '所有課程' },
    { id: 'classes', icon: GraduationCap, label: '我的課堂' },
    { id: 'library', icon: LibraryBig, label: '學術庫' },
    { id: 'tutor', icon: Bot, label: 'AI 導師' },
    { id: 'analytics', icon: BarChart3, label: '學習分析' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest border-r border-outline-variant shadow-md flex flex-col pt-[72px] pb-6 px-4 z-40">
      <div className="mb-8 mt-4 px-4">
        <h2 className="font-display text-2xl font-bold text-primary">學術中心</h2>
        <p className="text-sm text-outline mt-1 font-medium italic">2024 春季學期</p>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group hover:translate-x-1 ${
              activeTab === item.id
                ? 'bg-secondary-container text-secondary font-bold'
                : 'text-outline hover:bg-surface-container-high'
            }`}
          >
            <item.icon size={20} className={activeTab === item.id ? 'fill-secondary/20' : ''} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-2">
        <button className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:bg-primary-container transition-colors duration-200 flex justify-center items-center gap-2 mb-4 shadow-lg active:scale-95">
          <Plus size={18} />
          開啟新對話
        </button>
        
        <div className="border-t border-outline-variant pt-4 flex flex-col gap-1">
          <button className="flex items-center gap-4 text-outline px-4 py-3 hover:bg-surface-container-high rounded-lg transition-all duration-200 hover:translate-x-1">
            <HelpCircle size={20} />
            <span className="text-sm font-medium">說明中心</span>
          </button>
          <button className="flex items-center gap-4 text-outline px-4 py-3 hover:bg-surface-container-high rounded-lg transition-all duration-200 hover:translate-x-1">
            <LogOut size={20} />
            <span className="text-sm font-medium">登出系統</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
