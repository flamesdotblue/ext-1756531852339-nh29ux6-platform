import React from 'react';

export default function FeaturedHero({ article }) {
  if (!article) return null;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
        <div className="md:col-span-3 relative">
          <img
            src={article.image}
            alt={article.title}
            className="h-64 w-full object-cover md:h-full"
            loading="eager"
          />
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow">{article.category}</span>
        </div>
        <div className="md:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold leading-tight tracking-tight mb-2 group-hover:underline">
              {article.title}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 line-clamp-4">{article.excerpt}</p>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
            <p>
              By <span className="font-medium text-neutral-800 dark:text-neutral-200">{article.author}</span>
            </p>
            <time dateTime={article.date}>{new Date(article.date).toLocaleDateString()}</time>
          </div>
        </div>
      </div>
    </article>
  );
}
