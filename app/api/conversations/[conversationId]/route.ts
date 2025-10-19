import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { client, getInfo } from '@/app/api/utils/common'

export async function DELETE(request: NextRequest, { params }: {
  params: Promise<{ conversationId: string }>
}) {
  const { conversationId } = await params
  const { user } = getInfo(request)
  try {
    // Call dify-client to delete the conversation
    // Assume client.deleteConversation exists; if not, backend should provide equivalent
    // Some clients return 204 No Content on success
    await (client as any).deleteConversation(conversationId, user)
    return new NextResponse(null, { status: 204 })
  }
  catch (error: any) {
    return NextResponse.json({ message: error?.message || 'Delete conversation failed' }, { status: 500 })
  }
}
