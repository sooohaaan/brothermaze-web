import type { ReactNode } from "react"
import { cx } from "../shared/ui"
import { guidePath, type GuideSlug } from "../sites"

export const docHref = (slug?: GuideSlug) => import.meta.env.BASE_URL + guidePath(slug)

/*
 * 가이드 본문용 블록 — 노션의 번호 목록·글머리표·콜아웃·표·이미지를
 * 랜딩 페이지와 같은 토큰(ink·brand·fill·line)으로 다시 그립니다.
 */

/* 가이드 안의 다른 문서로 가는 링크 — GuidePage 가 클릭을 가로채 화면만 바꿉니다. */
export function DocLink({
  to,
  children,
}: {
  to: GuideSlug
  children: ReactNode
}) {
  return (
    <a
      href={docHref(to)}
      data-doc={to}
      className="font-semibold text-brand-700 underline decoration-brand-100 decoration-2 underline-offset-4 hover:decoration-brand-600"
    >
      {children}
    </a>
  )
}

export function Ext({ href, children }: { href: string; children: ReactNode }) {
  const mail = href.startsWith("mailto:")
  return (
    <a
      href={href}
      {...(mail ? {} : { target: "_blank", rel: "noreferrer" })}
      className="font-semibold text-brand-700 underline decoration-brand-100 decoration-2 underline-offset-4 hover:decoration-brand-600"
    >
      {children}
    </a>
  )
}

export function P({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("text-base leading-[1.75] text-ink-2 md:text-[17px]", className)}>
      {children}
    </p>
  )
}

/* 글머리표 — 중첩은 items 안에 [문장, [하위...]] 형태로 */
export type BulletItem = ReactNode | [ReactNode, BulletItem[]]

export function Bullets({
  items,
  className,
  level = 0,
}: {
  items: BulletItem[]
  className?: string
  level?: number
}) {
  return (
    <ul className={cx("grid gap-2", level > 0 && "mt-2", className)}>
      {items.map((it, i) => {
        const nested = Array.isArray(it) && it.length === 2 && Array.isArray(it[1])
        const head = nested ? (it as [ReactNode, BulletItem[]])[0] : (it as ReactNode)
        return (
          <li
            key={i}
            className="relative pl-5 text-base leading-[1.7] text-ink-2 md:text-[17px]"
          >
            <span
              aria-hidden
              className={cx(
                "absolute top-[0.72em] left-0.5 size-1.5 rounded-full",
                level === 0 ? "bg-brand-600" : "bg-ink-3/60",
              )}
            />
            {head}
            {nested && (
              <Bullets items={(it as [ReactNode, BulletItem[]])[1]} level={level + 1} />
            )}
          </li>
        )
      })}
    </ul>
  )
}

/* 번호 단계 — 왼쪽에 번호 원, 오른쪽에 제목과 내용 */
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="grid gap-10 md:gap-12">{children}</ol>
}

export function Step({
  no,
  title,
  children,
}: {
  no: number
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <li className="grid grid-cols-[32px_1fr] gap-x-4 md:grid-cols-[40px_1fr] md:gap-x-5">
      <span className="num grid size-8 place-items-center rounded-full bg-brand-50 text-[14px] font-bold text-brand-700 md:size-10 md:text-[15px]">
        {no}
      </span>
      <div className="min-w-0 pt-0.5 md:pt-1.5">
        <h3 className="text-[18px] leading-[1.5] font-bold text-ink md:text-[20px]">
          {title}
        </h3>
        {children && <div className="mt-3 grid gap-4">{children}</div>}
      </div>
    </li>
  )
}

/* 콘솔·앱 화면 캡처 — 옅은 회색 면 위에 올립니다. */
export function Shot({
  src,
  alt,
  width,
  height,
  max = 560,
  caption,
}: {
  src: string
  alt: string
  width: number
  height: number
  max?: number
  caption?: ReactNode
}) {
  return (
    <figure className="mt-1">
      <div className="rounded-[24px] bg-fill-2 p-4 ring-1 ring-line md:p-6">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="mx-auto block h-auto w-full rounded-xl bg-white shadow-card"
          style={{ maxWidth: max }}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[14px] leading-[1.6] text-ink-3">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* 콜아웃 — 노션의 💡 박스. tone=warn 은 불이익·주의 안내에 */
export function Callout({
  children,
  tone = "info",
  title,
}: {
  children: ReactNode
  tone?: "info" | "warn"
  title?: ReactNode
}) {
  return (
    <div
      className={cx(
        "flex gap-3 rounded-2xl px-5 py-4 md:px-6 md:py-5",
        tone === "info" ? "bg-brand-50" : "bg-[#fff6e5]",
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className={cx(
          "mt-[3px] size-5 shrink-0",
          tone === "info" ? "text-brand-700" : "text-[#b45309]",
        )}
        fill="none"
      >
        <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 9v5M10 6.2v.1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <div className="min-w-0 text-[15px] leading-[1.7] text-ink md:text-base">
        {title && <p className="font-bold">{title}</p>}
        {children}
      </div>
    </div>
  )
}

/* 다른 문서 바로가기 카드 */
export function GoDoc({ to, children }: { to: GuideSlug; children: ReactNode }) {
  return (
    <a
      href={docHref(to)}
      data-doc={to}
      className="group flex items-center justify-between gap-4 rounded-2xl bg-surface px-5 py-4 ring-1 ring-line transition-colors hover:bg-fill-2 md:px-6"
    >
      <span className="text-[15px] font-semibold text-ink md:text-base">
        <span className="text-ink-3">바로가기 · </span>
        {children}
      </span>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="size-5 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-700"
        fill="none"
      >
        <path
          d="M7.5 4.5L13 10l-5.5 5.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}

/* 표 — 좁은 화면에서는 가로로 밀어 봅니다. */
export function DataTable({
  head,
  rows,
  caption,
  emphasizeLast,
}: {
  head: ReactNode[]
  rows: ReactNode[][]
  caption?: string
  emphasizeLast?: boolean
}) {
  return (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-line">
      <table className="w-full min-w-[520px] border-collapse text-left text-[15px] leading-[1.6]">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-fill-2">
          <tr>
            {head.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="px-4 py-3 font-bold whitespace-nowrap text-ink md:px-5"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className={cx(
                "border-t border-line",
                emphasizeLast && i === rows.length - 1 && "bg-brand-50/60 font-bold text-ink",
              )}
            >
              {r.map((c, j) => (
                <td
                  key={j}
                  className={cx(
                    "num px-4 py-3 align-top md:px-5",
                    j === 0 ? "text-ink" : "text-ink-2",
                    emphasizeLast && i === rows.length - 1 && "text-ink",
                  )}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* 큰 단락 안의 소제목 */
export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-[18px] leading-[1.5] font-bold text-ink md:text-[20px]">
      {children}
    </h3>
  )
}

/* 번호 목록(제목 없는 짧은 조항) */
export function Ordered({ items }: { items: ReactNode[] }) {
  return (
    <ol className="grid gap-3">
      {items.map((it, i) => (
        <li
          key={i}
          className="grid grid-cols-[24px_1fr] gap-2 text-base leading-[1.7] text-ink-2 md:text-[17px]"
        >
          <span className="num pt-px font-bold text-brand-700">{i + 1}.</span>
          <div className="min-w-0">{it}</div>
        </li>
      ))}
    </ol>
  )
}

export const B = ({ children }: { children: ReactNode }) => (
  <strong className="font-bold text-ink">{children}</strong>
)
