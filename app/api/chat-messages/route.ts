import type { NextRequest } from 'next/server'
import { client, getInfo } from '@/app/api/utils/common'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const {
    inputs = {},
    query,
    files = [],
    conversation_id: conversationId,
    response_mode: responseMode,
    auto_generate_name = true,
  } = body
  const { user } = getInfo(request)
  const hasValue = Object.values(inputs).some(v => v && v.toString().trim() !== '')
  const inputsClean = hasValue ? inputs : { default_input: 'BaoHan' }
  const res = await client.createChatMessage(inputsClean, query, user, responseMode, conversationId, files, auto_generate_name)
  return new Response(res.data as any)
}
