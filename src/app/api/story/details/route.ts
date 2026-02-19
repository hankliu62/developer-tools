import { NextRequest, NextResponse } from 'next/server';

const STORY_API_BASE = 'https://www.mxnzp.com/api/story/details';

interface StoryDetail {
  storyId: number;
  title: string;
  type: string;
  length: number;
  readTime: string;
  content: string;
}

interface ApiResponse {
  code: number;
  msg: string;
  data: StoryDetail;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const story_id = searchParams.get('story_id');

  if (!story_id) {
    return NextResponse.json({ code: 0, msg: '缺少story_id参数', data: null }, { status: 400 });
  }

  try {
    const appId = process.env.NEXT_PUBLIC_MXNZP_APP_ID;
    const appSecret = process.env.NEXT_PUBLIC_MXNZP_APP_SECRET;

    const url = `${STORY_API_BASE}?story_id=${story_id}&app_id=${appId}&app_secret=${appSecret}`;

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { code: 0, msg: 'API请求失败', data: null },
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
        data: null,
      });
    }
  } catch (error) {
    console.error('Story details API error:', error);
    return NextResponse.json({ code: 0, msg: '网络请求失败', data: null }, { status: 500 });
  }
}
