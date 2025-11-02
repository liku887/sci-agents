import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

interface Params {
  params: { slug: string }
}

export default function DocPage({ params }: Params) {
  const filePath = path.join(process.cwd(), 'app/doc', `${params.slug}.md`)

  if (!fs.existsSync(filePath)) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4 text-red-500">❌ 文档不存在。</p>
        <Link href="/doc" className="text-blue-600 underline">
          返回文档首页
        </Link>
      </div>
    )
  }

  const markdown = fs.readFileSync(filePath, 'utf-8')

  return (
    <div className="p-6 max-w-3xl mx-auto prose prose-slate">
      <Link href="/doc" className="text-blue-600 no-underline hover:underline">
        ← 返回文档首页
      </Link>
      <ReactMarkdown className="mt-6">{markdown}</ReactMarkdown>
    </div>
  )
}
