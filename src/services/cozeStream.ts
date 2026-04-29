const COZE_STREAM_URL = import.meta.env.VITE_COZE_API_URL || 'https://feiyi-coze-proxy.vinger-lee.workers.dev/';
const COZE_PROJECT_ID = import.meta.env.VITE_COZE_BOT_ID || '7623251646365122566';
const COZE_TOKEN = import.meta.env.VITE_COZE_TOKEN || '';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface CozeMessage {
  role: 'user' | 'assistant';
  content: string;
  content_type: 'text';
}

// 生成唯一的 session_id
export function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

export async function sendCozeMessage(
  prompt: string,
  onChunk: (text: string) => void,
  onError: (error: string) => void,
  onDone: () => void,
  options?: {
    sessionId?: string;
    additionalMessages?: ChatMessage[];
    signal?: AbortSignal;
  },
) {
  try {
    // 构建请求体
    const requestBody: any = {
      content: {
        query: {
          prompt: [
            {
              type: 'text',
              content: { text: prompt },
            },
          ],
        },
      },
      type: 'query',
      session_id: options?.sessionId || generateSessionId(),
      project_id: Number(COZE_PROJECT_ID),
    };

    // 添加消息历史
    if (options?.additionalMessages && options.additionalMessages.length > 0) {
      requestBody.additional_messages = options.additionalMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
        content_type: 'text',
      }));
    }

    const response = await fetch(COZE_STREAM_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: options?.signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => 'Unknown error');
      onError(`API error (${response.status}): ${text}`);
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      onError('No response stream available');
      return;
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) {
          // 空行表示一个事件结束
          continue;
        }

        // 处理 event: 行（跳过，只是为了兼容 SSE 格式）
        if (trimmedLine.startsWith('event:')) {
          continue;
        }

        // 处理 data: 行
        if (trimmedLine.startsWith('data:')) {
          const data = trimmedLine.slice(5).trim();
          if (!data || data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);

            // 跳过 message_start 事件
            if (parsed.type === 'message_start') {
              continue;
            }

            // Coze SSE format: event: message, data: {"type":"answer","content":{"answer":"文本"}}
            if (parsed.type === 'answer' && parsed.content?.answer) {
              onChunk(parsed.content.answer);
            }
          } catch (err) {
            // 如果解析失败，忽略该行
            console.warn('Failed to parse SSE data:', data, err);
          }
        }
      }
    }

    onDone();
  } catch (err) {
    // 如果是 AbortError，不报错（用户主动取消）
    if (err instanceof Error && err.name === 'AbortError') {
      return;
    }
    onError(err instanceof Error ? err.message : 'Network error');
  }
}


