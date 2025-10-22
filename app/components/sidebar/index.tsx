import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PencilSquareIcon,
  TrashIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import {
  ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisSolidIcon,
  LightBulbIcon,
  MagnifyingGlassCircleIcon,
  BeakerIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid'
import Button from '@/app/components/base/button'
import type { ConversationItem } from '@/types/app'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const MAX_CONVERSATION_LENTH = 20

export interface ISidebarProps {
  copyRight: string
  currentId: string
  onCurrentIdChange: (id: string) => void
  list: ConversationItem[]
  onDeleteConversation?: (id: string) => void
  onMenuSelect?: (menuId: string) => void
}

const assistantMenus = [
  {
    id: 'assistant-topic',
    label: '研究选题',
    Icon: LightBulbIcon,
    children: [
      { id: 'topic-query', label: '检索式' },
      { id: 'topic-plan', label: '检索计划' },
      { id: 'topic-keywords', label: '关键词与观点' },
      { id: 'topic-selection', label: '研究选题' },
    ],
  },
  {
    id: 'assistant-survey',
    label: '文献综述',
    Icon: MagnifyingGlassCircleIcon,
    children: [
      { id: 'literature-review-guide', label: '文献综述指导' },
    ],
  },
  {
    id: 'assistant-design',
    label: '研究设计',
    Icon: BeakerIcon,
    children: [
      { id: 'design-hypothesis', label: '假设生成与评估' },
      { id: 'design-method', label: '引导研究设计' },
      { id: 'design-validation', label: '方案验证与优化' },
    ],
  },
  {
    id: 'assistant-writing',
    label: '学术写作',
    Icon: DocumentTextIcon,
    children: [
      { id: 'writing-structure', label: '论文结构规划' },
      { id: 'writing-quality', label: '内容质量诊断' },
      { id: 'writing-construction', label: '论文写作指导' },
      { id: 'writing-polish', label: '论文语句润色' },
      { id: 'writing-charts', label: '图表数据整合支持' },
      { id: 'writing-references', label: '参考文献格式化' },
    ],
  },
  {
    id: 'assistant-analysis',
    label: '数据分析',
    Icon: ChartBarIcon,
    children: [
      { id: 'analysis-requirements', label: '需求分析' },
      { id: 'analysis-adaptation', label: '数据适配' },
      { id: 'analysis-ideas', label: '思路拆解' },
      { id: 'analysis-methods', label: '方法匹配' },
      { id: 'analysis-risk', label: '风险预测' },
      { id: 'analysis-action', label: '行动落地' },
    ],
  },
]

const Sidebar: FC<ISidebarProps> = ({
  copyRight,
  currentId,
  onCurrentIdChange,
  list,
  onDeleteConversation,
  onMenuSelect,
}) => {
  const { t } = useTranslation()

  // ✅ 记录展开的一级助手菜单（可多选展开）
  const [expandedAssistantIds, setExpandedAssistantIds] = React.useState<string[]>([])
  // ✅ 记录当前选中的菜单项（一级或二级）
  const [selectedMenuId, setSelectedMenuId] = React.useState<string | null>(null)

  const toggleAssistantExpand = (id: string) => {
    setExpandedAssistantIds(prev => (
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    ))
  }

  const handleMenuSelect = (id: string, isParent: boolean) => {
    setSelectedMenuId(id)
    if (isParent) {
      toggleAssistantExpand(id)
    }
    onMenuSelect && onMenuSelect(id)
  }

  return (
    <div className="shrink-0 flex flex-col overflow-y-auto bg-white pc:w-[244px] tablet:w-[192px] mobile:w-[240px] border-r border-gray-200 tablet:h-[calc(100vh_-_3rem)] mobile:h-screen">
      {/* 新建对话按钮 */}
      {list.length < MAX_CONVERSATION_LENTH && (
        <div className="flex flex-shrink-0 p-4 !pb-0">
          <Button
            onClick={() => { onCurrentIdChange('-1') }}
            className="group block w-full flex-shrink-0 !justify-start !h-9 items-center text-sm bg-[#DCF5EB]"
          >
            <PencilSquareIcon className="mr-2 h-4 w-4" />
            <span className="text-[#00A76F]">{t('app.chat.newChat')}</span>
          </Button>
        </div>
      )}

      {/* 助手菜单 */}
      <div className="flex flex-shrink-0 p-4 !pb-0">
        <div className="w-full">
          <div className="text-xs text-gray-400 mb-2">助手</div>
          <div className="space-y-1">
            {assistantMenus.map(({ id, label, Icon, children }) => {
              const isExpanded = expandedAssistantIds.includes(id)
              const isSelected = selectedMenuId === id
              return (
                <div key={id}>
                  {/* 一级菜单 */}
                  <div
                    className={classNames(
                      'group flex items-center rounded-md px-2 py-2 text-sm font-medium cursor-pointer transition-all duration-200',
                      isSelected
                        ? 'bg-primary-50 text-[#00A76F]'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700',
                    )}
                    onClick={() => handleMenuSelect(id, true)}
                  >
                    <Icon className={classNames('mr-2 h-4 w-4 flex-shrink-0', isSelected ? 'text-[#00A76F]' : 'text-gray-400 group-hover:text-gray-500')} />
                    <div className="flex-1">{label}</div>
                    <ChevronRightIcon className={classNames('h-4 w-4 transition-transform', isExpanded ? 'rotate-90' : 'rotate-0')} />
                  </div>
                  {/* 二级菜单 */}
                  {isExpanded && (
                    <div className="ml-3 mt-1 space-y-1">
                      {children.map((child) => {
                        const isChildSelected = selectedMenuId === child.id
                        return (
                          <div
                            key={child.id}
                            className={classNames(
                              'group flex items-center rounded-md px-2 py-2 text-sm cursor-pointer',
                              isChildSelected
                                ? 'bg-primary-50 text-[#00A76F]'
                                : 'text-gray-600 hover:text-gray-700 hover:bg-gray-50',
                            )}
                            onClick={() => handleMenuSelect(child.id, false)}
                          >
                            {child.label}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 历史对话 */}
      <div className="px-4">
        <div className="border-t border-gray-200 my-2" />
        <div className="text-xs text-gray-400 mb-2">历史对话</div>
      </div>

      <nav className="mt-2 flex-1 space-y-1 bg-white p-4 !pt-0">
        {list.map((item) => {
          const isCurrent = item.id === currentId
          const ItemIcon = isCurrent
            ? ChatBubbleOvalLeftEllipsisSolidIcon
            : ChatBubbleOvalLeftEllipsisIcon
          const canDelete = item.id !== '-1'
          return (
            <div
              key={item.id}
              className={classNames(
                isCurrent
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
              )}
              onClick={() => onCurrentIdChange(item.id)}
            >
              <ItemIcon
                className={classNames(
                  isCurrent
                    ? 'text-primary-600'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 h-5 w-5 flex-shrink-0',
                )}
              />
              <span className="truncate mr-2">{item.name}</span>
              {canDelete && (
                <button
                  type="button"
                  className="ml-auto px-2 py-1 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100"
                  onClick={(e) => { e.stopPropagation(); onDeleteConversation && onDeleteConversation(item.id) }}
                  aria-label="删除会话"
                >
                  <TrashIcon className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
          )
        })}
      </nav>

      <div className="flex flex-shrink-0 pr-4 pb-4 pl-4">
        <div className="text-gray-400 font-normal text-xs">
          © {copyRight} {(new Date()).getFullYear()}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Sidebar)
