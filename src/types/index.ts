// 非遗智能体网站 - 类型定义

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface HeritageItem {
  id: string;
  name: string;
  category: HeritageCategory;
  region: string;
  level?: HeritageLevel;
  inheritor?: string;
  description: string;
  imageUrl?: string;
  images?: string[];
  videoUrl?: string;
  audioUrl?: string;
  details?: string;
  history?: string;
  techniques: string[];
  masters?: string[];
  tags?: string[];
  featured?: boolean;
  isFavorite?: boolean;
}

export type HeritageLevel =
  | 'national'
  | 'provincial'
  | 'municipal';

export type HeritageCategory = 
  | 'craft'        // 传统技艺
  | 'art'          // 传统美术
  | 'performance'  // 传统戏剧
  | 'music'        // 传统音乐
  | 'dance'        // 传统舞蹈
  | 'literature'   // 民间文学
  | 'medicine'     // 传统医药
  | 'folk'         // 民俗
  | 'sport';       // 传统体育

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// AI 对话 API 类型
export interface AIChatRequest {
  bot_id: string;
  user_id: string;
  stream: boolean;
  auto_save_history: boolean;
  additional_messages?: AIAdditionalMessage[];
}

export interface AIChatResponse {
  code: number;
  msg: string;
  data: {
    conversation_id: string;
    id: string;
    created_at: number;
  };
}

export interface AIAdditionalMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  content_type?: string;
  [key: string]: unknown;
}

// 分类信息
export const HERITAGE_CATEGORIES: Record<HeritageCategory, { name: string; icon: string; description: string }> = {
  craft: { name: '传统技艺', icon: '🪔', description: '承德剪纸、澄泥砚、木版年画等传统工艺' },
  art: { name: '传统美术', icon: '🖌️', description: '满族书法、绘画、皮影雕刻等' },
  performance: { name: '传统戏剧', icon: '🎭', description: '热河皮影戏等地方戏曲艺术' },
  music: { name: '传统音乐', icon: '🎵', description: '热河二人台、满族八角鼓等民族音乐' },
  dance: { name: '传统舞蹈', icon: '💃', description: '满族秧歌、蒙古族安代舞等民间舞蹈' },
  literature: { name: '民间文学', icon: '📖', description: '避暑山庄传说、满族民间故事等' },
  medicine: { name: '传统医药', icon: '🌿', description: '热河蒙古族传统医药等' },
  folk: { name: '民俗', icon: '🏮', description: '满族颁金节、围场蟠桃盛会等热河民俗' },
  sport: { name: '传统体育', icon: '🥋', description: '满族骑射、摔跤等传统运动' },
};
