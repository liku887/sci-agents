'use client'
import Link from 'next/link'

const docs = [
  { id: 'part1', name: '研究选题' },
  { id: 'part2', name: '文献综述' },
  { id: 'part3', name: '研究设计' },
  { id: 'part4', name: '学术写作' },
  { id: 'part5', name: '数据分析' },
  { id: 'readme', name: '更新日志' },
]

export default function DocsIndex() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* 新增返回按钮 + 标题的 Flex 容器 */}
      <div className="flex items-center justify-center mb-8">
        <Link
          href="/"
          className="absolute left-8 sm:left-12 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← 返回主界面
        </Link>
        <h1 className="text-3xl font-bold text-center">📘 文档中心</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {docs.map(doc => (
          <Link
            key={doc.id}
            href={`/doc/${doc.id}`}
            className="w-full sm:w-64 p-5 border rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-center"
          >
            <div className="text-lg font-semibold">{doc.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
