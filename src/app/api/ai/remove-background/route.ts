import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image_file') as File | null;
    const apiKey = formData.get('api_key') as string;

    if (!imageFile) {
      return NextResponse.json({ error: '请上传图片文件' }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({ error: '请提供 API Key' }, { status: 400 });
    }

    // Convert File to Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Call remove.bg API
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: (() => {
        const form = new FormData();
        form.append('image_file', new Blob([buffer], { type: imageFile.type }), imageFile.name);
        form.append('size', 'auto');
        form.append('format', 'png');
        return form;
      })(),
    });

    if (!response.ok) {
      const errorText = await response.text();

      // Handle specific error cases
      if (response.status === 402) {
        return NextResponse.json(
          { error: 'API 额度已用完，请购买更多额度或下个月再试' },
          { status: 402 }
        );
      }

      if (response.status === 401) {
        return NextResponse.json({ error: 'API Key 无效，请检查后重试' }, { status: 401 });
      }

      if (response.status === 429) {
        return NextResponse.json({ error: '请求过于频繁，请稍后重试' }, { status: 429 });
      }

      return NextResponse.json({ error: `处理失败: ${errorText}` }, { status: response.status });
    }

    // Get the processed image as base64
    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString('base64');
    const mimeType = response.headers.get('content-type') || 'image/png';

    return NextResponse.json({
      success: true,
      image: `data:${mimeType};base64,${base64}`,
    });
  } catch (error) {
    console.error('Remove background error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '处理失败，请重试' },
      { status: 500 }
    );
  }
}
