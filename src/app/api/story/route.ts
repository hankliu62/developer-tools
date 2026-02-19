import { NextRequest, NextResponse } from 'next/server';

const STORY_API_BASE = 'https://www.mxnzp.com/api/story';

interface StoryType {
  name: string;
  type_id: number;
}

interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type_id = searchParams.get('type_id');
  const keyword = searchParams.get('keyword');
  const page = searchParams.get('page') || '1';

  try {
    const appId = process.env.NEXT_PUBLIC_MXNZP_APP_ID;
    const appSecret = process.env.NEXT_PUBLIC_MXNZP_APP_SECRET;

    let url = '';

    if (type_id && keyword) {
      url = `${STORY_API_BASE}/list?type_id=${type_id}&keyword=${keyword}&page=${page}&app_id=${appId}&app_secret=${appSecret}`;
    } else if (type_id) {
      url = `${STORY_API_BASE}/list?type_id=${type_id}&page=${page}&app_id=${appId}&app_secret=${appSecret}`;
    } else if (keyword) {
      url = `${STORY_API_BASE}/search?keyword=${keyword}&page=${page}&app_id=${appId}&app_secret=${appSecret}`;
    } else {
      url = `${STORY_API_BASE}/list?type_id=1&page=${page}&app_id=${appId}&app_secret=${appSecret}`;
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

    const data: ApiResponse<unknown> = await response.json();

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
    console.error('Story API error:', error);
    return NextResponse.json({ code: 0, msg: '网络请求失败', data: [] }, { status: 500 });
  }
}
