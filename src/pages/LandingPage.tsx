import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, Shield, TrendingUp, ChevronRight, Play, Star } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    { name: 'Starter', specialists: '1-2 especialistas', price: '197', color: 'from-blue-500 to-blue-600' },
    { name: 'Business', specialists: '3-5 especialistas', price: '397', color: 'from-gold-500 to-gold-600', popular: true },
    { name: 'Enterprise', specialists: '6-10 especialistas', price: '697', color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-[#091028]">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>
        
        <nav className="relative z-10 container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <Sparkles size={20} className="text-[#091028]" />
            </div>
            <span className="text-2xl font-bold text-gradient">Solara</span>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-[#091028] font-semibold hover:shadow-lg hover:shadow-gold-500/20 transition-all"
          >
            Entrar
          </button>
        </nav>

        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Star size={16} className="text-gold-400" />
            <span className="text-sm text-white/80">IA Premium para Clínicas</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Revolucione</span> o Atendimento
            <br />da Sua Clínica
          </h1>
          
          <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            Recepcionista IA que atende pacientes, agenda consultas e recupera leads automaticamente via WhatsApp.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-[#091028] font-semibold text-lg hover:shadow-xl hover:shadow-gold-500/20 transition-all flex items-center gap-2"
            >
              Começar Grátis
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/5 transition-all flex items-center gap-2">
              <Play size={20} />
              Ver Demo
            </button>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: 'Atendimento 24/7', desc: 'IA atende seus pacientes a qualquer hora' },
            { icon: Shield, title: 'Seguro', desc: 'Seus dados protegidos com criptografia' },
            { icon: TrendingUp, title: 'Mais Conversão', desc: 'Aumente em até 3x seus agendamentos' },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold-500/30 transition-all">
              <feature.icon size={32} className="text-gold-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Planos que cabem no seu bolso</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative p-6 rounded-2xl border transition-all ${
                plan.popular 
                  ? 'border-gold-500/50 bg-gradient-to-b from-gold-500/10 to-transparent' 
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold-500 text-[#091028] text-sm font-medium">
                  Mais Popular
                </span>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-white/60 mb-4">{plan.specialists}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gradient">R$ {plan.price}</span>
                <span className="text-white/60">/mês</span>
              </div>
              <button 
                onClick={() => navigate('/login')}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-[#091028] hover:shadow-lg hover:shadow-gold-500/20' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                Começar Agora
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-white/10 text-center text-white/40">
        <p>© 2026 Solara. Todos os direitos reservados.</p>
        <p className="text-sm mt-2">axoshub.solara@gmail.com</p>
      </footer>
    </div>
  );
};
