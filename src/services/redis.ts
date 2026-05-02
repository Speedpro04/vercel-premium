import { redisConfig } from '../lib/config';

export class RedisService {
  private url: string;
  private key: string;

  constructor() {
    this.url = redisConfig.url;
    this.key = redisConfig.key;
  }

  async connect(): Promise<void> {
    // In a real implementation, you would use a Redis client like ioredis
    // For now, we'll use localStorage as a fallback for development
    console.log('Redis service initialized');
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    // In production, use Redis client
    // For development, use localStorage
    try {
      const data = JSON.stringify({ value, expiresAt: ttl ? Date.now() + ttl * 1000 : null });
      localStorage.setItem(`redis:${key}`, data);
    } catch (error) {
      console.error('Error setting Redis value:', error);
    }
  }

  async get(key: string): Promise<any> {
    try {
      const data = localStorage.getItem(`redis:${key}`);
      if (!data) return null;

      const parsed = JSON.parse(data);
      
      // Check if expired
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        await this.del(key);
        return null;
      }

      return parsed.value;
    } catch (error) {
      console.error('Error getting Redis value:', error);
      return null;
    }
  }

  async del(key: string): Promise<void> {
    try {
      localStorage.removeItem(`redis:${key}`);
    } catch (error) {
      console.error('Error deleting Redis value:', error);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      return localStorage.getItem(`redis:${key}`) !== null;
    } catch (error) {
      console.error('Error checking Redis key:', error);
      return false;
    }
  }

  async expire(key: string, ttl: number): Promise<void> {
    try {
      const data = localStorage.getItem(`redis:${key}`);
      if (data) {
        const parsed = JSON.parse(data);
        parsed.expiresAt = Date.now() + ttl * 1000;
        localStorage.setItem(`redis:${key}`, JSON.stringify(parsed));
      }
    } catch (error) {
      console.error('Error setting Redis expiration:', error);
    }
  }

  // Queue operations
  async push(queue: string, item: any): Promise<void> {
    try {
      const queueKey = `queue:${queue}`;
      const queueData = await this.get(queueKey) || [];
      queueData.push(item);
      await this.set(queueKey, queueData);
    } catch (error) {
      console.error('Error pushing to queue:', error);
    }
  }

  async pop(queue: string): Promise<any> {
    try {
      const queueKey = `queue:${queue}`;
      const queueData = await this.get(queueKey) || [];
      if (queueData.length === 0) return null;
      
      const item = queueData.shift();
      await this.set(queueKey, queueData);
      return item;
    } catch (error) {
      console.error('Error popping from queue:', error);
      return null;
    }
  }

  async size(queue: string): Promise<number> {
    try {
      const queueKey = `queue:${queue}`;
      const queueData = await this.get(queueKey) || [];
      return queueData.length;
    } catch (error) {
      console.error('Error getting queue size:', error);
      return 0;
    }
  }

  // Rate limiting
  async checkRateLimit(identifier: string, limit: number, window: number): Promise<boolean> {
    try {
      const key = `ratelimit:${identifier}`;
      const data = await this.get(key);
      
      if (!data) {
        await this.set(key, { count: 1, resetAt: Date.now() + window * 1000 }, window);
        return true;
      }

      if (Date.now() > data.resetAt) {
        await this.set(key, { count: 1, resetAt: Date.now() + window * 1000 }, window);
        return true;
      }

      if (data.count >= limit) {
        return false;
      }

      data.count++;
      await this.set(key, data, window);
      return true;
    } catch (error) {
      console.error('Error checking rate limit:', error);
      return true;
    }
  }

  // Cache operations
  async cacheGet(key: string): Promise<any> {
    return this.get(`cache:${key}`);
  }

  async cacheSet(key: string, value: any, ttl: number): Promise<void> {
    await this.set(`cache:${key}`, value, ttl);
  }

  async cacheDel(key: string): Promise<void> {
    await this.del(`cache:${key}`);
  }

  // Session management
  async sessionGet(sessionId: string): Promise<any> {
    return this.get(`session:${sessionId}`);
  }

  async sessionSet(sessionId: string, data: any, ttl: number = 3600): Promise<void> {
    await this.set(`session:${sessionId}`, data, ttl);
  }

  async sessionDel(sessionId: string): Promise<void> {
    await this.del(`session:${sessionId}`);
  }

  // Analytics
  async increment(metric: string, value: number = 1): Promise<void> {
    try {
      const key = `metric:${metric}`;
      const current = await this.get(key) || 0;
      await this.set(key, current + value);
    } catch (error) {
      console.error('Error incrementing metric:', error);
    }
  }

  async getMetric(metric: string): Promise<number> {
    try {
      return await this.get(`metric:${metric}`) || 0;
    } catch (error) {
      console.error('Error getting metric:', error);
      return 0;
    }
  }

  async resetMetric(metric: string): Promise<void> {
    await this.del(`metric:${metric}`);
  }
}

export const redisService = new RedisService();