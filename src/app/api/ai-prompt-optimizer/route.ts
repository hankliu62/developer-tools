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

export async function POST(req: NextRequest) {
  let response: Response | null = null;
  try {
    const body = await req.json();
    const { apiKey, model, prompt, input } = body;

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key is required' }, { status: 400 });
    }

    const dispatcher = getDispatcher();

    if (isZhipuModel(model)) {
      response = (await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'user', content: prompt },
            { role: 'user', content: `\n\n原始提示词：\n${input}` },
          ],
        }),
        ...(dispatcher ? { dispatcher } : {}),
      })) as unknown as Response;

      if (!response.ok) {
        const error = await response.json();
        return NextResponse.json(error, { status: response.status });
      }

      const data = (await response.json()) as { choices?: { message: { content: string } }[] };
      const text = data.choices?.[0]?.message?.content || '';
      return NextResponse.json({ candidates: [{ content: { parts: [{ text }] } }] });
    } else {
      response = (await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            generationConfig: {},
            safetySettings: [],
            contents: [
              {
                role: 'user',
                parts: [{ text: prompt }, { text: `\n\n原始提示词：\n${input}` }],
              },
            ],
          }),
          ...(dispatcher ? { dispatcher } : {}),
        }
      )) as unknown as Response;

      if (!response.ok) {
        const error = await response.json();
        return NextResponse.json(error, { status: response.status });
      }

      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
