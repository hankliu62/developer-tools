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

const CROP_PROMPT = `请分析这张图片，识别出主体内容区域，返回最适合作为图标的正方形裁剪区域坐标。返回 JSON 格式：{"x": 0, "y": 0, "width": 100, "height": 100}`;

const REMOVE_BG_PROMPT = `请将这张图片的背景去除，只保留主体内容，返回透明背景的图片。返回结果应该是处理后的图片。`;

const ENHANCE_PROMPT = `请提升这张图片的清晰度和质量，进行超分辨率重建，使其更适合作为图标使用。`;

export async function POST(req: NextRequest) {
  let response: Response | null = null;
  try {
    const body = await req.json();
    const { apiKey, imageBase64, prompt, feature } = body;

    if (!apiKey) {
      return NextResponse.json(
        { code: 0, msg: 'API Key is required', data: null },
        { status: 400 }
      );
    }

    if (!imageBase64) {
      return NextResponse.json({ code: 0, msg: 'Image is required', data: null }, { status: 400 });
    }

    const base64Data = imageBase64.split(',')[1] || imageBase64;
    const dispatcher = getDispatcher();

    let actualPrompt = prompt;
    if (feature === 'crop') {
      actualPrompt = CROP_PROMPT;
    } else if (feature === 'remove-bg') {
      actualPrompt = REMOVE_BG_PROMPT;
    } else if (feature === 'enhance') {
      actualPrompt = ENHANCE_PROMPT;
    }

    response = (await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4v-flash',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: actualPrompt },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Data}` } },
            ],
          },
        ],
      }),
      ...(dispatcher ? { dispatcher } : {}),
    })) as unknown as Response;

    const responseText = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        { code: 0, msg: responseText, data: null },
        { status: response.status }
      );
    }

    const data = JSON.parse(responseText);

    if (data.choices?.[0]) {
      const content = data.choices[0].message?.content;

      // 对于裁剪功能，解析坐标
      if (feature === 'crop' && content) {
        try {
          const coords = JSON.parse(content);
          return NextResponse.json({
            code: 1,
            msg: 'success',
            data: { feature: 'crop', ...coords },
          });
        } catch {
          return NextResponse.json({
            code: 1,
            msg: 'success',
            data: { feature: 'crop', raw: content },
          });
        }
      }

      // 对于其他功能，返回文本结果
      return NextResponse.json({ code: 1, msg: 'success', data: { feature, result: content } });
    }

    return NextResponse.json({ code: 0, msg: 'Invalid response', data: null }, { status: 500 });
  } catch (error) {
    console.error('Image process error:', error);
    return NextResponse.json(
      { code: 0, msg: error instanceof Error ? error.message : 'Processing failed', data: null },
      { status: 500 }
    );
  }
}
