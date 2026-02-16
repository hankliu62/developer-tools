import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { ulid } from "ulid";

export function generateToken(length: number = 32): string {
  return CryptoJS.lib.WordArray.random(length).toString();
}

export function hashText(text: string, algorithm: string = "SHA256"): string {
  switch (algorithm.toUpperCase()) {
    case "MD5":
      return CryptoJS.MD5(text).toString();
    case "SHA1":
      return CryptoJS.SHA1(text).toString();
    case "SHA256":
      return CryptoJS.SHA256(text).toString();
    case "SHA512":
      return CryptoJS.SHA512(text).toString();
    case "SHA3":
      return CryptoJS.SHA3(text, { outputLength: 512 }).toString();
    default:
      return CryptoJS.SHA256(text).toString();
  }
}

export async function bcryptHash(text: string, saltRounds: number = 10): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

export function generateUUID(): string {
  return uuidv4();
}

export function generateULID(): string {
  return ulid();
}

export function encryptText(text: string, key: string, algorithm: string = "AES"): string {
  return (CryptoJS as any)[algorithm].encrypt(text, key).toString();
}

export function decryptText(encrypted: string, key: string, algorithm: string = "AES"): string {
  const bytes = (CryptoJS as any)[algorithm].decrypt(encrypted, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function generateHmac(text: string, key: string, algorithm: string = "SHA256"): string {
  return CryptoJS.HmacSHA256(text, key).toString();
}

export function analyzePasswordStrength(password: string): {
  score: number;
  level: string;
  suggestions: string[];
} {
  let score = 0;
  const suggestions: string[] = [];

  if (password.length >= 8) score += 1;
  else suggestions.push("密码长度至少 8 位");

  if (password.length >= 12) score += 1;

  if (/[a-z]/.test(password)) score += 1;
  else suggestions.push("包含小写字母");

  if (/[A-Z]/.test(password)) score += 1;
  else suggestions.push("包含大写字母");

  if (/[0-9]/.test(password)) score += 1;
  else suggestions.push("包含数字");

  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else suggestions.push("包含特殊字符");

  let level: string;
  if (score <= 2) level = "弱";
  else if (score <= 4) level = "中等";
  else level = "强";

  return { score, level, suggestions };
}

export async function generateRSAKeyPair(): Promise<{
  publicKey: string;
  privateKey: string;
}> {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );

  const publicKeyBuffer = await crypto.subtle.exportKey("spki", keyPair.publicKey);
  const privateKeyBuffer = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  const publicKey = btoa(String.fromCharCode(...Array.from(new Uint8Array(publicKeyBuffer))));
  const privateKey = btoa(String.fromCharCode(...Array.from(new Uint8Array(privateKeyBuffer))));

  return { publicKey, privateKey };
}

export function generateBIP39(): string {
  const words = [
    "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract",
    "absurd", "abuse", "access", "accident", "account", "accuse", "achieve", "acid",
    "acoustic", "acquire", "across", "act", "action", "actor", "actress", "actual",
  ];
  const mnemonic: string[] = [];
  for (let i = 0; i < 12; i++) {
    mnemonic.push(words[Math.floor(Math.random() * words.length)]);
  }
  return mnemonic.join(" ");
}
