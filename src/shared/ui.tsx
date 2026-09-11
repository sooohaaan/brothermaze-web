import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import { LINKS } from "../content"
import badgeAppStore from "../assets/badge-appstore.png"
import badgeGooglePlay from "../assets/badge-googleplay.webp"

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ")

/* ── W 코인 ─────────────────────────────────────────── */
export function Coin({
  size = 20,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-full font-num font-extrabold text-white",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.46,
        background:
          "radial-gradient(circle at 32% 28%, #ffd76a 0%, #f5b32d 45%, #d99a14 100%)",
        boxShadow:
          "inset 0 -1px 0 rgb(0 0 0 / 0.12), inset 0 1px 0 rgb(255 255 255 / 0.45), 0 1px 3px rgb(217 154 20 / 0.4)",
      }}
    >
      W
    </span>
  )
}

/* ── 금액 — 코인 6px · 숫자 · "원" 4px ─────────────────── */
const moneySize = {
  sm: { coin: 16, text: "text-base", unit: "text-[0.85em]" },
  md: { coin: 22, text: "text-2xl", unit: "text-[0.65em]" },
  lg: { coin: 28, text: "text-[32px] md:text-[40px]", unit: "text-[0.5em]" },
  xl: { coin: 36, text: "text-[40px] md:text-[48px]", unit: "text-[0.5em]" },
}
export function Money({
  value,
  size = "md",
  sign,
  className,
}: {
  value: number | string
  size?: keyof typeof moneySize
  sign?: "+"
  className?: string
}) {
  const s = moneySize[size]
  return (
    <span
      className={cx("inline-flex items-center gap-1.5 leading-none", className)}
    >
      <Coin size={s.coin} />
      <span className={cx("num font-extrabold", s.text)}>
        {sign}
        {typeof value === "number" ? value.toLocaleString("ko-KR") : value}
        <span className={cx("ml-1 font-sans font-bold", s.unit)}>원</span>
      </span>
    </span>
  )
}

/* ── 레이아웃 ───────────────────────────────────────── */
export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cx("mx-auto w-full max-w-[1120px] px-5 md:px-10", className)}
    >
      {children}
    </div>
  )
}

const sectionTone = {
  ground: "bg-ground",
  surface: "bg-surface",
  navy: "bg-navy text-white",
  dark: "bg-navy-900 text-white",
}
export function Section({
  id,
  tone = "ground",
  children,
  className,
}: {
  id?: string
  tone?: keyof typeof sectionTone
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={cx("py-20 md:py-30", sectionTone[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  )
}

/* eyebrow → 제목 12 · 제목 → 부제 12 */
export function SectionHead({
  eyebrow,
  title,
  sub,
  onDark,
  center,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  sub?: ReactNode
  onDark?: boolean
  center?: boolean
  className?: string
}) {
  return (
    <header
      className={cx(
        "max-w-[640px]",
        center && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cx(
            "text-sm font-semibold tracking-normal",
            onDark ? "text-gold-400" : "text-brand-700",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cx(
          "text-[26px] leading-[1.3] font-extrabold tracking-[-0.025em] md:text-[36px]",
          eyebrow && "mt-3",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cx(
            "mt-3 text-base leading-[1.7] md:text-[17px]",
            onDark ? "text-white/70" : "text-ink-2",
          )}
        >
          {sub}
        </p>
      )}
    </header>
  )
}

/* ── 카드 ───────────────────────────────────────────── */
export function Card({
  children,
  className,
  flat,
}: {
  children: ReactNode
  className?: string
  flat?: boolean
}) {
  return (
    <div
      className={cx(
        "rounded-card bg-surface p-6 md:p-8",
        flat ? "ring-1 ring-line" : "shadow-card",
        className,
      )}
    >
      {children}
    </div>
  )
}

/* ── 버튼 — 라운드 = 높이 ÷ 2 ─────────────────────────── */
const btnVariant = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "bg-surface text-ink ring-1 ring-inset ring-line hover:ring-ink-3/40 hover:bg-ground/60",
  tint: "bg-brand-50 text-brand-700 hover:bg-brand-100",
  onDark:
    "bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/15",
  white: "bg-white text-brand-700 hover:bg-brand-50",
}
const btnSize = {
  lg: "h-14 px-8 text-[17px]",
  md: "h-12 px-6 text-base",
  sm: "h-10 px-5 text-[15px]",
}
type BtnProps = {
  children: ReactNode
  variant?: keyof typeof btnVariant
  size?: keyof typeof btnSize
  href?: string
  onClick?: () => void
  className?: string
  external?: boolean
}
export function Button({
  children,
  variant = "primary",
  size = "lg",
  href,
  onClick,
  className,
  external,
}: BtnProps) {
  const cls = cx(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap transition-colors duration-150",
    btnVariant[variant],
    btnSize[size],
    className,
  )
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  )
}

/* ── 스토어 배지 — 현행 사이트의 공식 배지 이미지 ────────── */
/* 두 이미지 모두 투명 여백 없이 배지 본체만 남겨 높이를 48px로 맞춤 */
export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cx("flex flex-wrap items-center gap-3", className)}>
      <a
        href={LINKS.appStore}
        target="_blank"
        rel="noreferrer"
        className="block rounded-[10px] transition-transform hover:-translate-y-0.5"
      >
        <img
          src={badgeAppStore}
          alt="App Store에서 다운로드 하기"
          width={512}
          height={158}
          className="block h-12 w-auto"
        />
      </a>
      <a
        href={LINKS.playStore}
        target="_blank"
        rel="noreferrer"
        className="block rounded-[10px] transition-transform hover:-translate-y-0.5"
      >
        <img
          src={badgeGooglePlay}
          alt="Google Play에서 다운로드"
          width={974}
          height={289}
          className="block h-12 w-auto"
        />
      </a>
    </div>
  )
}

/* 기기를 보고 알맞은 스토어로 */
export function storeLink() {
  if (
    typeof navigator !== "undefined" &&
    /iPhone|iPad|iPod/i.test(navigator.userAgent)
  )
    return LINKS.appStore
  return LINKS.playStore
}

/* ── 폰 화면 — 기기 테두리 없는 앱 캡처에 흰 폰 테두리를 씌움 ──
 * bleed: 카드 아래로 이어지는 것처럼 하단 테두리 없이 잘라 보여줌
 */
export function PhoneScreen({
  src,
  alt,
  ratio,
  bleed,
  screenBg = "#f9fbfc",
  className,
}: {
  src: string
  alt: string
  ratio: string
  bleed?: boolean
  /* 캡처 상단 배경색과 맞춰 노치 영역에 경계가 생기지 않게 */
  screenBg?: string
  className?: string
}) {
  return (
    <div
      className={cx(
        "bg-white p-2 shadow-float ring-1 ring-line",
        bleed ? "rounded-t-[36px] pb-0" : "rounded-[36px]",
        className,
      )}
    >
      <div
        className={cx(
          "overflow-hidden",
          bleed ? "rounded-t-[28px]" : "rounded-[28px]",
        )}
        style={{ backgroundColor: screenBg }}
      >
        <div className="flex h-7 items-center justify-center">
          <span className="h-4 w-16 rounded-full bg-ink/90" />
        </div>
        <div style={{ aspectRatio: ratio }}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="block size-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  )
}

/* ── 슬라이더 ───────────────────────────────────────── */
export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
  hint,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  format: (v: number) => string
  hint?: [string, string]
}) {
  const id = useId()
  const fill = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] font-semibold text-ink-2">
          {label}
        </label>
        <output htmlFor={id} className="num text-xl font-bold text-brand-700">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="range mt-3"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={format(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
      />
      {hint && (
        <div className="mt-1 flex justify-between text-[13px] text-ink-3">
          <span>{hint[0]}</span>
          <span>{hint[1]}</span>
        </div>
      )}
    </div>
  )
}

/* ── 세그먼트 선택 ──────────────────────────────────── */
export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: ReactNode }[]
  value: T
  onChange: (v: T) => void
  label: string
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="grid auto-cols-fr grid-flow-col gap-1 rounded-2xl bg-ground p-1"
    >
      {options.map((o) => {
        const on = o.value === value
        return (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.value)}
            className={cx(
              "h-12 rounded-xl text-[15px] font-semibold transition-all duration-150",
              on
                ? "bg-surface text-brand-700 shadow-card"
                : "text-ink-3 hover:text-ink-2",
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/* ── 통계 ───────────────────────────────────────────── */
export function Stat({
  value,
  label,
  onDark,
}: {
  value: ReactNode
  label: string
  onDark?: boolean
}) {
  return (
    <div>
      <p
        className={cx(
          "num text-2xl font-extrabold md:text-[28px]",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {value}
      </p>
      <p
        className={cx("mt-1 text-sm", onDark ? "text-white/60" : "text-ink-3")}
      >
        {label}
      </p>
    </div>
  )
}

/* ── FAQ ────────────────────────────────────────────── */
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const on = open === i
        return (
          <div key={it.q}>
            <h3>
              <button
                type="button"
                aria-expanded={on}
                onClick={() => setOpen(on ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-semibold text-ink"
              >
                {it.q}
                <span
                  aria-hidden
                  className={cx(
                    "grid size-8 shrink-0 place-items-center rounded-full bg-ground text-ink-2 transition-transform duration-200",
                    on && "rotate-45 bg-brand-50 text-brand-700",
                  )}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1v12M1 7h12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            {on && (
              <p className="-mt-1 pr-14 pb-6 text-base leading-[1.7] text-ink-2">
                {it.a}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── 숫자 카운트업 — 앱의 적립 모션을 웹으로 ─────────────── */
export function useCountup(target: number, ms = 520) {
  const [val, setVal] = useState(target)
  const from = useRef(target)
  const frame = useRef(0)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setVal(target)
      from.current = target
      return
    }
    const start = performance.now()
    const begin = from.current
    cancelAnimationFrame(frame.current)
    const tick = (now: number) => {
      const t = Math.min((now - start) / ms, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      const v = Math.round(begin + (target - begin) * ease)
      setVal(v)
      from.current = v
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [target, ms])
  return val
}

/* ── 체크 아이콘 ────────────────────────────────────── */
export function Check({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className={cx("size-5 shrink-0", className)}
      fill="none"
    >
      <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.12" />
      <path
        d="M6 10.2l2.6 2.6L14 7.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className={cx("size-5 shrink-0", className)}
      fill="none"
    >
      <path
        d="M4 10h11M11 5.5L15.5 10 11 14.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { cx }
