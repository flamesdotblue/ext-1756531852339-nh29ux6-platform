import React from 'react';

function ArticleCard({ article }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200/70 bg-white hover:shadow-md transition dark:border-neutral-800/70 dark:bg-neutral-900">
      <div className="relative">
        <img src={article.image} alt={article.title} className="h-44 w-full object-cover" loading="lazy" />
        <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-neutral-900/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur dark:bg-white/10">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold leading-snug mb-1 line-clamp-2 group-hover:underline">{article.title}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-3">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span className="font-medium text-neutral-800 dark:text-neutral-200">{article.author}</span>
          <time dateTime={article.date}>{new Date(article.date).toLocaleDateString()}</time>
        </div>
      </div>
    </article>
  );
}

export default function NewsGrid({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-200 p-10 text-center text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        No articles match your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((a) => (
        <ArticleCard key={a.id} article={a} />
      ))}
    </div>
  );
}
