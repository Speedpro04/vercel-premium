import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, Sun } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#091028] flex">
      <div className="w-[33.3333%] flex items-center justify-center p-8 border-r border-[#ffda79]/30 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffda79]/5 via-[#091028]/95 to-[#091028]" />
        
        <div className="relative z-10 w-full max-w-md space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ffda79] via-[#f0c846] to-[#ffda79] shadow-lg shadow-[#ffda79]/30 mb-4">
              <Sun size={32} className="text-[#091028]" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffda79] to-[#f0c846]">
              Solara
            </h1>
            <p className="text-white/60 text-sm max-w-xs mx-auto">
              Sistema seguro com criptografia de ponta a ponta. Seus dados protegidos com a mais alta tecnologia.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#ffda79]/80 font-medium">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ffda79]/50" />
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#091028]/50 border border-[#ffda79]/30 text-white placeholder-white/30 focus:outline-none focus:border-[#ffda79]/60 focus:ring-2 focus:ring-[#ffda79]/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#ffda79]/80 font-medium">Senha</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ffda79]/50" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 rounded-xl bg-[#091028]/50 border border-[#ffda79]/30 text-white placeholder-white/30 focus:outline-none focus:border-[#ffda79]/60 focus:ring-2 focus:ring-[#ffda79]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ffda79]/50 hover:text-[#ffda79] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="text-sm text-[#ffda79] hover:text-[#ffda79]/80 transition-colors">
              Esqueceu a senha?
            </button>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ffda79] to-[#f0c846] text-[#091028] font-semibold hover:shadow-lg hover:shadow-[#ffda79]/30 transition-all"
          >
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
              <span className="text-[#ffda79] font-medium">
                {isLogin ? 'Cadastrar' : 'Entrar'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffda79]/10 via-[#091028] to-[#1a3a5c]/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ffda79]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ffda79]/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[#ffda79] rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[#ffda79]/20 to-[#f0c846]/20 border border-[#ffda79]/30 shadow-2xl shadow-[#ffda79]/20">
              <Lock size={180} className="text-[#ffda79] drop-shadow-lg" strokeWidth={1.5} />
            </div>
          </div>
          
          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffda79] to-[#f0c846] mb-3">
              Segurança Máxima
            </h2>
            <p className="text-white/60 text-lg max-w-md">
              Seus dados protegidos com criptografia de última geração e autenticação segura.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
