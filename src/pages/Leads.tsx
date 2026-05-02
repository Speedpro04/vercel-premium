import React, { useState } from 'react';
import {
  TrendingUp, DollarSign, Users, ArrowUpRight, Zap, Sparkles,
  Target, Download, Clock, CheckCircle, MessageSquare, Phone
} from 'lucide-react';
import { Card } from '../components/Card';

interface Lead {
  id: string;
  name: string;
  procedure: string;
  value: number;
  status: string;
  daysInactive: number;
}

export const Leads: React.FC = () => {
  const [columns, setColumns] = useState<Record<string, Lead[]>>({
    pending: [
      { id: '1', name: 'Pedro Oliveira', procedure: 'Consultoria', value: 500, status: 'pending', daysInactive: 90 },
      { id: '2', name: 'Lucas Mendes', procedure: 'Limpeza de Pele', value: 350, status: 'pending', daysInactive: 60 },
    ],
    contacting: [
      { id: '3', name: 'Ana Costa', procedure: 'Preenchimento', value: 1800, status: 'contacting', daysInactive: 60 },
    ],
    negotiating: [
      { id: '4', name: 'Carla Ferreira', procedure: 'Lifting', value: 8000, status: 'negotiating', daysInactive: 15 },
    ],
    recovered: [
      { id: '5', name: 'Maria Silva', procedure: 'Harmonização', value: 3500, status: 'recovered', daysInactive: 45 },
      { id: '6', name: 'João Santos', procedure: 'Botox', value: 1200, status: 'recovered', daysInactive: 30 },
    ],
  });

  const stats = [
    { title: 'Leads Recuperados', value: '156', change: '+23.4%', icon: Users, color: 'from-gold-500 to-gold-600' },
    { title: 'Valor Recuperado', value: 'R$ 45.230', change: '+18.7%', icon: DollarSign, color: 'from-emerald-500 to-emerald-600' },
    { title: 'Taxa de Retorno', value: '34.2%', change: '+5.1%', icon: TrendingUp, color: 'from-blue-500 to-blue-600' },
    { title: 'Mensagens', value: '1.234', change: '+12.3%', icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
  ];

  const handleDragStart = (e: React.DragEvent, leadId: string, sourceCol: string) => {
    e.dataTransfer.setData('leadId', leadId);
    e.dataTransfer.setData('sourceCol', sourceCol);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetCol: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    const sourceCol = e.dataTransfer.getData('sourceCol');

    if (sourceCol !== targetCol && leadId) {
      setColumns(prev => {
        const newCols = { ...prev };
        const lead = newCols[sourceCol].find(l => l.id === leadId);
        if (lead) {
          lead.status = targetCol;
          newCols[sourceCol] = newCols[sourceCol].filter(l => l.id !== leadId);
          newCols[targetCol] = [...newCols[targetCol], lead];
        }
        return newCols;
      });
    }
  };

  const getColumnTitle = (id: string) => {
    const titles: Record<string, string> = {
      pending: 'Em Fila',
      contacting: 'Contatando',
      negotiating: 'Negociação',
      recovered: 'Recuperado',
    };
    return titles[id] || id;
  };

  const getColumnColor = (id: string) => {
    const colors: Record<string, string> = {
      pending: 'from-blue-500/20 to-blue-600/10',
      contacting: 'from-purple-500/20 to-purple-600/10',
      negotiating: 'from-yellow-500/20 to-yellow-600/10',
      recovered: 'from-green-500/20 to-green-600/10',
    };
    return colors[id] || '';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Recuperação de Leads</h2>
          <p className="text-white/60 text-sm">IA recuperando oportunidades perdidas</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-gold-500/30 transition-all">
            <Download size={18} />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-ocean-900 font-medium hover:shadow-lg hover:shadow-gold-500/20 transition-all">
            <Target size={18} />
            Nova Campanha
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} glow={i < 2}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/60 text-xs mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <div className="flex items-center gap-1 text-xs text-green-400 mt-1">
                    <ArrowUpRight size={14} />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <Icon size={20} className="text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(columns).map(([colId, leads]) => (
          <div
            key={colId}
            className={`rounded-2xl p-4 ${getColumnColor(colId)} border border-white/10 min-h-[400px]`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, colId)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white/90">{getColumnTitle(colId)}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                {leads.length}
              </span>
            </div>

            <div className="space-y-2">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead.id, colId)}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-gold-500/30 cursor-grab active:cursor-grabbing transition-all hover:shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-ocean-900 font-bold text-xs">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-white/50">{lead.procedure}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gold-400 font-medium">R$ {lead.value}</span>
                    <span className="text-white/40">{lead.daysInactive} dias</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
