import React from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  TrendingUp,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onPageChange,
  isCollapsed,
  onToggleCollapse
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'whatsapp', label: 'WhatsApp IA', icon: MessageSquare },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'leads', label: 'Recuperação', icon: TrendingUp },
    { id: 'config', label: 'Configuração', icon: Settings },
  ];

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full transition-all duration-300 z-50
        border-r border-white/5 backdrop-blur-2xl
        ${isCollapsed ? 'w-20' : 'w-72'}
        bg-gradient-to-b from-white/[0.03] to-white/[0.01]
      `}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20">
                  <Sparkles size={20} className="text-ocean-900" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gold-400/30 blur-lg animate-pulse" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-2xl font-bold text-gradient">Solara</h1>
                  <p className="text-xs text-white/40">AI-Powered Reception</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-xl
                  transition-all duration-300 group relative overflow-hidden
                  ${isActive
                    ? 'bg-gradient-to-r from-gold-500/20 to-gold-600/10 text-gold-400 border border-gold-500/30 shadow-lg shadow-gold-500/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5 hover:border-white/10 border border-transparent'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent" />
                )}
                <span className="relative z-10">
                  <Icon size={20} />
                </span>
                {!isCollapsed && (
                  <span className="relative z-10 text-sm font-medium">{item.label}</span>
                )}
                {isActive && !isCollapsed && (
                  <div className="ml-auto w-1 h-4 rounded-full bg-gold-500 shadow-[0_0_10px_#d4af37]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-white/5">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20">
                <span className="text-ocean-900 font-bold text-sm">C</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-ocean-900" />
            </div>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium text-white">Clínica Premium</p>
                <p className="text-xs text-gold-400">Enterprise Plan</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-1/2 w-6 h-6 rounded-full bg-gold-500 hover:bg-gold-400 text-ocean-900 flex items-center justify-center transition-all duration-300 shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </aside>
  );
};
