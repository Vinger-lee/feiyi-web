import { Icons } from '../components/Icons';

interface HistoryPageProps {
  setActiveTab: (tab: 'home' | 'chat' | 'encyclopedia' | 'category' | 'favorites' | 'history') => void;
}

export default function HistoryPage({ setActiveTab }: HistoryPageProps) {
  return (
    <div className="page-shell animate-fade-in">
      <div className="page-heading">
        <div>
          <span>Conversation</span>
          <h2>聊天历史</h2>
          <p>智能体侧边栏负责管理对话记录，本页作为统一入口。</p>
        </div>
      </div>

      <div className="empty-state">
        <div className="text-5xl mb-4 flex justify-center">
          <Icons.Clock />
        </div>
        <p className="font-medium text-ink-500">聊天记录由智能体管理</p>
        <p className="text-sm mt-2">
          对话记录在智能体侧边栏中查看和管理
        </p>
        <button
          onClick={() => setActiveTab('chat')}
          className="mt-4 text-vermilion-600 hover:text-vermilion-700 text-sm font-medium"
        >
          去对话 →
        </button>
      </div>
    </div>
  );
}
