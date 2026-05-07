import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { cn } from '@/src/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * 專業 Markdown 渲染組件
 * 支援 Gfm (表格、清單)、數學公式 (LaTeX) 以及程式碼塊
 */
export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("markdown-body prose prose-slate max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:bg-slate-800", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // 處理程式碼塊
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline ? (
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto border border-white/5 font-mono text-sm shadow-inner group relative">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-sm text-primary font-mono" {...props}>
                {children}
              </code>
            );
          },
          // 處理數學公式樣式
          span({ className, children, ...props }: any) {
            if (className?.includes('katex')) {
              return <span className={cn("inline-block my-1", className)} {...props}>{children}</span>;
            }
            return <span className={className} {...props}>{children}</span>;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
