import { NextRequest, NextResponse } from 'next/server';

const STORY_API_BASE = 'https://www.mxnzp.com/api/story/types';

interface StoryType {
  name: string;
  type_id: number;
}

interface ApiResponse {
  code: number;
  msg: string;
  data: StoryType[];
}

export async function GET() {
  try {
    const appId = process.env.NEXT_PUBLIC_MXNZP_APP_ID;
    const appSecret = process.env.NEXT_PUBLIC_MXNZP_APP_SECRET;

    const url = `${STORY_API_BASE}?app_id=${appId}&app_secret=${appSecret}`;

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
    console.error('Story types API error:', error);
    return NextResponse.json({ code: 0, msg: '网络请求失败', data: [] }, { status: 500 });
  }
}
