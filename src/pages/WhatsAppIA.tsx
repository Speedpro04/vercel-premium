import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  Send, 
  Phone, 
  MoreVertical, 
  Bot, 
  User as UserIcon,
  Clock,
  Check,
  CheckCheck,
  Sparkles,
  Tag,
  Flame,
  Snowflake
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai' | 'human';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  status: 'hot' | 'warm' | 'cold';
  tags: string[];
  aiActive: boolean;
}

export const WhatsAppIA: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [aiTyping, setAiTyping] = useState(false);

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Maria Silva',
      phone: '+55 11 98765-4321',
      lastMessage: 'Quero agendar para harmonização facial',
      timestamp: new Date(),
      unread: 2,
      status: 'hot',
      tags: ['harmonização', 'urgente'],
      aiActive: true,
    },
    {
      id: '2',
      name: 'João Santos',
      phone: '+55 11 91234-5678',
      lastMessage: 'Quais são os valores do Botox?',
      timestamp: new Date(Date.now() - 300000),
      unread: 1,
      status: 'warm',
      tags: ['botox', 'orçamento'],
      aiActive: true,
    },
    {
      id: '3',
      name: 'Ana Costa',
      phone: '+55 11 94567-8901',
      lastMessage: 'Obrigada pelas informações!',
      timestamp: new Date(Date.now() - 3600000),
      unread: 0,
      status: 'cold',
      tags: ['concluído'],
      aiActive: false,
    },
  ];

  const messages: Message[] = [
    {
      id: '1',
      content: 'Olá! Sou a Solara, sua recepcionista IA. Como posso ajudar você hoje?',
      sender: 'ai',
      timestamp: new Date(Date.now() - 600000),
      status: 'read',
    },
    {
      id: '2',
      content: 'Quero agendar para harmonização facial',
      sender: 'user',
      timestamp: new Date(Date.now() - 300000),
      status: 'read',
    },
    {
      id: '3',
      content: 'Perfeito! A harmonização facial é um dos nossos procedimentos mais procurados. Temos horários disponíveis na próxima semana. Você prefere manhã ou tarde?',
      sender: 'ai',
      timestamp: new Date(Date.now() - 200000),
      status: 'read',
    },
    {
      id: '4',
      content: 'Prefiro tarde, depois das 14h',
      sender: 'user',
      timestamp: new Date(Date.now() - 100000),
      status: 'read',
    },
    {
      id: '5',
      content: 'Ótimo! Tenho horários disponíveis: terça às 14h30, quinta às 15h ou sexta às 16h. Qual funciona melhor para você?',
      sender: 'ai',
      timestamp: new Date(),
      status: 'delivered',
    },
  ];

  const quickReplies = [
    'Confirmar agendamento',
    'Solicitar orçamento',
    'Dúvidas sobre procedimento',
    'Reagendar consulta',
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hot':
        return <Flame size={16} className="text-red-500" />;
      case 'warm':
        return <Sparkles size={16} className="text-yellow-500" />;
      case 'cold':
        return <Snowflake size={16} className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot':
        return 'bg-red-500/20 border-red-500/30';
      case 'warm':
        return 'bg-yellow-500/20 border-yellow-500/30';
      case 'cold':
        return 'bg-blue-500/20 border-blue-500/30';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}min`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="ml-64 p-6 h-[calc(100vh-100px)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <Card className="lg:col-span-1 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Conversas</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60">IA ativa</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                  className={`
                    p-4 rounded-xl cursor-pointer transition-all duration-300
                    ${selectedConversation === conversation.id
                      ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30'
                      : 'hover:bg-white/5 border border-transparent'
                    }
                  `}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                      <span className="text-gray-900 font-bold">
                        {conversation.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{conversation.name}</p>
                      <p className="text-xs text-white/50">{conversation.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(conversation.status)}
                    {conversation.unread > 0 && (
                      <span className="px-2 py-1 bg-yellow-500 text-gray-900 text-xs font-bold rounded-full">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-white/70 mb-2 line-clamp-2">
                  {conversation.lastMessage}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {conversation.aiActive && (
                      <div className="flex items-center gap-1 text-xs text-green-400">
                        <Bot size={12} />
                        <span>IA</span>
                      </div>
                    )}
                    {conversation.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/10 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-white/50">
                    {formatTime(conversation.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2 flex flex-col h-full">
          {selectedConversation ? (
            <>
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                    <span className="text-gray-900 font-bold">M</span>
                  </div>
                  <div>
                    <p className="font-medium">Maria Silva</p>
                    <p className="text-xs text-white/50">Lead quente • Harmonização</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-[70%] p-4 rounded-2xl
                        ${message.sender === 'user'
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900'
                          : message.sender === 'ai'
                          ? 'bg-white/10 text-white'
                          : 'bg-white/5 text-white'
                        }
                      `}
                    >
                      <div className="flex items-start gap-2 mb-1">
                        {message.sender === 'ai' && <Bot size={16} className="text-gold-400" />}
                        {message.sender === 'human' && <UserIcon size={16} className="text-blue-400" />}
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.status === 'read' && <CheckCheck size={12} />}
                        {message.status === 'delivered' && <Check size={12} />}
                      </div>
                    </div>
                  </div>
                ))}

                {aiTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 p-4 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <Bot size={16} className="text-yellow-400" />
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2 mb-3">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => setMessageInput(reply)}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    id="message-input"
                    name="message-input"
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300"
                  />
                  <Button onClick={() => setAiTyping(true)}>
                    <Send size={20} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Bot size={64} className="text-yellow-500 mx-auto mb-4" />
                <p className="text-xl font-semibold mb-2">Selecione uma conversa</p>
                <p className="text-white/60">A IA está pronta para atender</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};