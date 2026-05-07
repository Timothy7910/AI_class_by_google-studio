import React, { useState } from 'react';
import Sidebar from './components/Navigation/Sidebar';
import TopNav from './components/Navigation/TopNav';
import Dashboard from './components/Dashboard/Dashboard';
import Analytics from './components/Analytics/Analytics';
import Classroom from './components/Classroom/Classroom';
import Tutor from './components/Tutor/Tutor';
import Courses from './components/Courses/Courses';
import Library from './components/Library/Library';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Dashboard key="dashboard" />;
      case 'analytics':
        return <Analytics key="analytics" />;
      case 'classes':
        return <Classroom key="classroom" />;
      case 'tutor':
        return <Tutor key="tutor" />;
      case 'courses':
        return <Courses key="courses" />;
      case 'library':
        return <Library key="library" />;
      default:
        return <Dashboard key="default" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex overflow-hidden h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 pt-[72px] pl-64 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
