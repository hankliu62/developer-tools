import { NextRequest, NextResponse } from 'next/server';

const HISTORY_API_BASE = 'https://www.mxnzp.com/api/history/today';

interface HistoryEvent {
  picUrl: string;
  title: string;
  year: string;
  month: number;
  day: number;
  details: string;
}

interface ApiResponse {
  code: number;
  msg: string;
  data: HistoryEvent[];
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || '1';
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  try {
    const appId = process.env.NEXT_PUBLIC_MXNZP_APP_ID;
    const appSecret = process.env.NEXT_PUBLIC_MXNZP_APP_SECRET;

    let url = `${HISTORY_API_BASE}?type=${type}&app_id=${appId}&app_secret=${appSecret}`;

    if (month && day) {
      url += `&month=${month}&day=${day}`;
    }

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { code: 0, msg: 'API请求失败', data: [] },
        { status: response.status }
      );
    }

    const data: ApiResponse = await response.json();

    if (data.code === 1) {
      return NextResponse.json({
        code: 1,
        msg: 'success',
        data: data.data,
      });
    } else {
      return NextResponse.json({
        code: 0,
        msg: data.msg || '获取数据失败',
        data: [],
      });
    }
  } catch (error) {
    console.error('History API error:', error);
    return NextResponse.json({ code: 0, msg: '网络请求失败', data: [] }, { status: 500 });
  }
}
