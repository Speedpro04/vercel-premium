import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { 
  Settings, 
  Bot, 
  MessageSquare, 
  Clock, 
  Sparkles,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

export const Config: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'personalidade' | 'horarios' | 'procedimentos' | 'mensagens'>('personalidade');
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'personalidade', label: 'Personalidade', icon: Bot },
    { id: 'horarios', label: 'Horários', icon: Clock },
    { id: 'procedimentos', label: 'Procedimentos', icon: Sparkles },
    { id: 'mensagens', label: 'Mensagens', icon: MessageSquare },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="ml-64 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gradient mb-1" style={{ background: 'linear-gradient(to right, #d4af37, #b8960f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Configuração da IA</h2>
          <p className="text-white/60">Personalize sua recepcionista IA</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">
            <RotateCcw size={20} className="mr-2" />
            Restaurar Padrões
          </Button>
          <Button onClick={handleSave}>
            <Save size={20} className="mr-2" />
            {saved ? 'Salvo!' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Configurações</h3>
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                    ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 border border-yellow-500/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="lg:col-span-3">
          {activeTab === 'personalidade' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Personalidade da IA</h3>
                <p className="text-white/60 mb-6">
                  Defina como sua recepcionista IA deve se comunicar com os pacientes
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Nome da IA
                  </label>
                  <Input
                    placeholder="Ex: Solara, Ana, Recepcionista Virtual"
                    defaultValue="Solara"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Tom de Comunicação
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'formal', label: 'Formal', desc: 'Profissional e educado' },
                      { id: 'amigavel', label: 'Amigável', desc: 'Próximo e acolhedor' },
                      { id: 'executivo', label: 'Executivo', desc: 'Direto e eficiente' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        className={`
                          p-4 rounded-xl border transition-all duration-300
                          ${option.id === 'amigavel'
                            ? 'border-yellow-500/50 bg-yellow-500/10'
                            : 'border-white/10 hover:border-white/20'
                          }
                        `}
                      >
                        <p className="font-medium mb-1">{option.label}</p>
                        <p className="text-sm text-white/60">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Especialidades da Clínica
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Estética',
                      'Dermatologia',
                      'Cirurgia Plástica',
                      'Emagrecimento',
                      'Harmonização',
                      'Botox',
                      'Preenchimento',
                      'Laser',
                    ].map((specialty) => (
                      <button
                        key={specialty}
                        className={`
                          px-4 py-2 rounded-lg border transition-all duration-300
                          ${['Estética', 'Harmonização', 'Botox'].includes(specialty)
                            ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400'
                            : 'border-white/10 hover:border-white/20 text-white/70'
                          }
                        `}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Instruções Especiais
                  </label>
                  <textarea
                    id="instructions"
                    name="instructions"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 min-h-[120px]"
                    placeholder="Ex: Sempre oferecer horários da tarde primeiro. Mencionar promoções apenas após agendamento confirmado..."
                    defaultValue="A IA deve sempre oferecer horários da tarde primeiro. Mencionar promoções e procedimentos complementares apenas após o agendamento ser confirmado. Manter tom acolhedor mas profissional."
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'horarios' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Horários de Atendimento</h3>
                <p className="text-white/60 mb-6">
                  Configure quando a IA deve estar ativa e responder automaticamente
                </p>
              </div>

              <div className="space-y-4">
                {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day) => (
                  <div
                    key={day}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                        <span className="text-gray-900 font-bold text-sm">
                          {day.substring(0, 3)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{day}</p>
                        <p className="text-sm text-white/60">
                          {day === 'Domingo' ? 'Fechado' : '09:00 - 19:00'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          id={`day-${day}`}
                          name={`day-${day}`}
                          type="checkbox"
                          defaultChecked={day !== 'Domingo'}
                          className="sr-only peer"
                        />
                          <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500" />
                      </label>
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="font-medium mb-4">Horário de Almoço</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Início
                    </label>
                    <Input type="time" defaultValue="12:00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Fim
                    </label>
                    <Input type="time" defaultValue="13:00" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'procedimentos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Procedimentos</h3>
                  <p className="text-white/60">
                    Configure os procedimentos oferecidos pela sua clínica
                  </p>
                </div>
                <Button>
                  <Plus size={20} className="mr-2" />
                  Novo Procedimento
                </Button>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Harmonização Facial', value: 'R$ 3.500', duration: '60 min', popular: true },
                  { name: 'Botox', value: 'R$ 1.200', duration: '30 min', popular: true },
                  { name: 'Preenchimento Labial', value: 'R$ 1.800', duration: '45 min', popular: false },
                  { name: 'Lifting', value: 'R$ 8.000', duration: '120 min', popular: false },
                  { name: 'Consultoria', value: 'R$ 500', duration: '30 min', popular: false },
                ].map((procedure) => (
                  <div
                    key={procedure.name}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                        <Sparkles size={20} className="text-gray-900" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{procedure.name}</p>
                          {procedure.popular && (
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/60">
                          {procedure.value} • {procedure.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mensagens' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Mensagens Automáticas</h3>
                <p className="text-white/60 mb-6">
                  Configure as mensagens que a IA envia automaticamente
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { type: 'boas_vindas', title: 'Boas-vindas', trigger: 'Primeiro contato' },
                  { type: 'confirmacao', title: 'Confirmação', trigger: 'Após agendamento' },
                  { type: 'lembrete', title: 'Lembrete', trigger: '24h antes da consulta' },
                  { type: 'follow_up', title: 'Follow-up', trigger: '3 dias após consulta' },
                  { type: 'recuperacao', title: 'Recuperação', trigger: 'Lead inativo 30 dias' },
                ].map((message) => (
                  <div
                    key={message.type}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                          <MessageSquare size={18} className="text-gray-900" />
                        </div>
                        <div>
                          <p className="font-medium">{message.title}</p>
                          <p className="text-sm text-white/60">{message.trigger}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            id={`message-${message.type}`}
                            name={`message-${message.type}`}
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500" />
                        </label>
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                    <div className="pl-13">
                      <p className="text-sm text-white/70 italic">
                        "Olá! Sou a Solara, sua recepcionista virtual. Como posso ajudar você hoje?"
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10">
                <Button className="w-full">
                  <Plus size={20} className="mr-2" />
                  Nova Mensagem Automática
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};