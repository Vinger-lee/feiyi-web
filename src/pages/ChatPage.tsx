import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import type { ChatMessage } from '../services/cozeStream';
import { sendCozeMessage, generateSessionId } from '../services/cozeStream';

const chattingTips = [
  '承德有哪些国家级非遗？',
  '二贵摔跤是什么？',
  '热河皮影戏有什么特点',
  '丰宁剪纸的历史',
  '承德传统美食非遗',
  '避暑山庄的传说',
];

function useAutoResize() {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const resize = () => {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 160) + 'px';
    };
    el.addEventListener('input', resize);
    return () => el.removeEventListener('input', resize);
  }, []);
  return ref;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-vermilion-400" style={{ animationDelay: '0ms' }} />
      <span className="h-2 w-2 animate-bounce rounded-full bg-vermilion-400" style={{ animationDelay: '150ms' }} />
      <span className="h-2 w-2 animate-bounce rounded-full bg-vermilion-400" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.2, 0.75, 0.22, 1] }}
    >
      {!isUser && (
        <div className="mr-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-vermilion-500 to-gold-500 shadow-md shadow-vermilion-200">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? 'rounded-br-md bg-gradient-to-r from-vermilion-500 to-gold-500 text-white shadow-vermilion-200'
            : 'rounded-bl-md border border-paper-300/80 bg-white/90 text-ink-700'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none text-ink-700">
            <ReactMarkdown
              components={{
                img: ({ node, ...props }) => (
                  <img {...props} className="max-w-full rounded-lg" alt={props.alt || ''} />
                ),
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" className="text-vermilion-600 hover:text-vermilion-700 underline" />
                ),
                code: ({ node, className, children, ...props }) => {
                  const isInline = !className?.includes('language-');
                  return isInline ? (
                    <code {...props} className="rounded bg-ink-100 px-1.5 py-0.5 text-ink-700 font-mono text-xs">
                      {children}
                    </code>
                  ) : (
                    <code {...props} className={`block rounded-lg bg-ink-100 p-3 text-ink-700 font-mono text-xs overflow-x-auto ${className || ''}`}>
                      {children}
                    </code>
                  );
                },
                pre: ({ node, ...props }) => (
                  <pre {...props} className="rounded-lg bg-ink-100 p-3 overflow-x-auto my-2" />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
        <span className={`mt-1 block text-right text-[10px] opacity-50 ${isUser ? 'text-white/70' : 'text-ink-400'}`}>
          {new Date(message.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {isUser && (
        <div className="ml-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ink-100 shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-500">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}

const welcomeMessages: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: '你好！我是热河守艺人智能体 🤗\n\n我可以回答关于承德非遗的各种问题，比如传统技艺、民间故事、历史渊源等。有什么想了解的吗？',
    timestamp: Date.now(),
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(welcomeMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState(() => generateSessionId());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useAutoResize();
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    // 如果有正在进行的请求，先取消它
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 创建新的 AbortController
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setInput('');
    setError(null);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const assistantMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setIsLoading(true);

    // 获取消息历史（排除欢迎消息和当前正在添加的消息）
    const messageHistory = messages.filter(
      (msg) => msg.id !== 'welcome'
    );

    await sendCozeMessage(
      text,
      (chunk) => {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === 'assistant') {
            updated[updated.length - 1] = { ...last, content: last.content + chunk };
          }
          return updated;
        });
      },
      (err) => {
        setError(err);
        setIsLoading(false);
        abortControllerRef.current = null;
      },
      () => {
        setIsLoading(false);
        abortControllerRef.current = null;
      },
      {
        sessionId,
        additionalMessages: messageHistory,
        signal: abortController.signal,
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      className="flex h-full flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* 头部 */}
      <div className="relative border-b border-paper-200/80 bg-white/75 px-6 py-4 shadow-sm backdrop-blur-xl">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-vermilion-500/5" />
          <div className="absolute -bottom-8 -left-4 w-32 h-32 rounded-full bg-gold-500/5" />
        </div>
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-vermilion-500 to-gold-500 shadow-lg shadow-vermilion-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="font-calligraphy text-xl text-ink-800">智能对话</h2>
            <p className="text-xs text-ink-400">热河守艺人 · AI 非遗助手</p>
          </div>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto max-w-3xl">
          <AnimatePresence>
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              className="mb-4 flex items-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="mr-3 mt-1 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-vermilion-500 to-gold-500">
                <TypingDots />
              </div>
              <div className="rounded-2xl rounded-bl-md border border-paper-300/80 bg-white/90 px-4 py-3 shadow-sm">
                <TypingDots />
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ❌ {error}
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 快捷提示 */}
      {messages.length <= 1 && (
        <motion.div
          className="mx-4 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-2">
            {chattingTips.map((tip) => (
              <button
                key={tip}
                onClick={() => {
                  setInput(tip);
                  setTimeout(() => textareaRef.current?.focus(), 100);
                }}
                className="cursor-pointer rounded-full border border-paper-300 bg-white/60 px-3 py-1.5 text-xs text-ink-500 transition-all duration-200 hover:border-vermilion-200 hover:bg-vermilion-50 hover:text-vermilion-600 hover:-translate-y-0.5"
              >
                💡 {tip}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* 输入栏 */}
      <div className="border-t border-paper-200/80 bg-white/60 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-end gap-3">
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入你想了解的承德非遗..."
              rows={1}
              disabled={isLoading}
              className="w-full resize-none rounded-2xl border border-paper-300/90 bg-white/80 px-4 py-3 pr-12 text-sm text-ink-700 placeholder:text-ink-400 shadow-sm outline-none transition-all duration-200 focus:border-vermilion-300 focus:bg-white/95 focus:ring-4 focus:ring-vermilion-100 disabled:opacity-50"
            />
          </div>

          <motion.button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-vermilion-500 to-gold-500 text-white shadow-lg shadow-vermilion-200 transition-all duration-200 hover:shadow-xl disabled:opacity-40 disabled:shadow-none"
          >
            {isLoading ? (
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
