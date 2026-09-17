import type { ReactNode } from "react"
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
        "inline-flex shrink-0 items-center justify-center rounded-full font-extrabold text-white",
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
      className={cx("mx-auto w-full max-w-[1320px] px-5 md:px-12", className)}
    >
      {children}
    </div>
  )
}

/* 토스처럼 기본은 순백. gray는 아주 옅게만 씁니다. */
const sectionTone = {
  ground: "bg-ground",
  gray: "bg-fill-2",
}
export function Section({
  id,
  label,
  tone = "ground",
  children,
  className,
}: {
  id?: string
  /* 스크린리더가 섹션 단위로 건너뛸 수 있도록 이름을 붙입니다. */
  label?: string
  tone?: keyof typeof sectionTone
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cx("py-20 md:py-30", sectionTone[tone], className)}
    >
      <Container className="reveal-children">{children}</Container>
    </section>
  )
}

/* ── 토스식 번호 챕터 헤드 — 큰 숫자 + 제목, 가운데 정렬 ─── */
export function ChapterHead({
  no,
  title,
  sub,
  center = true,
}: {
  no: string
  title: ReactNode
  sub?: ReactNode
  center?: boolean
}) {
  return (
    <header
      className={cx("max-w-[680px]", center && "mx-auto text-center")}
    >
      <p className="num text-[26px] font-extrabold text-brand-600 md:text-[32px]">
        {no}
      </p>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold tracking-[-0.01em] text-ink md:text-[36px]">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-base leading-[1.6] text-ink-2">
          {sub}
        </p>
      )}
    </header>
  )
}

/* ── 버튼 — 라운드 = 높이 ÷ 2 ─────────────────────────── */
const btnVariant = {
  primary: "bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-800",
  secondary:
    "bg-surface text-ink ring-1 ring-inset ring-line hover:ring-ink-3/40 hover:bg-ground/60",
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

/* ── Q&A — 토스처럼 전부 펼쳐서 보여줍니다. 누를 것 없음 ──── */
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <dl className="grid gap-4 md:gap-5">
      {items.map((it) => (
        <div key={it.q} className="rounded-card bg-surface p-6 ring-1 ring-line md:p-7">
          <dt className="text-[17px] leading-[1.5] font-bold text-ink">
            <span className="num mr-2 text-brand-700">Q.</span>
            {it.q}
          </dt>
          <dd className="mt-2 text-[15px] leading-[1.6] text-ink-2">
            {it.a}
          </dd>
        </div>
      ))}
    </dl>
  )
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
