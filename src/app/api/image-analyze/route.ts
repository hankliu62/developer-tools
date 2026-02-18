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

const isZhipuModel = (model: string) => model.startsWith('glm');

const IMAGE_TYPE_PROMPT = `请分析这张图片并识别其类型。根据图片内容，从以下类别中选择最匹配的一个：
- 人像照片
- 屏幕截图
- 摄影作品
- 插画/漫画
- 图表/数据可视化
- 文档/扫描件
- 纯文字图片
- 二维码/条形码
- Logo/品牌标识
- 其他

请按以下 JSON 格式返回结果：
{"type": "图片类型", "recommendation": "推荐的压缩参数建议，包括质量(1-100)、格式建议、是否保留透明度等"}`;

export async function POST(req: NextRequest) {
  let response: Response | null = null;
  try {
    const body = await req.json();
    const { apiKey, model, imageBase64 } = body;

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key is required' }, { status: 400 });
    }

    if (!imageBase64) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    const dispatcher = getDispatcher();

    if (isZhipuModel(model)) {
      const base64Data = imageBase64.split(',')[1] || imageBase64;

      response = (await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: IMAGE_TYPE_PROMPT },
                { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Data}` } },
              ],
            },
          ],
        }),
        ...(dispatcher ? { dispatcher } : {}),
      })) as unknown as Response;

      const responseText = await response.text();
      if (!response.ok) {
        return NextResponse.json({ error: responseText }, { status: response.status });
      }

      if (!responseText) {
        return NextResponse.json({ error: 'Empty response from API' }, { status: 500 });
      }

      const data = JSON.parse(responseText);
      const content = data.choices?.[0]?.message?.content || '';

      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          return NextResponse.json(result);
        }
      } catch {
        return NextResponse.json({
          type: '未知',
          recommendation: '建议使用质量 80，格式保持原格式',
        });
      }

      return NextResponse.json({
        type: '未知',
        recommendation: '建议使用质量 80，格式保持原格式',
      });
    } else {
      const base64Data = imageBase64.split(',')[1] || imageBase64;

      response = (await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: IMAGE_TYPE_PROMPT },
                  { inlineData: { mimeType: 'image/jpeg', data: base64Data } },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.1,
              topP: 0.95,
              maxOutputTokens: 512,
            },
          }),
          ...(dispatcher ? { dispatcher } : {}),
        }
      )) as unknown as Response;

      const responseText = await response.text();
      if (!response.ok) {
        return NextResponse.json({ error: responseText }, { status: response.status });
      }

      const data = JSON.parse(responseText);
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          return NextResponse.json(result);
        }
      } catch {
        return NextResponse.json({
          type: '未知',
          recommendation: '建议使用质量 80，格式保持原格式',
        });
      }

      return NextResponse.json({
        type: '未知',
        recommendation: '建议使用质量 80，格式保持原格式',
      });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
