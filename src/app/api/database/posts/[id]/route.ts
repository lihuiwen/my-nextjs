import { NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params

  try {
    const response = await fetch(`${API_BASE_URL}/database/posts/${id}`, {
      method: 'DELETE',
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
