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
  ArrowDownRight
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Leads do Dia',
      value: '47',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Agendamentos',
      value: '23',
      change: '+8.3%',
      trend: 'up',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Taxa de Resposta',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Conversão',
      value: '67.8%',
      change: '-1.2%',
      trend: 'down',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const recoveryStats = [
    {
      title: 'Leads Recuperados',
      value: '156',
      change: '+23.4%',
      trend: 'up',
      icon: Users,
      color: 'from-gold-500 to-gold-600',
    },
    {
      title: 'Valor Recuperado',
      value: 'R$ 45.230',
      change: '+18.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
    },
  ];

  const recentActivity = [
    { type: 'lead', message: 'Novo lead: Maria Silva - Botox', time: '2 min' },
    { type: 'agendamento', message: 'Agendamento confirmado: João Santos', time: '5 min' },
    { type: 'recuperacao', message: 'Lead recuperado: Ana Costa', time: '12 min' },
    { type: 'mensagem', message: 'IA respondeu: 15 mensagens', time: '15 min' },
  ];

  return (
    <div className="ml-64 p-6 space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} glow={index === 0}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <div className="flex items-center gap-1 text-sm text-green-400">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  <span>{stat.change}</span>
                </div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recoveryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} glow>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">{stat.title}</p>
                  <p className="text-4xl font-bold text-gradient mb-2" style={{ background: 'linear-gradient(to right, #d4af37, #b8960f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{stat.value}</p>
                  <div className="flex items-center gap-1 text-sm text-green-400">
                    <ArrowUpRight size={16} />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                  <Icon size={32} className="text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Atendimentos Ativos</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                    <span className="text-ocean-900 font-bold">P{i}</span>
                  </div>
                  <div>
                    <p className="font-medium">Paciente {i}</p>
                    <p className="text-sm text-white/50">Procedimento Premium</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-green-400" />
                  <span className="text-sm text-green-400">Em atendimento</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'lead' ? 'bg-blue-500' :
                  activity.type === 'agendamento' ? 'bg-green-500' :
                  activity.type === 'recuperacao' ? 'bg-gold-500' :
                  'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-white/50">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};