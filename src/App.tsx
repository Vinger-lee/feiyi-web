import { useEffect, useMemo, useRef, useState, useCallback, lazy, Suspense, type ComponentType } from 'react';
import { Icons } from './components/Icons';
import { motion } from 'framer-motion';
import { animate, createScope, createTimeline, stagger } from 'animejs';
import { heritageData, searchHeritage, getHeritageByCategory } from './data/heritageData';
import type { HeritageItem, HeritageCategory } from './types';
import { HERITAGE_CATEGORIES } from './types';
import { storageService } from './services/storage';
import { getHeritageImage, getHeritageLevelLabel } from './utils/heritage';
import CategoryPage from './pages/CategoryPage';
import FavoritesPage from './pages/FavoritesPage';
import HistoryPage from './pages/HistoryPage';
import DetailPage from './pages/DetailPage';
import ScrollToTop from './components/ScrollToTop';
import LazyImage from './components/LazyImage';

const HeritageGlobeSection = lazy(() => import('./components/HeritageGlobe').then(m => ({ default: m.HeritageGlobeSection })));
const HeroWebglScene = lazy(() => import('./components/HeroComponents').then(m => ({ default: m.HeroWebglScene })));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const EncyclopediaPage = lazy(() => import('./pages/EncyclopediaPage'));

// 扣子编程平台配置

type Tab = 'home' | 'chat' | 'encyclopedia' | 'category' | 'favorites' | 'history';

// 简单的加载占位符组件
const HeroWebglFallback = () => <div className="hero-grid" />;
const GlobeSectionFallback = () => <div className="content-section" style={{ minHeight: '600px', background: 'linear-gradient(145deg, rgba(18, 20, 17, 0.96), rgba(21, 38, 31, 0.94) 46%, rgba(75, 26, 20, 0.88))' }} />;

function App() {
  const appRootRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedCategory, setSelectedCategory] = useState<HeritageCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<HeritageItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 收藏
  const [favorites, setFavorites] = useState<HeritageItem[]>(() => storageService.getFavorites());

  useEffect(() => {
    const titles: Record<Tab, string> = {
      home: '热河守艺人 - 承德非遗文化传承平台',
      chat: '智能对话 - 热河守艺人',
      encyclopedia: '非遗百科 - 热河守艺人',
      category: '分类浏览 - 热河守艺人',
      favorites: '我的收藏 - 热河守艺人',
      history: '聊天历史 - 热河守艺人',
    };
    document.title = titles[activeTab];
  }, [activeTab]);

  // 搜索功能
  const searchResults = useMemo(() => {
    const query = searchQuery.trim();
    return query ? searchHeritage(query) : [];
  }, [searchQuery]);

  const featuredItems = useMemo(
    () => heritageData.filter(item => item.featured),
    []
  );

  const globeItems = useMemo(() => {
    const selectedIds = new Set<string>();
    const selected: HeritageItem[] = [];
    const addItem = (item: HeritageItem) => {
      if (selectedIds.has(item.id)) return;
      selectedIds.add(item.id);
      selected.push(item);
    };

    heritageData.filter(item => item.featured).forEach(addItem);
    heritageData.filter(item => item.level === 'national').forEach(addItem);
    heritageData.filter((_, index) => index % 5 === 0).forEach(addItem);
    heritageData.forEach(addItem);

    return selected.slice(0, 12);
  }, []);

  const categoryEntries = useMemo(
    () => Object.entries(HERITAGE_CATEGORIES) as [HeritageCategory, typeof HERITAGE_CATEGORIES[HeritageCategory]][],
    []
  );

  const heroItems = featuredItems.length > 0 ? featuredItems : heritageData.slice(0, 6);
  const primaryFeature = heroItems[0] ?? heritageData[0];
  const nationalCount = heritageData.filter(item => item.level === 'national').length;
  const collectionStats = [
    { value: `${heritageData.length}`.padStart(2, '0'), label: '承德项目' },
    { value: `${nationalCount}`.padStart(2, '0'), label: '国家级' },
    { value: `${categoryEntries.length}`.padStart(2, '0'), label: '非遗门类' },
  ];

  const navigationItems: { key: Tab; icon: ComponentType<{ filled?: boolean }>; label: string; shortLabel: string }[] = [
    { key: 'home', icon: Icons.Home, label: '首页', shortLabel: '首页' },
    { key: 'chat', icon: Icons.Chat, label: '智能对话', shortLabel: '对话' },
    { key: 'encyclopedia', icon: Icons.Book, label: '非遗百科', shortLabel: '百科' },
    { key: 'category', icon: Icons.Grid, label: '分类浏览', shortLabel: '分类' },
    { key: 'favorites', icon: Icons.Heart, label: '我的收藏', shortLabel: '收藏' },
    { key: 'history', icon: Icons.Clock, label: '聊天历史', shortLabel: '历史' },
  ];

  const openRandomHeritage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * heritageData.length);
    setSelectedItem(heritageData[randomIndex]);
  }, []);

  const openCategory = useCallback((category: HeritageCategory) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setActiveTab('category');
  }, []);

  const openNationalArchive = useCallback(() => {
    setSearchQuery('国家级');
    setSelectedCategory(null);
    setActiveTab('encyclopedia');
  }, []);

  useEffect(() => {
    if (activeTab !== 'home') return;

    const scope = createScope({
      root: appRootRef,
      defaults: {
        duration: 900,
        ease: 'outExpo',
      },
    }).add(() => {
      createTimeline({
        defaults: {
          duration: 860,
          ease: 'outExpo',
        },
      })
        .add('.anime-reveal', {
          opacity: [0, 1],
          y: [28, 0],
          filter: ['blur(10px)', 'blur(0px)'],
          delay: stagger(120),
        })
        .add('.swishy-panel', {
          opacity: [0, 1],
          scale: [0.94, 1],
          rotateZ: [-2, 0],
          delay: stagger(150),
        }, '<<+=180');

      animate('.sound-bar', {
        scaleY: [0.2, 1],
        opacity: [0.35, 1],
        duration: 760,
        delay: stagger(120),
        alternate: true,
        loop: true,
        ease: 'inOutSine',
      });

      animate('.motion-orb', {
        x: ['-2.8rem', '2.8rem'],
        y: ['0.6rem', '-0.6rem'],
        rotate: '1turn',
        duration: 6200,
        delay: stagger(600),
        alternate: true,
        loop: true,
        ease: 'inOutSine',
      });

      animate('.timeline-pulse', {
        scale: [0.86, 1.18],
        opacity: [0.42, 1],
        duration: 1200,
        delay: stagger(240),
        alternate: true,
        loop: true,
        ease: 'inOutSine',
      });

      animate('.energy-fill', {
        scaleX: [0, 1],
        duration: 1400,
        delay: stagger(240),
        ease: 'outExpo',
      });
    });

    return () => scope.revert();
  }, [activeTab]);

  // 切换收藏
  const toggleFavorite = useCallback((item: HeritageItem) => {
    const isFav = storageService.toggleFavorite(item);
    setFavorites(storageService.getFavorites());
    return isFav;
  }, []);

  // 渲染首页
  const renderHome = () => (
    <div className="animate-fade-in" ref={appRootRef}>
      <section className="hero-stage">
        <Suspense fallback={<HeroWebglFallback />}>
          <HeroWebglScene />
        </Suspense>
        <div className="hero-grid" />
        <div className="hero-ribbon hero-ribbon-a" />
        <div className="hero-ribbon hero-ribbon-b" />
        <div className="hero-noise" />
        <div className="motion-orb orb-a" />
        <div className="motion-orb orb-b" />
        <div className="motion-orb orb-c" />

        <div className="hero-content">
          <motion.div
            className="hero-copy-block"
            initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.82, ease: [0.2, 0.75, 0.22, 1] }}
          >
            <span className="eyebrow-chip anime-reveal">Rehe Intangible Heritage Atlas</span>

            <div className="anime-reveal">
              <h1 className="hero-title">
                <span>热河</span>守艺人
              </h1>
              <p className="hero-copy">
                {heritageData.length} 项承德非遗被组织成一座可搜索、可对话、可收藏的数字展厅。传统纹样、图像档案与 AI 问答在同一屏中流动。
              </p>
            </div>

            <div className="hero-search anime-reveal">
              <Icons.Search />
              <input
                type="text"
                placeholder="搜索二贵摔跤、丰宁剪纸、热河皮影..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchResults.length > 0 && (
                <div className="hero-search-results">
                  {searchResults.slice(0, 8).map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item);
                        setSearchQuery('');
                      }}
                    >
                      <span>{item.name}</span>
                      <small>{item.region} · {HERITAGE_CATEGORIES[item.category].name}</small>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hero-actions anime-reveal">
              <motion.button
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('encyclopedia')}
                className="btn-primary flex items-center gap-2"
              >
                <Icons.Book /> 进入展厅
              </motion.button>
              <motion.button
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('chat')}
                className="btn-secondary flex items-center gap-2"
              >
                <Icons.Chat /> 询问智能体
              </motion.button>
              <motion.button
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={openRandomHeritage}
                className="btn-ghost flex items-center gap-2"
              >
                <Icons.Play /> 随机探索
              </motion.button>
            </div>

            <div className="hero-command-grid anime-reveal" aria-label="快速探索入口">
              <button onClick={openRandomHeritage}>
                <span>Surprise</span>
                <strong>随机打开一项</strong>
              </button>
              <button onClick={openNationalArchive}>
                <span>National</span>
                <strong>国家级项目</strong>
              </button>
              <button onClick={() => openCategory('craft')}>
                <span>Craft</span>
                <strong>传统技艺</strong>
              </button>
              <button onClick={() => openCategory('art')}>
                <span>Visual</span>
                <strong>传统美术</strong>
              </button>
              <button onClick={() => openCategory('music')}>
                <span>Sound</span>
                <strong>音乐曲艺</strong>
              </button>
              <button
                onClick={() => {
                  setSearchQuery('热河');
                  setActiveTab('encyclopedia');
                }}
              >
                <span>Rehe</span>
                <strong>热河主题</strong>
              </button>
            </div>

            <div className="swishy-dashboard anime-reveal" aria-label="动态索引状态">
              <div className="swishy-panel swishy-status">
                <span className="status-dot timeline-pulse" />
                <div>
                  <strong>Live Archive</strong>
                  <small>{heritageData.length} 项非遗图像与问答索引在线</small>
                </div>
              </div>
              <div className="swishy-panel swishy-audio">
                {Array.from({ length: 18 }, (_, index) => (
                  <span key={index} className="sound-bar" />
                ))}
              </div>
              <div className="swishy-panel swishy-timeline">
                {['图像', '知识', '对话', '收藏'].map(label => (
                  <span key={label}>
                    <i className="timeline-pulse" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-stats anime-reveal">
              {collectionStats.map(stat => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hero-showcase"
            aria-label="非遗精选展示"
            initial={{ opacity: 0, scale: 0.92, rotateX: 12 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.2, 0.75, 0.22, 1] }}
          >
            <div className="showcase-orbit" />
            <button className="showcase-main" onClick={() => setSelectedItem(primaryFeature)}>
              <LazyImage src={getHeritageImage(primaryFeature)} alt={primaryFeature.name} className="h-full w-full object-cover" />
              <span className="showcase-label">
                <small>{getHeritageLevelLabel(primaryFeature)} · {primaryFeature.region}</small>
                {primaryFeature.name}
              </span>
            </button>
            {heroItems.slice(1, 6).map((item, index) => (
              <button
                key={item.id}
                className={`showcase-satellite satellite-${index + 1}`}
                onClick={() => setSelectedItem(item)}
              >
                <LazyImage src={getHeritageImage(item)} alt={item.name} className="h-full w-full object-cover" />
                <span>{item.name}</span>
              </button>
            ))}
            <div className="showcase-energy swishy-panel" aria-hidden="true">
              {heroItems.slice(0, 4).map(item => (
                <span key={item.id}>
                  <b>{item.name}</b>
                  <i><em className="energy-fill" /></i>
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="hero-marquee" aria-hidden="true">
          <div>
            {heritageData.slice(0, 12).map(item => (
              <span key={item.id}>{item.name}</span>
            ))}
          </div>
          <div>
            {heritageData.slice(0, 12).map(item => (
              <span key={`${item.id}-copy`}>{item.name}</span>
            ))}
          </div>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <span>向下滑动</span>
          <i />
        </div>
      </section>

      <Suspense fallback={<GlobeSectionFallback />}>
        <HeritageGlobeSection
          items={globeItems}
          totalCount={heritageData.length}
          onSelect={setSelectedItem}
          onRandom={openRandomHeritage}
          onOpenArchive={() => setActiveTab('encyclopedia')}
          onOpenCategory={openCategory}
        />
      </Suspense>

      <section className="kinetic-section">
        <div className="kinetic-copy">
          <span>Immersive Archive</span>
          <h2>把热河记忆做成可浏览的现场</h2>
          <p>图像不是装饰，而是进入项目的第一层语境。卡片会随鼠标微动、流光、抬升，像一组安静但有力量的数字展柜。</p>
        </div>
        <div className="kinetic-grid">
          {heroItems.slice(0, 6).map((item, index) => (
            <motion.button
              key={item.id}
              className={`kinetic-card kinetic-card-${index + 1}`}
              onClick={() => setSelectedItem(item)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: [0.2, 0.75, 0.22, 1] }}
              whileHover={{ y: -12, rotateX: 4, rotateY: -4 }}
            >
              <LazyImage src={getHeritageImage(item)} alt={item.name} className="h-full w-full object-cover transition-transform duration-700" />
              <span>{HERITAGE_CATEGORIES[item.category].name}</span>
              <strong>{item.name}</strong>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>Heritage Spectrum</span>
          <h2 className="section-title">承德非遗光谱</h2>
          <p>按门类快速进入项目档案，适合检索、讲解和课堂展示。</p>
        </div>

        <div className="category-spectrum">
          {categoryEntries.map(([key, cat], index) => (
            <button
              key={key}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => {
                setSelectedCategory(key);
                setActiveTab('category');
              }}
              className="category-card group"
            >
              <span className="category-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="category-icon">{cat.icon}</span>
              <strong>{cat.name}</strong>
              <small>{getHeritageByCategory(key).length} 个项目</small>
            </button>
          ))}
        </div>
      </section>

      <section className="content-section showcase-section">
        <div className="section-heading">
          <span>Selected Collection</span>
          <h2 className="section-title">{heritageData.length} 项热河非遗</h2>
          <p>以展柜式墙面呈现全部项目，保留图像冲击力，也便于快速跳转详情。</p>
        </div>

        <div className="feature-wall">
          {heritageData.map((item, index) => (
            <article
              key={item.id}
              className={`feature-card ${index % 11 === 0 ? 'feature-card-large' : ''}`}
              onClick={() => setSelectedItem(item)}
            >
              <LazyImage src={getHeritageImage(item)} alt={item.name} className="h-full w-full object-cover" />
              <div className="feature-overlay">
                <div>
                  <span className="heritage-badge">{HERITAGE_CATEGORIES[item.category].name}</span>
                  <span className="gold-badge ml-2">{getHeritageLevelLabel(item)}</span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item);
                }}
                className={`favorite-float ${favorites.some(f => f.id === item.id) ? 'is-active' : ''}`}
                aria-label="收藏"
              >
                <Icons.Heart filled={favorites.some(f => f.id === item.id)} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p className="font-calligraphy text-2xl text-ink-700">热河守艺人</p>
        <p>守护热河非遗 · 传承承德匠心</p>
      </footer>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-paper-50 text-ink-800">
      <div className="desktop-floating-nav hidden lg:block">
        <div className="immersive-nav">
          <button
            onClick={() => setActiveTab('home')}
            className="nav-brand"
            aria-label="返回首页"
          >
            <span>热河</span>
            守艺人
          </button>

          <nav aria-label="主导航">
            {navigationItems.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={activeTab === key ? 'is-active' : ''}
              >
                <Icon />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <button onClick={openRandomHeritage} className="nav-random">
            <Icons.Play />
            随机探索
          </button>
        </div>
      </div>

      {/* 移动端导航 */}
      <div className="lg:hidden flex items-center justify-between border-b border-paper-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl">
        <h1 className="font-calligraphy text-xl text-ink-800">热河守艺人</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          <Icons.Menu />
        </button>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-paper-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-xl animate-slide-up">
          <div className="grid grid-cols-3 gap-2">
            {navigationItems.map(({ key, icon: Icon, shortLabel }) => (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setMobileMenuOpen(false);
                }}
                className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${
                  activeTab === key ? 'bg-vermilion-50 text-vermilion-600 shadow-sm ring-1 ring-vermilion-100' : 'text-ink-500 hover:bg-paper-100/80'
                }`}
              >
                <Icon />
                <span className="text-xs">{shortLabel}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 主内容区 */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <main className={`app-main h-full overflow-y-auto ${activeTab === 'home' ? '' : 'lg:pt-24'}`}>
          {activeTab === 'home' && renderHome()}
          {activeTab === 'chat' && (
            <Suspense fallback={<div className="flex h-full items-center justify-center text-ink-500">加载中...</div>}>
              <ChatPage />
            </Suspense>
          )}
          {activeTab === 'encyclopedia' && (
            <Suspense fallback={<div className="flex h-full items-center justify-center text-ink-500">加载中...</div>}>
              <EncyclopediaPage
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectedItem={setSelectedItem}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            </Suspense>
          )}
          {activeTab === 'category' && (
            <CategoryPage
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setSelectedItem={setSelectedItem}
            />
          )}
          {activeTab === 'favorites' && (
            <FavoritesPage
              favorites={favorites}
              setFavorites={setFavorites}
              setSelectedItem={setSelectedItem}
            />
          )}
          {activeTab === 'history' && (
            <HistoryPage setActiveTab={setActiveTab} />
          )}
        </main>
      </div>

      {/* 详情弹窗 */}
      {selectedItem && (
        <DetailPage
          selectedItem={selectedItem}
          favorites={favorites}
          onClose={() => setSelectedItem(null)}
          onToggleFavorite={toggleFavorite}
        />
      )}
      <ScrollToTop />
    </div>
  );
}

export default App;
