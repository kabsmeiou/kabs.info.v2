import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(
    SUPABASE_URL!,
    SUPABASE_SERVICE_ROLE_KEY! // server-only
);

export async function POST(req: Request) {
    const { cardId, type } = await req.json(); // parse content

    if (!cardId || !type) {
        return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // determine column to increment (type is not the same as actual column name)
    const column =
    type === 'like' ? 'like_count'
    : type === 'catprove' ? 'catprove_count'
    : 'cool_count';

    // atomic upsert + increment
    const { data, error } = await supabase.rpc('increment_card_counter', {
        p_card_id: cardId,
        p_column: column,
    });

    if (error) {
        console.error(error);
        return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.getAll('id');

    if (!ids.length) {
        return NextResponse.json([], { status: 200 });
    }

    // fetch card interactions for given ids
    const { data, error } = await supabase
    .from('card_interactions')
    .select('card_id, like_count, catprove_count, cool_count')
    .in('card_id', ids);

    if (error) {
        console.error(error);
        return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    return NextResponse.json(data);
}