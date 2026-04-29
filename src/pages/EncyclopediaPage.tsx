import { useMemo } from 'react';
import type { HeritageItem } from '../types';
import { HERITAGE_CATEGORIES } from '../types';
import { heritageData, searchHeritage } from '../data/heritageData';
import { Icons } from '../components/Icons';
import { getHeritageImage } from '../utils/heritage';
import { storageService } from '../services/storage';
import LazyImage from '../components/LazyImage';
import TiltCard from '../components/TiltCard';

interface EncyclopediaPageProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setSelectedItem: (item: HeritageItem | null) => void;
  favorites: HeritageItem[];
  setFavorites: (items: HeritageItem[]) => void;
}

export default function EncyclopediaPage({
  searchQuery,
  setSearchQuery,
  setSelectedItem,
  favorites,
  setFavorites,
}: EncyclopediaPageProps) {
  const searchResults = useMemo(() => {
    const query = searchQuery.trim();
    return query ? searchHeritage(query) : [];
  }, [searchQuery]);

  const displayItems = searchQuery ? searchResults : heritageData;

  const toggleFavorite = (item: HeritageItem) => {
    const isFav = storageService.toggleFavorite(item);
    setFavorites(storageService.getFavorites());
    return isFav;
  };

  return (
    <div className="page-shell animate-fade-in">
      <div className="page-heading">
        <div>
          <span>Archive</span>
          <h2>热河守艺人 · 非遗百科</h2>
          <p>
            以展陈卡片的方式浏览承德非遗项目，图片、地域、分类和摘要同步呈现。
          </p>
        </div>

        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="搜索非遗项目..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-chinese pl-12"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">
            <Icons.Search />
          </div>
        </div>
      </div>

      <div className="gallery-grid">
        {displayItems.map((item) => (
          <TiltCard
            key={item.id}
            className="heritage-card cursor-pointer group"
          >
            <div onClick={() => setSelectedItem(item)}>
              <div className="aspect-[16/10] overflow-hidden bg-paper-100">
                <LazyImage
                  src={getHeritageImage(item)}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="heritage-badge">
                    {HERITAGE_CATEGORIES[item.category].name}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item);
                    }}
                    className={`p-1 rounded-full transition-colors ${
                      favorites.some((f) => f.id === item.id)
                        ? 'text-vermilion-500'
                        : 'text-ink-300 hover:text-vermilion-500'
                    }`}
                  >
                    <Icons.Heart
                      filled={favorites.some((f) => f.id === item.id)}
                    />
                  </button>
                </div>
                <h3 className="font-calligraphy text-lg text-ink-800">
                  {item.name}
                </h3>
                <p className="text-sm text-ink-500 mt-1">{item.region}</p>
                <p className="text-sm text-ink-600 mt-2 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {displayItems.length === 0 && (
        <div className="empty-state">
          <div className="text-5xl mb-4">🔍</div>
          <p>未找到相关非遗项目</p>
        </div>
      )}
    </div>
  );
}
