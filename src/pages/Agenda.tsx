import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Filter
} from 'lucide-react';

interface Appointment {
  id: string;
  patient: string;
  procedure: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  phone: string;
  value: number;
}

export const Agenda: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week'>('day');

  const appointments: Appointment[] = [
    {
      id: '1',
      patient: 'Maria Silva',
      procedure: 'Harmonização Facial',
      time: '09:00',
      duration: 60,
      status: 'confirmed',
      phone: '+55 11 98765-4321',
      value: 3500,
    },
    {
      id: '2',
      patient: 'João Santos',
      procedure: 'Botox',
      time: '10:30',
      duration: 30,
      status: 'pending',
      phone: '+55 11 91234-5678',
      value: 1200,
    },
    {
      id: '3',
      patient: 'Ana Costa',
      procedure: 'Preenchimento Labial',
      time: '14:00',
      duration: 45,
      status: 'confirmed',
      phone: '+55 11 94567-8901',
      value: 1800,
    },
    {
      id: '4',
      patient: 'Pedro Oliveira',
      procedure: 'Consultoria',
      time: '15:30',
      duration: 30,
      status: 'cancelled',
      phone: '+55 11 92345-6789',
      value: 500,
    },
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
        return <AlertCircle size={16} className="text-yellow-500" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 border-yellow-500/30';
      case 'cancelled':
        return 'bg-red-500/20 border-red-500/30';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const getAppointmentForTime = (time: string) => {
    return appointments.find((apt) => apt.time === time);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setCurrentDate(newDate);
  };

  const totalValue = appointments
    .filter((apt) => apt.status !== 'cancelled')
    .reduce((sum, apt) => sum + apt.value, 0);

  return (
    <div className="ml-64 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gradient mb-1" style={{ background: 'linear-gradient(to right, #d4af37, #b8960f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Agenda Inteligente</h2>
          <p className="text-white/60">Gerenciamento automático de agendamentos</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
            <CalendarIcon size={20} className="text-gold-500" />
            <span className="font-medium">{formatDate(currentDate)}</span>
          </div>
          <Button variant="ghost" onClick={() => navigateDate('prev')}>
            <ChevronLeft size={20} />
          </Button>
          <Button variant="ghost" onClick={() => navigateDate('next')}>
            <ChevronRight size={20} />
          </Button>
          <Button>
            <Plus size={20} className="mr-2" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card glow>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-sm">Agendamentos</p>
              <p className="text-3xl font-bold">{appointments.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 bg-opacity-20">
              <CalendarIcon size={24} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-400">
            <CheckCircle size={16} />
            <span>{appointments.filter((a) => a.status === 'confirmed').length} confirmados</span>
          </div>
        </Card>

        <Card glow>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-sm">Faturamento do Dia</p>
              <p className="text-3xl font-bold text-gradient" style={{ background: 'linear-gradient(to right, #d4af37, #b8960f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                R$ {totalValue.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 bg-opacity-20">
              <Clock size={24} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <span>{appointments.filter((a) => a.status !== 'cancelled').length} procedimentos</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-sm">Pendentes</p>
              <p className="text-3xl font-bold">
                {appointments.filter((a) => a.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 bg-opacity-20">
              <AlertCircle size={24} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-yellow-400">
            <AlertCircle size={16} />
            <span>Aguardando confirmação</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-sm">Cancelados</p>
              <p className="text-3xl font-bold">
                {appointments.filter((a) => a.status === 'cancelled').length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 bg-opacity-20">
              <XCircle size={24} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-red-400">
            <XCircle size={16} />
            <span>Horários liberados</span>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <Button
              variant={view === 'day' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('day')}
            >
              Dia
            </Button>
            <Button
              variant={view === 'week' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('week')}
            >
              Semana
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Filter size={16} className="mr-2" />
              Filtrar
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            {timeSlots.map((time) => {
              const appointment = getAppointmentForTime(time);
              return (
                <div
                  key={time}
                  className={`
                    flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                    ${appointment
                      ? getStatusColor(appointment.status)
                      : 'bg-white/5 hover:bg-white/10'
                    }
                  `}
                >
                  <div className="w-20 text-center">
                    <p className="font-medium">{time}</p>
                  </div>

                  {appointment ? (
                    <>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                            <User size={16} className="text-ocean-900" />
                          </div>
                          <div>
                            <p className="font-medium">{appointment.patient}</p>
                            <p className="text-sm text-white/60">{appointment.procedure}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-white/60">
                            <Clock size={14} className="inline mr-1" />
                            {appointment.duration} min
                          </span>
                          <span className="text-white/60">
                            R$ {appointment.value.toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {getStatusIcon(appointment.status)}
                        <Button variant="ghost" size="sm">
                          Detalhes
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-white/40">Horário disponível</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};