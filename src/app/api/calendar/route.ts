import { NextRequest, NextResponse } from 'next/server';
import { fetch, ProxyAgent } from 'undici';

const PROXY =
  process.env.http_proxy ||
  process.env.HTTP_PROXY ||
  process.env.https_proxy ||
  process.env.HTTPS_PROXY;

const getDispatcher = () => {
  if (!PROXY) return undefined;
  return new ProxyAgent(PROXY);
};

const API_BASE = 'https://www.mxnzp.com/api/';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  const ignoreHoliday = searchParams.get('ignoreHoliday') || '0';

  if (!date) {
    return NextResponse.json({ error: 'Date is required (format: YYYYMM)' }, { status: 400 });
  }

  try {
    const appId = process.env.NEXT_PUBLIC_MXNZP_APP_ID;
    const appSecret = process.env.NEXT_PUBLIC_MXNZP_APP_SECRET;

    const dispatcher = getDispatcher();
    const url = `${API_BASE}/holiday/list/month/${date}?ignoreHoliday=${ignoreHoliday}&app_id=${appId}&app_secret=${appSecret}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...(dispatcher ? { dispatcher } : {}),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: error || `HTTP ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Calendar API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
