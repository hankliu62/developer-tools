import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function convertDateTime(
  input: string,
  inputFormat: string,
  outputFormat: string,
  targetTimezone?: string
): string {
  const date = dayjs(input, inputFormat);
  if (!date.isValid()) {
    throw new Error("Invalid date format");
  }
  if (targetTimezone) {
    return date.tz(targetTimezone).format(outputFormat);
  }
  return date.format(outputFormat);
}

export function convertBase(
  value: string,
  fromBase: number,
  toBase: number
): string {
  const decimal = parseInt(value, fromBase);
  return decimal.toString(toBase).toUpperCase();
}

export function toRoman(num: number): string {
  if (num < 1 || num > 3999) {
    throw new Error("Number must be between 1 and 3999");
  }
  const romanNumerals: [string, number][] = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];

  let result = "";
  let remaining = num;
  for (const [roman, value] of romanNumerals) {
    while (remaining >= value) {
      result += roman;
      remaining -= value;
    }
  }
  return result;
}

export function fromRoman(roman: string): number {
  const romanNumerals: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;
  let prevValue = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const currentValue = romanNumerals[roman[i]];
    if (currentValue < prevValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }
    prevValue = currentValue;
  }
  return result;
}

export function encodeBase64(text: string): string {
  return btoa(unescape(encodeURIComponent(text)));
}

export function decodeBase64(encoded: string): string {
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch {
    throw new Error("Invalid Base64 string");
  }
}

export function convertColor(
  color: string,
  targetFormat: "hex" | "rgb" | "hsl"
): string {
  const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const rgbRegex = /^rgb\(?(\d+),(\d+),(\d+)\)?$/;
  const hslRegex = /^hsl\(?(\d+),(\d+)%,(\d+)%\)?$/;

  let r: number, g: number, b: number;

  if (hexRegex.test(color)) {
    const match = color.match(hexRegex);
    r = parseInt(match![1], 16);
    g = parseInt(match![2], 16);
    b = parseInt(match![3], 16);
  } else if (rgbRegex.test(color)) {
    const match = color.match(rgbRegex);
    r = parseInt(match![1]);
    g = parseInt(match![2]);
    b = parseInt(match![3]);
  } else if (hslRegex.test(color)) {
    const match = color.match(hslRegex);
    const h = parseInt(match![1]) / 360;
    const s = parseInt(match![2]) / 100;
    const l = parseInt(match![3]) / 100;
    const [rr, gg, bb] = hslToRgb(h, s, l);
    r = rr;
    g = gg;
    b = bb;
  } else {
    throw new Error("Invalid color format");
  }

  if (targetFormat === "hex") {
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
  } else if (targetFormat === "rgb") {
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    const [h, s, l] = rgbToHsl(r, g, b);
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function convertCase(text: string, caseType: "upper" | "lower" | "title" | "sentence"): string {
  switch (caseType) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    case "sentence":
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
    default:
      return text;
  }
}

export const natoAlphabet: Record<string, string> = {
  a: "Alpha", b: "Bravo", c: "Charlie", d: "Delta", e: "Echo",
  f: "Foxtrot", g: "Golf", h: "Hotel", i: "India", j: "Juliett",
  k: "Kilo", l: "Lima", m: "Mike", n: "November", o: "Oscar",
  p: "Papa", q: "Quebec", r: "Romeo", s: "Sierra", t: "Tango",
  u: "Uniform", v: "Victor", w: "Whiskey", x: "X-ray", y: "Yankee", z: "Zulu",
};

export function textToNato(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map(char => {
      if (natoAlphabet[char]) {
        return natoAlphabet[char];
      }
      return char;
    })
    .join(" ");
}

export function textToAsciiBinary(text: string): string {
  return text
    .split("")
    .map(char => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

export function textToUnicode(text: string): string {
  return text
    .split("")
    .map(char => "\\u" + char.charCodeAt(0).toString(16).padStart(4, "0"))
    .join("");
}

export function unicodeToText(unicode: string): string {
  return unicode.replace(/\\u([a-fA-F0-9]{4})/g, (_, code) =>
    String.fromCharCode(parseInt(code, 16))
  );
}
