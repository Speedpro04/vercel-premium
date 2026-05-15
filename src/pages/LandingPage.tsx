import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, Shield, TrendingUp, ChevronRight, Play, Star, Landmark, Gavel, Coins } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    { name: 'Private', specialists: '1-2 corretores', price: '497', color: 'from-blue-500 to-blue-600' },
    { name: 'Elite', specialists: '3-8 corretores', price: '997', color: 'from-gold-500 to-gold-600', popular: true },
    { name: 'Black', specialists: 'Ilimitado', price: '2.497', color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-[#050814] relative overflow-hidden font-sans">
      <div className="grain-overlay" />
      
      {/* Background Video Placeholder/Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/80 via-ocean-950/50 to-ocean-950 z-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <header className="relative z-20">
        <nav className="container mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 flex items-center justify-center shadow-2xl shadow-gold-500/20 group-hover:scale-110 transition-transform duration-500">
                <Sparkles size={24} className="text-ocean-950" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gold-400/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-gradient">SOLARA</span>
              <span className="text-[10px] tracking-[0.3em] text-gold-400/60 font-semibold uppercase">Coast Realty</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-gold-500 hover:text-ocean-950 hover:border-gold-500 transition-all duration-500 backdrop-blur-md"
          >
            Acesso Restrito
          </button>
        </nav>

        <div className="container mx-auto px-6 py-24 text-center animate-reveal">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-8 backdrop-blur-md">
            <Star size={16} className="text-gold-400" />
            <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase">Inteligência Artificial de Ultra-Luxo</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-tight">
            Domine o Mercado de
            <br />
            <span className="text-gradient">Alto Padrão</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            A concierge IA que qualifica leads de 7mi a 15mi, agenda visitas exclusivas e recupera negociações milionárias automaticamente.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => navigate('/login')}
              className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 text-ocean-950 font-bold text-lg hover:shadow-[0_20px_50px_rgba(212,175,55,0.3)] transition-all duration-500 flex items-center gap-3"
            >
              Solicitar Convite
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 flex items-center gap-3 backdrop-blur-md text-lg">
              <Play size={20} className="text-gold-400" />
              Ver Experiência
            </button>
          </div>
        </div>
      </header>

      {/* Stats/Social Proof */}
      <section className="container mx-auto px-6 py-20 relative z-20 border-y border-white/5">
        <div className="grid md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Valor em Gestão', val: 'R$ 850Mi+' },
            { label: 'Média de Ativos', val: 'R$ 12Mi' },
            { label: 'Conversão em Visitas', val: '94%' },
            { label: 'ROI Estimado', val: '12x' },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <p className="text-4xl font-display font-bold text-gradient">{item.val}</p>
              <p className="text-xs tracking-widest text-white/40 uppercase font-semibold">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-32 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Landmark, title: 'Concierge 24/7', desc: 'Atendimento bilíngue especializado em imóveis de alto luxo e ativos costeiros.' },
            { icon: Gavel, title: 'Qualificação Blindada', desc: 'Nossa IA filtra apenas leads com real poder de compra para ativos acima de 7mi.' },
            { icon: Coins, title: 'Recuperação Ativa', desc: 'Estratégias de follow-up que resgatam negociações que pareciam perdidas.' },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-10 rounded-3xl group">
              <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-8 group-hover:bg-gold-500 transition-colors duration-500">
                <feature.icon size={32} className="text-gold-400 group-hover:text-ocean-950 transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing - Customized for High Ticket */}
      <section className="container mx-auto px-6 py-32 relative z-20">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-20">Planos de Excelência</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative p-10 rounded-[40px] border transition-all duration-700 ${
                plan.popular 
                  ? 'border-gold-500/50 bg-gradient-to-b from-gold-500/10 to-transparent scale-105 shadow-2xl shadow-gold-500/10' 
                  : 'border-white/5 bg-white/[0.02]'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-gold-500 text-ocean-950 text-xs font-bold tracking-widest uppercase">
                  Recomendado
                </span>
              )}
              <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
              <p className="text-white/40 mb-8 text-sm">{plan.specialists}</p>
              <div className="mb-10">
                <span className="text-5xl font-display font-bold text-gradient">R$ {plan.price}</span>
                <span className="text-white/30 ml-2">/mês</span>
              </div>
              <ul className="space-y-4 mb-10 text-sm text-white/60">
                <li className="flex items-center gap-3"><Shield size={16} className="text-gold-400" /> IA Especializada</li>
                <li className="flex items-center gap-3"><Shield size={16} className="text-gold-400" /> WhatsApp Business API</li>
                <li className="flex items-center gap-3"><Shield size={16} className="text-gold-400" /> Suporte VIP 24h</li>
              </ul>
              <button 
                onClick={() => navigate('/login')}
                className={`w-full py-5 rounded-2xl font-bold transition-all duration-500 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-ocean-950 hover:shadow-xl hover:shadow-gold-500/20' 
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                Assinar Plano
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/5 relative z-20 text-center">
        <div className="flex items-center justify-center gap-3 mb-6 opacity-40">
           <span className="text-lg font-bold tracking-tight text-gradient">SOLARA</span>
           <span className="text-[8px] tracking-[0.3em] uppercase">Coast Realty</span>
        </div>
        <p className="text-white/20 text-xs tracking-widest uppercase font-medium">© 2026 Solara Coast Realty. Exclusividade e Inteligência.</p>
      </footer>
    </div>
  );
};

