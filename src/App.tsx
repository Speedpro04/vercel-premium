import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { WhatsAppIA } from './pages/WhatsAppIA';
import { Agenda } from './pages/Agenda';
import { Leads } from './pages/Leads';
import { Config } from './pages/Config';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { LayoutDashboard, MessageSquare, Calendar, TrendingUp, Settings } from 'lucide-react';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'whatsapp': return <WhatsAppIA />;
      case 'agenda': return <Agenda />;
      case 'leads': return <Leads />;
      case 'config': return <Config />;
      default: return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return { title: 'Dashboard', subtitle: 'Gestão estratégica da sua imobiliária', icon: LayoutDashboard };
      case 'whatsapp': return { title: 'Central WhatsApp IA', subtitle: 'Atendimento premium em tempo real', icon: MessageSquare };
      case 'agenda': return { title: 'Agenda de Visitas', subtitle: 'Gerenciamento automático de tours e visitas', icon: Calendar };
      case 'leads': return { title: 'Recuperação de Negócios', subtitle: 'IA recuperando vendas e locações perdidas', icon: TrendingUp };
      case 'config': return { title: 'Configuração da IA', subtitle: 'Personalize o tom da sua secretária imobiliária', icon: Settings };
      default: return { title: 'Dashboard', subtitle: 'Gestão estratégica da sua imobiliária', icon: LayoutDashboard };
    }
  };

  const { title, subtitle, icon: Icon } = getPageTitle();

  return (
    <div className="min-h-screen bg-[#091028] relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 flex">
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
          <Header title={title} subtitle={subtitle} icon={Icon} />
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AppContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
