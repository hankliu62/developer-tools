'use client';
import { Button, Input, message, Radio, Select, Slider, Upload } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

export default function Base64FilePage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [loading, setLoading] = useState(false);
  const [mimeType, setMimeType] = useState('image/png');
  const [lineLength, setLineLength] = useState(76);

  const handleFileEncode = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        if (lineLength > 0) {
          const formatted = base64.replace(new RegExp(`.{1,${lineLength}}`, 'g'), '$&\n');
          setOutput(formatted);
        } else {
          setOutput(base64);
        }
        message.success('文件编码成功');
      };
      reader.onerror = () => {
        message.error('文件读取失败');
      };
      reader.readAsDataURL(file);
    },
    [lineLength]
  );

  const handleTextEncode = useCallback(() => {
    try {
      if (!input) {
        message.error('请输入内容');
        return;
      }
      setLoading(true);
      const encoded = btoa(unescape(encodeURIComponent(input)));
      if (lineLength > 0) {
        const formatted = encoded.replace(new RegExp(`.{1,${lineLength}}`, 'g'), '$&\n');
        setOutput(formatted);
      } else {
        setOutput(encoded);
      }
      message.success('编码成功');
    } catch (_error) {
      message.error('编码失败');
    } finally {
      setLoading(false);
    }
  }, [input, lineLength]);

  const handleDecode = useCallback(() => {
    try {
      if (!input) {
        message.error('请输入 Base64 内容');
        return;
      }
      setLoading(true);
      const cleanInput = input.replace(/\s/g, '');
      const decoded = decodeURIComponent(escape(atob(cleanInput)));
      setOutput(decoded);
      message.success('解码成功');
    } catch (_error) {
      message.error('解码失败，请检查输入是否正确');
    } finally {
      setLoading(false);
    }
  }, [input]);

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📎 Base64 文件转换</h1>
        <p className="text-gray-600">文件与 Base64 字符串相互转换</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 mb-4 flex justify-center">
        <Radio.Group
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            setOutput('');
          }}
          buttonStyle="solid"
          size="large"
        >
          <Radio.Button value="encode">🔒 编码</Radio.Button>
          <Radio.Button value="decode">🔓 解码</Radio.Button>
        </Radio.Group>
      </div>

      {mode === 'encode' && (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
          <span className="font-semibold text-gray-800 block mb-4">⚙️ 编码选项</span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600 block mb-2">MIME 类型</span>
              <Select
                value={mimeType}
                onChange={setMimeType}
                style={{ width: '100%' }}
                options={[
                  { value: 'image/png', label: 'image/png' },
                  { value: 'image/jpeg', label: 'image/jpeg' },
                  { value: 'image/gif', label: 'image/gif' },
                  { value: 'image/webp', label: 'image/webp' },
                  { value: 'application/pdf', label: 'application/pdf' },
                  { value: 'audio/mp3', label: 'audio/mp3' },
                  { value: 'video/mp4', label: 'video/mp4' },
                ]}
              />
            </div>
            <div>
              <span className="text-sm text-gray-600 block mb-2">换行长度: {lineLength} 字符</span>
              <Slider
                min={0}
                max={200}
                value={lineLength}
                onChange={setLineLength}
                marks={{ 0: '无', 76: '76', 200: '200' }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">
            {mode === 'encode' ? '📁 选择文件或输入文本' : '📝 输入 Base64 字符串'}
          </span>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        {mode === 'encode' ? (
          <div className="space-y-3">
            <Upload.Dragger
              beforeUpload={(file) => {
                handleFileEncode(file);
                return false;
              }}
              showUploadList={false}
              accept="*"
            >
              <p className="text-gray-500">点击或拖拽文件到这里上传</p>
            </Upload.Dragger>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="或直接输入文本进行编码..."
              className="font-mono"
            />
            <Button type="primary" onClick={handleTextEncode} loading={loading} block>
              文本编码
            </Button>
          </div>
        ) : (
          <Input.TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="请输入 Base64 字符串..."
            className="font-mono text-sm"
            rows={6}
          />
        )}
      </div>

      {mode === 'decode' && (
        <Button
          type="primary"
          size="large"
          block
          onClick={handleDecode}
          loading={loading}
          disabled={!input}
          className="h-12 text-base font-medium mb-4"
        >
          🔓 开始解码
        </Button>
      )}

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">
              {mode === 'encode' ? '🔤 Base64 结果' : '🔤 解码结果'}
            </span>
            <Button onClick={handleCopy}>📋 复制</Button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 break-all">
              {output}
            </pre>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 编码：将文件或文本转换为 Base64 字符串，便于在 JSON、XML 中传输</li>
          <li>• 解码：将 Base64 字符串还原为原始内容</li>
          <li>• 可设置换行长度，0 表示不换行</li>
          <li>• 编码文件时可指定 MIME 类型，生成 data URL</li>
        </ul>
      </div>
    </div>
  );
}
