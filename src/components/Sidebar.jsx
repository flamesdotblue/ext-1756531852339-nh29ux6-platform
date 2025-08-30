import React, { useMemo } from 'react';
import { TrendingUp, Bookmark, Globe } from 'lucide-react';

export default function Sidebar({ trending, categories, allArticles }) {
  const categoryCounts = useMemo(() => {
    const map = Object.fromEntries(categories.map((c) => [c, 0]));
    allArticles.forEach((a) => {
      map[a.category] = (map[a.category] || 0) + 1;
    });
    return map;
  }, [allArticles, categories]);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-neutral-200/70 bg-white p-5 dark:border-neutral-800/70 dark:bg-neutral-900">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold">Trending</h3>
        </div>
        <ul className="space-y-4">
          {trending.map((t, i) => (
            <li key={t.id} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">{i + 1}</span>
              <div className="min-w-0">
                <a href="#" className="line-clamp-2 font-medium hover:underline">
                  {t.title}
                </a>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {t.category} • {Math.round(t.views / 1000)}k views
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-neutral-200/70 bg-white p-5 dark:border-neutral-800/70 dark:bg-neutral-900">
        <div className="mb-3 flex items-center gap-2">
          <Globe className="h-5 w-5 text-emerald-600" />
          <h3 className="font-semibold">Browse by Category</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.filter((c) => c !== 'Top').map((c) => (
            <span key={c} className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs dark:border-neutral-800 dark:bg-neutral-950">
              {c}
              <span className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                {categoryCounts[c] || 0}
              </span>
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-neutral-200/70 bg-gradient-to-br from-neutral-50 to-white p-5 dark:border-neutral-800/70 dark:from-neutral-900 dark:to-neutral-950">
        <div className="mb-2 flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-amber-600" />
          <h3 className="font-semibold">Weekly Briefing</h3>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
          Get the top stories, analysis, and weekend reads delivered to your inbox.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const email = form.email.value;
            if (email) alert(`Subscribed: ${email}`);
            form.reset();
          }}
          className="space-y-2"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-neutral-800 dark:bg-neutral-900"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-neutral-900 px-3 py-2 text-sm font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
