import type { HeritageItem } from '../types';
import { HERITAGE_CATEGORIES } from '../types';
import { Icons } from '../components/Icons';
import { getHeritageImage } from '../utils/heritage';
import { storageService } from '../services/storage';

interface FavoritesPageProps {
  favorites: HeritageItem[];
  setFavorites: (items: HeritageItem[]) => void;
  setSelectedItem: (item: HeritageItem | null) => void;
}

export default function FavoritesPage({
  favorites,
  setFavorites,
  setSelectedItem,
}: FavoritesPageProps) {
  const toggleFavorite = (item: HeritageItem) => {
    storageService.toggleFavorite(item);
    setFavorites(storageService.getFavorites());
  };

  if (favorites.length === 0) {
    return (
      <div className="page-shell animate-fade-in">
        <div className="page-heading">
          <div>
            <span>Favorites</span>
            <h2>我的收藏</h2>
            <p>
              把常看的项目收进个人展柜，便于课堂讲解或资料整理。
            </p>
          </div>
        </div>
        <div className="empty-state">
          <div className="text-5xl mb-4">❤️</div>
          <p>还没有收藏任何项目</p>
          <p className="text-sm mt-2">浏览非遗百科时点击心形图标即可收藏</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell animate-fade-in">
      <div className="page-heading">
        <div>
          <span>Favorites</span>
          <h2>我的收藏</h2>
          <p>把常看的项目收进个人展柜，便于课堂讲解或资料整理。</p>
        </div>
      </div>

      <div className="gallery-grid">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="heritage-card cursor-pointer group"
            onClick={() => setSelectedItem(item)}
          >
            <div className="aspect-[16/10] overflow-hidden bg-paper-100">
              <img
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
                  className="p-1 text-vermilion-500 rounded-full hover:bg-vermilion-50"
                >
                  <Icons.Heart filled />
                </button>
              </div>
              <h3 className="font-calligraphy text-lg text-ink-800">
                {item.name}
              </h3>
              <p className="text-sm text-ink-500 mt-1">{item.region}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
