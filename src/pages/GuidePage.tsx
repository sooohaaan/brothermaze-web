import { useEffect, useRef, useState, type MouseEvent } from "react"
import { COMPANY, LINKS } from "../content"
import { Button, Container, SplitWords, cx } from "../shared/ui"
import { GUIDE_HOME, type GuideSlug } from "../sites"
import { DOCS, GROUPS, docBySlug, type GuideDoc } from "../guide/docs"
import { docHref } from "../guide/blocks"

/*
 * 광고해요 서비스 이용 가이드 — 노션 가이드를 광고해요 홈페이지와 같은
 * 토큰·타입 스케일로 옮긴 화면입니다.
 *   /adhaeyo/guide/         목차(노션 첫 화면의 세 묶음)
 *   /adhaeyo/guide/<slug>/  문서 — 왼쪽에 가이드 목록과 현재 문서 목차
 */

type Props = {
  slug?: GuideSlug
  open: (slug?: GuideSlug, at?: string) => void
}

export default function GuidePage({ slug, open }: Props) {
  /* 본문 안의 가이드 링크(data-doc)는 새로고침 없이 화면만 바꿉니다.
   * 새 탭으로 열기(⌘/Ctrl·가운데 클릭)는 브라우저에 맡깁니다. */
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-doc]")
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    const to = (a.dataset.doc || undefined) as GuideSlug | undefined
    const at = a.dataset.at
    /* 같은 문서 안의 단락 링크는 주소의 #만 바꾸고 그 자리로 옮깁니다. */
    if (at && to === slug) {
      window.history.pushState(null, "", `#${at}`)
      document.getElementById(at)?.scrollIntoView({ block: "start" })
      return
    }
    open(to, at)
  }

  return (
    <main id="main" onClick={onClick}>
      {slug ? <DocView doc={docBySlug(slug)} /> : <Hub />}
      <Contact />
    </main>
  )
}

/* ── 목차 ─────────────────────────────────────────────── */
function Hub() {
  return (
    <>
      <section aria-label="이용 가이드 소개" className="bg-ground pt-12 pb-12 md:pt-20 md:pb-16">
        <Container>
          <p className="text-[15px] font-semibold text-ink-3">광고해요 이용 가이드</p>
          <h1 className="reveal-words mt-4 text-[32px] leading-[1.3] font-bold tracking-[-0.01em] text-ink-strong md:text-[48px] 2xl:text-[56px]">
            <SplitWords>
              처음이어도 쉽게
              <br />
              <span className="text-brand-600">광고해요</span> 사용법
            </SplitWords>
          </h1>
          <p className="mt-5 max-w-[560px] text-base leading-[1.6] text-ink-2 md:text-lg">
            {GUIDE_HOME.description} 가입부터 첫 광고 집행까지 필요한 내용을
            순서대로 담았어요.
          </p>
        </Container>
      </section>

      <section aria-label="가이드 목록" className="bg-ground pb-20 md:pb-30">
        <Container className="reveal-children grid gap-14 md:gap-20">
          {GROUPS.map((g, gi) => {
            const docs = DOCS.filter((d) => d.group === g.id)
            return (
              <div key={g.id}>
                <div className="flex items-baseline gap-3">
                  <span className="num text-[22px] font-extrabold text-brand-600 md:text-[26px]">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-[24px] leading-[1.4] font-bold text-ink md:text-[32px]">
                    {g.title}
                  </h2>
                </div>
                <ul className="mt-6 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
                  {docs.map((d) => (
                    <li key={d.slug}>
                      <DocCard doc={d} />
                    </li>
                  ))}
                  {g.id === "start" && (
                    <li>
                      <a
                        href={import.meta.env.BASE_URL}
                        className="group flex h-full flex-col justify-between gap-8 rounded-[32px] bg-fill-2 p-7 ring-1 ring-line transition-colors hover:bg-fill md:p-8"
                      >
                        <div>
                          <p className="text-[13px] font-semibold text-ink-3">광고가 노출되는 곳</p>
                          <h3 className="mt-2 text-[20px] leading-[1.45] font-bold text-ink md:text-[22px]">
                            보면소득 둘러보기
                          </h3>
                          <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">
                            내 광고를 보게 될 사람들이 쓰는 앱이에요.
                          </p>
                        </div>
                        <Chevron className="self-end" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )
          })}
        </Container>
      </section>
    </>
  )
}

function DocCard({ doc }: { doc: GuideDoc }) {
  return (
    <a
      href={docHref(doc.slug)}
      data-doc={doc.slug}
      className="group flex h-full flex-col justify-between gap-8 rounded-[32px] bg-surface p-7 shadow-card ring-1 ring-line transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-float md:p-8"
    >
      <div>
        <p className="text-[13px] font-semibold text-brand-700">
          {GROUPS.find((g) => g.id === doc.group)!.title}
        </p>
        <h3 className="mt-2 text-[20px] leading-[1.45] font-bold text-ink md:text-[22px]">
          {doc.title}
        </h3>
        <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">{doc.lead}</p>
      </div>
      <Chevron className="self-end" />
    </a>
  )
}

function Chevron({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        "grid size-10 place-items-center rounded-full bg-fill text-ink-3 transition-colors group-hover:bg-brand-600 group-hover:text-white",
        className,
      )}
    >
      <svg viewBox="0 0 20 20" className="size-5" fill="none">
        <path
          d="M4 10h11M11 5.5L15.5 10 11 14.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

/* ── 문서 ─────────────────────────────────────────────── */
/* 스크롤 위치에 맞춰 목차의 현재 항목을 표시합니다. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    setActive(ids[0])
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
    const onScroll = () => {
      const line = 120
      let cur = ids[0]
      for (const el of els) {
        if (el.getBoundingClientRect().top - line <= 0) cur = el.id
      }
      /* 페이지 끝에 닿으면 마지막 항목을 켭니다. */
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4)
        cur = els[els.length - 1]?.id ?? cur
      setActive(cur)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [ids.join("|")])
  return active
}

function DocView({ doc }: { doc: GuideDoc }) {
  const ids = doc.sections.map((s) => s.id)
  const active = useActiveSection(ids)

  /* /adhaeyo/guide/policy/#refund 같은 주소로 바로 들어오면 그 단락으로
   * 이동합니다. 본문이 스크립트로 그려지므로 브라우저 기본 이동은 놓칩니다. */
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    /* 부드러운 스크롤(html 의 scroll-behavior)은 첫 화면 렌더와 겹치면
     * 중간에 멈춰서, 즉시 이동하고 글꼴이 늦게 들어와 밀린 경우를 위해
     * 한 번 더 맞춥니다. */
    const jump = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" })
    const raf = requestAnimationFrame(jump)
    const t = window.setTimeout(jump, 400)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t)
    }
  }, [doc.slug])
  const idx = DOCS.findIndex((d) => d.slug === doc.slug)
  const prev = DOCS[idx - 1]
  const next = DOCS[idx + 1]
  const group = GROUPS.find((g) => g.id === doc.group)!

  return (
    <Container className="grid gap-10 pt-8 pb-20 md:pt-12 lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-16 lg:pb-30">
      <Sidebar doc={doc} active={active} />

      <article className="min-w-0 max-w-[780px]">
        <nav aria-label="현재 위치" className="text-[14px] font-semibold text-ink-3">
          <a href={docHref()} data-doc="" className="hover:text-brand-700">
            이용 가이드
          </a>
          <span aria-hidden className="mx-2 text-line">/</span>
          <span>{group.title}</span>
        </nav>
        <h1 className="mt-4 text-[30px] leading-[1.3] font-bold tracking-[-0.01em] text-ink-strong md:text-[44px]">
          {doc.title}
        </h1>
        <p className="mt-4 text-base leading-[1.6] text-ink-2 md:text-lg">{doc.description}</p>
        <p className="mt-3 flex flex-wrap gap-x-4 text-[14px] font-semibold text-ink-3">
          {doc.effective && <span>시행일 {doc.effective}</span>}
          <span>
            마지막 업데이트{" "}
            <time dateTime={doc.updated}>
              {doc.updated.replace(/^(\d+)-0?(\d+)-0?(\d+)$/, "$1년 $2월 $3일")}
            </time>
          </span>
        </p>

        {/* 모바일 — 문서 목차를 접어서 보여줍니다. */}
        <MobileToc doc={doc} />

        <div className="mt-12 grid gap-16 md:mt-16 md:gap-20">
          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
              <h2
                id={`${s.id}-h`}
                className="text-[24px] leading-[1.4] font-bold tracking-[-0.01em] text-ink md:text-[30px]"
              >
                {s.title}
              </h2>
              <div className="mt-6 grid gap-6 md:mt-8">{s.body}</div>
            </section>
          ))}
        </div>

        <nav
          aria-label="이전·다음 가이드"
          className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2"
        >
          {prev ? <PagerCard doc={prev} dir="prev" /> : <span className="hidden sm:block" />}
          {next && <PagerCard doc={next} dir="next" />}
        </nav>
      </article>
    </Container>
  )
}

function Sidebar({ doc, active }: { doc: GuideDoc; active: string }) {
  return (
    <aside aria-label="가이드 목록" className="hidden lg:block">
      <div className="sticky top-[96px] max-h-[calc(100vh-120px)] overflow-y-auto pr-2 pb-8">
        <a
          href={docHref()}
          data-doc=""
          className="inline-flex min-h-10 items-center gap-1.5 text-[14px] font-semibold text-ink-3 hover:text-brand-700"
        >
          <svg aria-hidden viewBox="0 0 20 20" className="size-4" fill="none">
            <path d="M12.5 4.5L7 10l5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          이용 가이드 처음으로
        </a>
        {GROUPS.map((g) => (
          <div key={g.id} className="mt-6">
            <p className="px-3 text-[13px] font-bold text-ink-3">{g.title}</p>
            <ul className="mt-2 grid gap-0.5">
              {DOCS.filter((d) => d.group === g.id).map((d) => {
                const on = d.slug === doc.slug
                return (
                  <li key={d.slug}>
                    <a
                      href={docHref(d.slug)}
                      data-doc={d.slug}
                      aria-current={on ? "page" : undefined}
                      className={cx(
                        "flex min-h-10 items-center rounded-xl px-3 text-[15px] font-semibold transition-colors",
                        on ? "bg-brand-50 text-brand-700" : "text-ink-2 hover:bg-fill-2 hover:text-ink",
                      )}
                    >
                      {d.title}
                    </a>
                    {on && (
                      <ul className="my-1.5 ml-3 grid gap-0.5 border-l border-line pl-3">
                        {d.sections.map((s) => (
                          <li key={s.id}>
                            <a
                              href={`#${s.id}`}
                              aria-current={active === s.id ? "location" : undefined}
                              className={cx(
                                "-ml-[13px] flex min-h-8 items-center border-l-2 pl-3 text-[14px] leading-[1.45] transition-colors",
                                active === s.id
                                  ? "border-brand-600 font-semibold text-ink"
                                  : "border-transparent text-ink-3 hover:text-ink",
                              )}
                            >
                              {s.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}

function MobileToc({ doc }: { doc: GuideDoc }) {
  const ref = useRef<HTMLDetailsElement>(null)
  return (
    <details ref={ref} className="group mt-8 rounded-2xl bg-fill-2 ring-1 ring-line lg:hidden">
      <summary className="flex min-h-13 cursor-pointer list-none items-center justify-between px-5 text-[15px] font-bold text-ink [&::-webkit-details-marker]:hidden">
        이 문서의 목차
        <svg aria-hidden viewBox="0 0 20 20" className="size-5 text-ink-3 transition-transform group-open:rotate-180" fill="none">
          <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <ol className="grid gap-1 px-5 pb-4">
        {doc.sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={() => ref.current && (ref.current.open = false)}
              className="flex min-h-10 items-center gap-3 text-[15px] text-ink-2 hover:text-brand-700"
            >
              <span className="num w-5 font-bold text-brand-700">{i + 1}</span>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </details>
  )
}

function PagerCard({ doc, dir }: { doc: GuideDoc; dir: "prev" | "next" }) {
  return (
    <a
      href={docHref(doc.slug)}
      data-doc={doc.slug}
      className={cx(
        "group flex flex-col gap-1 rounded-2xl p-5 ring-1 ring-line transition-colors hover:bg-fill-2 md:p-6",
        dir === "next" && "sm:items-end sm:text-right",
      )}
    >
      <span className="text-[13px] font-semibold text-ink-3">
        {dir === "prev" ? "← 이전 가이드" : "다음 가이드 →"}
      </span>
      <span className="text-[17px] font-bold text-ink group-hover:text-brand-700">{doc.title}</span>
    </a>
  )
}

/* ── 문의 — 노션 첫 화면의 💡 안내 ─────────────────────── */
function Contact() {
  return (
    <section aria-label="문의하기" className="bg-ground pb-20 md:pb-30">
      <Container>
        <div className="grid items-center gap-8 rounded-card bg-brand-700 px-7 py-10 text-white md:grid-cols-[1fr_auto] md:px-14 md:py-14">
          <div>
            <h2 className="text-[24px] leading-[1.4] font-bold md:text-[32px]">
              광고 소재 만들기가 어렵거나
              <br className="hidden sm:block" /> 궁금한 점이 있으신가요?
            </h2>
            <p className="mt-3 text-base leading-[1.6] text-white/90 md:text-lg">
              {COMPANY.email} 로 메일을 보내 주시면 광고해요가 도와드릴게요.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={`mailto:${COMPANY.email}`} variant="white">
              메일 보내기
            </Button>
            <a
              href={LINKS.console}
              className="inline-flex h-14 items-center justify-center rounded-full px-8 text-[17px] font-bold text-white ring-1 ring-white/60 ring-inset transition-colors hover:bg-white/10"
            >
              광고해요 로그인
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
