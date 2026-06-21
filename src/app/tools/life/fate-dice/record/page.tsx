'use client';

import { Skeleton } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const CHINESE_NUMERALS = ['○', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
const GOLD = '#D4A84B';

interface RecordData {
  question: string;
  answer: string;
  options: string[];
  timestamp: number;
}

export default function RecordPageWrapper() {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center"
          style={{ background: '#050510' }}
        >
          <Skeleton active style={{ color: GOLD }} />
        </div>
      }
    >
      <RecordPageContent />
    </Suspense>
  );
}

function RecordPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [record, setRecord] = useState<RecordData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const data = searchParams.get('data');
      if (!data) {
        setError(true);
        return;
      }
      const parsed = JSON.parse(decodeURIComponent(data)) as RecordData;
      if (!parsed.question || !parsed.answer || !parsed.options) {
        setError(true);
        return;
      }
      setRecord(parsed);
    } catch {
      setError(true);
    }
  }, [searchParams]);

  if (error) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: '#050510' }}
      >
        <div className="text-center">
          <p className="font-playfair mb-4 text-2xl" style={{ color: `${GOLD}77` }}>
            无 效 的 天 机 卷
          </p>
          <p className="mb-6 text-sm" style={{ color: `${GOLD}55` }}>
            此记录不存在或链接已失效
          </p>
          <button
            type="button"
            onClick={() => router.push('/tools/life/fate-dice')}
            className="cursor-pointer rounded-xl px-6 py-3 text-sm font-bold tracking-wider text-white transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, #B8860B)`,
            }}
          >
            返回天命灵签
          </button>
        </div>
      </div>
    );
  }

  if (!record) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: '#050510' }}
      >
        <Skeleton active style={{ color: GOLD }} />
      </div>
    );
  }

  const _answerIndex = record.options.indexOf(record.answer);
  const formattedTime = new Date(record.timestamp).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&display=swap');
        .font-orbitron { font-family: 'Orbitron', sans-serif; letter-spacing: 0.06em; }
        .font-playfair { font-family: 'Playfair Display', serif; }

        @keyframes star-drift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.3; }
          100% { transform: translateY(-70px) translateX(var(--dx, 15px)); opacity: 0; }
        }
        @keyframes aura-pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.15); }
        }
        @keyframes answer-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(212,168,75,0.4), 0 2px 12px rgba(0,0,0,0.5), 0 0 60px rgba(212,168,75,0.1); }
          50% { text-shadow: 0 0 45px rgba(212,168,75,0.8), 0 0 90px rgba(212,168,75,0.3), 0 2px 12px rgba(0,0,0,0.5); }
        }
        @keyframes fate-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(212,168,75,0.18), inset 0 0 30px rgba(212,168,75,0.08); }
          50% { box-shadow: 0 0 70px rgba(212,168,75,0.3), inset 0 0 50px rgba(212,168,75,0.15); }
        }
        @keyframes chosen-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.15); }
        }
        @keyframes seal-breath {
          0%, 100% { box-shadow: 0 0 14px rgba(220,38,38,0.5), inset 0 1px 0 rgba(255,255,255,0.2); transform: rotate(12deg) scale(1); }
          50% { box-shadow: 0 0 28px rgba(220,38,38,0.7), 0 0 50px rgba(220,38,38,0.2), inset 0 1px 0 rgba(255,255,255,0.2); transform: rotate(12deg) scale(1.08); }
        }
        @keyframes border-shimmer {
          0%, 100% { border-color: rgba(212,168,75,0.12); box-shadow: 0 0 12px rgba(212,168,75,0.03); }
          50% { border-color: rgba(212,168,75,0.35); box-shadow: 0 0 28px rgba(212,168,75,0.1), inset 0 0 12px rgba(212,168,75,0.04); }
        }
        @keyframes ripple-ring {
          0% { transform: scale(0.6); opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes border-run {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes victory-particle {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.4; }
          100% { transform: translateY(-50px) scale(0.2); opacity: 0; }
        }
      `}</style>

      <div
        className="relative min-h-screen"
        style={{
          background:
            'linear-gradient(160deg, #050510 0%, #0F0A1E 25%, #1A0A2E 50%, #0F0818 75%, #050510 100%)',
        }}
      >
        {/* Nebula glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-32 top-1/4 h-96 w-96 rounded-full opacity-10 blur-3xl"
            style={{ background: `radial-gradient(circle, ${GOLD} 0%, transparent 70%)` }}
          />
          <div
            className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full opacity-8 blur-3xl"
            style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
          />
        </div>

        {/* Stars */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                background: i % 3 === 0 ? '#F0D080' : i % 3 === 1 ? '#ffffff' : '#8B5CF6',
                opacity: 0.3 + Math.random() * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-2xl px-4 py-12">
          {/* ===== Main Content Card ===== */}
          <div className="relative">
            {/* Outer glow */}
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-60 blur-sm"
              style={{
                background: `linear-gradient(135deg, ${GOLD}44, transparent 40%, ${GOLD}22 60%, transparent 80%, ${GOLD}33)`,
              }}
            />

            <div
              className="relative rounded-2xl backdrop-blur-xl"
              style={{
                background: 'rgba(10, 6, 28, 0.96)',
                border: `1px solid ${GOLD}25`,
                boxShadow: `0 32px 100px rgba(0,0,0,0.8), 0 0 80px ${GOLD}05, inset 0 1px 0 ${GOLD}08`,
              }}
            >
              {/* Top accent */}
              <div
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2"
                style={{
                  background: `linear-gradient(90deg, transparent, ${GOLD}66, transparent)`,
                  boxShadow: `0 0 20px ${GOLD}44`,
                }}
              />

              {/* Corner ornaments */}
              <div
                className="pointer-events-none absolute left-0 top-0 h-10 w-10 rounded-tl-2xl"
                style={{ borderLeft: `2px solid ${GOLD}55`, borderTop: `2px solid ${GOLD}55` }}
              />
              <div
                className="pointer-events-none absolute right-0 top-0 h-10 w-10 rounded-tr-2xl"
                style={{ borderRight: `2px solid ${GOLD}55`, borderTop: `2px solid ${GOLD}55` }}
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-10 w-10 rounded-bl-2xl"
                style={{ borderLeft: `2px solid ${GOLD}55`, borderBottom: `2px solid ${GOLD}55` }}
              />
              <div
                className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 rounded-br-2xl"
                style={{ borderRight: `2px solid ${GOLD}55`, borderBottom: `2px solid ${GOLD}55` }}
              />

              <div className="px-7 pb-8 pt-8">
                {/* ===== Header ===== */}
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

                {/* Divider */}
                <div
                  className="mb-8 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)`,
                  }}
                />

                {/* ===== Question ===== */}
                <div className="mb-10">
                  <p
                    className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.2em]"
                    style={{ color: GOLD }}
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="8" y1="13" x2="16" y2="13" />
                      <line x1="8" y1="17" x2="16" y2="17" />
                    </svg>
                    所 问 之 事
                  </p>

                  <div
                    className="group relative overflow-hidden rounded-xl transition-all duration-500"
                    style={{
                      background:
                        'linear-gradient(145deg, rgba(32,22,60,0.88), rgba(18,10,42,0.72))',
                      border: `1px solid ${GOLD}12`,
                      animation: 'border-shimmer 5s ease-in-out infinite',
                    }}
                  >
                    <div
                      className="pointer-events-none absolute left-6 right-6 top-0 h-px opacity-60"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, rgba(212,168,75,0.4), transparent)',
                      }}
                    />
                    <div className="relative z-10 px-5 py-4">
                      <p
                        className="font-playfair text-base font-bold leading-relaxed tracking-wide"
                        style={{
                          color: '#FFFFFF',
                          textShadow: '0 0 20px rgba(212,168,75,0.15), 0 1px 4px rgba(0,0,0,0.5)',
                        }}
                      >
                        {record.question}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ===== Answer ===== */}
                <div className="mb-10">
                  <p
                    className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.2em]"
                    style={{ color: GOLD }}
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    天 命 所 指
                  </p>

                  <div
                    className="group relative overflow-hidden rounded-xl text-center transition-all duration-500"
                    style={{
                      background:
                        'linear-gradient(145deg, rgba(212,168,75,0.2), rgba(180,140,60,0.12), rgba(139,92,246,0.06))',
                      border: `1px solid ${GOLD}45`,
                      boxShadow: `0 0 60px ${GOLD}10, inset 0 0 40px ${GOLD}06`,
                    }}
                  >
                    <div
                      className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${GOLD}20, transparent 70%)`,
                        animation: 'aura-pulse 4s ease-in-out infinite',
                      }}
                    />
                    <div className="relative z-10 px-6 py-5">
                      <span
                        className="font-playfair text-3xl font-black tracking-widest"
                        style={{
                          color: '#FFFFFF',
                          animation: 'answer-glow 3s ease-in-out infinite',
                        }}
                      >
                        {record.answer}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="mb-8 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)`,
                  }}
                />

                {/* ===== Fortune Slips (当时之签) ===== */}
                <div>
                  <p
                    className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.2em]"
                    style={{ color: GOLD }}
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    当 时 之 签
                  </p>
                  <div className="space-y-2">
                    {record.options.map((opt, oi) => {
                      const isHit = opt === record.answer;
                      return (
                        <div
                          key={oi}
                          className={`group relative flex items-center gap-3.5 rounded-xl px-4 py-3.5 transition-all duration-500 ${isHit ? 'overflow-hidden' : ''}`}
                          style={{
                            background: isHit
                              ? 'linear-gradient(135deg, rgba(212,168,75,0.25), rgba(212,168,75,0.12), rgba(139,92,246,0.08))'
                              : 'linear-gradient(135deg, rgba(28,20,55,0.75), rgba(22,15,45,0.55))',
                            border: isHit ? `1.5px solid ${GOLD}99` : `1px solid ${GOLD}10`,
                            boxShadow: isHit
                              ? `0 0 40px ${GOLD}2E, inset 0 0 30px ${GOLD}14`
                              : 'inset 0 1px 0 rgba(212,168,75,0.03)',
                            animation: isHit ? 'fate-glow 3s ease-in-out infinite' : 'none',
                          }}
                        >
                          {/* Train-like running border for selected */}
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

                          {/* Rising particles for selected */}
                          {isHit && (
                            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                              {[...Array(5)].map((_, pi) => (
                                <div
                                  key={pi}
                                  className="absolute h-[3px] w-[3px] rounded-full"
                                  style={{
                                    background: '#F0D080',
                                    boxShadow: `0 0 6px ${GOLD}E6`,
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
                            className={`relative z-10 flex items-center justify-center font-serif font-bold transition-all duration-500 shrink-0 ${isHit ? 'h-9 w-9 rounded-lg text-base' : 'h-8 w-8 rounded-md text-sm'}`}
                            style={{
                              color: isHit ? '#FFFFFF' : '#C4A87C',
                              background: isHit
                                ? 'linear-gradient(135deg, #D4A84B, #B8860B)'
                                : 'linear-gradient(135deg, rgba(212,168,75,0.1), rgba(212,168,75,0.03))',
                              border: isHit ? `1.5px solid ${GOLD}B3` : `1px solid ${GOLD}1F`,
                              boxShadow: isHit
                                ? `0 0 20px ${GOLD}80, inset 0 1px 0 rgba(255,255,255,0.2)`
                                : 'none',
                              animation: isHit ? 'chosen-glow 2.5s ease-in-out infinite' : 'none',
                            }}
                          >
                            {CHINESE_NUMERALS[oi + 1] || oi + 1}
                          </span>

                          {/* Option text */}
                          <span
                            className={`relative z-10 flex-1 tracking-wide transition-all duration-500 ${isHit ? 'text-sm font-bold' : 'text-sm font-medium'}`}
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

                {/* ===== Footer ===== */}
                <div className="mt-8 pt-2 text-center">
                  <div
                    className="mx-auto mb-2 h-px w-16"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${GOLD}44, transparent)`,
                    }}
                  />
                  <p
                    className="mb-3 font-orbitron text-[10px] tracking-[0.3em]"
                    style={{ color: `${GOLD}44` }}
                  >
                    F A T E S E A L E D
                  </p>
                  <p className="text-[10px]" style={{ color: `${GOLD}33` }}>
                    {formattedTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back button */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => router.push('/tools/life/fate-dice')}
              className="cursor-pointer rounded-xl px-8 py-3 text-sm font-bold tracking-wider text-white transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, #B8860B)`,
                boxShadow: `0 4px 24px ${GOLD}44`,
              }}
            >
              返回天命灵签
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
