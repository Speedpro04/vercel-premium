import React from 'react';
import { Card } from '../components/Card';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Landmark,
  ShieldCheck
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Leads de Luxo',
      value: '12',
      change: '+4.2%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Visitas Exclusivas',
      value: '08',
      change: '+15.3%',
      trend: 'up',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Taxa de Qualificação',
      value: '98.5%',
      change: '+0.5%',
      trend: 'up',
      icon: ShieldCheck,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Conversão em Venda',
      value: '12.4%',
      change: '+1.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const recoveryStats = [
    {
      title: 'Capital em Negociação (IA)',
      value: 'R$ 84.500.000',
      change: '+22.4%',
      trend: 'up',
      icon: Landmark,
      color: 'from-gold-500 to-gold-600',
    },
    {
      title: 'Comissão Potencial',
      value: 'R$ 4.225.000',
      change: '+18.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
    },
  ];

  const recentActivity = [
    { type: 'lead', message: 'Lead Qualificado: Mansão Penhasco (R$ 12Mi)', time: '2 min' },
    { type: 'agendamento', message: 'Visita Confirmada: Cobertura Blue (R$ 8.5Mi)', time: '5 min' },
    { type: 'recuperacao', message: 'Negociação Reaberta: Lote Beira-Mar (R$ 5.2Mi)', time: '12 min' },
    { type: 'mensagem', message: 'IA analisou proposta: 7 mensagens recebidas', time: '15 min' },
  ];

  return (
    <div className="ml-72 p-8 space-y-8 animate-reveal font-sans">
      <div className="grain-overlay opacity-[0.02]" />
      
      {/* Premium Header Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} glow={index === 0} className="group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-bold mb-2">{stat.title}</p>
                  <p className="text-4xl font-display font-bold text-white mb-2">{stat.value}</p>
                  <div className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  <span className="font-semibold">{stat.change}</span>
                </div>
                </div>
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* High Ticket Value Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {recoveryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} glow className="relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon size={120} />
              </div>
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-gold-400/60 text-xs tracking-[0.3em] uppercase font-bold mb-3">{stat.title}</p>
                  <p className="text-5xl font-display font-bold text-gradient mb-4">{stat.value}</p>
                  <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full w-fit">
                    <ArrowUpRight size={16} />
                    <span className="font-bold">{stat.change} este mês</span>
                  </div>
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-2xl shadow-gold-500/20`}>
                  <Icon size={32} className="text-ocean-950" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display font-bold">Atendimentos VIP em Tempo Real</h3>
            <span className="flex items-center gap-2 text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              IA ATIVA
            </span>
          </div>
          <div className="space-y-6">
            {[
              { name: 'Dr. Ricardo Mello', target: 'Cobertura Duplex', value: '12Mi', progress: 'Qualificação' },
              { name: 'Sra. Beatriz Costa', target: 'Villa Mediterrânea', value: '15Mi', progress: 'Visita Agendada' },
              { name: 'Roberto Valente', target: 'Apartamento Garden', value: '7.5Mi', progress: 'Follow-up' },
              { name: 'Camila Albuquerque', target: 'Mansão Sunset', value: '10Mi', progress: 'Analisando Proposta' },
            ].map((lead, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <span className="text-ocean-950 font-bold text-lg">{lead.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">{lead.name}</p>
                    <p className="text-sm text-white/40">{lead.target} • <span className="text-gold-400/60 font-semibold">R$ {lead.value}</span></p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <span className="text-xs font-bold text-white/60 tracking-widest uppercase">{lead.progress}</span>
                   <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gold-500 to-gold-600 w-[70%]" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-2xl font-display font-bold mb-8">Atividade de Luxo</h3>
          <div className="space-y-6">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/[0.03] transition-colors group"
              >
                <div className={`w-3 h-3 rounded-full mt-2 ring-4 ring-opacity-20 ${
                  activity.type === 'lead' ? 'bg-blue-500 ring-blue-500' :
                  activity.type === 'agendamento' ? 'bg-green-500 ring-green-500' :
                  activity.type === 'recuperacao' ? 'bg-gold-500 ring-gold-500' :
                  'bg-purple-500 ring-purple-500'
                } group-hover:scale-125 transition-transform`} />
                <div className="flex-1">
                  <p className="text-sm font-medium leading-relaxed">{activity.message}</p>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-2">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-xs font-bold tracking-widest uppercase transition-all">
            Ver Relatório Completo
          </button>
        </Card>
      </div>
    </div>
  );
};