'use client';
import { Input, Tag } from 'antd';
import { useState } from 'react';

const { Search } = Input;

const gitCommands = [
  {
    category: '仓库操作',
    commands: [
      { cmd: 'git init', desc: '初始化一个 Git 仓库' },
      { cmd: 'git clone <url>', desc: '克隆一个远程仓库' },
      { cmd: 'git status', desc: '显示工作区状态' },
      { cmd: 'git remote -v', desc: '查看远程仓库' },
      { cmd: 'git remote add origin <url>', desc: '添加远程仓库' },
    ],
  },
  {
    category: '分支操作',
    commands: [
      { cmd: 'git branch', desc: '列出所有分支' },
      { cmd: 'git branch <name>', desc: '创建新分支' },
      { cmd: 'git checkout <branch>', desc: '切换分支' },
      { cmd: 'git checkout -b <branch>', desc: '创建并切换到新分支' },
      { cmd: 'git switch <branch>', desc: '切换分支 (新语法)' },
      { cmd: 'git switch -c <branch>', desc: '创建并切换 (新语法)' },
      { cmd: 'git merge <branch>', desc: '合并分支到当前分支' },
      { cmd: 'git rebase <branch>', desc: '变基到指定分支' },
      { cmd: 'git branch -d <branch>', desc: '删除分支' },
      { cmd: 'git branch -D <branch>', desc: '强制删除分支' },
    ],
  },
  {
    category: '文件操作',
    commands: [
      { cmd: 'git add <file>', desc: '添加文件到暂存区' },
      { cmd: 'git add .', desc: '添加所有文件' },
      { cmd: 'git add -A', desc: '添加所有文件（包括删除）' },
      { cmd: 'git rm <file>', desc: '删除文件并暂存' },
      { cmd: 'git mv <old> <new>', desc: '移动或重命名文件' },
      { cmd: 'git restore --staged <file>', desc: '取消暂存文件' },
      { cmd: 'git restore <file>', desc: '丢弃工作区修改' },
    ],
  },
  {
    category: '提交操作',
    commands: [
      { cmd: 'git commit -m "message"', desc: '提交并添加说明' },
      { cmd: 'git commit -am "message"', desc: '添加并提交（仅跟踪文件）' },
      { cmd: 'git commit --amend', desc: '修改最后一次提交' },
      { cmd: 'git commit --amend -m "msg"', desc: '修改最后一次提交信息' },
    ],
  },
  {
    category: '历史查看',
    commands: [
      { cmd: 'git log', desc: '查看提交历史' },
      { cmd: 'git log --oneline', desc: '简洁历史' },
      { cmd: 'git log -n', desc: '查看最近 n 条' },
      { cmd: 'git log --graph', desc: '图形化历史' },
      { cmd: 'git diff', desc: '查看工作区差异' },
      { cmd: 'git diff --staged', desc: '查看暂存区差异' },
      { cmd: 'git show <commit>', desc: '查看某次提交' },
      { cmd: 'git blame <file>', desc: '查看文件每行修改' },
    ],
  },
  {
    category: '暂存操作',
    commands: [
      { cmd: 'git stash', desc: '暂存当前修改' },
      { cmd: 'git stash push', desc: '暂存修改（推荐）' },
      { cmd: 'git stash pop', desc: '恢复并删除暂存' },
      { cmd: 'git stash apply', desc: '恢复修改' },
      { cmd: 'git stash list', desc: '查看暂存列表' },
      { cmd: 'git stash drop', desc: '删除暂存' },
      { cmd: 'git stash clear', desc: '清空所有暂存' },
    ],
  },
  {
    category: '远程操作',
    commands: [
      { cmd: 'git fetch', desc: '获取远程更新' },
      { cmd: 'git pull', desc: '拉取并合并' },
      { cmd: 'git push', desc: '推送到远程' },
      { cmd: 'git push -u origin <branch>', desc: '推送到远程新分支' },
      { cmd: 'git push --force', desc: '强制推送' },
      { cmd: 'git push origin --delete <branch>', desc: '删除远程分支' },
    ],
  },
  {
    category: '撤销操作',
    commands: [
      { cmd: 'git reset --soft HEAD~1', desc: '撤销提交，保留修改' },
      { cmd: 'git reset --mixed HEAD~1', desc: '撤销提交，保留文件' },
      { cmd: 'git reset --hard HEAD~1', desc: '撤销提交，丢弃修改' },
      { cmd: 'git revert <commit>', desc: '创建新提交撤销' },
    ],
  },
  {
    category: '标签操作',
    commands: [
      { cmd: 'git tag', desc: '列出所有标签' },
      { cmd: 'git tag <name>', desc: '创建轻量标签' },
      { cmd: 'git tag -a <name> -m "msg"', desc: '创建附注标签' },
      { cmd: 'git tag -d <name>', desc: '删除本地标签' },
      { cmd: 'git push origin <tag>', desc: '推送标签' },
      { cmd: 'git push origin --tags', desc: '推送所有标签' },
    ],
  },
];

export default function GitCheatsheetPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const categories = ['全部', ...gitCommands.map((c) => c.category)];

  const filteredCommands = gitCommands
    .filter((cat) => selectedCategory === '全部' || cat.category === selectedCategory)
    .map((cat) => ({
      ...cat,
      commands: cat.commands.filter(
        (cmd) =>
          search === '' ||
          cmd.cmd.toLowerCase().includes(search.toLowerCase()) ||
          cmd.desc.includes(search)
      ),
    }))
    .filter((cat) => cat.commands.length > 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 Git 命令速查</h1>
        <p className="text-gray-600">常用 Git 命令快速参考</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索命令或描述..."
              size="large"
              allowClear
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Tag
                key={cat}
                color={selectedCategory === cat ? 'blue' : 'default'}
                className="cursor-pointer px-3 py-1"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredCommands.map((cat) => (
          <div
            key={cat.category}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          >
            <h3 className="font-semibold text-gray-800 mb-4">{cat.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.commands.map(({ cmd, desc }) => (
                <div key={cmd} className="flex gap-3 p-2 rounded hover:bg-gray-50">
                  <code className="text-blue-600 font-mono text-sm whitespace-nowrap min-w-[180px]">
                    {cmd}
                  </code>
                  <span className="text-gray-600 text-sm">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 常用技巧</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• git config --global alias.st status - 设置别名</li>
          <li>• git config --global user.name "Name" - 设置用户名</li>
          <li>• git config --global user.email "email" - 设置邮箱</li>
          <li>• git log --all --graph --oneline - 可视化分支历史</li>
        </ul>
      </div>
    </div>
  );
}
