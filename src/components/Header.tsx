import React from 'react';
import { Bell, Search, User, LucideIcon } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, icon: Icon }) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-ocean-900/80 border-b border-white/5">
      <div className="flex items-center justify-between p-6">
        {/* Title section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/30">
              <Icon size={24} className="text-gold-400" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gold-500/10 blur-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient">{title}</h1>
            <p className="text-sm text-white/50">{subtitle}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-64 px-4 py-2.5 pl-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20 transition-all"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold-500/30 transition-all group">
            <Bell size={20} className="text-white/70 group-hover:text-gold-400 transition-colors" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
          </button>

          {/* Profile */}
          <button className="flex items-center gap-3 p-1.5 pr-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold-500/30 transition-all">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <User size={16} className="text-ocean-900" />
            </div>
            <span className="text-sm font-medium text-white/90">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};
