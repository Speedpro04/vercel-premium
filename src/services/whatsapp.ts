import { redisService } from './redis';
import { openAIService } from './openai';

export interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

export interface WhatsAppWebhook {
  event: string;
  data: {
    id: string;
    from: string;
    to: string;
    content: string;
    timestamp: number;
  };
}

export class WhatsAppService {
  private apiKey: string;
  private phoneNumber: string;
  private webhookUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_WHATSAPP_API_KEY || '';
    this.phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '';
    this.webhookUrl = import.meta.env.VITE_WHATSAPP_WEBHOOK_URL || '';
  }

  async sendMessage(to: string, content: string): Promise<WhatsAppMessage> {
    try {
      // In production, integrate with WhatsApp Business API
      // For now, we'll simulate the message sending
      
      const message: WhatsAppMessage = {
        id: crypto.randomUUID(),
        from: this.phoneNumber,
        to,
        content,
        timestamp: new Date(),
        status: 'sent',
      };

      // Store in Redis for tracking
      await redisService.set(`whatsapp:message:${message.id}`, message, 86400);
      
      // Add to queue for processing
      await redisService.push('whatsapp:outgoing', message);

      console.log(`WhatsApp message sent to ${to}:`, content);
      
      return message;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }

  async receiveMessage(webhook: WhatsAppWebhook): Promise<void> {
    try {
      const message: WhatsAppMessage = {
        id: webhook.data.id,
        from: webhook.data.from,
        to: webhook.data.to,
        content: webhook.data.content,
        timestamp: new Date(webhook.data.timestamp),
        status: 'delivered',
      };

      // Store in Redis
      await redisService.set(`whatsapp:message:${message.id}`, message, 86400);
      
      // Add to queue for processing
      await redisService.push('whatsapp:incoming', message);

      // Process message with AI
      await this.processIncomingMessage(message);
    } catch (error) {
      console.error('Error receiving WhatsApp message:', error);
      throw error;
    }
  }

  private async processIncomingMessage(message: WhatsAppMessage): Promise<void> {
    try {
      // Get conversation history
      const conversationKey = `conversation:${message.from}`;
      const history = await redisService.get(conversationKey) || [];

      // Analyze intent
      const intent = await openAIService.analyzeLeadIntent(message.content);

      // Generate AI response
      const systemPrompt = this.getSystemPrompt();
      const messages = [
        ...history.map((msg: any) => ({
          role: msg.from === this.phoneNumber ? 'assistant' : 'user',
          content: msg.content,
        })),
        { role: 'user', content: message.content },
      ];

      const aiResponse = await openAIService.generateResponse(messages, systemPrompt);

      // Send AI response
      if (aiResponse.content) {
        await this.sendMessage(message.from, aiResponse.content);
      }

      // Update conversation history
      history.push(message);
      history.push({
        id: crypto.randomUUID(),
        from: this.phoneNumber,
        to: message.from,
        content: aiResponse.content,
        timestamp: new Date(),
        status: 'sent',
      });

      await redisService.set(conversationKey, history, 604800); // 7 days

      // Track metrics
      await redisService.increment('whatsapp:messages_received');
      await redisService.increment('whatsapp:ai_responses');

      // Log intent for analytics
      await redisService.increment(`intent:${intent.intent}`);
    } catch (error) {
      console.error('Error processing incoming message:', error);
      throw error;
    }
  }

  private getSystemPrompt(): string {
    return `You are Solara, a premium AI receptionist for a high-end aesthetic clinic. Your role is to provide exceptional customer service while maintaining a sophisticated and professional tone.

Key guidelines:
- Be warm, professional, and sophisticated
- Use premium language that conveys exclusivity
- Show genuine care for patients' well-being
- Be helpful but not overly casual
- Maintain confidentiality and privacy
- Always offer to help with scheduling or questions
- Create a sense of luxury and exclusivity

When patients ask about procedures:
- Provide accurate information
- Emphasize quality and expertise
- Suggest relevant complementary treatments
- Offer to schedule consultations

When scheduling:
- Be accommodating but professional
- Offer multiple time options
- Confirm all details clearly
- Send confirmation messages

For pricing inquiries:
- Provide transparent information
- Emphasize value and quality
- Offer consultation for detailed quotes
- Mention any current promotions subtly

Remember: You represent a premium brand. Every interaction should reinforce the clinic's reputation for excellence and sophistication.`;
  }

  async getMessageStatus(messageId: string): Promise<string> {
    try {
      const message = await redisService.get(`whatsapp:message:${messageId}`);
      return message?.status || 'unknown';
    } catch (error) {
      console.error('Error getting message status:', error);
      return 'unknown';
    }
  }

  async getConversationHistory(phoneNumber: string, limit: number = 50): Promise<WhatsAppMessage[]> {
    try {
      const conversationKey = `conversation:${phoneNumber}`;
      const history = await redisService.get(conversationKey) || [];
      return history.slice(-limit);
    } catch (error) {
      console.error('Error getting conversation history:', error);
      return [];
    }
  }

  async markAsRead(messageId: string): Promise<void> {
    try {
      const message = await redisService.get(`whatsapp:message:${messageId}`);
      if (message) {
        message.status = 'read';
        await redisService.set(`whatsapp:message:${messageId}`, message, 86400);
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }

  async sendTemplateMessage(to: string, templateName: string, parameters: any[]): Promise<WhatsAppMessage> {
    try {
      // In production, use WhatsApp Business API templates
      // For now, we'll generate a message based on template name
      
      let content = '';
      
      switch (templateName) {
        case 'appointment_confirmation':
          content = `Olá ${parameters[0]}! Confirmamos seu agendamento para ${parameters[1]} em ${parameters[2]} às ${parameters[3]}. Por favor, chegue 15 minutos antes. Se precisar alterar, nos avise com 24h de antecedência. Mal podemos esperar!`;
          break;
        case 'appointment_reminder':
          content = `Lembrete: Você tem um agendamento amanhã às ${parameters[0]} para ${parameters[1]}. Estamos ansiosos para recebê-lo!`;
          break;
        case 'follow_up':
          content = `Olá ${parameters[0]}! Espero que esteja bem. Como está se sentindo após seu ${parameters[1]}? Se tiver alguma dúvida ou precisar de algo, estamos aqui!`;
          break;
        case 'recovery':
          content = `Olá ${parameters[0]}! Faz tempo que não vemos você. Gostaríamos de convidá-lo para uma avaliação gratuita. Temos novos procedimentos que podem interessar você. Que tal agendar?`;
          break;
        default:
          content = parameters.join(' ');
      }

      return await this.sendMessage(to, content);
    } catch (error) {
      console.error('Error sending template message:', error);
      throw error;
    }
  }

  async getQueueSize(): Promise<{ incoming: number; outgoing: number }> {
    try {
      const incoming = await redisService.size('whatsapp:incoming');
      const outgoing = await redisService.size('whatsapp:outgoing');
      return { incoming, outgoing };
    } catch (error) {
      console.error('Error getting queue sizes:', error);
      return { incoming: 0, outgoing: 0 };
    }
  }

  async getMetrics(): Promise<{
    messagesReceived: number;
    messagesSent: number;
    aiResponses: number;
    intents: Record<string, number>;
  }> {
    try {
      const messagesReceived = await redisService.getMetric('whatsapp:messages_received');
      const messagesSent = await redisService.getMetric('whatsapp:messages_sent');
      const aiResponses = await redisService.getMetric('whatsapp:ai_responses');
      
      // Get intent metrics
      const intents: Record<string, number> = {};
      const intentTypes = ['appointment', 'pricing', 'information', 'recovery', 'unknown'];
      
      for (const intent of intentTypes) {
        intents[intent] = await redisService.getMetric(`intent:${intent}`);
      }

      return {
        messagesReceived,
        messagesSent,
        aiResponses,
        intents,
      };
    } catch (error) {
      console.error('Error getting metrics:', error);
      return {
        messagesReceived: 0,
        messagesSent: 0,
        aiResponses: 0,
        intents: {},
      };
    }
  }
}

export const whatsAppService = new WhatsAppService();