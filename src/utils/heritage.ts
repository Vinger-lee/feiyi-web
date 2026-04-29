import type { HeritageItem } from '../types';

export const DEFAULT_HERITAGE_IMAGE =
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80';

export const HERITAGE_LEVEL_LABELS: Record<
  NonNullable<HeritageItem['level']>,
  string
> = {
  national: '国家级',
  provincial: '省级',
  municipal: '市级',
};

export const getHeritageImage = (item: HeritageItem): string =>
  item.imageUrl || item.images?.[0] || DEFAULT_HERITAGE_IMAGE;

export const getHeritageLevelLabel = (item: HeritageItem): string =>
  item.level ? HERITAGE_LEVEL_LABELS[item.level] : '非遗项目';
