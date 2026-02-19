'use client';
import { Button, message, Select, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload';
import { useCallback, useState } from 'react';

interface SignatureInfo {
  hasSignature: boolean;
  signer: string | null;
  signedAt: string | null;
  isValid: boolean;
  details: string;
}

function parsePdfSignature(buffer: ArrayBuffer): SignatureInfo {
  const bytes = new Uint8Array(buffer);
  const text = new TextDecoder('latin1').decode(bytes);

  const hasBy = text.includes('/By ');
  const hasSig = text.includes('/Sig') || text.includes('/SigFlags');
  const hasContents = text.includes('/Contents');

  const byMatch = text.match(/\/By\s+\(([^)]+)\)/);
  const dateMatch = text.match(/\/Date\s+\(([^)]+)\)/);
  const contentsMatch = text.match(/\/Contents\s+<([^>]+)>/);

  const signer = byMatch ? byMatch[1] : hasBy ? '未知签名者' : null;
  const signedAt = dateMatch ? dateMatch[1] : null;
  const hasSignature = hasSig || hasBy || hasContents;

  let details = '';
  if (hasSignature) {
    details += '• 检测到数字签名标记\n';
    if (signer) details += `• 签名者: ${signer}\n`;
    if (signedAt) details += `• 签名时间: ${signedAt}\n`;
    if (contentsMatch) details += '• 签名内容存在\n';
  } else {
    details += '• 未检测到数字签名\n';
    details += '• 该 PDF 可能未被数字签名或使用旧版格式';
  }

  return {
    hasSignature,
    signer,
    signedAt,
    isValid: hasSignature,
    details: details.trim(),
  };
}

export default function PDFSignatureCheckerPage() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [result, setResult] = useState<SignatureInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkType, setCheckType] = useState<'basic' | 'full'>('basic');

  const handleCheck = useCallback(async () => {
    if (fileList.length === 0 || !fileList[0].originFileObj) {
      message.error('请先上传 PDF 文件');
      return;
    }

    try {
      setLoading(true);
      const file = fileList[0].originFileObj;
      const buffer = await file.arrayBuffer();

      const signatureInfo = parsePdfSignature(buffer);
      setResult(signatureInfo);
      message.success('检查完成');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '检查失败');
    } finally {
      setLoading(false);
    }
  }, [fileList]);

  const handleClear = () => {
    setFileList([]);
    setResult(null);
  };

  const uploadProps = {
    accept: '.pdf',
    maxCount: 1,
    fileList,
    beforeUpload: (file: File) => {
      if (file.type !== 'application/pdf') {
        message.error('只能上传 PDF 文件');
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange: (info: { fileList: UploadFile[] }) => {
      setFileList(info.fileList);
      setResult(null);
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📜 PDF 签名检查</h1>
        <p className="text-gray-600">检查 PDF 文件的数字签名状态</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <label className="font-semibold text-gray-800 block mb-4">📤 上传 PDF 文件</label>
        <Upload.Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">📄</p>
          <p className="ant-upload-text">点击或拖拽 PDF 文件到此处</p>
          <p className="ant-upload-hint">仅支持 .pdf 格式</p>
        </Upload.Dragger>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <label className="font-semibold text-gray-800 block mb-4">⚙️ 检查选项</label>

        <div>
          <span className="text-sm text-gray-700 block mb-2">检查模式</span>
          <Select
            value={checkType}
            onChange={setCheckType}
            className="w-full"
            size="large"
            options={[
              { value: 'basic', label: '基础检查 - 检测签名标记' },
              { value: 'full', label: '完整检查 - 深度解析（开发中）' },
            ]}
          />
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Button
          type="primary"
          size="large"
          block
          onClick={handleCheck}
          loading={loading}
          className="h-12 text-base font-medium flex-1"
        >
          🔍 检查签名
        </Button>
        <Button size="large" onClick={handleClear} className="h-12">
          清空
        </Button>
      </div>

      {result && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{result.hasSignature ? '✅' : '❌'}</span>
            <div>
              <div className="font-semibold text-lg text-gray-800">
                {result.hasSignature ? '已检测到数字签名' : '未检测到数字签名'}
              </div>
              <div className="text-sm text-gray-500">
                {result.isValid ? '签名有效' : '签名无效或格式异常'}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <pre className="font-mono text-sm text-gray-700 whitespace-pre-wrap">
              {result.details}
            </pre>
          </div>

          {result.signer && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">签名者</div>
                <div className="font-medium text-gray-800">{result.signer}</div>
              </div>
              {result.signedAt && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">签名时间</div>
                  <div className="font-medium text-gray-800">{result.signedAt}</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 PDF 数字签名</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 数字签名可确保 PDF 文档的真实性和完整性</li>
          <li>• 签名后的文档被修改时会显示警告</li>
          <li>• 此工具仅检测签名标记，无法验证证书有效性</li>
          <li>• 完整的签名验证需要专业的 PDF 处理库</li>
        </ul>
      </div>
    </div>
  );
}
