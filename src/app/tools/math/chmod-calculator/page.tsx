'use client';

import { Button, Checkbox, Input, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

export default function ChmodCalculatorPage() {
  const [octal, setOctal] = useState('755');
  const [symbolic, setSymbolic] = useState('rwxr-xr-x');
  const [owner, setOwner] = useState({ read: true, write: true, execute: true });
  const [group, setGroup] = useState({ read: true, write: false, execute: true });
  const [others, setOthers] = useState({ read: true, write: false, execute: true });
  const [mode, setMode] = useState<'octal' | 'symbolic' | 'checkbox'>('octal');

  const calculateFromCheckbox = useCallback(() => {
    const ownerPerm = (owner.read ? 4 : 0) + (owner.write ? 2 : 0) + (owner.execute ? 1 : 0);
    const groupPerm = (group.read ? 4 : 0) + (group.write ? 2 : 0) + (group.execute ? 1 : 0);
    const othersPerm = (others.read ? 4 : 0) + (others.write ? 2 : 0) + (others.execute ? 1 : 0);
    setOctal(`${ownerPerm}${groupPerm}${othersPerm}`);
    setSymbolic(
      (owner.read ? 'r' : '-') +
        (owner.write ? 'w' : '-') +
        (owner.execute ? 'x' : '-') +
        (group.read ? 'r' : '-') +
        (group.write ? 'w' : '-') +
        (group.execute ? 'x' : '-') +
        (others.read ? 'r' : '-') +
        (others.write ? 'w' : '-') +
        (others.execute ? 'x' : '-')
    );
    message.success('权限计算成功');
  }, [owner, group, others]);

  const calculateFromOctal = useCallback(() => {
    const oct = octal.replace(/\D/g, '').slice(0, 3);
    if (oct.length < 3) {
      message.error('请输入3位八进制数');
      return;
    }
    const perms = oct.split('').map((d) => parseInt(d, 10));
    const binaryStr = perms.map((p) => p.toString(2).padStart(3, '0')).join('');

    setOwner({
      read: binaryStr[0] === '1',
      write: binaryStr[1] === '1',
      execute: binaryStr[2] === '1',
    });
    setGroup({
      read: binaryStr[3] === '1',
      write: binaryStr[4] === '1',
      execute: binaryStr[5] === '1',
    });
    setOthers({
      read: binaryStr[6] === '1',
      write: binaryStr[7] === '1',
      execute: binaryStr[8] === '1',
    });

    const sym =
      (binaryStr[0] === '1' ? 'r' : '-') +
      (binaryStr[1] === '1' ? 'w' : '-') +
      (binaryStr[2] === '1' ? 'x' : '-') +
      (binaryStr[3] === '1' ? 'r' : '-') +
      (binaryStr[4] === '1' ? 'w' : '-') +
      (binaryStr[5] === '1' ? 'x' : '-') +
      (binaryStr[6] === '1' ? 'r' : '-') +
      (binaryStr[7] === '1' ? 'w' : '-') +
      (binaryStr[8] === '1' ? 'x' : '-');
    setSymbolic(sym);
    message.success('权限计算成功');
  }, [octal]);

  const calculateFromSymbolic = useCallback(() => {
    const sym = symbolic.replace(/[^rwxs-]/g, '').slice(0, 9);
    if (sym.length !== 9) {
      message.error('请输入9位符号权限');
      return;
    }
    const perms = sym.split('').map((c) => (c !== '-' ? 1 : 0));
    const oct =
      (perms[0] * 4 + perms[1] * 2 + perms[2]).toString() +
      (perms[3] * 4 + perms[4] * 2 + perms[5]).toString() +
      (perms[6] * 4 + perms[7] * 2 + perms[8]).toString();
    setOctal(oct);
    setOwner({
      read: sym[0] === 'r',
      write: sym[1] === 'w',
      execute: sym[2] === 'x',
    });
    setGroup({
      read: sym[3] === 'r',
      write: sym[4] === 'w',
      execute: sym[5] === 'x',
    });
    setOthers({
      read: sym[6] === 'r',
      write: sym[7] === 'w',
      execute: sym[8] === 'x',
    });
    message.success('权限计算成功');
  }, [symbolic]);

  const getDescription = () => {
    const descriptions: string[] = [];
    if (owner.read) descriptions.push('所有者可读');
    if (owner.write) descriptions.push('所有者可写');
    if (owner.execute) descriptions.push('所有者可执行');
    if (group.read) descriptions.push('用户组可读');
    if (group.write) descriptions.push('用户组可写');
    if (group.execute) descriptions.push('用户组可执行');
    if (others.read) descriptions.push('其他人可读');
    if (others.write) descriptions.push('其他人可写');
    if (others.execute) descriptions.push('其他人可执行');
    return descriptions.join('，') || '无权限';
  };

  const handleCopy = (text: string) => {
    copy(text);
    message.success('复制成功');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔐 Chmod 权限计算</h1>
        <p className="text-gray-600">计算和转换文件权限</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">📐 输入模式</span>
        <div className="flex gap-2">
          <Button type={mode === 'octal' ? 'primary' : 'default'} onClick={() => setMode('octal')}>
            八进制
          </Button>
          <Button
            type={mode === 'symbolic' ? 'primary' : 'default'}
            onClick={() => setMode('symbolic')}
          >
            符号
          </Button>
          <Button
            type={mode === 'checkbox' ? 'primary' : 'default'}
            onClick={() => setMode('checkbox')}
          >
            勾选
          </Button>
        </div>
      </div>

      {mode === 'octal' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
          <span className="font-semibold text-gray-800 block mb-4">🔢 八进制输入</span>
          <div className="flex gap-3">
            <Input
              value={octal}
              onChange={(e) => setOctal(e.target.value)}
              placeholder="755"
              size="large"
              className="text-xl font-mono"
              maxLength={3}
            />
            <Button type="primary" size="large" onClick={calculateFromOctal}>
              计算
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">输入3位八进制数 (0-7)</p>
        </div>
      )}

      {mode === 'symbolic' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
          <span className="font-semibold text-gray-800 block mb-4">🔤 符号输入</span>
          <div className="flex gap-3">
            <Input
              value={symbolic}
              onChange={(e) => setSymbolic(e.target.value)}
              placeholder="rwxr-xr-x"
              size="large"
              className="text-xl font-mono"
              maxLength={9}
            />
            <Button type="primary" size="large" onClick={calculateFromSymbolic}>
              计算
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">输入9位权限符号 (rwx)</p>
        </div>
      )}

      {mode === 'checkbox' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
          <span className="font-semibold text-gray-800 block mb-4">☑️ 权限勾选</span>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="font-medium text-gray-700 mb-2">所有者</div>
              <Checkbox
                checked={owner.read}
                onChange={(e) => setOwner({ ...owner, read: e.target.checked })}
              >
                读
              </Checkbox>
              <Checkbox
                checked={owner.write}
                onChange={(e) => setOwner({ ...owner, write: e.target.checked })}
              >
                写
              </Checkbox>
              <Checkbox
                checked={owner.execute}
                onChange={(e) => setOwner({ ...owner, execute: e.target.checked })}
              >
                执行
              </Checkbox>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-2">用户组</div>
              <Checkbox
                checked={group.read}
                onChange={(e) => setGroup({ ...group, read: e.target.checked })}
              >
                读
              </Checkbox>
              <Checkbox
                checked={group.write}
                onChange={(e) => setGroup({ ...group, write: e.target.checked })}
              >
                写
              </Checkbox>
              <Checkbox
                checked={group.execute}
                onChange={(e) => setGroup({ ...group, execute: e.target.checked })}
              >
                执行
              </Checkbox>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-2">其他人</div>
              <Checkbox
                checked={others.read}
                onChange={(e) => setOthers({ ...others, read: e.target.checked })}
              >
                读
              </Checkbox>
              <Checkbox
                checked={others.write}
                onChange={(e) => setOthers({ ...others, write: e.target.checked })}
              >
                写
              </Checkbox>
              <Checkbox
                checked={others.execute}
                onChange={(e) => setOthers({ ...others, execute: e.target.checked })}
              >
                执行
              </Checkbox>
            </div>
            <div className="flex items-end">
              <Button type="primary" onClick={calculateFromCheckbox}>
                计算权限
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
        <span className="font-semibold text-gray-800 block mb-4">📊 权限结果</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">八进制</div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-mono font-bold text-blue-600">{octal}</span>
              <Button size="small" onClick={() => handleCopy(octal)}>
                复制
              </Button>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">符号</div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-mono font-bold text-green-600">{symbolic}</span>
              <Button size="small" onClick={() => handleCopy(symbolic)}>
                复制
              </Button>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">数字表示</div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-mono font-bold text-purple-600">
                {owner.read ? 4 : 0}
                {owner.write ? 2 : 0}
                {owner.execute ? 1 : 0}/{group.read ? 4 : 0}
                {group.write ? 2 : 0}
                {group.execute ? 1 : 0}/{others.read ? 4 : 0}
                {others.write ? 2 : 0}
                {others.execute ? 1 : 0}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <span className="text-sm text-yellow-800">{getDescription()}</span>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 常用权限: 755 (rwxr-xr-x) - 标准脚本权限</li>
          <li>• 常用权限: 644 (rw-r--r--) - 标准文件权限</li>
          <li>• 常用权限: 600 (rw-------) - 私有文件权限</li>
          <li>• 常用权限: 700 (rwx------) - 私有目录权限</li>
        </ul>
      </div>
    </div>
  );
}
