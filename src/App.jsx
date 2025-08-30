import React, { useMemo, useState, useEffect } from 'react';
import Header from './components/Header';
import FeaturedHero from './components/FeaturedHero';
import NewsGrid from './components/NewsGrid';
import Sidebar from './components/Sidebar';

const initialArticles = [
  {
    id: '1',
    title: 'Global Markets Rally as Tech Stocks Surge to New Highs',
    category: 'Business',
    author: 'Alex Morgan',
    date: '2025-08-29T08:30:00Z',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop',
    excerpt:
      'Investors welcomed strong quarterly earnings from top tech firms, pushing major indices sharply higher amid optimism around AI-driven growth.',
    views: 42500,
  },
  {
    id: '2',
    title: 'Breakthrough in Clean Energy as New Fusion Test Yields Record Output',
    category: 'Science',
    author: 'Priya Desai',
    date: '2025-08-30T06:10:00Z',
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
    excerpt:
      'Researchers report a major milestone in fusion energy, achieving a sustained reaction with improved efficiency, edging closer to practical applications.',
    views: 67200,
  },
  {
    id: '3',
    title: 'Underdogs Triumph in Stunning Cup Final Upset',
    category: 'Sports',
    author: 'Jamie Lee',
    date: '2025-08-28T19:20:00Z',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600&auto=format&fit=crop',
    excerpt:
      'In a thrilling match decided in extra time, the underdogs clinched victory, capping a fairytale run that stunned fans and pundits alike.',
    views: 38500,
  },
  {
    id: '4',
    title: 'City Unveils Ambitious Plan to Expand Green Spaces and Transit',
    category: 'World',
    author: 'María González',
    date: '2025-08-27T11:05:00Z',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1600&auto=format&fit=crop',
    excerpt:
      'The plan aims to reduce congestion and improve quality of life by adding parks, bike lanes, and rapid transit links across neighborhoods.',
    views: 21200,
  },
  {
    id: '5',
    title: 'Indie Drama Wins Top Prize at International Film Festival',
    category: 'Culture',
    author: 'Noah Kim',
    date: '2025-08-26T15:42:00Z',
    image: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1600&auto=format&fit=crop',
    excerpt:
      'The film captivated audiences with its intimate storytelling and standout performances, signaling a strong awards season ahead.',
    views: 16750,
  },
  {
    id: '6',
    title: 'Startups Embrace Open-Source AI to Accelerate Product Development',
    category: 'Tech',
    author: 'Riley Chen',
    date: '2025-08-30T09:55:00Z',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
    excerpt:
      'Founders say community-driven models help them iterate faster while keeping costs down, as competition intensifies across sectors.',
    views: 49800,
  },
  {
    id: '7',
    title: 'Severe Weather Prompts Evacuations Along the Coast',
    category: 'World',
    author: 'Ava Patel',
    date: '2025-08-30T04:15:00Z',
    image: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1600&auto=format&fit=crop',
    excerpt:
      'Authorities issued urgent warnings as storms intensified overnight, with residents urged to seek higher ground and prepare for power outages.',
    views: 30100,
  },
  {
    id: '8',
    title: 'Exploring the Next Generation of Wearables and Health Tech',
    category: 'Health',
    author: 'Sofia Romano',
    date: '2025-08-25T12:05:00Z',
    image: 'https://images.unsplash.com/photo-1581594693703-5c00e1b3a9f0?q=80&w=1600&auto=format&fit=crop',
    excerpt:
      'From continuous glucose monitoring to AI-powered sleep insights, new devices aim to personalize wellness like never before.',
    views: 13900,
  },
];

const categories = ['Top', 'World', 'Business', 'Tech', 'Science', 'Health', 'Sports', 'Culture'];

export default function App() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Top');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      const isDark = stored === 'dark';
      setDark(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = initialArticles;
    if (activeCategory !== 'Top') {
      list = list.filter((a) => a.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, query]);

  const featured = filtered[0] || initialArticles[0];
  const others = filtered.slice(1);
  const trending = [...initialArticles].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Header
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        query={query}
        onQueryChange={setQuery}
        dark={dark}
        onToggleTheme={toggleTheme}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6">
          <section className="lg:col-span-8 space-y-8">
            <FeaturedHero article={featured} />
            <NewsGrid articles={others} />
          </section>
          <aside className="lg:col-span-4">
            <Sidebar trending={trending} categories={categories} allArticles={initialArticles} />
          </aside>
        </div>
      </main>

      <footer className="border-t border-neutral-200/70 dark:border-neutral-800/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-neutral-600 dark:text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Pulse Daily. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100">Privacy</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100">Terms</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100">About</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
