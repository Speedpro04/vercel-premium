# Product Requirements Document (PRD)
# Solara - Recepcionista IA Premium para Clínicas

## Visão Geral

**Solara** é um SaaS premium de recepcionista inteligente para clínicas de estética, emabrecimento, dermatologia e cirurgia plástica. A plataforma automatiza o atendimento via WhatsApp utilizando IA, gerencia agenda de pacientes e recupera leads perdidos.

**Email de contato:** axoshub.solara@gmail.com

---

## Stack Tecnológico

- **Frontend:** React 19 + Vite + TailwindCSS 4
- **Backend:** Supabase (PostgreSQL + Auth)
- **IA:** OpenAI API (GPT-4)
- **Comunicação:** WhatsApp Business API
- **Cache/Filas:** Redis
- **Deploy:** Vercel

---

## Funcionalidades Principais

### 1. Dashboard Premium
- Métricas em tempo real (leads, agendamentos, conversão)
- Cards com glassmorphism e efeitos visuais
- Atividade recente de pacientes
- Faturamento potencial e recuperado

### 2. Central WhatsApp IA
- Conversas em tempo real
- IA respondendo automaticamente
- Opção de humano assumir conversa
- Tags inteligentes (quente/morno/frio)
- Histórico completo de conversas

### 3. Agenda Inteligente
- Agendamentos automáticos
- Confirmação via WhatsApp
- Lembretes automáticos
- Reagendamento
- Visão diária/semanal

### 4. Recuperação de Leads (Kanban)
- Identificação de leads abandonados
- Mensagens automáticas personalizadas
- Kanban com drag and drop
- Métricas de valor recuperado
- Taxa de retorno

### 5. Configuração da IA
- Tom e personalidade da IA
- Horários de atendimento
- Especialidades e procedimentos
- Perguntas frequentes
- Mensagens automáticas

---

## Planos e Preços

| Plano | Especialistas | Preço |
|-------|---------------|-------|
| Starter | 1-2 | R$ 197,00 |
| Business | 3-5 | R$ 397,00 |
| Enterprise | 6-10 | R$ 697,00 |

---

## Estrutura de Páginas

### Públicas
- `/` - Landing page
- `/checkout` - Página de pagamento
- `/cadastro` - Registro de nova clínica
- `/agradecimento` - Confirmação de cadastro
- `/primeiro-acesso` - Boas-vindas e setup

### Sistema (autenticado)
- `/dashboard` - Visão geral
- `/whatsapp` - Central WhatsApp IA
- `/agenda` - Agenda inteligente
- `/leads` - Recuperação (Kanban)
- `/config` - Configurações

---

## Fluxo de Emails

### Email de Agradecimento
- Assunto: "Bem-vindo à Solara! 🌟"
- Confirmação de cadastro
- Link para primeiro acesso
- Próximos passos

### Email de Primeiro Acesso
- Assunto: "Seu acesso à Solara está pronto!"
- Credenciais de acesso
- Link para login
- Suporte disponível

---

## Identidade Visual

### Cores
- **Azul Oceânico Profundo:** `#091028`
- **Dourado Elegante:** `#d4af37`
- **Cyan Futurista:** `#22d3ee`
- **Roxo Premium:** `#a855f7`

### Estilo
- Glassmorphism (vidro fosco)
- Gradientes sutis
- Animações suaves
- Referências: Apple, Tesla, Stripe, Linear

---

## Banco de Dados (Supabase)

### Tabelas Principais
- `leads` - Leads e potenciais pacientes
- `appointments` - Agendamentos
- `conversations` - Conversas WhatsApp
- `clinics` - Clínicas cadastradas
- `users` - Usuários do sistema

---

## Segurança

- Row Level Security (RLS) no Supabase
- Autenticação segura
- Criptografia de dados sensíveis
- Rate limiting com Redis

---

## Próximos Passos

1. [ ] Implementar páginas de checkout e cadastro
2. [ ] Configurar fluxos de email
3. [ ] Integração completa com WhatsApp API
4. [ ] Testes de carga e performance
5. [ ] Documentação completa

---

*Documento atualizado em Maio de 2026*
