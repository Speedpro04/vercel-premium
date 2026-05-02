// Supabase Configuration
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};

// OpenAI Configuration
export const openaiConfig = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  model: 'gpt-4-turbo-preview',
  maxTokens: 2000,
  temperature: 0.7,
};

// Redis Configuration
export const redisConfig = {
  url: import.meta.env.VITE_REDIS_URL || '',
  key: import.meta.env.VITE_REDIS_KEY || '',
};

// App Configuration
export const appConfig = {
  name: 'Solara',
  version: '1.0.0',
  environment: import.meta.env.MODE || 'development',
};