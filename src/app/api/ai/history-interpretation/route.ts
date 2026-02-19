import { NextRequest, NextResponse } from 'next/server';

const ZHIPU_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

const AI_SYSTEM_PROMPT = `你是一个有趣的历史讲解员。根据以下历史事件信息，请生成：
1. 一句话总结要点（summary）
2. 扩展相关知识（expansion，2-3条）
3. 趣味解说（fun_fact，1-2条，要求通俗易懂、有趣）

请用 JSON 格式返回：
{
  "summary": "...",
  "expansion": ["...", "..."],
  "fun_fact": ["...", "..."]
}`;

export async function POST(request: NextRequest) {
  try {
    const { apiKey, title, year, month, day, details } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { code: 0, msg: '请先配置智谱AI API Key', data: null },
        { status: 400 }
      );
    }

    if (!title || !details) {
      return NextResponse.json({ code: 0, msg: '缺少必要参数', data: null }, { status: 400 });
    }

    const userPrompt = `事件信息：
标题：${title}
年份：${year}年${month}月${day}日
详情：${details}`;

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
            role: 'system',
            content: AI_SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.7,
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

    if (result.choices && result.choices[0]) {
      const content = result.choices[0].message.content;

      let parsedData: { summary: string; expansion: string[]; fun_fact: string[] } | null = null;
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0]);
        } else {
          parsedData = JSON.parse(content);
        }

        return NextResponse.json({
          code: 1,
          msg: 'success',
          data: parsedData,
        });
      } catch {
        return NextResponse.json({
          code: 0,
          msg: 'AI返回格式解析失败',
          data: null,
        });
      }
    } else {
      return NextResponse.json({ code: 0, msg: 'AI返回数据格式错误', data: null }, { status: 500 });
    }
  } catch (error) {
    console.error('AI Interpretation error:', error);
    return NextResponse.json({ code: 0, msg: '网络请求失败', data: null }, { status: 500 });
  }
}
