'use client';
import { Button, Input, message, Select, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

export default function DockerComposeGeneratorPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState('3.8');
  const [indent, setIndent] = useState(2);
  const [includePorts, setIncludePorts] = useState(true);
  const [includeVolumes, setIncludeVolumes] = useState(true);
  const [includeEnvironment, setIncludeEnvironment] = useState(true);
  const [includeNetworks, _setIncludeNetworks] = useState(false);
  const [addRestart, setAddRestart] = useState(true);

  const parseDockerRun = useCallback(
    (dockerRun: string) => {
      const trimmed = dockerRun.trim();
      if (!trimmed.startsWith('docker run')) {
        throw new Error('请输入有效的 docker run 命令');
      }

      const rest = trimmed.replace(/^docker run\s*/, '');
      const options: { volumes: string[]; env: string[]; ports: string[]; networks: string[] } = {
        volumes: [],
        env: [],
        ports: [],
        networks: [],
      };

      const flags: string[] = [];
      const args: string[] = [];
      let currentArg = '';
      let inQuote = false;
      let quoteChar = '';

      for (let i = 0; i < rest.length; i++) {
        const char = rest[i];
        if ((char === '"' || char === "'") && !inQuote) {
          inQuote = true;
          quoteChar = char;
        } else if (char === quoteChar && inQuote) {
          inQuote = false;
          quoteChar = '';
        } else if (char === ' ' && !inQuote) {
          if (currentArg) {
            if (currentArg.startsWith('-')) {
              flags.push(currentArg);
            } else {
              args.push(currentArg);
            }
            currentArg = '';
          }
        } else {
          currentArg += char;
        }
      }
      if (currentArg) {
        if (currentArg.startsWith('-')) {
          flags.push(currentArg);
        } else {
          args.push(currentArg);
        }
      }

      const image = args[0] || '';
      const command = args.slice(1).join(' ');

      for (const flag of flags) {
        if (flag === '-d' || flag === '--detach') {
          continue;
        }
        if (flag === '-it' || flag === '-ti' || flag === '--interactive --tty') {
          continue;
        }
        if (flag.startsWith('--name=')) {
          continue;
        }
        if (flag.startsWith('-p ') || flag.startsWith('--publish ')) {
          const portMapping = flag.replace(/^-p\s*/, '').replace(/^--publish\s*/, '');
          if (!portMapping.startsWith("'") && portMapping.includes(':')) {
            options.ports.push(portMapping.replace(/['"]/g, ''));
          }
        }
        if (flag.startsWith('-v ') || flag.startsWith('--volume ')) {
          const volume = flag.replace(/^-v\s*/, '').replace(/^--volume\s*/, '');
          if (!volume.startsWith("'")) {
            options.volumes.push(volume.replace(/['"]/g, ''));
          }
        }
        if (flag.startsWith('-e ') || flag.startsWith('--env ')) {
          const env = flag.replace(/^-e\s*/, '').replace(/^--env\s*/, '');
          if (!env.startsWith("'")) {
            options.env.push(env.replace(/['"]/g, ''));
          }
        }
        if (flag.startsWith('--network ')) {
          const network = flag.replace(/^--network\s*/, '').replace(/['"]/g, '');
          if (network && network !== 'bridge') {
            options.networks.push(network);
          }
        }
        if (flag.startsWith('--net ')) {
          const network = flag.replace(/^--net\s*/, '').replace(/['"]/g, '');
          if (network && network !== 'bridge') {
            options.networks.push(network);
          }
        }
      }

      const lines: string[] = [];
      lines.push(`version: "${version}"`);
      lines.push('');
      lines.push('services:');
      lines.push('  app:');

      const indentStr = ' '.repeat(indent);
      lines.push(`${indentStr}image: ${image}`);

      if (command) {
        lines.push(`${indentStr}command: ${JSON.stringify(command)}`);
      }

      if (addRestart) {
        lines.push(`${indentStr}restart: unless-stopped`);
      }

      if (includePorts && options.ports.length > 0) {
        lines.push(`${indentStr}ports:`);
        for (const port of options.ports) {
          lines.push(`${indentStr}  - "${port}"`);
        }
      }

      if (includeVolumes && options.volumes.length > 0) {
        lines.push(`${indentStr}volumes:`);
        for (const vol of options.volumes) {
          lines.push(`${indentStr}  - ${vol}`);
        }
      }

      if (includeEnvironment && options.env.length > 0) {
        lines.push(`${indentStr}environment:`);
        for (const env of options.env) {
          const eqIdx = env.indexOf('=');
          if (eqIdx > 0) {
            lines.push(`${indentStr}  - ${env}`);
          } else {
            lines.push(`${indentStr}  - ${env}=`);
          }
        }
      }

      if (includeNetworks && options.networks.length > 0) {
        lines.push(`${indentStr}networks:`);
        for (const net of options.networks) {
          lines.push(`${indentStr}  - ${net}`);
        }
      }

      return lines.join('\n');
    },
    [version, indent, includePorts, includeVolumes, includeEnvironment, includeNetworks, addRestart]
  );

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      message.error('请输入 docker run 命令');
      return;
    }
    setLoading(true);
    try {
      const result = parseDockerRun(input);
      setOutput(result);
      message.success('转换成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '转换失败');
    } finally {
      setLoading(false);
    }
  }, [input, parseDockerRun]);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🐳 Docker Run 转 Compose</h1>
        <p className="text-gray-600">将 docker run 命令转换为 docker-compose.yml</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 转换选项</span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-600 block mb-2">Compose 版本</span>
            <Select
              value={version}
              onChange={setVersion}
              style={{ width: '100%' }}
              options={[
                { value: '3.9', label: '3.9' },
                { value: '3.8', label: '3.8' },
                { value: '3.7', label: '3.7' },
                { value: '3.3', label: '3.3' },
                { value: '2.4', label: '2.4' },
                { value: '2.1', label: '2.1' },
              ]}
            />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">缩进空格数</span>
            <Select
              value={indent}
              onChange={setIndent}
              style={{ width: '100%' }}
              options={[
                { value: 2, label: '2 空格' },
                { value: 4, label: '4 空格' },
              ]}
            />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">添加 restart</span>
            <Switch checked={addRestart} onChange={setAddRestart} />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">包含端口映射</span>
            <Switch checked={includePorts} onChange={setIncludePorts} />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">包含卷挂载</span>
            <Switch checked={includeVolumes} onChange={setIncludeVolumes} />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">包含环境变量</span>
            <Switch checked={includeEnvironment} onChange={setIncludeEnvironment} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">📝 输入 Docker Run 命令</span>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="docker run -d -p 8080:80 -v /data:/data -e NODE_ENV=production nginx:latest"
          className="font-mono text-sm"
          rows={4}
        />
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          type="primary"
          size="large"
          onClick={handleConvert}
          loading={loading}
          className="flex-1"
        >
          🚀 转换为 Compose
        </Button>
        <Button size="large" onClick={handleCopy} disabled={!output}>
          📋 复制
        </Button>
      </div>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📋 Docker Compose 结果</span>
            <Button onClick={handleCopy}>📋 复制</Button>
          </div>
          <pre className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto font-mono text-sm text-gray-800 whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 输入完整的 docker run 命令，包括所有参数</li>
          <li>• 支持常见的参数：-p 端口映射、-v 卷挂载、-e 环境变量、--network 网络</li>
          <li>• 不支持 -d（后台运行）和 --name（会自动忽略）</li>
          <li>• 生成的 Compose 文件可直接用于 docker-compose up</li>
        </ul>
      </div>
    </div>
  );
}
