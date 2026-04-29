// 本地存储服务
import type { HeritageItem, ChatSession, Message } from '../types';

const STORAGE_KEYS = {
  FAVORITES: 'feiyi_favorites',
  CHAT_HISTORY: 'feiyi_chat_history',
  SETTINGS: 'feiyi_settings',
};

type StoredMessage = Omit<Message, 'timestamp'> & {
  timestamp: string | Date;
};

type StoredChatSession = Omit<ChatSession, 'createdAt' | 'updatedAt' | 'messages'> & {
  createdAt: string | Date;
  updatedAt: string | Date;
  messages: StoredMessage[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isStoredMessage(value: unknown): value is StoredMessage {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === 'string' &&
    (value.role === 'user' || value.role === 'assistant') &&
    typeof value.content === 'string' &&
    (typeof value.timestamp === 'string' || value.timestamp instanceof Date)
  );
}

function isStoredChatSession(value: unknown): value is StoredChatSession {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    (typeof value.createdAt === 'string' || value.createdAt instanceof Date) &&
    (typeof value.updatedAt === 'string' || value.updatedAt instanceof Date) &&
    Array.isArray(value.messages) &&
    value.messages.every(isStoredMessage)
  );
}

class StorageService {
  // 收藏功能
  getFavorites(): HeritageItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addFavorite(item: HeritageItem): void {
    const favorites = this.getFavorites();
    if (!favorites.find(f => f.id === item.id)) {
      favorites.push({ ...item, isFavorite: true });
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }
  }

  removeFavorite(itemId: string): void {
    const favorites = this.getFavorites().filter(f => f.id !== itemId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }

  isFavorite(itemId: string): boolean {
    return this.getFavorites().some(f => f.id === itemId);
  }

  toggleFavorite(item: HeritageItem): boolean {
    if (this.isFavorite(item.id)) {
      this.removeFavorite(item.id);
      return false;
    } else {
      this.addFavorite(item);
      return true;
    }
  }

  // 聊天历史
  getChatSessions(): ChatSession[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      if (!data) return [];
      const sessions: unknown = JSON.parse(data);
      if (!Array.isArray(sessions)) return [];

      return sessions.filter(isStoredChatSession).map((s) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt),
        messages: s.messages.map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })),
      }));
    } catch {
      return [];
    }
  }

  saveChatSession(session: ChatSession): void {
    const sessions = this.getChatSessions();
    const index = sessions.findIndex(s => s.id === session.id);
    
    if (index >= 0) {
      sessions[index] = { ...session, updatedAt: new Date() };
    } else {
      sessions.unshift(session);
    }

    // 只保留最近50个会话
    const trimmedSessions = sessions.slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(trimmedSessions));
  }

  deleteChatSession(sessionId: string): void {
    const sessions = this.getChatSessions().filter(s => s.id !== sessionId);
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(sessions));
  }

  clearAllHistory(): void {
    localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
  }

  // 设置
  getSettings(): Record<string, unknown> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) return {};
      const settings: unknown = JSON.parse(data);
      return isRecord(settings) ? settings : {};
    } catch {
      return {};
    }
  }

  saveSetting(key: string, value: unknown): void {
    const settings = this.getSettings();
    settings[key] = value;
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }
}

export const storageService = new StorageService();

// 生成唯一ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
