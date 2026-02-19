'use client';
import { Button, Input, message, Space } from 'antd';
import { useCallback, useState } from 'react';

const ipToBinary = (ip: string): string => {
  return ip
    .split('.')
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, '0'))
    .join('.');
};

export default function IPv4SubnetCalculatorPage() {
  const [ipAddress, setIpAddress] = useState('192.168.1.0');
  const [cidr, setCidr] = useState(24);
  const [result, setResult] = useState<{
    network: string;
    broadcast: string;
    firstUsable: string;
    lastUsable: string;
    totalHosts: number;
    usableHosts: number;
    subnetMask: string;
    wildcardMask: string;
    binary: string;
  } | null>(null);

  const calculateSubnet = useCallback(() => {
    try {
      const ipParts = ipAddress.split('.').map(Number);
      if (ipParts.length !== 4 || ipParts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
        message.error('请输入有效的 IPv4 地址');
        return;
      }
      if (cidr < 0 || cidr > 32) {
        message.error('CIDR 必须在 0-32 之间');
        return;
      }

      const mask = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
      const wildcard = ~mask >>> 0;

      const ipNum =
        ((ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3]) >>> 0;
      const networkNum = (ipNum & mask) >>> 0;
      const broadcastNum = (networkNum | wildcard) >>> 0;

      const toIp = (num: number): string => {
        return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');
      };

      const totalHosts = 2 ** (32 - cidr);
      const usableHosts = cidr >= 31 ? totalHosts : totalHosts - 2;

      const subnetMask = toIp(mask);
      const wildcardMask = toIp(wildcard);
      const networkAddress = toIp(networkNum);
      const broadcastAddress = toIp(broadcastNum);
      const firstUsable = cidr >= 31 ? networkAddress : toIp(networkNum + 1);
      const lastUsable = cidr >= 31 ? broadcastAddress : toIp(broadcastNum - 1);

      setResult({
        network: networkAddress,
        broadcast: broadcastAddress,
        firstUsable,
        lastUsable,
        totalHosts,
        usableHosts,
        subnetMask,
        wildcardMask,
        binary: ipToBinary(ipAddress),
      });
      message.success('计算成功');
    } catch (_error) {
      message.error('计算失败');
    }
  }, [ipAddress, cidr]);

  const handleClear = () => {
    setIpAddress('192.168.1.0');
    setCidr(24);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🌐 IPv4 子网计算器</h1>
        <p className="text-gray-600">计算子网掩码、网络地址、可用主机数</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="font-semibold text-gray-800 block mb-2">📍 IP 地址</span>
            <Input
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="192.168.1.0"
              className="font-mono"
            />
          </div>
          <div>
            <span className="font-semibold text-gray-800 block mb-2">🔢 CIDR 前缀</span>
            <Input
              type="number"
              value={cidr}
              onChange={(e) => setCidr(parseInt(e.target.value, 10) || 0)}
              min={0}
              max={32}
              suffix="/"
              className="font-mono"
            />
          </div>
          <div>
            <span className="font-semibold text-gray-800 block mb-2">🔍 子网掩码</span>
            <div className="text-gray-600 font-mono pt-2">
              {cidr > 0
                ? `${'1'.repeat(cidr)}${'0'.repeat(32 - cidr)}`
                    .replace(/(.{8})/g, '$1.')
                    .slice(0, -1)
                : '0.0.0.0'}
            </div>
          </div>
        </div>
      </div>

      <Space className="w-full mb-4">
        <Button type="primary" size="large" onClick={calculateSubnet} className="flex-1">
          🚀 计算子网
        </Button>
        <Button size="large" onClick={handleClear}>
          🗑️ 重置
        </Button>
      </Space>

      {result && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <span className="font-semibold text-gray-800 block mb-4">📊 计算结果</span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">网络地址</div>
              <div className="font-mono text-lg text-blue-600">
                {result.network}/{cidr}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">广播地址</div>
              <div className="font-mono text-lg text-red-600">{result.broadcast}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">子网掩码</div>
              <div className="font-mono text-lg">{result.subnetMask}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">通配符掩码</div>
              <div className="font-mono text-lg">{result.wildcardMask}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">首个可用地址</div>
              <div className="font-mono text-lg text-green-600">{result.firstUsable}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">最后可用地址</div>
              <div className="font-mono text-lg text-green-600">{result.lastUsable}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">总主机数</div>
              <div className="font-mono text-lg">{result.totalHosts.toLocaleString()}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">可用主机数</div>
              <div className="font-mono text-lg text-green-600">
                {result.usableHosts.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">IP 二进制表示</div>
            <div className="font-mono text-sm text-purple-600 break-all">{result.binary}</div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 常用 CIDR 参考</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-blue-800">
          <div>/32 - 1 IP</div>
          <div>/30 - 4 IPs</div>
          <div>/29 - 8 IPs</div>
          <div>/28 - 16 IPs</div>
          <div>/27 - 32 IPs</div>
          <div>/26 - 64 IPs</div>
          <div>/25 - 128 IPs</div>
          <div>/24 - 256 IPs</div>
          <div>/23 - 512 IPs</div>
          <div>/22 - 1024 IPs</div>
          <div>/16 - 65536 IPs</div>
          <div>/8 - 16777216 IPs</div>
        </div>
      </div>
    </div>
  );
}
