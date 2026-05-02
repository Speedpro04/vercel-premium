import React, { useState } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  TrendingUp,
  Settings,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { WhatsAppIA } from './pages/WhatsAppIA';
import { Agenda } from './pages/Agenda';
import { Leads } from './pages/Leads';
import { Config } from './pages/Config';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'whatsapp':
        return <WhatsAppIA />;
      case 'agenda':
        return <Agenda />;
      case 'leads':
        return <Leads />;
      case 'config':
        return <Config />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Visão geral da sua clínica', icon: LayoutDashboard };
      case 'whatsapp':
        return { title: 'Central WhatsApp IA', subtitle: 'Atendimento inteligente em tempo real', icon: MessageSquare };
      case 'agenda':
        return { title: 'Agenda Inteligente', subtitle: 'Gerenciamento automático de agendamentos', icon: Calendar };
      case 'leads':
        return { title: 'Recuperação de Leads', subtitle: 'IA recuperando oportunidades perdidas', icon: TrendingUp };
      case 'config':
        return { title: 'Configuração da IA', subtitle: 'Personalize sua recepcionista IA', icon: Settings };
      default:
        return { title: 'Dashboard', subtitle: 'Visão geral da sua clínica', icon: LayoutDashboard };
    }
  };

  const { title, subtitle, icon: Icon } = getPageTitle();

  return (
    <div className="min-h-screen bg-ocean-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10">
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Header title={title} subtitle={subtitle} icon={Icon} />
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
