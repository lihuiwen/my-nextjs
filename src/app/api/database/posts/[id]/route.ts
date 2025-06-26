import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  context: { params: Record<string, string> }
) {
  const { id } = context.params

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/database/posts/${id}`,
      { method: 'DELETE' }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
