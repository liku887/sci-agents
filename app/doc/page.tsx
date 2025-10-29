// app/doc/page.tsx
import React from 'react';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

export default function DocsPage() {
  // 读取本地 Markdown 文件
  const markdownPath = path.join(process.cwd(), 'app/doc/readme.md');
  const markdown = fs.readFileSync(markdownPath, 'utf-8');

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
