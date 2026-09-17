import { NextRequest, NextResponse } from 'next/server';

function endpoint(input: string) {
  let u = (input || '').trim();
  if (!u) throw new Error('请先填写 API Base URL');
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
  u = u.replace(/\/+$/, '');
  if (!/\/chat\/completions$/i.test(u)) {
    if (/\/v1$/i.test(u)) u += '/chat/completions';
    else u += '/v1/chat/completions';
  }
  return u;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = endpoint(body.baseUrl);
    const key = String(body.apiKey || '');
    const payload = {
      model: body.model || 'gpt-4o-mini',
      messages: Array.isArray(body.messages) ? body.messages : [],
      temperature: typeof body.temperature === 'number' ? body.temperature : 0.8,
      max_tokens: typeof body.maxTokens === 'number' ? body.maxTokens : undefined,
      stream: false,
    };
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(key ? { Authorization: `Bearer ${key}` } : {}) },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(180000),
    });
    const text = await r.text();
    if (!r.ok) return NextResponse.json({ error: text || `HTTP ${r.status}` }, { status: r.status });
    let data: any;
    try { data = JSON.parse(text); } catch { return NextResponse.json({ error: 'API 返回的不是 JSON', raw: text }, { status: 502 }); }
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || '请求失败' }, { status: 500 });
  }
}
