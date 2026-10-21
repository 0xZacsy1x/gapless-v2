'use client';

import ReactMarkdown from 'react-markdown';

export function FeedbackMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-2 leading-relaxed text-slate-700 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
        em: ({ children }) => <em className="italic text-slate-800">{children}</em>,
        ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 mb-2 text-slate-700">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 mb-2 text-slate-700">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
      }}
    >
      {content || ''}
    </ReactMarkdown>
  );
}
