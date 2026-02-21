import { NextRequest, NextResponse } from 'next/server';

const ZHIPU_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

export async function POST(request: NextRequest) {
  try {
    const { apiKey, title, content } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { code: 0, msg: '请先配置智谱AI API Key', data: null },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json({ code: 0, msg: '缺少故事内容', data: null }, { status: 400 });
    }

    const prompt = `请根据以下睡前故事，续写一个适合儿童的结尾（100-200字）：
故事标题：${title}
故事内容：${content}`;

    const response = await fetch(ZHIPU_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4-flash',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Zhipu API error:', response.status, errorText);
      return NextResponse.json(
        { code: 0, msg: 'AI服务请求失败', data: null },
        { status: response.status }
      );
    }

    const result = await response.json();

    if (result.choices?.[0]) {
      const content = result.choices[0].message.content;
      return NextResponse.json({
        code: 1,
        msg: 'success',
        data: { content },
      });
    } else {
      return NextResponse.json({ code: 0, msg: 'AI返回数据格式错误', data: null }, { status: 500 });
    }
  } catch (error) {
    console.error('Story continue error:', error);
    return NextResponse.json({ code: 0, msg: '网络请求失败', data: null }, { status: 500 });
  }
}
