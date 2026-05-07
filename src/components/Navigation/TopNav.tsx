import React from 'react';
import { Bell, Settings, Search } from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TopNav({ activeTab, setActiveTab }: TopNavProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant shadow-sm h-[72px]">
      <div className="flex justify-between items-center w-full px-8 h-full pl-[280px]">
        <div className="font-display text-2xl font-bold text-primary tracking-tight">
          AI ClassRoom
        </div>

        <nav className="hidden md:flex items-center gap-8 h-full">
          {[
            { id: 'overview', label: '控制儀表板' },
            { id: 'courses', label: '所有課程' },
            { id: 'library', label: '學術庫' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`h-full flex items-center px-4 font-bold text-sm transition-colors duration-200 border-b-2 ${
                activeTab === tab.id
                  ? 'text-primary border-primary'
                  : 'text-outline border-transparent hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input 
              type="text" 
              placeholder="搜尋課程或資料..." 
              className="pl-10 pr-4 py-2 rounded-full bg-surface-container border-none text-sm focus:ring-2 focus:ring-primary outline-none w-64"
            />
          </div>
          
          <button className="p-2 rounded-full hover:bg-surface-container-high text-outline hover:text-primary transition-colors duration-200 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-surface"></span>
          </button>
          
          <button className="p-2 rounded-full hover:bg-surface-container-high text-outline hover:text-primary transition-colors duration-200">
            <Settings size={20} />
          </button>
          
          <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant overflow-hidden ml-2 cursor-pointer hover:ring-2 hover:ring-primary transition-all duration-200">
            <img 
              alt="Profile" 
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCroCSuJRSr6xn3AX963XwCnqbidO8g2QjQP-jup4chvwggXbESBeX4_RxfADQbaUvwWJ6AoUeN_RWSa1lxqmUwMGxfwjFeY47CEt5PeJfXgmpOMbl4aDp9kvBYJIQGTdGq88KJUzaOgo-zN3dCT5d56CV7m5hAS7uROWXqpvstkXCQqawBSi4xYfmOTntKF4boMlEQ7c3I_ximZvGDnsP3jK-H5xyU7fQZqZtxLt7l310vt3av4V3rSI4-OAHCUkZ0Amcvo3HQnt9P" 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
