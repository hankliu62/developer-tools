'use client';

import { Input, Modal, message, Tag } from 'antd';
import CryptoJS from 'crypto-js';
import QRCode from 'qrcode';
import { useCallback, useEffect, useRef, useState } from 'react';

// ============================================================
// TYPES
// ============================================================

interface FateRecord {
  key: string;
  question: string;
  options: string[];
  answer: string;
  timestamp: number;
  fingerprint: string;
}

interface HistoryEntry {
  question: string;
  answer: string;
  options: string[];
  timestamp: number;
  isMine: boolean;
}

// ============================================================
// INDEXEDDB — 浏览器数据库
// ============================================================

const DB_NAME = 'FateDiceDB';
const DB_VERSION = 1;
const STORE_NAME = 'fate_records';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
    req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result);
    req.onerror = (e) => reject((e.target as IDBOpenDBRequest).error);
  });
}

async function saveRecord(record: FateRecord) {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(record);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

async function getRecord(key: string): Promise<FateRecord | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => {
      db.close();
      resolve(req.result);
    };
    req.onerror = () => {
      db.close();
      reject(req.error);
    };
  });
}

async function getAllRecords(): Promise<FateRecord[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).getAll();
    req.onsuccess = () => {
      db.close();
      resolve(req.result);
    };
    req.onerror = () => {
      db.close();
      reject(req.error);
    };
  });
}

// ============================================================
// FINGERPRINT
// ============================================================

const DEVICE_ID_KEY = 'fate_dice_device_id';

function generateFingerprint(): string {
  const parts = [
    navigator.userAgent,
    navigator.platform,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency,
  ];
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    try {
      deviceId = crypto.randomUUID();
    } catch {
      deviceId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    }
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return CryptoJS.SHA256(`${parts.join('||')}||${deviceId}`).toString();
}

function getQuestionKey(question: string, fingerprint: string): string {
  return CryptoJS.SHA256(`${question.toLowerCase().trim()}||${fingerprint}`).toString();
}

// ============================================================
// FATE LOGIC
// ============================================================

interface FateResult {
  answer: string;
  isExisting: boolean;
  key: string;
}

async function decideFate(
  question: string,
  options: string[],
  fingerprint: string
): Promise<FateResult> {
  const key = getQuestionKey(question, fingerprint);
  const existing = await getRecord(key);
  if (existing && options.includes(existing.answer)) {
    return { answer: existing.answer, isExisting: true, key };
  }
  const answer = options[Math.floor(Math.random() * options.length)];
  await saveRecord({ key, question, options, answer, timestamp: Date.now(), fingerprint });
  return { answer, isExisting: false, key };
}

// ============================================================
// SVG ICONS
// ============================================================

const GoldCrown = ({
  className = 'w-6 h-6',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <title>皇冠</title>
    <path d="M2 20h20M4 20V8l4 4 4-6 4 6 4-4v12" />
  </svg>
);

const ScrollIcon = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <title>卷轴</title>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" />
  </svg>
);

const StarIcon = ({
  className = 'w-4 h-4',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <title>星宿</title>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CloseIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <title>关闭</title>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PlusIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <title>添加</title>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const HistoryIcon = ({
  className = 'w-5 h-5',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <title>历史记录</title>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ============================================================
// MAIN COMPONENT
// ============================================================

const CHINESE_NUMERALS = ['○', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
const GOLD = '#D4A84B';
const GOLD_LIGHT = '#F0D080';
const GOLD_DARK = '#B8860B';

export default function FateOraclePage() {
  // ---------- State ----------
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<FateResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [fingerprint, setFingerprint] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [dbReady, setDbReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [historyModal, setHistoryModal] = useState<{
    question: string;
    answer: string;
    options: string[];
    timestamp: number;
  } | null>(null);
  const [savingImage, setSavingImage] = useState(false);
  const rollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rollingRef = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Ant Design message hook (avoids static context warning)
  const [messageApi, contextHolder] = message.useMessage();

  // ---------- Init ----------
  useEffect(() => {
    setMounted(true);
    const fp = generateFingerprint();
    setFingerprint(fp);
    openDB()
      .then(() => setDbReady(true))
      .catch(() => setDbReady(true));
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: loadHistory is stable and fingerprint is only dependency needed
  useEffect(() => {
    if (fingerprint) loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fingerprint]);

  useEffect(() => {
    return () => {
      if (rollRef.current) clearInterval(rollRef.current);
      rollingRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (showResult && resultRef.current) {
      setTimeout(
        () => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
        300
      );
    }
  }, [showResult]);

  // ---------- History ----------
  const loadHistory = async () => {
    try {
      const records = await getAllRecords();
      setHistory(
        records
          .map((r) => ({
            question: r.question,
            answer: r.answer,
            options: r.options,
            timestamp: r.timestamp,
            isMine: r.fingerprint === fingerprint,
          }))
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 30)
      );
    } catch {
      /* silent */
    }
  };

  // ---------- Share / Save Image (Canvas-based) ----------
  const W = 800; // card width in px
  const PAD = 48; // padding

  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    fill?: string | CanvasGradient,
    stroke?: string,
    strokeWidth?: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = strokeWidth || 1;
      ctx.stroke();
    }
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const lines: string[] = [];
    let current = '';
    for (const char of text) {
      const test = current + char;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = char;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines;
  };

  const drawShareCard = (
    ctx: CanvasRenderingContext2D,
    question: string,
    answer: string,
    timestamp: number,
    qrImage: HTMLImageElement
  ) => {
    const WIDTH = W;
    const HEIGHT = 540;

    // --- Background ---
    const bg = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    bg.addColorStop(0, '#0A061C');
    bg.addColorStop(0.35, '#11092A');
    bg.addColorStop(0.65, '#160A32');
    bg.addColorStop(1, '#0A061C');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Subtle nebula glows
    const g1 = ctx.createRadialGradient(-30, 50, 0, -30, 50, 200);
    g1.addColorStop(0, 'rgba(212,168,75,0.08)');
    g1.addColorStop(1, 'transparent');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, 300, 300);

    const g2 = ctx.createRadialGradient(700, 400, 0, 700, 400, 180);
    g2.addColorStop(0, 'rgba(139,92,246,0.05)');
    g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2;
    ctx.fillRect(500, 250, 300, 300);

    // --- Corner ornaments ---
    const ornX = PAD - 4;
    const ornY = PAD - 4;
    const ornS = 36;
    ctx.strokeStyle = 'rgba(212,168,75,0.3)';
    ctx.lineWidth = 1.5;

    // Top-left
    ctx.beginPath();
    ctx.moveTo(ornX, ornY + ornS);
    ctx.lineTo(ornX, ornY);
    ctx.lineTo(ornX + ornS, ornY);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(WIDTH - ornX - ornS, ornY);
    ctx.lineTo(WIDTH - ornX, ornY);
    ctx.lineTo(WIDTH - ornX, ornY + ornS);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(ornX, HEIGHT - ornY - ornS);
    ctx.lineTo(ornX, HEIGHT - ornY);
    ctx.lineTo(ornX + ornS, HEIGHT - ornY);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(WIDTH - ornX - ornS, HEIGHT - ornY);
    ctx.lineTo(WIDTH - ornX, HEIGHT - ornY);
    ctx.lineTo(WIDTH - ornX, HEIGHT - ornY - ornS);
    ctx.stroke();

    // Corner dots
    ctx.fillStyle = 'rgba(212,168,75,0.15)';
    [
      [ornX + 2, ornY + 2],
      [WIDTH - ornX - 2, ornY + 2],
      [ornX + 2, HEIGHT - ornY - 2],
      [WIDTH - ornX - 2, HEIGHT - ornY - 2],
    ].forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Top accent line
    const accGrad = ctx.createLinearGradient(WIDTH * 0.15, 0, WIDTH * 0.85, 0);
    accGrad.addColorStop(0, 'transparent');
    accGrad.addColorStop(0.3, 'rgba(212,168,75,0.35)');
    accGrad.addColorStop(0.5, 'rgba(212,168,75,0.2)');
    accGrad.addColorStop(0.7, 'rgba(212,168,75,0.35)');
    accGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = accGrad;
    ctx.fillRect(WIDTH * 0.15, 0, WIDTH * 0.7, 1);

    // --- Header ---
    ctx.textAlign = 'center';
    ctx.font = '28px "Playfair Display", serif';
    ctx.fillStyle = 'rgba(212,168,75,0.5)';
    ctx.fillText('☰', WIDTH / 2, 73);

    const titleGrad = ctx.createLinearGradient(WIDTH / 2 - 80, 0, WIDTH / 2 + 80, 0);
    titleGrad.addColorStop(0, '#F5E6B8');
    titleGrad.addColorStop(0.5, '#D4A84B');
    titleGrad.addColorStop(1, '#C49A3E');
    ctx.font = '700 26px "Playfair Display", serif';
    ctx.textBaseline = 'top';
    ctx.fillStyle = titleGrad;
    ctx.fillText('天 机 卷', WIDTH / 2, 86);

    ctx.font = '400 11px Orbitron, sans-serif';
    ctx.fillStyle = 'rgba(212,168,75,0.4)';
    ctx.fillText('S C R O L L   O F   F A T E', WIDTH / 2, 118);

    // --- Divider 1 ---
    const divY = 144;
    const divGrad = ctx.createLinearGradient(PAD, 0, WIDTH - PAD, 0);
    divGrad.addColorStop(0, 'transparent');
    divGrad.addColorStop(0.25, 'rgba(212,168,75,0.3)');
    divGrad.addColorStop(0.5, 'rgba(212,168,75,0.15)');
    divGrad.addColorStop(0.75, 'rgba(212,168,75,0.3)');
    divGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = divGrad;
    ctx.fillRect(PAD, divY, WIDTH - PAD * 2, 1);

    // --- Question Section ---
    let y = divY + 36;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = '700 11px "Playfair Display", serif';
    ctx.fillStyle = '#D4A84B';
    ctx.fillText('所 问 之 事', PAD, y);
    y += 18;

    // Question card
    const cardX = PAD;
    const cardW = WIDTH - PAD * 2;
    const cardPad = 18;
    ctx.font = '700 17px "Playfair Display", serif';
    const qLines = wrapText(ctx, question, cardW - cardPad * 2 - 8);
    const qLineH = 26;
    const qCardH = Math.max(qLines.length * qLineH + cardPad * 2, 56);

    drawRoundedRect(
      ctx,
      cardX,
      y,
      cardW,
      qCardH,
      12,
      'linear-gradient(145deg, rgba(32,22,60,0.85), rgba(18,10,42,0.7))',
      'rgba(212,168,75,0.12)',
      1
    );

    // Top highlight line inside card
    ctx.fillStyle = 'rgba(212,168,75,0.06)';
    ctx.fillRect(cardX + 20, y + 1, cardW - 40, 1);

    ctx.fillStyle = '#FFFFFF';
    qLines.forEach((line, i) => {
      ctx.fillText(line, cardX + cardPad, y + cardPad + i * qLineH);
    });

    y += qCardH + 30;

    // --- Answer Section ---
    ctx.font = '700 11px "Playfair Display", serif';
    ctx.fillStyle = '#D4A84B';
    ctx.textBaseline = 'top';
    ctx.fillText('天 命 所 指', PAD, y);
    y += 18;

    // Answer card
    const aCardH = 100;
    // Glow aura
    const auraGrad = ctx.createRadialGradient(
      WIDTH / 2,
      y + aCardH / 2,
      0,
      WIDTH / 2,
      y + aCardH / 2,
      90
    );
    auraGrad.addColorStop(0, 'rgba(212,168,75,0.12)');
    auraGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = auraGrad;
    ctx.fillRect(cardX, y, cardW, aCardH);

    // Card background
    drawRoundedRect(
      ctx,
      cardX,
      y,
      cardW,
      aCardH,
      14,
      'linear-gradient(145deg, rgba(212,168,75,0.18), rgba(180,140,60,0.08), rgba(139,92,246,0.04))',
      'rgba(212,168,75,0.4)',
      1
    );

    // Concentric ring
    ctx.strokeStyle = 'rgba(212,168,75,0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(WIDTH / 2, y + aCardH / 2, 40, 0, Math.PI * 2);
    ctx.stroke();

    // Answer text with glow
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(212,168,75,0.3)';
    ctx.shadowBlur = 30;
    ctx.font = '900 40px "Playfair Display", serif';
    ctx.fillStyle = '#FFFFFF';
    // Truncate answer if too long
    const displayAnswer = answer.length > 12 ? `${answer.slice(0, 10)}…` : answer;
    ctx.fillText(displayAnswer, WIDTH / 2, y + aCardH / 2);
    ctx.shadowBlur = 0;

    // --- Bottom divider ---
    const bDivY = HEIGHT - 76;
    const bDivGrad = ctx.createLinearGradient(PAD + 60, 0, WIDTH - PAD - 60, 0);
    bDivGrad.addColorStop(0, 'transparent');
    bDivGrad.addColorStop(0.5, 'rgba(212,168,75,0.2)');
    bDivGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = bDivGrad;
    ctx.fillRect(PAD + 60, bDivY, WIDTH - PAD * 2 - 120, 1);

    // --- Bottom: timestamp + QR ---
    const bY = bDivY + 20;

    // Left: Timestamp & brand
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = '12px "Playfair Display", serif';
    ctx.fillStyle = 'rgba(212,168,75,0.35)';
    const timeStr = new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    ctx.fillText(timeStr, PAD, bY);

    ctx.font = '400 10px Orbitron, sans-serif';
    ctx.fillStyle = 'rgba(212,168,75,0.2)';
    ctx.fillText('F A T E   S E A L E D', PAD, bY + 20);

    // Right: QR Code
    const qrSize = 72;
    const qrX = WIDTH - PAD - qrSize - 8;
    const qrY = bY - 2;

    // QR background
    drawRoundedRect(ctx, qrX - 4, qrY - 4, qrSize + 8, qrSize + 8, 6, 'rgba(10,6,28,0.5)');
    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

    ctx.textAlign = 'center';
    ctx.font = '400 7px Orbitron, sans-serif';
    ctx.fillStyle = 'rgba(212,168,75,0.25)';
    ctx.fillText('扫 码 查 看 全 卷', qrX + qrSize / 2, qrY + qrSize + 6);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: historyModal/setSavingImage intentionally excluded to prevent recreation on every render
  const handleSaveImage = useCallback(async () => {
    if (!historyModal) return;
    setSavingImage(true);
    try {
      const shareUrl = `${window.location.origin}/tools/life/fate-dice/record?data=${encodeURIComponent(
        JSON.stringify({
          question: historyModal.question,
          answer: historyModal.answer,
          options: historyModal.options,
          timestamp: historyModal.timestamp,
        })
      )}`;
      // Generate QR code data URL
      const qrDataUrl = await QRCode.toDataURL(shareUrl, {
        width: 160,
        margin: 1,
        color: { dark: '#D4A84B', light: '#0A061C' },
      });

      // Load QR code image
      const qrImage = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = qrDataUrl;
      });

      // Create canvas and draw the share card
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = 540;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D context not available');

      drawShareCard(
        ctx,
        historyModal.question,
        historyModal.answer,
        historyModal.timestamp,
        qrImage
      );

      // Convert to blob and download
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            messageApi.error({ content: '生成图片失败', className: 'gold-message' });
            setSavingImage(false);
            return;
          }
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `天命灵签_${new Date().toISOString().slice(0, 10)}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          messageApi.success({ content: '天机卷已保存至本地', className: 'gold-message' });
          setSavingImage(false);
        },
        'image/png',
        1.0
      );
    } catch (err) {
      messageApi.error({ content: '保存图片失败', className: 'gold-message' });
      console.error(err);
      setSavingImage(false);
    }
  }, [historyModal, messageApi]);

  const handleCopyLink = () => {
    if (!historyModal) return;
    const shareUrl = `${window.location.origin}/tools/life/fate-dice/record?data=${encodeURIComponent(
      JSON.stringify({
        question: historyModal.question,
        answer: historyModal.answer,
        options: historyModal.options,
        timestamp: historyModal.timestamp,
      })
    )}`;
    navigator.clipboard.writeText(shareUrl).then(
      () => messageApi.success({ content: '链接已复制，可分享给好友', className: 'gold-message' }),
      () => messageApi.error({ content: '复制失败', className: 'gold-message' })
    );
  };

  // ---------- Roll ----------
  const handleRoll = async () => {
    const q = question.trim();
    if (!q) {
      messageApi.error({ content: '请提出你的问题', className: 'gold-message' });
      return;
    }
    const validOptions = options.map((o) => o.trim()).filter(Boolean);
    if (validOptions.length < 2) {
      messageApi.error({ content: '至少需要 2 个选项', className: 'gold-message' });
      return;
    }
    if (new Set(validOptions).size !== validOptions.length) {
      messageApi.error({ content: '选项不能重复', className: 'gold-message' });
      return;
    }

    setRolling(true);
    rollingRef.current = true;
    setResult(null);
    setShowResult(false);
    setDisplayText('');
    // Phase 1: Summoning (divination array forms) — 1s
    await new Promise((r) => setTimeout(r, 1000));
    if (!rollingRef.current) return; // cancelled / unmounted

    // Phase 2: Cycle through options
    let count = 0;
    const totalFrames = 28;

    if (rollRef.current) clearInterval(rollRef.current);
    rollRef.current = setInterval(() => {
      const idx = Math.floor(Math.random() * validOptions.length);
      setDisplayText(validOptions[idx]);
      count++;
      if (count >= totalFrames) {
        if (rollRef.current) {
          clearInterval(rollRef.current);
          rollRef.current = null;
        }
        decideFate(q, validOptions, fingerprint).then((fate) => {
          setResult(fate);
          setDisplayText(fate.answer);
          setRolling(false);
          rollingRef.current = false;
          setShowResult(true);
          loadHistory();
        });
      }
    }, 120);
  };

  // ---------- Option helpers ----------
  const addOption = () => setOptions([...options, '']);
  const removeOption = (i: number) => {
    if (options.length <= 2) {
      messageApi.warning({ content: '至少保留 2 个选项', className: 'gold-message' });
      return;
    }
    setOptions(options.filter((_, j) => j !== i));
  };
  const updateOption = (i: number, val: string) => {
    const n = [...options];
    n[i] = val;
    setOptions(n);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      {contextHolder}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&display=swap');

        .font-orbitron { font-family: 'Orbitron', sans-serif; letter-spacing: 0.06em; }
        .font-playfair { font-family: 'Playfair Display', serif; }

        /* ---- Animations ---- */

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-120px) scale(0.3); opacity: 0; }
        }

        @keyframes ring-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes ring-rotate-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        @keyframes light-beam {
          0% { transform: scaleY(0); opacity: 0; }
          30% { transform: scaleY(1); opacity: 1; }
          70% { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(0); opacity: 0; }
        }

        @keyframes divine-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.08); }
        }

        @keyframes text-cycle {
          0% { transform: translateY(-10px); opacity: 0; filter: blur(4px); }
          20% { transform: translateY(0); opacity: 1; filter: blur(0); }
          80% { transform: translateY(0); opacity: 1; filter: blur(0); }
          100% { transform: translateY(10px); opacity: 0; filter: blur(4px); }
        }

        @keyframes reveal-scale {
          0% { transform: scale(0.3) rotateY(90deg); opacity: 0; filter: blur(8px); }
          50% { transform: scale(1.1) rotateY(0deg); opacity: 1; filter: blur(0); }
          100% { transform: scale(1) rotateY(0deg); opacity: 1; filter: blur(0); }
        }

        @keyframes seal-stamp {
          0% { transform: scale(3) rotate(-15deg); opacity: 0; }
          40% { transform: scale(0.95) rotate(-2deg); opacity: 1; }
          60% { transform: scale(1.05) rotate(0deg); opacity: 1; }
          80% { transform: scale(0.98) rotate(1deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        @keyframes gold-dust {
          0% { transform: translate(0,0) scale(1); opacity: 0.8; }
          100% { transform: translate(var(--dx,50px), var(--dy,-80px)) scale(0); opacity: 0; }
        }

        @keyframes glory-ray {
          0% { transform: scale(0); opacity: 0; }
          30% { transform: scale(1.5); opacity: 0.4; }
          60% { transform: scale(2); opacity: 0.15; }
          100% { transform: scale(2.5); opacity: 0; }
        }

        @keyframes rune-glow {
          0%, 100% { opacity: 0.2; filter: blur(1px); }
          50% { opacity: 0.7; filter: blur(0); }
        }

        /* —— Smoke / Mist —— */
        @keyframes smoke-wisp {
          0% { transform: translate(0, 0) scale(1); opacity: 0; filter: blur(12px); }
          15% { opacity: 0.25; filter: blur(8px); }
          50% { opacity: 0.2; filter: blur(10px); }
          85% { opacity: 0.15; filter: blur(14px); }
          100% { transform: translate(var(--sx,30px), var(--sy,-60px)) scale(1.3); opacity: 0; filter: blur(20px); }
        }
        @keyframes smoke-breath {
          0%, 100% { opacity: 0.08; filter: blur(16px) brightness(0.8); }
          50% { opacity: 0.22; filter: blur(10px) brightness(1.2); }
        }
        @keyframes smoke-ember {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          30% { opacity: 0.6; }
          70% { opacity: 0.3; }
          100% { transform: translateY(-40px) scale(0.3); opacity: 0; }
        }

        /* —— Question card —— */
        @keyframes border-shimmer {
          0%, 100% { border-color: rgba(212,168,75,0.12); box-shadow: 0 0 12px rgba(212,168,75,0.03); }
          50% { border-color: rgba(212,168,75,0.35); box-shadow: 0 0 28px rgba(212,168,75,0.1), inset 0 0 12px rgba(212,168,75,0.04); }
        }
        @keyframes star-drift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.3; }
          100% { transform: translateY(-70px) translateX(var(--dx, 15px)); opacity: 0; }
        }
        @keyframes glass-shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* —— Answer card —— */
        @keyframes answer-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(212,168,75,0.4), 0 2px 12px rgba(0,0,0,0.5), 0 0 60px rgba(212,168,75,0.1); }
          50% { text-shadow: 0 0 45px rgba(212,168,75,0.8), 0 0 90px rgba(212,168,75,0.3), 0 2px 12px rgba(0,0,0,0.5); }
        }
        @keyframes ripple-ring {
          0% { transform: scale(0.6); opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes oracle-rune {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          15% { opacity: 0.5; }
          75% { opacity: 0.3; }
          100% { transform: translateY(-90px) rotate(25deg); opacity: 0; }
        }
        @keyframes aura-pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.15); }
        }

        /* —— Selected fortune slip (天命所归) —— */
        @keyframes fate-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(212,168,75,0.18), inset 0 0 30px rgba(212,168,75,0.08); }
          50% { box-shadow: 0 0 70px rgba(212,168,75,0.3), inset 0 0 50px rgba(212,168,75,0.15); }
        }
        @keyframes fate-border {
          0%, 100% { border-color: rgba(212,168,75,0.6); }
          50% { border-color: rgba(212,168,75,0.85); }
        }
        @keyframes border-run {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes seal-breath {
          0%, 100% { box-shadow: 0 0 14px rgba(220,38,38,0.5), inset 0 1px 0 rgba(255,255,255,0.2); transform: rotate(12deg) scale(1); }
          50% { box-shadow: 0 0 28px rgba(220,38,38,0.7), 0 0 50px rgba(220,38,38,0.2), inset 0 1px 0 rgba(255,255,255,0.2); transform: rotate(12deg) scale(1.08); }
        }
        @keyframes chosen-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.15); }
        }
        @keyframes victory-particle {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.4; }
          100% { transform: translateY(-50px) scale(0.2); opacity: 0; }
        }

        /* Ant Design overrides */
        .gold-message { font-family: 'Playfair Display', serif; }
        .ant-message-notice-content {
          border-radius: 12px !important;
          border: 1px solid rgba(212,168,75,0.3) !important;
        }

        .fate-input .ant-input {
          border-radius: 12px !important;
          background: rgba(20,15,40,0.7) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(212,168,75,0.25) !important;
          color: #FFF8EC !important;
          font-size: 16px !important;
          padding: 10px 16px !important;
          height: 48px !important;
          text-shadow: 0 1px 4px rgba(0,0,0,0.4) !important;
          transition: all 0.3s ease;
        }
        .fate-input .ant-input:hover {
          border-color: rgba(212,168,75,0.5) !important;
          background: rgba(25,18,48,0.75) !important;
        }
        .fate-input .ant-input:focus {
          border-color: #D4A84B !important;
          box-shadow: 0 0 0 3px rgba(212,168,75,0.15), 0 0 20px rgba(212,168,75,0.08) !important;
          background: rgba(25,18,48,0.8) !important;
        }
        .fate-input .ant-input::placeholder { color: rgba(200,180,150,0.4) !important; }

        .fate-textarea .ant-input {
          border-radius: 14px !important;
          background: rgba(20,15,40,0.7) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(212,168,75,0.25) !important;
          color: #FFF8EC !important;
          font-size: 16px !important;
          padding: 14px 18px !important;
          text-shadow: 0 1px 4px rgba(0,0,0,0.4) !important;
          transition: all 0.3s ease;
        }
        .fate-textarea .ant-input:hover {
          border-color: rgba(212,168,75,0.5) !important;
          background: rgba(25,18,48,0.75) !important;
        }
        .fate-textarea .ant-input:focus {
          border-color: #D4A84B !important;
          box-shadow: 0 0 0 3px rgba(212,168,75,0.15), 0 0 20px rgba(212,168,75,0.08) !important;
          background: rgba(25,18,48,0.8) !important;
        }
        .fate-textarea .ant-input::placeholder { color: rgba(200,180,150,0.4) !important; }
        .fate-textarea .ant-input-textarea-show-count::after {
          color: rgba(200,180,150,0.35) !important;
          font-size: 12px;
          padding-right: 4px;
          padding-bottom: 4px;
        }
      `}</style>

      {/* ============================================================ */}
      {/* BACKGROUND */}
      {/* ============================================================ */}
      <div
        className="relative min-h-screen overflow-hidden"
        style={{
          background:
            'linear-gradient(160deg, #050510 0%, #0F0A1E 25%, #1A0A2E 50%, #0F0818 75%, #050510 100%)',
        }}
      >
        {/* Stars (client-only to avoid hydration mismatch) */}
        {mounted && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  background: i % 3 === 0 ? GOLD_LIGHT : i % 3 === 1 ? '#ffffff' : '#8B5CF6',
                  opacity: 0.3 + Math.random() * 0.5,
                  animation: `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {/* Floating gold dust (client-only to avoid hydration mismatch) */}
        {mounted && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`dust-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${70 + Math.random() * 30}%`,
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                  background: GOLD,
                  opacity: 0,
                  animation: `float-up ${6 + Math.random() * 8}s ease-out ${Math.random() * 10}s infinite`,
                  boxShadow: `0 0 6px ${GOLD}88`,
                }}
              />
            ))}
          </div>
        )}

        {/* Nebula glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-32 top-1/4 h-96 w-96 rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #D4A84B 0%, transparent 70%)' }}
          />
          <div
            className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full opacity-8 blur-3xl"
            style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
          />
          <div
            className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full opacity-6 blur-3xl"
            style={{ background: 'radial-gradient(circle, #00D4AA 0%, transparent 70%)' }}
          />
        </div>

        {/* ============================================================ */}
        {/* CONTENT */}
        {/* ============================================================ */}
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-10">
          {/* ---- HEADER ---- */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center justify-center">
              <div className="relative">
                {/* Glow halo */}
                <div
                  className="absolute -inset-4 rounded-full opacity-30 blur-xl"
                  style={{ background: `radial-gradient(circle, ${GOLD} 0%, transparent 70%)` }}
                />
                {/* Icon */}
                <div
                  className="relative flex h-20 w-20 items-center justify-center rounded-2xl"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(212,168,75,0.3), rgba(240,208,128,0.1))',
                    border: '1px solid rgba(212,168,75,0.3)',
                    boxShadow: `0 0 30px ${GOLD}22`,
                  }}
                >
                  <GoldCrown className="h-10 w-10" style={{ color: GOLD }} />
                </div>
              </div>
            </div>

            <h1
              className="font-playfair mb-2 text-5xl font-black tracking-widest sm:text-6xl"
              style={{
                background: 'linear-gradient(180deg, #F0D080 0%, #D4A84B 40%, #B8860B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
                filter: 'drop-shadow(0 2px 12px rgba(212,168,75,0.3))',
              }}
            >
              天命
            </h1>
            <p
              className="font-orbitron text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: GOLD, opacity: 0.7 }}
            >
              天命灵签 · Divine Fate Sigil
            </p>
            <p className="mt-2 text-sm" style={{ color: 'rgba(160,144,128,0.7)' }}>
              焚香问天 · 一签定命 · 天命既出 · 永世不移
            </p>
          </div>

          {/* ---- MAIN DIVINATION CARD ---- */}
          <div className="group relative mb-8">
            {/* Outer glow border */}
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-0 blur-sm transition-all duration-700 group-hover:opacity-100"
              style={{
                background: `linear-gradient(135deg, ${GOLD}44, transparent 40%, ${GOLD}22 60%, transparent 80%, ${GOLD}33)`,
              }}
            />

            <div
              className="relative rounded-2xl backdrop-blur-xl transition-all duration-500"
              style={{
                background: 'rgba(15,10,30,0.75)',
                border: '1px solid rgba(212,168,75,0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,75,0.08)',
              }}
            >
              {/* Corner ornaments */}
              <div
                className="pointer-events-none absolute left-0 top-0 h-8 w-8 rounded-tl-2xl"
                style={{ borderLeft: `2px solid ${GOLD}55`, borderTop: `2px solid ${GOLD}55` }}
              />
              <div
                className="pointer-events-none absolute right-0 top-0 h-8 w-8 rounded-tr-2xl"
                style={{ borderRight: `2px solid ${GOLD}55`, borderTop: `2px solid ${GOLD}55` }}
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-8 w-8 rounded-bl-2xl"
                style={{ borderLeft: `2px solid ${GOLD}55`, borderBottom: `2px solid ${GOLD}55` }}
              />
              <div
                className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 rounded-br-2xl"
                style={{ borderRight: `2px solid ${GOLD}55`, borderBottom: `2px solid ${GOLD}55` }}
              />

              <div className="relative space-y-8 p-6 sm:p-10">
                {/* ---- Question ---- */}
                <div>
                  <label
                    className="mb-4 flex items-center gap-2.5 text-base font-semibold tracking-wider"
                    style={{ color: GOLD_LIGHT }}
                  >
                    <ScrollIcon className="h-5 w-5" />
                    你所问之事
                  </label>
                  <div className="fate-textarea">
                    <Input.TextArea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="例：今日当行何事？此路可通否？..."
                      rows={3}
                      maxLength={200}
                      showCount
                      className="!rounded-xl !text-base"
                    />
                  </div>
                </div>

                {/* ---- Options as Tally Sticks ---- */}
                <div>
                  <label
                    className="mb-4 flex items-center gap-2.5 text-base font-semibold tracking-wider"
                    style={{ color: GOLD_LIGHT }}
                  >
                    <StarIcon className="h-5 w-5" />
                    天命选项 <span className="font-normal opacity-60">（至少 2 签）</span>
                  </label>

                  <div className="space-y-3">
                    {options.map((opt, i) => (
                      <div key={i} className="group/opt relative">
                        <div
                          className="absolute -inset-[0.5px] rounded-xl opacity-0 transition-opacity duration-300 group-hover/opt:opacity-100"
                          style={{
                            background: `linear-gradient(135deg, ${GOLD}33, transparent 50%, ${GOLD}22)`,
                          }}
                        />
                        <div
                          className="relative flex items-center gap-3 rounded-xl p-1 backdrop-blur-sm"
                          style={{
                            background:
                              i % 2 === 0
                                ? 'linear-gradient(135deg, rgba(255,255,255,0.04), transparent)'
                                : 'linear-gradient(225deg, rgba(255,255,255,0.04), transparent)',
                          }}
                        >
                          {/* Tally number — Chinese numeral */}
                          <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-serif text-xl font-bold tracking-wider"
                            style={{
                              color: GOLD,
                              background: 'rgba(255,255,255,0.05)',
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                              border: `1px solid ${GOLD}22`,
                            }}
                          >
                            {CHINESE_NUMERALS[i + 1] || i + 1}
                          </div>

                          <div className="fate-input flex-1">
                            <Input
                              value={opt}
                              onChange={(e) => updateOption(i, e.target.value)}
                              placeholder={`第${CHINESE_NUMERALS[i + 1] || i + 1}签`}
                              className="!rounded-lg"
                              onPressEnter={i === options.length - 1 ? addOption : undefined}
                            />
                          </div>

                          {options.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeOption(i)}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg opacity-0 transition-all duration-200 hover:bg-red-500/10 group-hover/opt:opacity-100"
                              style={{ color: 'rgba(255,100,100,0.6)' }}
                            >
                              <CloseIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addOption}
                    className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed py-4 text-sm font-medium tracking-wider backdrop-blur-sm transition-all duration-300"
                    style={{
                      borderColor: `${GOLD}22`,
                      color: `${GOLD}77`,
                      background: 'rgba(255,255,255,0.03)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${GOLD}55`;
                      e.currentTarget.style.color = GOLD_LIGHT;
                      e.currentTarget.style.background = 'rgba(212,168,75,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${GOLD}22`;
                      e.currentTarget.style.color = `${GOLD}77`;
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    <PlusIcon className="h-4 w-4" />
                    加添一签
                  </button>
                </div>

                {/* ---- Ask Heaven Button ---- */}
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={handleRoll}
                    disabled={rolling || !dbReady}
                    className="group/btn relative cursor-pointer"
                  >
                    {/* Outer glow ring */}
                    {!rolling && (
                      <div
                        className="absolute -inset-3 rounded-full opacity-50 blur-lg transition-all duration-500 group-hover/btn:opacity-80"
                        style={{
                          background: `radial-gradient(circle, ${GOLD}44, transparent 70%)`,
                        }}
                      />
                    )}

                    <div
                      className="relative flex items-center gap-3 rounded-xl px-12 py-4 font-bold tracking-widest text-white transition-all duration-300"
                      style={
                        rolling
                          ? {
                              background:
                                'linear-gradient(135deg, rgba(100,90,80,0.5), rgba(80,70,60,0.5))',
                              cursor: 'not-allowed',
                              opacity: 0.6,
                            }
                          : {
                              background: `linear-gradient(135deg, ${GOLD}, #B8860B)`,
                              boxShadow: `0 4px 24px ${GOLD}44`,
                              cursor: 'pointer',
                            }
                      }
                      onMouseEnter={(e) => {
                        if (!rolling) {
                          e.currentTarget.style.boxShadow = `0 8px 40px ${GOLD}66`;
                          e.currentTarget.style.transform = 'scale(1.03)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!rolling) {
                          e.currentTarget.style.boxShadow = `0 4px 24px ${GOLD}44`;
                          e.currentTarget.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      {rolling ? (
                        <>
                          <span
                            className="inline-block"
                            style={{ animation: 'ring-rotate 1s linear infinite' }}
                          >
                            ◎
                          </span>
                          <span className="tracking-[0.2em]">天机运转...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-lg">☰</span>
                          <span className="text-base tracking-[0.25em]">问 天</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>

                {/* ---- RESULT AREA ---- */}
                {(rolling || showResult) && (
                  <div ref={resultRef} className="overflow-hidden rounded-xl">
                    <div
                      className="mb-3 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)`,
                      }}
                    />

                    <div
                      className="relative min-h-[260px] rounded-xl p-6 sm:p-10"
                      style={{
                        background: rolling
                          ? 'radial-gradient(ellipse at center, rgba(212,168,75,0.05) 0%, transparent 70%)'
                          : 'radial-gradient(ellipse at center, rgba(212,168,75,0.08) 0%, transparent 70%)',
                        border: `1px solid ${GOLD}15`,
                      }}
                    >
                      {/* ---- ROLLING: Divination Ceremony ---- */}
                      {rolling && (
                        <div className="flex flex-col items-center justify-center gap-4 py-4">
                          {/* Divination Array */}
                          <div className="relative flex h-36 w-36 items-center justify-center">
                            {/* Outer ring */}
                            <div
                              className="absolute inset-0 rounded-full"
                              style={{
                                border: `1.5px solid ${GOLD}33`,
                                animation: 'ring-rotate 4s linear infinite',
                              }}
                            />
                            {/* Middle ring */}
                            <div
                              className="absolute inset-2 rounded-full"
                              style={{
                                border: `1px dashed ${GOLD}22`,
                                animation: 'ring-rotate-reverse 3s linear infinite',
                              }}
                            />
                            {/* Inner ring */}
                            <div
                              className="absolute inset-5 rounded-full"
                              style={{
                                border: `1px solid ${GOLD}15`,
                                animation: 'ring-rotate 2s linear infinite',
                              }}
                            />
                            {/* Center glow */}
                            <div
                              className="absolute h-16 w-16 rounded-full"
                              style={{
                                background: `radial-gradient(circle, ${GOLD}33, transparent 70%)`,
                                animation: 'divine-pulse 1.5s ease-in-out infinite',
                              }}
                            />
                            {/* Center symbol */}
                            <span
                              className="relative text-3xl"
                              style={{
                                color: GOLD,
                                opacity: 0.8,
                                animation: 'rune-glow 1.2s ease-in-out infinite',
                              }}
                            >
                              ☰
                            </span>

                            {/* Ring dots */}
                            {Array.from({ length: 8 }).map((_, j) => (
                              <div
                                key={`dot-${j}`}
                                className="absolute h-1.5 w-1.5 rounded-full"
                                style={{
                                  background: GOLD,
                                  opacity: 0.3 + Math.random() * 0.4,
                                  transform: `rotate(${j * 45}deg) translateY(-60px)`,
                                  animation: `rune-glow ${1 + Math.random()}s ease-in-out ${j * 0.2}s infinite`,
                                }}
                              />
                            ))}
                          </div>

                          {/* Light beam */}
                          <div
                            className="relative h-1 w-40 overflow-hidden rounded-full"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${GOLD}88, transparent)`,
                              boxShadow: `0 0 20px ${GOLD}44`,
                            }}
                          >
                            <div
                              className="absolute inset-0"
                              style={{
                                background: `linear-gradient(90deg, transparent, ${GOLD_LIGHT}, transparent)`,
                                animation: 'light-beam 1.2s ease-in-out infinite',
                              }}
                            />
                          </div>

                          {/* Mystic smoke chamber — obscures cycling text */}
                          <div className="relative min-h-[80px] w-full max-w-xs">
                            <div
                              className="relative overflow-hidden rounded-xl px-8 py-4"
                              style={{
                                background: `radial-gradient(ellipse at center, ${GOLD}0A, transparent 80%)`,
                                border: `1px solid ${GOLD}18`,
                              }}
                            >
                              {/* Base text — blurred under smoke */}
                              <div
                                className="relative flex items-center justify-center"
                                style={{ filter: 'blur(6px)', opacity: 0.4 }}
                              >
                                {displayText ? (
                                  <span
                                    key={displayText}
                                    className="font-playfair text-2xl font-bold tracking-wider"
                                    style={{ color: GOLD_LIGHT }}
                                  >
                                    {displayText}
                                  </span>
                                ) : (
                                  <span
                                    className="font-playfair text-2xl tracking-[0.5em]"
                                    style={{ color: `${GOLD}77` }}
                                  >
                                    天 机 推 演
                                  </span>
                                )}
                              </div>

                              {/* Smoke wisps (golden mist) */}
                              {Array.from({ length: 6 }).map((_, w) => (
                                <div
                                  key={`wisp-${w}`}
                                  className="pointer-events-none absolute rounded-full"
                                  style={
                                    {
                                      width: `${60 + Math.random() * 80}px`,
                                      height: `${60 + Math.random() * 80}px`,
                                      background: `radial-gradient(circle at 30% 30%, ${GOLD}33, ${GOLD}11 40%, transparent 70%)`,
                                      left: `${Math.random() * 80}%`,
                                      top: `${Math.random() * 60 + 10}%`,
                                      filter: 'blur(20px)',
                                      animation: `smoke-wisp ${5 + Math.random() * 6}s ease-in-out ${Math.random() * 3}s infinite`,
                                      '--sx': `${30 + Math.random() * 40}px`,
                                      '--sy': `${-(30 + Math.random() * 50)}px`,
                                    } as React.CSSProperties
                                  }
                                />
                              ))}

                              {/* Pulsing golden haze overlay */}
                              <div
                                className="pointer-events-none absolute inset-0 rounded-xl"
                                style={{
                                  background: `radial-gradient(ellipse at center, ${GOLD}15, transparent 70%)`,
                                  animation: 'smoke-breath 3s ease-in-out infinite',
                                }}
                              />

                              {/* Foreground text — glimpses through the mist */}
                              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <span
                                  className="font-playfair text-lg font-bold tracking-[0.3em]"
                                  style={{
                                    color: `${GOLD}55`,
                                    textShadow: `0 0 20px ${GOLD}33, 0 0 40px ${GOLD}11`,
                                    animation: 'smoke-breath 2.4s ease-in-out infinite',
                                  }}
                                >
                                  天 机 不 可 窥
                                </span>
                              </div>
                            </div>

                            {/* Floating embers */}
                            {Array.from({ length: 4 }).map((_, e) => (
                              <div
                                key={`ember-${e}`}
                                className="pointer-events-none absolute h-1 w-1 rounded-full"
                                style={{
                                  background: GOLD_LIGHT,
                                  boxShadow: `0 0 6px ${GOLD}88`,
                                  left: `${20 + Math.random() * 60}%`,
                                  top: '80%',
                                  animation: `smoke-ember ${2 + Math.random() * 3}s ease-out ${Math.random() * 4}s infinite`,
                                }}
                              />
                            ))}
                          </div>

                          <p
                            className="font-orbitron text-xs tracking-[0.3em]"
                            style={{ color: `${GOLD}55` }}
                          >
                            ◇ 天 地 交 感 · 神 明 垂 鉴 ◇
                          </p>
                        </div>
                      )}

                      {/* ---- RESULT: Heaven's Revelation ---- */}
                      {showResult && result && (
                        <div className="relative flex flex-col items-center gap-5 py-2">
                          {/* Glory rays */}
                          {Array.from({ length: 8 }).map((_, j) => (
                            <div
                              key={`ray-${j}`}
                              className="absolute top-1/2 left-1/2 h-32 w-0.5 -translate-x-1/2 -translate-y-1/2"
                              style={{
                                background: `linear-gradient(to top, ${GOLD}, transparent)`,
                                transform: `translate(-50%, -50%) rotate(${j * 45}deg)`,
                                animation: `glory-ray 1.5s ease-out ${j * 0.1}s forwards`,
                                opacity: 0,
                              }}
                            />
                          ))}

                          {/* Status badge */}
                          <div className="relative z-10">
                            {result.isExisting ? (
                              <span
                                className="inline-flex items-center gap-2 rounded-full px-5 py-1.5 text-xs font-semibold tracking-wider backdrop-blur-sm"
                                style={{
                                  color: GOLD_LIGHT,
                                  background: `${GOLD}15`,
                                  border: `1px solid ${GOLD}33`,
                                }}
                              >
                                <span>⟳</span>
                                <span>天意已定 · 无需再问</span>
                              </span>
                            ) : (
                              <span
                                className="inline-flex items-center gap-2 rounded-full px-5 py-1.5 text-xs font-semibold tracking-wider backdrop-blur-sm"
                                style={{
                                  color: GOLD_LIGHT,
                                  background: `${GOLD}15`,
                                  border: `1px solid ${GOLD}33`,
                                }}
                              >
                                <span>☰</span>
                                <span>天 · 命 · 所 · 指</span>
                              </span>
                            )}
                          </div>

                          {/* Divine answer */}
                          <div
                            className="relative z-10"
                            style={{
                              animation:
                                'reveal-scale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                            }}
                          >
                            <div
                              className="rounded-2xl px-6 py-3 sm:px-10"
                              style={{
                                background: `linear-gradient(135deg, ${GOLD}11, ${GOLD}08)`,
                                border: `1px solid ${GOLD}33`,
                                boxShadow: `0 0 40px ${GOLD}22`,
                              }}
                            >
                              <span
                                className="font-playfair text-4xl font-black tracking-widest sm:text-5xl"
                                style={{
                                  background:
                                    'linear-gradient(180deg, #FFF2D0 0%, #F0D080 30%, #D4A84B 60%, #B8860B 100%)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  filter: 'drop-shadow(0 2px 8px rgba(212,168,75,0.4))',
                                }}
                              >
                                {result.answer}
                              </span>
                            </div>
                          </div>

                          {/* Heavenly seal */}
                          <div
                            className="relative z-10 flex items-center gap-2 rounded-lg px-4 py-1.5"
                            style={{
                              border: `1px solid ${GOLD}22`,
                              background: `${GOLD}08`,
                              animation:
                                'seal-stamp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both',
                            }}
                          >
                            <span
                              className="text-xs font-bold tracking-widest"
                              style={{ color: `${GOLD}AA` }}
                            >
                              {result.isExisting ? '天意不可违' : '天命不可违'}
                            </span>
                            <span className="text-xs" style={{ color: `${GOLD}66` }}>
                              · 〖 天 〗·
                            </span>
                          </div>

                          {/* Sub-text */}
                          <p className="relative z-10 text-xs" style={{ color: `${GOLD}66` }}>
                            {result.isExisting
                              ? '你上次的选择仍在选项中，故天意保持不变'
                              : '天命已定，此签永世不移'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ---- HISTORY ---- */}
          {history.length > 0 && (
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-2">
                <HistoryIcon className="h-4 w-4" style={{ color: `${GOLD}88` }} />
                <span
                  className="font-orbitron text-xs font-semibold tracking-[0.2em]"
                  style={{ color: `${GOLD}77` }}
                >
                  天 命 纪 录
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm"
                  style={{
                    color: `${GOLD}88`,
                    background: `${GOLD}11`,
                    border: `1px solid ${GOLD}22`,
                  }}
                >
                  {history.length}
                </span>
              </div>

              <div className="space-y-2">
                {history.map((entry, idx) => (
                  <div
                    key={`${entry.timestamp}-${idx}`}
                    className="group flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all duration-300"
                    style={{
                      borderColor: entry.isMine ? `${GOLD}22` : 'rgba(255,255,255,0.05)',
                      background: entry.isMine
                        ? `linear-gradient(135deg, ${GOLD}08, transparent)`
                        : 'rgba(255,255,255,0.02)',
                    }}
                    onClick={() =>
                      setHistoryModal({
                        question: entry.question,
                        answer: entry.answer,
                        options: entry.options,
                        timestamp: entry.timestamp,
                      })
                    }
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${GOLD}44`;
                      e.currentTarget.style.background = `linear-gradient(135deg, ${GOLD}0D, transparent)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = entry.isMine
                        ? `${GOLD}22`
                        : 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.background = entry.isMine
                        ? `linear-gradient(135deg, ${GOLD}08, transparent)`
                        : 'rgba(255,255,255,0.02)';
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium" style={{ color: '#E0D5C0' }}>
                          {entry.question}
                        </p>
                        {entry.isMine && (
                          <span
                            className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wider"
                            style={{
                              color: GOLD_DARK,
                              background: `${GOLD}22`,
                            }}
                          >
                            汝
                          </span>
                        )}
                      </div>
                      <p
                        className="mt-0.5 flex items-center gap-2 text-xs"
                        style={{ color: `${GOLD}55` }}
                      >
                        {new Date(entry.timestamp).toLocaleString('zh-CN', {
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        <span style={{ color: `${GOLD}33`, fontSize: '10px' }}>· 点按查看选项</span>
                      </p>
                    </div>
                    <Tag
                      className="ml-3 shrink-0 rounded-full border-0 px-3.5 py-1 text-sm font-bold"
                      style={
                        entry.isMine
                          ? {
                              background: `linear-gradient(135deg, ${GOLD}, #B8860B)`,
                              color: '#fff',
                            }
                          : {
                              background: 'rgba(255,255,255,0.05)',
                              color: `${GOLD}77`,
                            }
                      }
                    >
                      {entry.answer}
                    </Tag>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- EMPTY STATE ---- */}
          {history.length === 0 && !rolling && !showResult && (
            <div className="mb-8">
              <div
                className="flex flex-col items-center justify-center rounded-2xl border px-8 py-20 backdrop-blur-sm"
                style={{
                  borderColor: `${GOLD}11`,
                  background: 'rgba(20,15,35,0.4)',
                }}
              >
                <div
                  className="mb-5 flex h-24 w-24 items-center justify-center rounded-xl"
                  style={{
                    background: `${GOLD}0D`,
                    border: `1px solid ${GOLD}22`,
                  }}
                >
                  <span className="font-playfair text-4xl" style={{ color: GOLD, opacity: 0.6 }}>
                    ☰
                  </span>
                </div>
                <h3
                  className="font-playfair mb-2 text-xl font-bold tracking-widest"
                  style={{ color: `${GOLD}88` }}
                >
                  待天垂象
                </h3>
                <p className="mb-1 text-sm" style={{ color: `${GOLD}55` }}>
                  焚香沐浴，诚心问天，自有天命所归
                </p>
                <p className="text-xs" style={{ color: `${GOLD}33` }}>
                  ⚘ 一签既出 · 永世不移
                </p>
              </div>
            </div>
          )}

          {/* ---- RULES ---- */}
          <div
            className="rounded-2xl border px-6 py-5 backdrop-blur-sm"
            style={{
              borderColor: `${GOLD}11`,
              background: 'rgba(20,15,35,0.35)',
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xs" style={{ color: GOLD, opacity: 0.6 }}>
                ◎
              </span>
              <span
                className="font-orbitron text-[10px] font-semibold tracking-[0.25em]"
                style={{ color: `${GOLD}66` }}
              >
                法 · 度
              </span>
            </div>
            <ul className="space-y-2 text-xs leading-relaxed" style={{ color: `${GOLD}66` }}>
              <li className="flex items-start gap-2">
                <span className="mt-0.5" style={{ color: `${GOLD}44` }}>
                  ─
                </span>
                <span>
                  每次问卜基于 <strong style={{ color: `${GOLD}88` }}>浏览器唯一签名 + 问题</strong>{' '}
                  生成固定结果，同人同问永得同签
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5" style={{ color: `${GOLD}44` }}>
                  ─
                </span>
                <span>
                  若修改选项但之前所中签文仍在列中，
                  <strong style={{ color: `${GOLD}88` }}>天意不变</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5" style={{ color: `${GOLD}44` }}>
                  ─
                </span>
                <span>
                  唯有旧签被移除，方会 <strong style={{ color: `${GOLD}88` }}>重新降旨</strong>
                </span>
              </li>
            </ul>
          </div>

          <div className="h-12" />
        </div>
      </div>

      {/* ---- History Modal ---- */}
      <Modal
        title={null}
        open={!!historyModal}
        onCancel={() => setHistoryModal(null)}
        footer={null}
        width={460}
        centered
        closable={false}
        styles={
          {
            content: {
              background: 'rgba(10, 6, 28, 0.98)',
              border: '1px solid rgba(212,168,75,0.25)',
              borderRadius: '20px',
              boxShadow:
                '0 32px 100px rgba(0,0,0,0.8), 0 0 80px rgba(212,168,75,0.05), inset 0 1px 0 rgba(212,168,75,0.08)',
              padding: 0,
              overflow: 'hidden',
            },
            mask: {
              background: 'rgba(0,0,0,0.8)',
            },
          } as any
        }
      >
        {historyModal && (
          <div className="relative">
            {/* Top accent glow */}
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2"
              style={{
                background: `linear-gradient(90deg, transparent, ${GOLD}66, transparent)`,
                boxShadow: `0 0 20px ${GOLD}44`,
              }}
            />

            {/* Subtle background radiance */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full opacity-[0.08] blur-3xl"
              style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)` }}
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-24 h-44 w-44 rounded-full opacity-[0.06] blur-3xl"
              style={{ background: `radial-gradient(circle, #8B5CF6, transparent 70%)` }}
            />

            {/* Corner ornaments */}
            <div
              className="pointer-events-none absolute left-0 top-0 h-10 w-10 rounded-tl-[20px]"
              style={{ borderLeft: `2px solid ${GOLD}55`, borderTop: `2px solid ${GOLD}55` }}
            />
            <div
              className="pointer-events-none absolute right-0 top-0 h-10 w-10 rounded-tr-[20px]"
              style={{ borderRight: `2px solid ${GOLD}55`, borderTop: `2px solid ${GOLD}55` }}
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-10 w-10 rounded-bl-[20px]"
              style={{ borderLeft: `2px solid ${GOLD}55`, borderBottom: `2px solid ${GOLD}55` }}
            />
            <div
              className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 rounded-br-[20px]"
              style={{ borderRight: `2px solid ${GOLD}55`, borderBottom: `2px solid ${GOLD}55` }}
            />

            {/* Close button */}
            <button
              type="button"
              onClick={() => setHistoryModal(null)}
              className="absolute right-5 top-5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:bg-[rgba(212,168,75,0.12)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4A84B]/40"
              style={{ color: 'rgba(212,168,75,0.4)' }}
            >
              <CloseIcon className="h-3.5 w-3.5" />
            </button>

            <div className="space-y-0 px-7 pb-8 pt-8">
              {/* ---------- Header ---------- */}
              <div className="mb-8 flex flex-col items-center gap-2">
                <span className="font-playfair text-2xl" style={{ color: `${GOLD}77` }}>
                  ☰
                </span>
                <div className="text-center">
                  <p
                    className="font-playfair text-xl font-bold tracking-[0.3em]"
                    style={{
                      background: 'linear-gradient(180deg, #F5E6B8, #D4A84B)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 8px rgba(212,168,75,0.35))',
                    }}
                  >
                    天 机 卷
                  </p>
                  <p
                    className="font-orbitron mt-1 text-[10px] tracking-[0.35em]"
                    style={{ color: `${GOLD}55` }}
                  >
                    S C R O L L O F F A T E
                  </p>
                </div>
              </div>

              {/* ---------- Divider ---------- */}
              <div
                className="mb-8 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)`,
                }}
              />

              {/* ---------- Question ---------- */}
              <div className="mb-10">
                <p
                  className="mb-4 mt-6 flex items-center gap-2 text-xs font-bold tracking-[0.2em]"
                  style={{ color: '#D4A84B' }}
                >
                  <ScrollIcon className="h-3.5 w-3.5" />所 问 之 事
                </p>

                {/* Modern glass card with animated golden shimmer */}
                <div
                  className="group relative overflow-hidden rounded-xl transition-all duration-500"
                  style={{
                    background: 'linear-gradient(145deg, rgba(32,22,60,0.88), rgba(18,10,42,0.72))',
                    border: '1px solid rgba(212,168,75,0.12)',
                    animation: 'border-shimmer 5s ease-in-out infinite',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {/* Top golden accent line */}
                  <div
                    className="pointer-events-none absolute left-6 right-6 top-0 h-px opacity-60"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(212,168,75,0.4), transparent)',
                    }}
                  />

                  {/* Glass shine overlay (moves on hover) */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-all duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        'linear-gradient(105deg, transparent 40%, rgba(212,168,75,0.04) 45%, rgba(212,168,75,0.08) 50%, rgba(212,168,75,0.04) 55%, transparent 60%)',
                      backgroundSize: '200% 100%',
                      animation: 'glass-shine 3s ease-in-out infinite',
                    }}
                  />

                  {/* Floating star particles */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute h-[3px] w-[3px] rounded-full"
                        style={
                          {
                            background: '#D4A84B',
                            boxShadow: '0 0 4px rgba(212,168,75,0.6)',
                            left: `${20 + i * 22}%`,
                            top: `${50 + (i % 2) * 25}%`,
                            animation: `star-drift ${4.5 + i * 0.6}s ease-in-out ${i * 0.9}s infinite`,
                            '--dx': `${10 + i * 8}px`,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>

                  {/* Subtle inner glow */}
                  <div
                    className="pointer-events-none absolute left-1/2 top-0 h-20 w-3/4 -translate-x-1/2 rounded-full opacity-20"
                    style={{
                      background: 'radial-gradient(ellipse, rgba(212,168,75,0.3), transparent 70%)',
                    }}
                  />

                  {/* Question text */}
                  <div className="relative z-10 px-5 py-4">
                    <p
                      className="font-playfair text-base font-bold leading-relaxed tracking-wide"
                      style={{
                        color: '#FFFFFF',
                        textShadow: '0 0 20px rgba(212,168,75,0.15), 0 1px 4px rgba(0,0,0,0.5)',
                      }}
                    >
                      {historyModal.question}
                    </p>
                  </div>
                </div>
              </div>

              {/* ---------- Answer ---------- */}
              <div className="mb-10">
                <p
                  className="mb-4 mt-6 flex items-center gap-2 text-xs font-bold tracking-[0.2em]"
                  style={{ color: '#D4A84B' }}
                >
                  <StarIcon className="h-3.5 w-3.5" />天 命 所 指
                </p>

                {/* Mystical oracle card with animated aura */}
                <div
                  className="group relative overflow-hidden rounded-xl text-center transition-all duration-500"
                  style={{
                    background:
                      'linear-gradient(145deg, rgba(212,168,75,0.2), rgba(180,140,60,0.12), rgba(139,92,246,0.06))',
                    border: '1px solid rgba(212,168,75,0.45)',
                    boxShadow:
                      '0 0 60px rgba(212,168,75,0.1), inset 0 0 40px rgba(212,168,75,0.06)',
                  }}
                >
                  {/* Animated golden aura background */}
                  <div
                    className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(212,168,75,0.2), transparent 70%)',
                      animation: 'aura-pulse 4s ease-in-out infinite',
                    }}
                  />

                  {/* Concentric ripple rings */}
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                        style={{
                          width: '100px',
                          height: '100px',
                          borderColor: 'rgba(212,168,75,0.12)',
                          animation: `ripple-ring ${3 + i * 1.2}s ease-out ${i * 1}s infinite`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Floating oracle runes */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                    {['玄', '乾', '坤', '道'].map((rune, i) => (
                      <span
                        key={rune}
                        className="absolute font-serif text-xs"
                        style={{
                          color: '#D4A84B',
                          left: `${15 + i * 25}%`,
                          top: `${60 + (i % 3) * 10}%`,
                          opacity: 0,
                          animation: `oracle-rune ${5 + i * 0.8}s ease-in-out ${i * 1.2}s infinite`,
                          textShadow: '0 0 8px rgba(212,168,75,0.3)',
                        }}
                      >
                        {rune}
                      </span>
                    ))}
                  </div>

                  {/* Static golden glow center */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(212,168,75,0.12), transparent 70%)',
                    }}
                  />

                  {/* Golden sparkles */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute h-1 w-1 rounded-full"
                        style={
                          {
                            background: '#F0D080',
                            boxShadow: '0 0 6px rgba(212,168,75,0.8)',
                            left: `${10 + i * 16}%`,
                            top: `${30 + (i % 2) * 40}%`,
                            animation: `star-drift ${3 + i * 0.4}s ease-in-out ${i * 0.6}s infinite`,
                            '--dx': `${((i % 3) - 1) * 12}px`,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>

                  {/* Answer text with breathing glow */}
                  <div className="relative z-10 px-6 py-5">
                    <span
                      className="font-playfair text-3xl font-black tracking-widest"
                      style={{
                        color: '#FFFFFF',
                        animation: 'answer-glow 3s ease-in-out infinite',
                      }}
                    >
                      {historyModal.answer}
                    </span>
                  </div>
                </div>
              </div>

              {/* ---------- Divider ---------- */}
              <div
                className="mb-8 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)`,
                }}
              />

              {/* ---------- Fortune Slips ---------- */}
              <div>
                <p
                  className="mb-4 mt-6 flex items-center gap-2 text-xs font-bold tracking-[0.2em]"
                  style={{ color: '#D4A84B' }}
                >
                  <HistoryIcon className="h-3.5 w-3.5" />当 时 之 签
                </p>
                <div className="space-y-2">
                  {historyModal.options.map((opt, oi) => {
                    const isHit = opt === historyModal.answer;
                    return (
                      <div
                        key={oi}
                        className={`group relative flex items-center gap-3.5 rounded-xl px-4 py-3.5 transition-all duration-500 ${
                          isHit ? 'overflow-hidden' : ''
                        }`}
                        style={{
                          background: isHit
                            ? 'linear-gradient(135deg, rgba(212,168,75,0.25), rgba(212,168,75,0.12), rgba(139,92,246,0.08))'
                            : 'linear-gradient(135deg, rgba(28,20,55,0.75), rgba(22,15,45,0.55))',
                          borderLeft: isHit
                            ? '1.5px solid rgba(212,168,75,0.6)'
                            : '2px solid rgba(212,168,75,0.12)',
                          border: isHit
                            ? '1.5px solid rgba(212,168,75,0.6)'
                            : '1px solid rgba(212,168,75,0.06)',
                          boxShadow: isHit
                            ? '0 0 40px rgba(212,168,75,0.18), inset 0 0 30px rgba(212,168,75,0.08)'
                            : 'inset 0 1px 0 rgba(212,168,75,0.03)',
                          animation: isHit ? 'fate-glow 3s ease-in-out infinite' : 'none',
                        }}
                      >
                        {/* Train-like running border lights (火车跑马灯) */}
                        {isHit && (
                          <div
                            className="pointer-events-none absolute"
                            style={{
                              inset: -30,
                              background:
                                'conic-gradient(from 0deg, #F0D080 0deg, #D4A84B 1deg, #D4A84B 2deg, #F0D080 3deg, transparent 4deg, transparent 58deg, #F0D080 59deg, #D4A84B 60deg, #D4A84B 61deg, #F0D080 62deg, transparent 63deg, transparent 118deg, #F0D080 119deg, #D4A84B 120deg, #D4A84B 121deg, #F0D080 122deg, transparent 123deg, transparent 178deg, #F0D080 179deg, #D4A84B 180deg, #D4A84B 181deg, #F0D080 182deg, transparent 183deg, transparent 238deg, #F0D080 239deg, #D4A84B 240deg, #D4A84B 241deg, #F0D080 242deg, transparent 243deg, transparent 298deg, #F0D080 299deg, #D4A84B 300deg, #D4A84B 301deg, #F0D080 302deg, transparent 303deg, transparent 360deg)',
                              animation: 'border-run 3s linear infinite',
                              zIndex: 0,
                            }}
                          />
                        )}

                        {/* Hover glow overlay for non-selected */}
                        {!isHit && (
                          <div
                            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-all duration-500 group-hover:opacity-100"
                            style={{
                              background:
                                'linear-gradient(135deg, rgba(212,168,75,0.08), rgba(139,92,246,0.03), transparent)',
                              border: '1px solid rgba(212,168,75,0.08)',
                            }}
                          />
                        )}

                        {/* Rising golden particles for selected */}
                        {isHit && (
                          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                            {[...Array(5)].map((_, pi) => (
                              <div
                                key={pi}
                                className="absolute h-[3px] w-[3px] rounded-full"
                                style={{
                                  background: '#F0D080',
                                  boxShadow: '0 0 6px rgba(212,168,75,0.9)',
                                  left: `${20 + pi * 15}%`,
                                  bottom: '10%',
                                  animation: `victory-particle ${2 + pi * 0.3}s ease-out ${pi * 0.4}s infinite`,
                                }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Numeral badge */}
                        <span
                          className={`relative z-10 flex items-center justify-center font-serif font-bold transition-all duration-500 shrink-0 ${
                            isHit ? 'h-9 w-9 rounded-lg text-base' : 'h-8 w-8 rounded-md text-sm'
                          }`}
                          style={{
                            color: isHit ? '#FFFFFF' : '#C4A87C',
                            background: isHit
                              ? 'linear-gradient(135deg, #D4A84B, #B8860B)'
                              : 'linear-gradient(135deg, rgba(212,168,75,0.1), rgba(212,168,75,0.03))',
                            border: isHit
                              ? '1.5px solid rgba(212,168,75,0.7)'
                              : '1px solid rgba(212,168,75,0.12)',
                            boxShadow: isHit
                              ? '0 0 20px rgba(212,168,75,0.5), inset 0 1px 0 rgba(255,255,255,0.2)'
                              : 'none',
                            animation: isHit ? 'chosen-glow 2.5s ease-in-out infinite' : 'none',
                          }}
                        >
                          {CHINESE_NUMERALS[oi + 1] || oi + 1}
                        </span>

                        {/* Option text */}
                        <span
                          className={`relative z-10 flex-1 tracking-wide transition-all duration-500 ${
                            isHit ? 'text-sm font-bold' : 'text-sm font-medium'
                          }`}
                          style={{
                            color: isHit ? '#FFFFFF' : '#D4C8B0',
                            textShadow: isHit
                              ? '0 0 20px rgba(212,168,75,0.3), 0 1px 4px rgba(0,0,0,0.5)'
                              : '0 1px 3px rgba(0,0,0,0.4)',
                            animation: isHit ? 'chosen-glow 2.5s ease-in-out infinite' : 'none',
                          }}
                        >
                          {opt}
                        </span>

                        {/* Red seal stamp on hit */}
                        {isHit && (
                          <span
                            className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                            style={{
                              background: 'linear-gradient(135deg, #DC2626, #B91C1C)',
                              animation: 'seal-breath 2.5s ease-in-out infinite',
                            }}
                          >
                            <span
                              className="font-serif text-xs font-black tracking-wider"
                              style={{
                                color: '#FFFFFF',
                                textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                              }}
                            >
                              中
                            </span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ---------- Share Actions ---------- */}
              <div className="!mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold tracking-wider text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(212,168,75,0.15)',
                    border: '1px solid rgba(212,168,75,0.25)',
                  }}
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <title>链接</title>
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                  </svg>
                  复制链接
                </button>
                <button
                  type="button"
                  onClick={handleSaveImage}
                  disabled={savingImage}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold tracking-wider text-white transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, #B8860B)`,
                    boxShadow: `0 2px 16px ${GOLD}44`,
                  }}
                >
                  {savingImage ? (
                    <>
                      <span
                        className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white/80"
                        style={{ animation: 'ring-rotate 0.8s linear infinite' }}
                      />
                      生成中...
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <title>下载</title>
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      保存图片
                    </>
                  )}
                </button>
              </div>

              {/* ---------- Footer ---------- */}
              <div className="mt-6 pt-2 text-center">
                <div
                  className="mx-auto mb-2 h-px w-16"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${GOLD}44, transparent)`,
                  }}
                />
                <p
                  className="font-orbitron text-[10px] tracking-[0.3em]"
                  style={{ color: `${GOLD}44` }}
                >
                  F A T E S E A L E D
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
