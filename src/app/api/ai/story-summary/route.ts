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

    const prompt = `请用简洁的语言总结这个故事的寓意（适合家长理解后讲给孩子听，50-100字）：
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
        temperature: 0.7,
        max_tokens: 500,
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

    if (result.choices && result.choices[0]) {
      const content = result.choices[0].message.content;
      return NextResponse.json({
        code: 1,
        msg: 'success',
        data: { summary: content },
      });
    } else {
      return NextResponse.json({ code: 0, msg: 'AI返回数据格式错误', data: null }, { status: 500 });
    }
  } catch (error) {
    console.error('Story summary error:', error);
    return NextResponse.json({ code: 0, msg: '网络请求失败', data: null }, { status: 500 });
  }
}
