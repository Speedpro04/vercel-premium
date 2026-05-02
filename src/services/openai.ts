import { openaiConfig } from '../lib/config';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  content: string;
  confidence: number;
  suggestedActions?: string[];
}

export class OpenAIService {
  private apiKey: string;
  private model: string;
  private maxTokens: number;
  private temperature: number;

  constructor() {
    this.apiKey = openaiConfig.apiKey;
    this.model = openaiConfig.model;
    this.maxTokens = openaiConfig.maxTokens;
    this.temperature = openaiConfig.temperature;
  }

  async generateResponse(
    messages: Message[],
    systemPrompt?: string
  ): Promise<AIResponse> {
    try {
      const allMessages: Message[] = [
        ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
        ...messages,
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: allMessages,
          max_tokens: this.maxTokens,
          temperature: this.temperature,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '';

      return {
        content,
        confidence: 0.85,
        suggestedActions: this.extractActions(content),
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  }

  private extractActions(content: string): string[] {
    const actions: string[] = [];
    
    // Extract potential actions based on keywords
    if (content.toLowerCase().includes('agendar') || content.toLowerCase().includes('marcar')) {
      actions.push('schedule_appointment');
    }
    if (content.toLowerCase().includes('valor') || content.toLowerCase().includes('preço') || content.toLowerCase().includes('quanto custa')) {
      actions.push('provide_pricing');
    }
    if (content.toLowerCase().includes('duvida') || content.toLowerCase().includes('dúvida') || content.toLowerCase().includes('pergunta')) {
      actions.push('answer_question');
    }
    if (content.toLowerCase().includes('recuperar') || content.toLowerCase().includes('reativar')) {
      actions.push('recover_lead');
    }

    return actions;
  }

  async analyzeLeadIntent(message: string): Promise<{
    intent: 'appointment' | 'pricing' | 'information' | 'recovery' | 'unknown';
    confidence: number;
    procedure?: string;
    urgency: 'high' | 'medium' | 'low';
  }> {
    try {
      const systemPrompt = `You are a lead analysis AI for a premium aesthetic clinic. Analyze the user's message and determine their intent.
      
      Possible intents:
      - appointment: User wants to schedule or book a procedure
      - pricing: User is asking about prices or costs
      - information: User is asking for general information
      - recovery: User is a previous patient who hasn't been in contact recently
      - unknown: Cannot determine intent

      Also identify:
      - The specific procedure they're interested in (if mentioned)
      - Urgency level (high: immediate need, medium: within week, low: just browsing)

      Respond in JSON format with this structure:
      {
        "intent": "appointment|pricing|information|recovery|unknown",
        "confidence": 0.0-1.0,
        "procedure": "procedure name or null",
        "urgency": "high|medium|low"
      }`;

      const response = await this.generateResponse(
        [{ role: 'user', content: message }],
        systemPrompt
      );

      const parsed = JSON.parse(response.content);
      return parsed;
    } catch (error) {
      console.error('Error analyzing lead intent:', error);
      return {
        intent: 'unknown',
        confidence: 0,
        urgency: 'low',
      };
    }
  }

  async generateFollowUpMessage(
    leadName: string,
    lastProcedure: string,
    daysInactive: number
  ): Promise<string> {
    try {
      const systemPrompt = `You are a premium AI receptionist for an aesthetic clinic. Generate a personalized follow-up message for a patient who hasn't been in contact for ${daysInactive} days.
      
      Patient name: ${leadName}
      Last procedure: ${lastProcedure}
      Days inactive: ${daysInactive}
      
      Guidelines:
      - Be warm and professional
      - Show genuine care about their well-being
      - Mention their last procedure positively
      - Suggest relevant follow-up treatments
      - Create urgency without being pushy
      - Keep it under 150 words
      - Include a clear call to action`;

      const response = await this.generateResponse(
        [{ role: 'user', content: 'Generate the follow-up message' }],
        systemPrompt
      );

      return response.content;
    } catch (error) {
      console.error('Error generating follow-up message:', error);
      return `Olá ${leadName}! Espero que esteja bem. Faz ${daysInactive} dias desde sua última visita para ${lastProcedure}. Gostaríamos de saber como você está e se precisar de algo, estamos aqui!`;
    }
  }

  async generateAppointmentConfirmation(
    patientName: string,
    procedure: string,
    date: string,
    time: string
  ): Promise<string> {
    try {
      const systemPrompt = `You are a premium AI receptionist for an aesthetic clinic. Generate a warm and professional appointment confirmation message.
      
      Patient name: ${patientName}
      Procedure: ${procedure}
      Date: ${date}
      Time: ${time}
      
      Guidelines:
      - Be warm and professional
      - Confirm all details clearly
      - Include preparation instructions if relevant
      - Provide contact information for changes
      - Express excitement about the appointment
      - Keep it under 100 words`;

      const response = await this.generateResponse(
        [{ role: 'user', content: 'Generate the confirmation message' }],
        systemPrompt
      );

      return response.content;
    } catch (error) {
      console.error('Error generating confirmation message:', error);
      return `Olá ${patientName}! Confirmamos seu agendamento para ${procedure} em ${date} às ${time}. Por favor, chegue 15 minutos antes. Se precisar alterar, nos avise com 24h de antecedência. Mal podemos esperar!`;
    }
  }

  async generateWelcomeMessage(clinicName: string, specialties: string[]): Promise<string> {
    try {
      const systemPrompt = `You are a premium AI receptionist for ${clinicName}, a high-end aesthetic clinic. Generate a warm and professional welcome message.
      
      Clinic specialties: ${specialties.join(', ')}
      
      Guidelines:
      - Be warm and professional
      - Introduce the clinic briefly
      - Mention key specialties
      - Offer immediate assistance
      - Create a premium feel
      - Keep it under 80 words`;

      const response = await this.generateResponse(
        [{ role: 'user', content: 'Generate the welcome message' }],
        systemPrompt
      );

      return response.content;
    } catch (error) {
      console.error('Error generating welcome message:', error);
      return `Olá! Bem-vindo à ${clinicName}. Somos especialistas em ${specialties.slice(0, 2).join(' e ')}. Como posso ajudar você hoje?`;
    }
  }

  async suggestProcedures(userMessage: string, availableProcedures: string[]): Promise<string[]> {
    try {
      const systemPrompt = `You are a procedure recommendation AI for an aesthetic clinic. Based on the user's message, suggest the most relevant procedures from the available list.
      
      Available procedures: ${availableProcedures.join(', ')}
      
      User message: ${userMessage}
      
      Respond with a JSON array of procedure names that best match the user's needs. Maximum 3 procedures.`;

      const response = await this.generateResponse(
        [{ role: 'user', content: userMessage }],
        systemPrompt
      );

      const parsed = JSON.parse(response.content);
      return parsed;
    } catch (error) {
      console.error('Error suggesting procedures:', error);
      return availableProcedures.slice(0, 3);
    }
  }
}

export const openAIService = new OpenAIService();