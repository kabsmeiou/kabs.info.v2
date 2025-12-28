import { NextResponse } from 'next/server';

const BASE = 'https://api.counterapi.dev/v2/cerefrid-ciophns-team-2291';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (!type) {
    return NextResponse.json({ error: 'Missing type' }, { status: 400 });
  }

  const res = await fetch(`${BASE}/${type}`, {
    headers: {
      Authorization: `Bearer ${process.env.COUNTER_API}`,
    },
  });

  const json = await res.json();

  return NextResponse.json({
    value: json.data.up_count,
  });
}

export async function POST(req: Request) {
  const { type } = await req.json();

  if (!type) {
    return NextResponse.json({ error: 'Missing type' }, { status: 400 });
  }

  const res = await fetch(`${BASE}/${type}/up`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.COUNTER_API}`,
    },
  });

  const json = await res.json();

  return NextResponse.json({
    value: json.data.up_count,
  });
}
