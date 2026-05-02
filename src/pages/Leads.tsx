import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  ArrowUpRight,
  Zap,
  Sparkles,
  Target,
  Download,
  GripVertical,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Phone,
  Calendar
} from 'lucide-react';

interface KanbanCard {
  id: string;
  name: string;
  procedure: string;
  value: number;
  phone: string;
  lastContact: string;
  daysInactive: number;
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  icon: React.ReactNode;
}

const COLUMNS: KanbanColumn[] = [
  { id: 'pending', title: 'Em Fila', color: 'from-blue-500/20 to-blue-600/10', icon: <Clock size={18} /> },
  { id: 'contacting', title: 'Contatando', color: 'from-purple-500/20 to-purple-600/10', icon: <Phone size={18} /> },
  { id: 'negotiating', title: 'Negociação', color: 'from-yellow-500/20 to-yellow-600/10', icon: <MessageSquare size={18} /> },
  { id: 'recovered', title: 'Recuperado', color: 'from-green-500/20 to-green-600/10', icon: <CheckCircle size={18} /> },
];

const INITIAL_CARDS: Record<string, KanbanCard[]> = {
  pending: [
    { id: '1', name: 'Pedro Oliveira', procedure: 'Consultoria', value: 500, phone: '(11) 99999-1234', lastContact: '3 dias atrás', daysInactive: 90 },
    { id: '2', name: 'Lucas Mendes', procedure: 'Limpeza de Pele', value: 350, phone: '(11) 99999-5678', lastContact: '5 dias atrás', daysInactive: 60 },
  ],
  contacting: [
    { id: '3', name: 'Ana Costa', procedure: 'Preenchimento Labial', value: 1800, phone: '(11) 99999-4321', lastContact: 'Hoje', daysInactive: 60 },
  ],
  negotiating: [
    { id: '4', name: 'Carla Ferreira', procedure: 'Lifting', value: 8000, phone: '(11) 99999-8765', lastContact: '