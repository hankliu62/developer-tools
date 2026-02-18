import { NextResponse } from 'next/server';

interface TranslateRequest {
  text: string;
  targetLang: 'zh' | 'en';
  apiKey?: string;
  model?: string;
}

function _isChinese(text: string): boolean {
  const chineseRegex = /[\u4e00-\u9fa5]/;
  return chineseRegex.test(text);
}

async function translateWithGoogle(
  text: string,
  targetLang: string,
  apiKey: string
): Promise<string> {
  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        target: targetLang,
        format: 'text',
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Google Translate API error');
  }

  const data = await response.json();
  return data.data.translations[0].translatedText;
}

async function translateWithGemini(
  text: string,
  targetLang: string,
  apiKey: string
): Promise<string> {
  const prompt =
    targetLang === 'zh'
      ? `请将以下英文内容翻译成中文，保持原有的格式和换行。只返回翻译结果，不要添加任何解释：\n\n${text}`
      : `Please translate the following Chinese content to English. Keep the original format and line breaks. Only return the translation, no explanations:\n\n${text}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 8192,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Gemini API error');
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || text;
}

async function translateWithOpenAI(
  text: string,
  targetLang: string,
  apiKey: string
): Promise<string> {
  const prompt =
    targetLang === 'zh'
      ? `将以下英文内容翻译成中文，保持原有格式和换行。只返回翻译结果：\n\n${text}`
      : `Translate the following Chinese content to English. Keep the original format and line breaks. Only return the translation:\n\n${text}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    throw new Error('OpenAI API error');
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || text;
}

async function translateWithBigModel(
  text: string,
  targetLang: string,
  apiKey: string
): Promise<string> {
  const prompt =
    targetLang === 'zh'
      ? `将以下英文内容翻译成中文，保持原有格式和换行。只返回翻译结果：\n\n${text}`
      : `将以下中文内容翻译成英文，保持原有格式和换行。只返回翻译结果：\n\n${text}`;

  const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'glm-4-flash',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    throw new Error('BigModel API error');
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || text;
}

export async function POST(request: Request) {
  try {
    const body: TranslateRequest = await request.json();
    const { text, targetLang, apiKey, model } = body;

    if (!text || !targetLang || !apiKey) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let translatedText: string;

    switch (model) {
      case 'google':
        translatedText = await translateWithGoogle(text, targetLang, apiKey);
        break;
      case 'gemini':
        translatedText = await translateWithGemini(text, targetLang, apiKey);
        break;
      case 'openai':
        translatedText = await translateWithOpenAI(text, targetLang, apiKey);
        break;
      case 'bigmodel':
        translatedText = await translateWithBigModel(text, targetLang, apiKey);
        break;
      default:
        translatedText = await translateWithGemini(text, targetLang, apiKey);
    }

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Translation failed' },
      { status: 500 }
    );
  }
}
