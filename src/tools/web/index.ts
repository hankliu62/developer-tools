export function encodeUrl(text: string): string {
  return encodeURIComponent(text);
}

export function decodeUrl(encoded: string): string {
  try {
    return decodeURIComponent(encoded);
  } catch {
    throw new Error('Invalid URL encoded string');
  }
}

export function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => htmlEscapes[char]);
}

export function unescapeHtml(html: string): string {
  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/',
  };
  return html.replace(/&(amp|lt|gt|quot|#x27|#x2F);/g, (_, entity) => htmlUnescapes[entity]);
}

export interface UrlParts {
  href: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
}

export function parseUrl(url: string): UrlParts {
  try {
    const urlObj = new URL(url);
    return {
      href: urlObj.href,
      protocol: urlObj.protocol,
      host: urlObj.host,
      hostname: urlObj.hostname,
      port: urlObj.port,
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
      origin: urlObj.origin,
    };
  } catch {
    throw new Error('Invalid URL');
  }
}

export interface DeviceInfo {
  userAgent: string;
  platform: string;
  language: string;
  screenWidth: number;
  screenHeight: number;
  deviceType: string;
  browser: string;
}

export function getDeviceInfo(): DeviceInfo {
  const ua = navigator.userAgent;
  let deviceType = 'desktop';
  let browser = 'unknown';

  if (/mobile/i.test(ua)) {
    deviceType = 'mobile';
  } else if (/tablet/i.test(ua)) {
    deviceType = 'tablet';
  }

  if (/chrome/i.test(ua)) {
    browser = 'Chrome';
  } else if (/safari/i.test(ua)) {
    browser = 'Safari';
  } else if (/firefox/i.test(ua)) {
    browser = 'Firefox';
  } else if (/edge/i.test(ua)) {
    browser = 'Edge';
  } else if (/opera/i.test(ua)) {
    browser = 'Opera';
  }

  return {
    userAgent: ua,
    platform: navigator.platform,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    deviceType,
    browser,
  };
}

export function generateBasicAuth(username: string, password: string): string {
  const credentials = btoa(`${username}:${password}`);
  return `Basic ${credentials}`;
}

export interface OpenGraphMeta {
  title: string;
  description: string;
  url: string;
  image: string;
  siteName: string;
  locale: string;
  type: string;
}

export function generateOpenGraph(meta: OpenGraphMeta): string {
  return `<meta property="og:title" content="${meta.title}" />
<meta property="og:description" content="${meta.description}" />
<meta property="og:url" content="${meta.url}" />
<meta property="og:image" content="${meta.image}" />
<meta property="og:site_name" content="${meta.siteName}" />
<meta property="og:locale" content="${meta.locale}" />
<meta property="og:type" content="${meta.type}" />`;
}

export function generateTOTP(secret: string, digits: number = 6, period: number = 30): string {
  const epoch = Math.floor(Date.now() / 1000);
  let time = Math.floor(epoch / period);

  const secretBase32 = secret.replace(/[^A-Z2-7]/gi, '').toUpperCase();
  const base32DecodeTable: Record<string, number> = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25,
    '2': 26,
    '3': 27,
    '4': 28,
    '5': 29,
    '6': 30,
    '7': 31,
  };

  let bits = '';
  for (const char of secretBase32) {
    bits += base32DecodeTable[char].toString(2).padStart(5, '0');
  }

  const keyBytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    keyBytes.push(parseInt(bits.slice(i, i + 8), 2));
  }

  const timeBytes = new Array(8);
  for (let i = 7; i >= 0; i--) {
    timeBytes[i] = time & 0xff;
    time = time >>> 8;
  }

  const hmac = simpleHmac(keyBytes, timeBytes);
  const offset = hmac[hmac.length - 1] & 0xf;
  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  return (code % 10 ** digits).toString().padStart(digits, '0');
}

function simpleHmac(key: number[], message: number[]): number[] {
  const blockSize = 64;
  const oKeyPad: number[] = [];
  const iKeyPad: number[] = [];

  for (let i = 0; i < blockSize; i++) {
    const keyByte = i < key.length ? key[i] : 0;
    oKeyPad.push(keyByte ^ 0x5c);
    iKeyPad.push(keyByte ^ 0x36);
  }

  const inner = simpleHash([...iKeyPad, ...message]);
  return simpleHash([...oKeyPad, ...inner]);
}

function simpleHash(data: number[]): number[] {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash + data[i]) | 0;
  }
  return [(hash >>> 24) & 0xff, (hash >>> 16) & 0xff, (hash >>> 8) & 0xff, hash & 0xff];
}

export const mimeTypes: Record<string, string> = {
  html: 'text/html',
  htm: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  json: 'application/json',
  xml: 'application/xml',
  pdf: 'application/pdf',
  zip: 'application/zip',
  '7z': 'application/x-7z-compressed',
  rar: 'application/x-rar-compressed',
  tar: 'application/x-tar',
  gz: 'application/gzip',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  mp4: 'video/mp4',
  webm: 'video/webm',
  avi: 'video/x-msvideo',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  ico: 'image/x-icon',
  tiff: 'image/tiff',
  bmp: 'image/bmp',
  txt: 'text/plain',
  md: 'text/markdown',
  csv: 'text/csv',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  woff: 'font/woff',
  woff2: 'font/woff2',
  ttf: 'font/ttf',
  otf: 'font/otf',
  eot: 'application/vnd.ms-fontobject',
};

export function getMimeType(extension: string): string {
  return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
}

export interface JWTPayload {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

export function parseJWT(token: string): JWTPayload {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format');
  }

  try {
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    return {
      header,
      payload,
      signature: parts[2],
    };
  } catch {
    throw new Error('Invalid JWT encoding');
  }
}

export interface KeyCodeInfo {
  key: string;
  code: string;
  keyCode: number;
  which: number;
  category: string;
}

export function getKeyCodeInfo(key: string): KeyCodeInfo {
  const keyCodeMap: Record<string, { code: string; keyCode: number; category: string }> = {
    Enter: { code: 'Enter', keyCode: 13, category: 'Control' },
    Escape: { code: 'Escape', keyCode: 27, category: 'Control' },
    Backspace: { code: 'Backspace', keyCode: 8, category: 'Control' },
    Tab: { code: 'Tab', keyCode: 9, category: 'Control' },
    Space: { code: 'Space', keyCode: 32, category: 'Whitespace' },
    ArrowUp: { code: 'ArrowUp', keyCode: 38, category: 'Navigation' },
    ArrowDown: { code: 'ArrowDown', keyCode: 40, category: 'Navigation' },
    ArrowLeft: { code: 'ArrowLeft', keyCode: 37, category: 'Navigation' },
    ArrowRight: { code: 'ArrowRight', keyCode: 39, category: 'Navigation' },
    Home: { code: 'Home', keyCode: 36, category: 'Navigation' },
    End: { code: 'End', keyCode: 35, category: 'Navigation' },
    PageUp: { code: 'PageUp', keyCode: 33, category: 'Navigation' },
    PageDown: { code: 'PageDown', keyCode: 34, category: 'Navigation' },
    Insert: { code: 'Insert', keyCode: 45, category: 'Editing' },
    Delete: { code: 'Delete', keyCode: 46, category: 'Editing' },
  };

  const info = keyCodeMap[key] || { code: key, keyCode: key.charCodeAt(0), category: 'Character' };
  return {
    key,
    code: info.code,
    keyCode: info.keyCode,
    which: info.keyCode,
    category: info.category,
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface FormatJsonOptions {
  indent?: number | string;
  sortKeys?: boolean;
  compact?: boolean;
  escapeUnicode?: boolean;
}

export function formatJson(json: string, options: FormatJsonOptions = {}): string {
  const { indent = 2, sortKeys = false, compact = false, escapeUnicode = false } = options;

  try {
    let parsed = JSON.parse(json);

    if (sortKeys) {
      parsed = sortObjectKeys(parsed);
    }

    if (compact) {
      return JSON.stringify(parsed);
    }

    let result: string;
    if (typeof indent === 'number') {
      result = JSON.stringify(parsed, null, indent);
    } else {
      result = JSON.stringify(parsed, null, indent);
    }

    if (escapeUnicode) {
      result = result.replace(/[\u007f-\uffff]/g, (c) => {
        return `\\u${(`0000${c.charCodeAt(0).toString(16)}`).slice(-4)}`;
      });
    }

    return result;
  } catch {
    throw new Error('Invalid JSON');
  }
}

function sortObjectKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }
  if (obj !== null && typeof obj === 'object') {
    const sorted: Record<string, unknown> = {};
    Object.keys(obj as Record<string, unknown>)
      .sort()
      .forEach((key) => {
        sorted[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
      });
    return sorted;
  }
  return obj;
}
