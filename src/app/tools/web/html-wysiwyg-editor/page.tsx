'use client';
import { Button, message, Select, Slider, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useRef, useState } from 'react';

export default function HTMLWYSIWYGEditorPage() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [htmlOutput, setHtmlOutput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [_loading, _setLoading] = useState(false);

  const updateOutput = useCallback(() => {
    if (editorRef.current) {
      setHtmlOutput(editorRef.current.innerHTML);
      setTextOutput(editorRef.current.innerText);
    }
  }, []);

  const execCommand = useCallback(
    (command: string, value?: string) => {
      document.execCommand(command, false, value);
      if (editorRef.current) {
        updateOutput();
      }
      message.success('操作成功');
    },
    [updateOutput]
  );

  const handleCopyHtml = () => {
    if (htmlOutput) {
      copy(htmlOutput);
      message.success('HTML 已复制');
    }
  };

  const handleCopyText = () => {
    if (textOutput) {
      copy(textOutput);
      message.success('纯文本已复制');
    }
  };

  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
      updateOutput();
    }
    message.success('已清空');
  };

  const insertLink = () => {
    const url = prompt('请输入链接地址:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('请输入图片地址:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 HTML 富文本编辑器</h1>
        <p className="text-gray-600">可视化编辑 HTML 内容</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <label className="font-semibold text-gray-800">🎨 格式工具栏</label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">字号:</span>
              <Slider
                min={12}
                max={32}
                value={fontSize}
                onChange={(value) => {
                  setFontSize(value);
                  execCommand('fontSize', '7');
                }}
                className="w-20"
              />
              <span className="text-sm text-gray-500">{fontSize}px</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-lg mb-2">
          <Tooltip title="粗体 (Ctrl+B)">
            <Button onClick={() => execCommand('bold')} className="font-bold">
              B
            </Button>
          </Tooltip>
          <Tooltip title="斜体 (Ctrl+I)">
            <Button onClick={() => execCommand('italic')} className="italic">
              I
            </Button>
          </Tooltip>
          <Tooltip title="下划线 (Ctrl+U)">
            <Button onClick={() => execCommand('underline')} className="underline">
              U
            </Button>
          </Tooltip>
          <Tooltip title="删除线">
            <Button onClick={() => execCommand('strikeThrough')} className="line-through">
              S
            </Button>
          </Tooltip>

          <div className="w-px bg-gray-300 mx-1" />

          <Tooltip title="标题1">
            <Button onClick={() => execCommand('formatBlock', 'h1')}>H1</Button>
          </Tooltip>
          <Tooltip title="标题2">
            <Button onClick={() => execCommand('formatBlock', 'h2')}>H2</Button>
          </Tooltip>
          <Tooltip title="标题3">
            <Button onClick={() => execCommand('formatBlock', 'h3')}>H3</Button>
          </Tooltip>
          <Tooltip title="段落">
            <Button onClick={() => execCommand('formatBlock', 'p')}>P</Button>
          </Tooltip>

          <div className="w-px bg-gray-300 mx-1" />

          <Tooltip title="无序列表">
            <Button onClick={() => execCommand('insertUnorderedList')}>• List</Button>
          </Tooltip>
          <Tooltip title="有序列表">
            <Button onClick={() => execCommand('insertOrderedList')}>1. List</Button>
          </Tooltip>

          <div className="w-px bg-gray-300 mx-1" />

          <Tooltip title="左对齐">
            <Button onClick={() => execCommand('justifyLeft')}>⬅</Button>
          </Tooltip>
          <Tooltip title="居中">
            <Button onClick={() => execCommand('justifyCenter')}>⬌</Button>
          </Tooltip>
          <Tooltip title="右对齐">
            <Button onClick={() => execCommand('justifyRight')}>➡</Button>
          </Tooltip>

          <div className="w-px bg-gray-300 mx-1" />

          <Tooltip title="插入链接">
            <Button onClick={insertLink}>🔗</Button>
          </Tooltip>
          <Tooltip title="插入图片">
            <Button onClick={insertImage}>🖼</Button>
          </Tooltip>
          <Tooltip title="插入水平线">
            <Button onClick={() => execCommand('insertHorizontalRule')}>―</Button>
          </Tooltip>

          <div className="w-px bg-gray-300 mx-1" />

          <Tooltip title="撤销 (Ctrl+Z)">
            <Button onClick={() => execCommand('undo')}>↩</Button>
          </Tooltip>
          <Tooltip title="重做 (Ctrl+Y)">
            <Button onClick={() => execCommand('redo')}>↪</Button>
          </Tooltip>
        </div>

        <Select
          value={fontFamily}
          onChange={setFontFamily}
          className="w-48 mb-2"
          size="small"
          options={[
            { value: 'sans-serif', label: '无衬线体' },
            { value: 'serif', label: '衬线体' },
            { value: 'monospace', label: '等宽体' },
            { value: 'Arial', label: 'Arial' },
            { value: 'Georgia', label: 'Georgia' },
            { value: 'Times New Roman', label: 'Times New Roman' },
            { value: 'Courier New', label: 'Courier New' },
          ]}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4">
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <span className="font-semibold text-gray-800">✏️ 编辑区域</span>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <div
          ref={editorRef}
          contentEditable
          className="min-h-64 p-4 outline-none prose max-w-none"
          style={{ fontFamily, fontSize: `${fontSize}px` }}
          onInput={updateOutput}
          suppressContentEditableWarning
        />
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <label className="font-semibold text-gray-800 block mb-4">⚙️ 输出选项</label>
        <div className="flex gap-4">
          <Button onClick={handleCopyHtml} className="flex-1">
            📋 复制 HTML
          </Button>
          <Button onClick={handleCopyText} className="flex-1">
            📋 复制纯文本
          </Button>
        </div>
      </div>

      {htmlOutput && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="font-semibold text-gray-800">📋 HTML 输出</label>
            <Button size="small" onClick={handleCopyHtml}>
              复制
            </Button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 max-h-48 overflow-auto">
            <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">{htmlOutput}</pre>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 使用工具栏按钮格式化文本</li>
          <li>• 支持 Ctrl+B 粗体、Ctrl+I 斜体、Ctrl+U 下划线</li>
          <li>• 可以插入图片链接和超链接</li>
          <li>• 复制 HTML 代码后可粘贴到网页编辑器中使用</li>
        </ul>
      </div>
    </div>
  );
}
