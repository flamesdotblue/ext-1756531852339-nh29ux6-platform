import React from 'react';
import { Menu, Search, Bell, Sun, Moon } from 'lucide-react';

export default function Header({ categories, activeCategory, onCategoryChange, query, onQueryChange, dark, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800/70 dark:bg-neutral-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            <a href="#" className="font-extrabold tracking-tight text-xl">
              <span className="text-blue-600">Pulse</span> Daily
            </a>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search articles, topics, authors"
                className="w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm outline-none ring-0 focus:border-blue-500 dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 pb-3">
          <div className="flex-1 overflow-x-auto no-scrollbar">
            <nav className="flex items-center gap-2 text-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={
                    'whitespace-nowrap rounded-full border px-3 py-1.5 transition ' +
                    (activeCategory === cat
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800')
                  }
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          <div className="md:hidden flex items-center min-w-[160px]">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search"
                className="w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm outline-none ring-0 focus:border-blue-500 dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
