import type { HeritageItem } from '../types';
import { HERITAGE_CATEGORIES } from '../types';
import { Icons } from '../components/Icons';
import { getHeritageImage, getHeritageLevelLabel } from '../utils/heritage';

interface DetailPageProps {
  selectedItem: HeritageItem | null;
  favorites: HeritageItem[];
  onClose: () => void;
  onToggleFavorite: (item: HeritageItem) => boolean;
}

export default function DetailPage({
  selectedItem,
  favorites,
  onClose,
  onToggleFavorite,
}: DetailPageProps) {
  if (!selectedItem) return null;

  const detailText = selectedItem.details || selectedItem.description;
  const historyText =
    selectedItem.history ||
    '该项目的历史资料正在持续整理中，后续将补充更多传承脉络与口述史内容。';
  const masters = selectedItem.masters?.length
    ? selectedItem.masters
    : selectedItem.inheritor
      ? [selectedItem.inheritor]
      : [];

  return (
    <div className="detail-backdrop fixed inset-0 z-[100] overflow-y-auto animate-fade-in">
      {/* 头部 */}
      <div className="sticky top-0 z-20 flex items-center gap-4 border-b border-paper-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl">
        <button
          onClick={onClose}
          className="p-3 hover:bg-paper-100 rounded-lg transition-colors active:bg-paper-200"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <Icons.ChevronLeft />
        </button>
        <h2 className="font-calligraphy text-xl text-ink-800 truncate">
          {selectedItem.name}
        </h2>
        <button
          onClick={() => onToggleFavorite(selectedItem)}
          className={`p-2 rounded-full ml-auto ${
            favorites.some((f) => f.id === selectedItem.id)
              ? 'text-vermilion-500 bg-vermilion-50'
              : 'text-ink-400 hover:text-vermilion-500 hover:bg-vermilion-50'
          } transition-colors`}
        >
          <Icons.Heart
            filled={favorites.some((f) => f.id === selectedItem.id)}
          />
        </button>
      </div>

      {/* 内容 */}
      <div className="detail-content mx-auto p-4 md:p-8">
        {/* 图片 */}
        <div className="detail-hero-image mb-6 aspect-video overflow-hidden rounded-[2rem] border border-paper-300 bg-paper-100 shadow-ink">
          <img
            src={getHeritageImage(selectedItem)}
            alt={selectedItem.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 基本信息 */}
        <div className="detail-intro card-chinese p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="heritage-badge">
              {HERITAGE_CATEGORIES[selectedItem.category].name}
            </span>
            <span className="gold-badge">
              {getHeritageLevelLabel(selectedItem)}
            </span>
            <span className="text-sm text-ink-500">
              📍 {selectedItem.region}
            </span>
          </div>
          <h1 className="font-calligraphy text-3xl text-ink-900 md:text-5xl mb-4">
            {selectedItem.name}
          </h1>
          <p className="text-ink-600 leading-relaxed">
            {selectedItem.description}
          </p>
          {selectedItem.tags && selectedItem.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {selectedItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-paper-200 text-ink-600 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 详细介绍 */}
        <div className="card-chinese p-6 mb-6">
          <h3 className="font-calligraphy text-xl text-ink-800 mb-4">
            详细介绍
          </h3>
          <p className="text-ink-600 leading-relaxed">{detailText}</p>
        </div>

        {/* 历史渊源 */}
        <div className="card-chinese p-6 mb-6">
          <h3 className="font-calligraphy text-xl text-ink-800 mb-4">
            历史渊源
          </h3>
          <p className="text-ink-600 leading-relaxed">{historyText}</p>
        </div>

        {/* 技艺/习俗 */}
        {selectedItem.techniques.length > 0 && (
          <div className="card-chinese p-6 mb-6">
            <h3 className="font-calligraphy text-xl text-ink-800 mb-4">
              {selectedItem.category === 'folk' ? '主要习俗' : '核心技艺'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedItem.techniques.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-paper-200 text-ink-700 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 代表人物 */}
        {masters.length > 0 && (
          <div className="card-chinese p-6">
            <h3 className="font-calligraphy text-xl text-ink-800 mb-4">
              代表性传承人
            </h3>
            <div className="flex flex-wrap gap-2">
              {masters.map((master, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-jade-100 text-jade-700 rounded-full text-sm"
                >
                  {master}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
