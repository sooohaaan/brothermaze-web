import { useCallback, useEffect, useState } from "react"
import { COMPANY, LINKS } from "./content"
import { Button, Container, cx, storeLink } from "./shared/ui"
import logoBomyeon from "./assets/logo-bomyeon.png"
import BomeonPage from "./pages/BomeonPage"
import GwanggoPage from "./pages/GwanggoPage"

type Site = "bomyeon" | "adhaeyo"

const SITES: { id: Site; label: string; title: string }[] = [
  {
    id: "bomyeon",
    label: "보면소득",
    title: "보면소득 — 원하는 콘텐츠를 보기만 해도 소득받는 전국민 보면소득",
  },
  {
    id: "adhaeyo",
    label: "광고해요",
    title: "광고해요 — 전국민 누구나 보면소득에서 광고해요",
  },
]

/* ?site= 로 화면을 고릅니다. #앵커는 페이지 안 이동에 그대로 씁니다. */
/* ?capture=1 — 화면설계서용 캡처 모드: 프로토타입 바와 고정 CTA를 숨김 */
const CAPTURE = new URLSearchParams(window.location.search).has("capture")

function readSite(): Site {
  const s = new URLSearchParams(window.location.search).get("site")
  return s === "adhaeyo" ? s : "bomyeon"
}

function useSite() {
  const [site, setSite] = useState<Site>(readSite)
  useEffect(() => {
    const onPop = () => setSite(readSite())
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])
  useEffect(() => {
    document.title = SITES.find((s) => s.id === site)!.title
  }, [site])
  const go = useCallback((next: Site) => {
    const url =
      next === "bomyeon"
        ? window.location.pathname
        : `${window.location.pathname}?site=${next}`
    window.history.pushState(null, "", url)
    setSite(next)
    window.scrollTo({ top: 0 })
  }, [])
  return [site, go] as const
}

function useScrolled(threshold: number) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const f = () => setOn(window.scrollY > threshold)
    f()
    window.addEventListener("scroll", f, { passive: true })
    return () => window.removeEventListener("scroll", f)
  }, [threshold])
  return on
}

/* ── 프로토타입 전환 바 — 제품 화면이 아니라 검토용 도구 ──── */
function PrototypeBar({ site, go }: { site: Site; go: (s: Site) => void }) {
  return (
    <div className="bg-ink text-white">
      <Container className="flex h-11 items-center justify-end gap-4">
        <nav aria-label="프로토타입 화면 전환" className="flex gap-1">
          {SITES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(s.id)}
              aria-current={site === s.id ? "page" : undefined}
              className={cx(
                "h-7 rounded-full px-3 text-[13px] font-semibold transition-colors",
                site === s.id
                  ? "bg-white text-ink"
                  : "text-white/60 hover:text-white",
              )}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </Container>
    </div>
  )
}

/* ── 사이트 헤더 ────────────────────────────────────── */
function Logo({ site, onDark }: { site: Site; onDark?: boolean }) {
  if (site === "adhaeyo") {
    return (
      <span className="flex items-baseline gap-2">
        <span
          className={cx(
            "text-[19px] font-extrabold tracking-[-0.03em]",
            onDark ? "text-white" : "text-ink",
          )}
        >
          광고해요
        </span>
        <span
          className={cx(
            "text-[12px] font-semibold",
            onDark ? "text-white/50" : "text-ink-3",
          )}
        >
          by 보면소득
        </span>
      </span>
    )
  }
  return (
    <img
      src={logoBomyeon}
      alt="보면소득"
      width={40}
      height={40}
      className="block size-10"
    />
  )
}

function Header({ site, go }: { site: Site; go: (s: Site) => void }) {
  const scrolled = useScrolled(8)
  const links =
    site === "adhaeyo"
      ? [
          ["#usecases", "누구나 쉽게"],
          ["#how", "광고하는 법"],
          ["#value", "무엇이 다른가요"],
          ["#faq", "자주 묻는 질문"],
        ]
      : [
          ["#why", "왜 소득을 주나요"],
          ["#referral", "얻은소득 10%"],
          ["#cash", "현금처럼 사용"],
          ["#faq", "자주 묻는 질문"],
        ]

  return (
    <header
      className={cx(
        "sticky top-0 z-40 bg-ground/85 backdrop-blur-md transition-[box-shadow] duration-200",
        scrolled && "shadow-[0_1px_0_var(--color-line)]",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={`${
            site === "adhaeyo" ? "광고해요" : "보면소득"
          } 처음으로`}
        >
          <Logo site={site} />
        </a>
        <nav
          aria-label="페이지 안 이동"
          className="hidden items-center gap-8 md:flex"
        >
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-[15px] font-semibold text-ink-2 transition-colors hover:text-ink"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {site === "adhaeyo" ? (
            <>
              <button
                type="button"
                onClick={() => go("bomyeon")}
                className="hidden text-[15px] font-semibold text-ink-2 hover:text-ink lg:block"
              >
                보면소득 둘러보기
              </button>
              <a
                href={LINKS.console}
                className="hidden text-[15px] font-semibold text-ink-2 hover:text-ink sm:block"
              >
                로그인
              </a>
              <Button href="#signup" size="sm">
                무료로 시작하기
              </Button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => go("adhaeyo")}
                className="hidden text-[15px] font-semibold text-ink-2 hover:text-ink lg:block"
              >
                광고주이신가요?
              </button>
              <Button href="#download" size="sm">
                앱 다운로드
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  )
}

/* ── 모바일 고정 CTA — 히어로를 지나면 나타나고, 마지막 CTA에서는 숨김 ── */
function MobileCTA({ site }: { site: Site }) {
  const pastHero = useScrolled(560)
  const [atEnd, setAtEnd] = useState(false)
  const targetId = site === "adhaeyo" ? "signup" : "download"

  useEffect(() => {
    const el = document.getElementById(targetId)
    if (!el) return
    const io = new IntersectionObserver(([e]) => setAtEnd(e.isIntersecting), {
      threshold: 0.15,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [targetId, site])

  const show = pastHero && !atEnd

  return (
    <div
      aria-hidden={!show}
      className={cx(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-5 pt-3 backdrop-blur-md transition-transform duration-300 md:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      {site === "adhaeyo" ? (
        <Button href="#signup" className="w-full">
          무료로 시작하기
        </Button>
      ) : (
        <Button href={storeLink()} external className="w-full">
          앱 설치하고 소득 받기
        </Button>
      )}
    </div>
  )
}

/* ── 푸터 — 현행 사이트의 사업자 정보 ─────────────────── */
function Footer({ site }: { site: Site }) {
  return (
    <footer className="border-t border-line bg-surface pt-12 pb-28 md:pb-12">
      <Container className="grid gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <Logo site={site === "adhaeyo" ? "adhaeyo" : "bomyeon"} />
          <dl className="mt-5 grid gap-1 text-[13px] leading-[1.7] text-ink-3">
            <div className="flex flex-wrap gap-x-4">
              <span>{COMPANY.name}</span>
              <span>대표 {COMPANY.ceo}</span>
              <span>사업자등록번호 {COMPANY.bizNo}</span>
            </div>
            <div className="flex flex-wrap gap-x-4">
              <span>통신판매업 신고 {COMPANY.mailOrderNo}</span>
              <span>{COMPANY.address}</span>
            </div>
            <div className="flex flex-wrap gap-x-4">
              <span>서비스 문의 {COMPANY.email}</span>
              <span>제휴·광고 문의 {COMPANY.partnerEmail}</span>
            </div>
          </dl>
          <p className="mt-5 text-[13px] text-ink-3">
            © 2026 BrotherMaze. All rights reserved.
          </p>
        </div>
        <nav
          aria-label="약관"
          className="flex gap-5 text-[13px] font-semibold text-ink-2 md:flex-col md:items-end md:gap-2"
        >
          <a
            href={LINKS.terms}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink"
          >
            이용약관
          </a>
          <a
            href={LINKS.privacy}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink"
          >
            개인정보 처리방침
          </a>
        </nav>
      </Container>
    </footer>
  )
}

export default function App() {
  const [site, go] = useSite()
  return (
    <div id="top">
      {!CAPTURE && <PrototypeBar site={site} go={go} />}
      <Header site={site} go={go} />
      {site === "bomyeon" && <BomeonPage onSwitchToAd={() => go("adhaeyo")} />}
      {site === "adhaeyo" && <GwanggoPage />}
      <Footer site={site} />
      {!CAPTURE && <MobileCTA site={site} />}
    </div>
  )
}
