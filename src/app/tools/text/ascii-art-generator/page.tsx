'use client';
import { Button, Input, message, Select, Slider } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const FONT_PATTERNS: Record<string, string[]> = {
  standard: [
    '███████╗██╗   ██╗███████╗',
    '██╔════╝╚██╗ ██╔╝██╔════╝',
    '█████╗   ╚████╔╝ ███████╗',
    '██╔══╗    ╚██╔╝  ╚════██║',
    '██║     ██╔╝   ███████║',
    '╚═╝     ╚═╝    ╚══════╝',
  ],
  big: [
    '██╗    ██╗███████╗██╗      ██████╗ ██████╗ ',
    '██║    ██║██╔════╝██║     ██╔═══██╗██╔══██╗',
    '██║ █╗ ██║█████╗  ██║     ██║   ██║██████╔╝',
    '██║███╗██║██╔══╝  ██║     ██║   ██║██╔══██╗',
    '╚███╔███╔╝███████╗███████╗╚██████╔╝██║  ██║',
    ' ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝',
  ],
  narrow: [
    '██╗   ██╗███████╗',
    '██║   ██║██╔════╝',
    '██║   ██║█████╗  ',
    '╚██╗ ██╔╝██╔══╝  ',
    ' ╚████╔╝ ███████╗',
    '  ╚═══╝  ╚══════╝',
  ],
  slant: [
    '   __   __        _    __     __',
    '  / /  / /  ___  | |  / /__  / /_',
    ' / /  / /  / _ \\ | | / / _ \\/ __ \\',
    '/ /__/ /__/  __/ | |/ /  __/ /_/ /',
    '\\____/____/\\___/  |___/\\___/\\____/',
  ],
  bubble: [' ╭━━━╮  ╭━━━╮', ' ┃ ╭━╮ ┃ ┃ ╭━╮ ┃', ' ┃ ╰━╯ ┃ ┃ ╰━╯ ┃', ' ╰━━━╯  ╰━━━╯'],
  block: ['┌─┐┌─┐┌┬┐┬┌─┐┌┐┌', '├─┤├─┤ │ │├─┤│││', '┴ ┴┴ ┴ ┴ ┴┴ ┴┘┘┘'],
};

function generateAsciiArt(text: string, font: string): string {
  const pattern = FONT_PATTERNS[font] || FONT_PATTERNS.standard;
  const upperText = text.toUpperCase();

  const result: string[] = [];

  for (let line = 0; line < pattern.length; line++) {
    let row = '';
    for (const char of upperText) {
      const charCode = char.charCodeAt(0);
      if (charCode >= 65 && charCode <= 90) {
        const _charIndex = charCode - 65;
        const charLines = getCharAscii(char, font);
        row += charLines?.[line] || ' ';
      } else if (char === ' ') {
        row += ' ';
      } else {
        row += char;
      }
    }
    result.push(row);
  }

  return result.join('\n');
}

function getCharAscii(char: string, font: string): string[] | null {
  const charMap: Record<string, Record<string, string[]>> = {
    standard: {
      A: ['  A  ', ' A A ', 'AAAAA', 'A   A', 'A   A'],
      B: ['BBBB ', 'B   B', 'BBBB ', 'B   B', 'BBBB '],
      C: [' CCC ', 'C    ', 'C    ', 'C    ', ' CCC '],
      D: ['DDD  ', 'D  D ', 'D   D', 'D  D ', 'DDD  '],
      E: ['EEEEE', 'E    ', 'EEE  ', 'E    ', 'EEEEE'],
      F: ['FFFFF', 'F    ', 'FFF  ', 'F    ', 'F    '],
      G: [' GGG ', 'G    ', 'G  GG', 'G   G', ' GGG '],
      H: ['H   H', 'H   H', 'HHHHH', 'H   H', 'H   H'],
      I: ['IIIII', '  I  ', '  I  ', '  I  ', 'IIIII'],
      J: ['JJJJJ', '   J ', '   J ', 'J  J ', ' JJ  '],
      K: ['K   K', 'K  K ', 'KK   ', 'K  K ', 'K   K'],
      L: ['L    ', 'L    ', 'L    ', 'L    ', 'LLLLL'],
      M: ['M   M', 'MM MM', 'M M M', 'M   M', 'M   M'],
      N: ['N   N', 'NN  N', 'N N N', 'N  NN', 'N   N'],
      O: [' OOO ', 'O   O', 'O   O', 'O   O', ' OOO '],
      P: ['PPPP ', 'P   P', 'PPPP ', 'P    ', 'P    '],
      Q: [' QQQ ', 'Q   Q', 'Q Q Q', 'Q  Q ', ' QQ Q'],
      R: ['RRRR ', 'R   R', 'RRRR ', 'R  R ', 'R   R'],
      S: [' SSS ', 'S    ', ' SSS ', '    S', ' SSS '],
      T: ['TTTTT', '  T  ', '  T  ', '  T  ', '  T  '],
      U: ['U   U', 'U   U', 'U   U', 'U   U', ' UUU '],
      V: ['V   V', 'V   V', 'V   V', ' V V ', '  V  '],
      W: ['W   W', 'W   W', 'W W W', 'WW WW', 'W   W'],
      X: ['X   X', ' X X ', '  X  ', ' X X ', 'X   X'],
      Y: ['Y   Y', ' Y Y ', '  Y  ', '  Y  ', '  Y  '],
      Z: ['ZZZZZ', '   Z ', '  Z  ', ' Z   ', 'ZZZZZ'],
      '0': [' 000 ', '0   0', '0   0', '0   0', ' 000 '],
      '1': ['  1  ', ' 11  ', '  1  ', '  1  ', '11111'],
      '2': [' 222 ', '2   2', '  22 ', ' 2   ', '22222'],
      '3': ['3333 ', '    3', ' 333 ', '    3', '3333 '],
      '4': ['4   4', '4   4', '44444', '    4', '    4'],
      '5': ['55555', '5    ', '5555 ', '    5', '5555 '],
      '6': [' 6666 ', '6    ', '6666 ', '6   6', ' 666 '],
      '7': ['77777', '    7', '   7 ', '  7  ', '  7  '],
      '8': [' 888 ', '8   8', ' 888 ', '8   8', ' 888 '],
      '9': [' 9999', '9   9', ' 9999', '    9', ' 999 '],
      '-': ['     ', '     ', 'BBBBB', '     ', '     '],
      ' ': ['     ', '     ', '     ', '     ', '     '],
    },
    big: {
      A: ['   A   ', '  A A  ', ' AAAAA ', ' A   A ', ' A   A '],
      B: ['BBBB  ', 'B   B ', 'BBBB  ', 'B   B ', 'BBBB  '],
      C: [' CCC  ', 'C     ', 'C     ', 'C     ', ' CCC  '],
      D: ['DDD   ', 'D  D  ', 'D   D ', 'D  D  ', 'DDD   '],
      E: ['EEEEE ', 'E     ', 'EEE   ', 'E     ', 'EEEEE '],
      F: ['FFFFF ', 'F     ', 'FFF   ', 'F     ', 'F     '],
      G: [' GGG  ', 'G     ', 'G  GG ', 'G   G ', ' GGG  '],
      H: ['H   H ', 'H   H ', 'HHHHHH', 'H   H ', 'H   H '],
      I: ['IIIII ', '  I   ', '  I   ', '  I   ', 'IIIII '],
      J: ['JJJJJ ', '   J  ', '   J  ', 'J  J  ', ' JJ   '],
      K: ['K   K ', 'K  K  ', 'KK    ', 'K  K  ', 'K   K '],
      L: ['L     ', 'L     ', 'L     ', 'L     ', 'LLLLL '],
      M: ['M   M ', 'MM MM ', 'M M M ', 'M   M ', 'M   M '],
      N: ['N   N ', 'NN  N ', 'N N N ', 'N  NN ', 'N   N '],
      O: [' OOO  ', 'O   O ', 'O   O ', 'O   O ', ' OOO  '],
      P: ['PPPP  ', 'P   P ', 'PPPP  ', 'P     ', 'P     '],
      Q: [' QQQ  ', 'Q   Q ', 'Q Q Q ', 'Q  Q  ', ' QQ Q '],
      R: ['RRRR  ', 'R   R ', 'RRRR  ', 'R  R  ', 'R   R '],
      S: [' SSS  ', 'S     ', ' SSS  ', '    S ', ' SSS  '],
      T: ['TTTTT ', '  T   ', '  T   ', '  T   ', '  T   '],
      U: ['U   U ', 'U   U ', 'U   U ', 'U   U ', ' UUU  '],
      V: ['V   V ', 'V   V ', ' V V  ', ' V V  ', '  V   '],
      W: ['W   W ', 'W   W ', 'W W W ', 'WW WW ', 'W   W '],
      X: ['X   X ', ' X X  ', '  X   ', ' X X  ', 'X   X '],
      Y: ['Y   Y ', ' Y Y  ', '  Y   ', '  Y   ', '  Y   '],
      Z: ['ZZZZZ ', '   Z  ', '  Z   ', ' Z    ', 'ZZZZZ '],
      '0': [' 000  ', '0   0 ', '0   0 ', '0   0 ', ' 000  '],
      '1': ['  1   ', ' 11   ', '  1   ', '  1   ', '11111 '],
      '2': [' 222  ', '2   2 ', '  22  ', ' 2    ', '22222 '],
      '3': ['3333  ', '    3 ', ' 333  ', '    3 ', '3333  '],
      '4': ['4   4 ', '4   4 ', '444444', '    4 ', '    4 '],
      '5': ['55555 ', '5     ', '5555  ', '    5 ', '5555  '],
      '6': [' 6666 ', '6     ', '6666  ', '6   6 ', ' 666  '],
      '7': ['77777 ', '    7 ', '   7  ', '  7   ', '  7   '],
      '8': [' 888  ', '8   8 ', ' 888  ', '8   8 ', ' 888  '],
      '9': [' 9999 ', '9   9 ', ' 9999 ', '    9 ', ' 999  '],
      '-': ['      ', '      ', 'BBBBB ', '      ', '      '],
      ' ': ['      ', '      ', '      ', '      ', '      '],
    },
    narrow: {
      A: [' A  ', 'A A ', 'AAA ', 'A  A', 'A  A'],
      B: ['BBB ', 'B  B', 'BBB ', 'B  B', 'BBB '],
      C: [' CCC', 'C   ', 'C   ', 'C   ', ' CCC'],
      D: ['DDD', 'D D', 'D  D', 'D D', 'DDD'],
      E: ['EEE', 'E  ', 'EE ', 'E  ', 'EEE'],
      F: ['FFF', 'E  ', 'FF ', 'E  ', 'E  '],
      G: [' GG', 'G  ', 'G G', 'G  G', ' GG'],
      H: ['H H', 'H H', 'HHH', 'H H', 'H H'],
      I: ['I  ', 'I  ', 'I  ', 'I  ', 'I  '],
      J: ['  J', '  J', '  J', 'J J', ' JJ'],
      K: ['K K', 'KK ', 'K K', 'K K', 'K K'],
      L: ['L  ', 'L  ', 'L  ', 'L  ', 'LLL'],
      M: ['M M', 'MMM', 'M M', 'M M', 'M M'],
      N: ['N N', 'NN ', 'N N', 'N NN', 'N N'],
      O: [' OO', 'O O', 'O O', 'O O', ' OO'],
      P: ['PP ', 'P P', 'PP ', 'P  ', 'P  '],
      Q: [' QQ', 'Q Q', 'Q Q', 'Q Q', ' QQ'],
      R: ['RR ', 'R R', 'RR ', 'R R', 'R R'],
      S: ['SSS', 'S  ', ' S ', '  S', 'SSS'],
      T: ['T T', 'T T', 'T T', 'T T', ' T '],
      U: ['U U', 'U U', 'U U', 'U U', ' UU'],
      V: ['V V', 'V V', 'V V', ' V ', ' V '],
      W: ['W W', 'W W', 'W W', 'WW ', 'W W'],
      X: ['X X', ' X ', ' X ', 'X X', 'X X'],
      Y: ['Y Y', ' Y ', ' Y ', ' Y ', ' Y '],
      Z: ['ZZZ', '  Z', ' Z ', 'Z  ', 'ZZZ'],
      '0': [' 0 ', '0 0', '0 0', '0 0', ' 0 '],
      '1': [' 1 ', '11 ', ' 1 ', ' 1 ', '111'],
      '2': [' 2 ', '2 2', '  2', ' 2 ', '222'],
      '3': ['33 ', '  3', ' 33', '  3', '33 '],
      '4': ['4 4', '4 4', '444', '  4', '  4'],
      '5': ['555', '5  ', ' 55', '  5', '55 '],
      '6': [' 66', '6  ', '66 ', '6 6', ' 66'],
      '7': ['777', '  7', '  7', '  7', '  7'],
      '8': [' 88', '8 8', ' 88', '8 8', ' 88'],
      '9': [' 99', '9 9', ' 99', '  9', '99 '],
      '-': ['   ', '   ', 'BBB', '   ', '   '],
      ' ': ['   ', '   ', '   ', '   ', '   '],
    },
    slant: {},
    bubble: {},
    block: {},
  };

  return charMap[font]?.[char] || null;
}

export default function ASCIIArtGeneratorPage() {
  const [input, setInput] = useState('HELLO');
  const [output, setOutput] = useState('');
  const [font, setFont] = useState('standard');
  const [width, setWidth] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleGenerate = useCallback(() => {
    try {
      setLoading(true);
      const art = generateAsciiArt(input, font);
      const lines = art.split('\n').map((line) => {
        let expanded = '';
        for (const char of line) {
          expanded += char.repeat(width);
        }
        return expanded;
      });
      setOutput(lines.join('\n'));
      message.success('生成成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '生成失败');
    } finally {
      setLoading(false);
    }
  }, [input, font, width]);

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎭 ASCII 艺术字生成</h1>
        <p className="text-gray-600">将文本转换为 ASCII 艺术字</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <label className="font-semibold text-gray-800 block mb-4">📝 输入文本</label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入要转换的文本"
          className="font-mono text-lg"
          size="large"
          maxLength={20}
        />
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <label className="font-semibold text-gray-800 block mb-4">⚙️ 生成选项</label>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">字体样式</span>
          </div>
          <Select
            value={font}
            onChange={setFont}
            className="w-full"
            size="large"
            options={[
              { value: 'standard', label: 'Standard 标准' },
              { value: 'big', label: 'Big 大字' },
              { value: 'narrow', label: 'Narrow 窄体' },
              { value: 'slant', label: 'Slant 斜体' },
              { value: 'bubble', label: 'Bubble 气泡' },
              { value: 'block', label: 'Block 方块' },
            ]}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">横向放大</span>
            <span className="text-sm text-gray-500">{width}x</span>
          </div>
          <Slider
            min={1}
            max={4}
            value={width}
            onChange={setWidth}
            marks={{ 1: '1x', 2: '2x', 3: '3x', 4: '4x' }}
          />
        </div>
      </div>

      <Button
        type="primary"
        size="large"
        block
        onClick={handleGenerate}
        loading={loading}
        className="h-12 text-base font-medium mb-4"
      >
        🎨 生成 ASCII 艺术
      </Button>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="font-semibold text-gray-800">📋 生成结果</label>
            <Button onClick={handleCopy}>📋 复制</Button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-auto">
            <pre className="font-mono text-sm text-green-400 whitespace-pre">{output}</pre>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 建议输入英文字母和数字，效果最佳</li>
          <li>• 部分字体样式不支持所有字符</li>
          <li>• 复制后可在终端、README 等地方使用</li>
        </ul>
      </div>
    </div>
  );
}
