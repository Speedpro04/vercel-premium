# Solara - Recepcionista IA Premium para Clínicas

SaaS premium de recepcionista inteligente para clínicas de estética, emagrecimento, dermatologia e cirurgia plástica.

## 🌟 Características

- **Dashboard Premium**: Visual cinematográfico com métricas em tempo real
- **Central WhatsApp IA**: Atendimento inteligente automatizado
- **Agenda Inteligente**: Gerenciamento automático de agendamentos
- **Recuperação de Leads**: IA recuperando oportunidades perdidas
- **Configuração da IA**: Personalização completa do comportamento

## 🚀 Stack Tecnológica

- **Frontend**: React + TailwindCSS + Vite
- **Backend**: Supabase
- **IA**: OpenAI API (GPT-4)
- **Cache/Filas**: Redis
- **Deploy**: Vercel

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase
- Chave da API OpenAI
- Redis (opcional para desenvolvimento)

### Passo 1: Clonar o repositório

```bash
git clone https://github.com/Speedpro04/vercel-premium.git
cd vercel-premium
```

### Passo 2: Instalar dependências

```bash
npm install
```

### Passo 3: Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_REDIS_URL=your_redis_url
VITE_REDIS_KEY=your_redis_key
VITE_WHATSAPP_API_KEY=your_whatsapp_api_key
VITE_WHATSAPP_PHONE_NUMBER=your_whatsapp_phone_number
VITE_WHATSAPP_WEBHOOK_URL=your_webhook_url
```

### Passo 4: Configurar Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute o script SQL abaixo no SQL Editor:

```sql
-- Leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  status TEXT NOT NULL DEFAULT 'cold',
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tags TEXT[] DEFAULT '{}',
  last_contact TIMESTAMP WITH TIME ZONE
);

-- Appointments table
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  patient_name TEXT NOT NULL,
  procedure TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  duration INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  value NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  phone TEXT NOT NULL UNIQUE,
  messages JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'active',
  ai_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clinics table
CREATE TABLE clinics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  specialties TEXT[] DEFAULT '{}',
  procedures JSONB DEFAULT '[]',
  working_hours JSONB DEFAULT '[]',
  ai_config JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_leads_phone ON leads(phone);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_conversations_phone ON conversations(phone);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
```

### Passo 5: Executar em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173`

## 🎨 Identidade Visual

### Paleta de Cores

- **Azul Oceânico Profundo**: `#091028`
- **Dourado Elegante**: `#d4af37`
- **Glassmorphism**: Efeitos de vidro fosco
- **Contrastes Sofisticados**: Hierarquia visual clara

### Estilo

- Minimalista premium
- Tecnologia de luxo
- Referências: Apple, Tesla, Stripe, Linear

## 📊 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Sidebar.tsx
│   └── Header.tsx
├── pages/           # Páginas principais
│   ├── Dashboard.tsx
│   ├── WhatsAppIA.tsx
│   ├── Agenda.tsx
│   ├── Leads.tsx
│   └── Config.tsx
├── services/        # Serviços de integração
│   ├── supabase.ts
│   ├── openai.ts
│   ├── redis.ts
│   └── whatsapp.ts
├── lib/            # Utilitários e configurações
│   └── config.ts
├── hooks/          # Hooks personalizados
├── types/          # Definições de tipos TypeScript
└── utils/         # Funções utilitárias
```

## 🔧 Funcionalidades

### Dashboard
- Métricas em tempo real
- Leads do dia
- Agendamentos
- Taxa de resposta
- Conversão
- Recuperação de leads
- Faturamento potencial

### WhatsApp IA
- Conversas em tempo real
- IA respondendo automaticamente
- Humano assumir conversa
- Tags inteligentes
- Status do lead (quente/morno/frio)
- Histórico completo

### Agenda Inteligente
- Agendamentos
- Confirmação automática
- Lembretes automáticos
- Reagendamento
- Calendário elegante
- Visão diária/semanal

### Recuperação de Leads
- Identificação de leads abandonados
- Mensagens automáticas
- Tentativa de reagendamento
- Métricas de valor recuperado
- Taxa de retorno

### Configuração da IA
- Tom da IA
- Personalidade
- Horários de atendimento
- Especialidades
- Procedimentos
- Perguntas frequentes
- Mensagens automáticas

## 🚀 Deploy

### Vercel

1. Instale a Vercel CLI:
```bash
npm install -g vercel
```

2. Faça login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

### Variáveis de Ambiente no Vercel

Configure as variáveis de ambiente no painel da Vercel:
- Settings → Environment Variables

## 📈 Monitoramento

### Métricas Disponíveis

- Leads recuperados
- Valor recuperado
- Taxa de retorno
- Mensagens enviadas
- Taxa de resposta
- Conversão

## 🔐 Segurança

- Row Level Security (RLS) no Supabase
- Rate limiting com Redis
- Criptografia de dados sensíveis
- Autenticação segura

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob licença proprietária. Todos os direitos reservados.

## 💬 Suporte

Para suporte, entre em contato:
- Email: suporte@solara.ai
- WhatsApp: +55 11 99999-9999

---

Desenvolvido com ❤️ para clínicas premium