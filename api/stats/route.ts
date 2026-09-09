import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    users: 0,
    activeUsers: 0,
    contents: 0,
    messages: 0,
  });
}