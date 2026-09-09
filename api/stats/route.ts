import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({
      users: 0,
      activeUsers: 0,
      contents: 0,
      messages: 0,
      configured: false,
    });
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    const [usersRes, contentsRes, messagesRes] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact' }),
      supabase.from('contents').select('*', { count: 'exact' }),
      supabase.from('messages').select('*', { count: 'exact' }),
    ]);

    return NextResponse.json({
      users: usersRes.count || 0,
      activeUsers: usersRes.count || 0,
      contents: contentsRes.count || 0,
      messages: messagesRes.count || 0,
      configured: true,
    });
  } catch (error) {
    return NextResponse.json({
      users: 0,
      activeUsers: 0,
      contents: 0,
      messages: 0,
      configured: false,
    });
  }
}