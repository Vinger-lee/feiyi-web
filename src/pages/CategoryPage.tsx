import type { HeritageItem, HeritageCategory } from '../types';
import { HERITAGE_CATEGORIES } from '../types';
import { getHeritageByCategory } from '../data/heritageData';
import { getHeritageImage } from '../utils/heritage';

interface CategoryPageProps {
  selectedCategory: HeritageCategory | null;
  setSelectedCategory: (cat: HeritageCategory | null) => void;
  setSelectedItem: (item: HeritageItem | null) => void;
}

export default function CategoryPage({
  selectedCategory,
  setSelectedCategory,
  setSelectedItem,
}: CategoryPageProps) {
  const categoryEntries = Object.entries(HERITAGE_CATEGORIES) as [
    HeritageCategory,
    (typeof HERITAGE_CATEGORIES)[HeritageCategory],
  ][];

  const displayItems = selectedCategory
    ? getHeritageByCategory(selectedCategory)
    : [];

  return (
    <div className="page-shell animate-fade-in">
      <div className="page-heading">
        <div>
          <span>Categories</span>
          <h2>分类浏览</h2>
          <p>
            从技艺、民俗、美术等维度进入非遗档案，保留移动端横向筛选效率。
          </p>
        </div>
      </div>

      <div className="filter-strip">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`filter-pill ${!selectedCategory ? 'is-active' : ''}`}
        >
          全部
        </button>
        {categoryEntries.map(([key, cat]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`filter-pill ${
              selectedCategory === key ? 'is-active' : ''
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {displayItems.map((item) => (
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
              <h3 className="font-calligraphy text-lg text-ink-800">
                {item.name}
              </h3>
              <p className="text-sm text-ink-500 mt-1">{item.region}</p>
            </div>
          </div>
        ))}
      </div>

      {displayItems.length === 0 && !selectedCategory && (
        <div className="empty-state">
          <p>请选择一个分类开始浏览</p>
        </div>
      )}

      {displayItems.length === 0 && selectedCategory && (
        <div className="empty-state">
          <p>该分类暂无项目</p>
        </div>
      )}
    </div>
  );
}
