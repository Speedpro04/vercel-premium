import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../lib/config';

let supabase: any = null;

export const getSupabaseClient = () => {
  if (!supabase && supabaseConfig.url && supabaseConfig.anonKey) {
    supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);
  }
  return supabase;
};

// Database types
export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: 'hot' | 'warm' | 'cold';
  source: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  last_contact?: string;
}

export interface Appointment {
  id: string;
  lead_id: string;
  patient_name: string;
  procedure: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  value: number;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  lead_id: string;
  phone: string;
  messages: Message[];
  status: 'active' | 'closed' | 'archived';
  ai_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai' | 'human';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Clinic {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  specialties: string[];
  procedures: Procedure[];
  working_hours: WorkingHours[];
  ai_config: AIConfig;
  created_at: string;
  updated_at: string;
}

export interface Procedure {
  id: string;
  name: string;
  description: string;
  value: number;
  duration: number;
  popular: boolean;
  active: boolean;
}

export interface WorkingHours {
  day: string;
  open: string;
  close: string;
  active: boolean;
}

export interface AIConfig {
  name: string;
  tone: 'formal' | 'friendly' | 'executive';
  specialties: string[];
  instructions: string;
  auto_messages: AutoMessage[];
}

export interface AutoMessage {
  id: string;
  type: 'welcome' | 'confirmation' | 'reminder' | 'follow_up' | 'recovery';
  trigger: string;
  content: string;
  active: boolean;
}

// Lead operations
export const leadOperations = {
  async getAll() {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Lead[];
  },

  async getById(id: string) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Lead;
  },

  async create(lead: Partial<Lead>) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single();
    
    if (error) throw error;
    return data as Lead;
  },

  async update(id: string, updates: Partial<Lead>) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Lead;
  },

  async delete(id: string) {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// Appointment operations
export const appointmentOperations = {
  async getAll() {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data as Appointment[];
  },

  async getByDate(date: string) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('date', date)
      .order('time', { ascending: true });
    
    if (error) throw error;
    return data as Appointment[];
  },

  async create(appointment: Partial<Appointment>) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointment])
      .select()
      .single();
    
    if (error) throw error;
    return data as Appointment;
  },

  async update(id: string, updates: Partial<Appointment>) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Appointment;
  },

  async delete(id: string) {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// Conversation operations
export const conversationOperations = {
  async getAll() {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data as Conversation[];
  },

  async getById(id: string) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Conversation;
  },

  async getByPhone(phone: string) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('phone', phone)
      .single();
    
    if (error) throw error;
    return data as Conversation;
  },

  async create(conversation: Partial<Conversation>) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('conversations')
      .insert([conversation])
      .select()
      .single();
    
    if (error) throw error;
    return data as Conversation;
  },

  async update(id: string, updates: Partial<Conversation>) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('conversations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Conversation;
  },

  async addMessage(conversationId: string, message: Partial<Message>) {
    const supabase = getSupabaseClient();
    
    // Get current conversation
    const { data: conversation } = await supabase
      .from('conversations')
      .select('messages')
      .eq('id', conversationId)
      .single();
    
    if (!conversation) throw new Error('Conversation not found');
    
    // Add new message
    const updatedMessages = [...(conversation.messages || []), { ...message, id: crypto.randomUUID() }];
    
    const { data, error } = await supabase
      .from('conversations')
      .update({ messages: updatedMessages, updated_at: new Date().toISOString() })
      .eq('id', conversationId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Conversation;
  },
};

// Clinic operations
export const clinicOperations = {
  async get() {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('clinics')
      .select('*')
      .single();
    
    if (error) throw error;
    return data as Clinic;
  },

  async update(updates: Partial<Clinic>) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('clinics')
      .update(updates)
      .eq('id', updates.id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Clinic;
  },
};