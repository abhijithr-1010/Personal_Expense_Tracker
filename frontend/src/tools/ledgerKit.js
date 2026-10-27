import { INK } from '../theme';

export const CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Other'];

export const CATEGORY_COLORS = {
  Food: '#FFD166',
  Travel: '#2EC4B6',
  Bills: '#B8A1FF',
  Shopping: '#FF8FA3',
  Other: '#E4E4EE',
};

export const SORT_CHOICES = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'high', label: 'Amount: high to low' },
  { value: 'low', label: 'Amount: low to high' },
  { value: 'az', label: 'Title: A to Z' },
];

const rupee = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const money = (n) => rupee.format(Number(n) || 0);

// "2026-10-27T00:00:00.000Z" -> "2026-10-27" (what a date input needs)
export const dayOnly = (value) => (value ? String(value).slice(0, 10) : '');

export const todayLocal = () => new Date().toLocaleDateString('en-CA');

// "2026-10-27" -> "27 Oct 2026" without timezone shift
export function niceDay(value) {
  const day = dayOnly(value);
  if (!day) return '';
  const [y, m, d] = day.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function sortSpends(list, how) {
  const rows = [...list];
  const byDay = (a, b) => dayOnly(a.date).localeCompare(dayOnly(b.date));
  switch (how) {
    case 'oldest':
      return rows.sort(byDay);
    case 'high':
      return rows.sort((a, b) => b.amount - a.amount);
    case 'low':
      return rows.sort((a, b) => a.amount - b.amount);
    case 'az':
      return rows.sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
    default:
      return rows.sort((a, b) => byDay(b, a));
  }
}

export const sumSpends = (list) =>
  Math.round(list.reduce((s, x) => s + (Number(x.amount) || 0), 0) * 100) / 100;

export function topCategory(list) {
  const totals = {};
  list.forEach((x) => {
    totals[x.category] = (totals[x.category] || 0) + (Number(x.amount) || 0);
  });
  const names = Object.keys(totals);
  if (!names.length) return null;
  return names.reduce((best, n) => (totals[n] > totals[best] ? n : best), names[0]);
}

export const chipSx = (category) => ({
  backgroundColor: CATEGORY_COLORS[category] || CATEGORY_COLORS.Other,
  color: INK,
});
