import { useEffect, useState } from "react"
import {
  ADHAEYO_FAQ,
  AD_PRICE_STEP,
  BANNER_CPC,
  LINKS,
  AD_LENGTHS,
  AD_PRICE,
  REWARD,
  STATS,
  type AdLength,
} from "../content"
import {
  Arrow,
  Button,
  Check,
  Coin,
  Container,
  FAQ,
  Money,
  Section,
  SectionHead,
  Segmented,
  Slider,
  cx,
  useCountup,
} from "../shared/ui"
import logoBomyeon from "../assets/logo-bomyeon.png"

type Mode = "business" | "personal"

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`
const people = (n: number) => `${n.toLocaleString("ko-KR")}명`
const viewsFor = (budget: number, len: AdLength) =>
  Math.floor(budget / AD_PRICE[len])

/* ── 01 히어로 — 환원 구조를 헤드라인으로 ─────────────── */
function Hero() {
  const viewerShare = Math.round((REWARD[15] / AD_PRICE[15]) * 100)
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-12 pb-20 text-white md:pt-20 md:pb-30">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-30%] right-[-15%] size-[720px] rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #0d82ff 0%, transparent 65%)",
        }}
      />
      <Container className="relative grid items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <div>
          <p className="text-sm font-semibold text-gold-400">
            완전시청 과금 광고 · 보면소득에 노출
          </p>
          <h1 className="mt-4 text-[36px] leading-[1.22] font-extrabold tracking-[-0.035em] md:text-[54px]">
            광고비의 절반이
            <br />
            <span className="text-gold-400">고객 주머니로</span> 들어갑니다
          </h1>
          <p className="mt-5 max-w-[460px] text-[17px] leading-[1.7] text-white/70 md:text-lg">
            노출은 무료. 끝까지 본 사람에게만 15원. 그중 7원은 광고를 본 그
            사람에게 돌아갑니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#signup">무료로 시작하기</Button>
            <Button href="#products" variant="onDark">
              광고 상품 보기
            </Button>
          </div>
        </div>

        {/* 15원이 어디로 가는지 */}
        <div className="rounded-card bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm md:p-8">
          <p className="text-[15px] text-white/60">완전시청 1건의 광고비</p>
          <p className="num mt-1 text-[48px] leading-none font-extrabold">
            15<span className="ml-1 font-sans text-2xl font-bold">원</span>
          </p>
          <div
            className="mt-6 flex h-3 overflow-hidden rounded-full"
            aria-hidden
          >
            <div className="bg-gold-400" style={{ width: `${viewerShare}%` }} />
            <div className="flex-1 bg-white/20" />
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <dt className="flex items-center gap-2 text-[13px] text-white/60">
                <span className="size-2 rounded-full bg-gold-400" /> 시청자에게
              </dt>
              <dd className="mt-1 flex items-center gap-1.5">
                <Coin size={20} />
                <span className="num text-2xl font-extrabold">7원</span>
                <span className="num text-[13px] text-white/60">
                  {viewerShare}%
                </span>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-[13px] text-white/60">
                <span className="size-2 rounded-full bg-white/40" /> 운영·노출
              </dt>
              <dd className="num mt-1 text-2xl font-extrabold text-white/80">
                8원
              </dd>
            </div>
          </dl>
          <p className="mt-6 border-t border-white/10 pt-5 text-[15px] leading-[1.6] text-white/70">
            중간에 넘기거나 끝까지 보지 않으면 <b className="text-white">0원</b>
            입니다.
          </p>
        </div>
      </Container>
    </section>
  )
}

/* ── 02 분기 + 03 예산 시뮬레이터 ──────────────────────── */
const BUDGETS = [
  5000, 10000, 20000, 30000, 50000, 70000, 100000, 200000, 300000, 500000,
  1000000,
]
const REGIONS = [
  "전국",
  "서울",
  "경기·인천",
  "부산·경남",
  "대구·경북",
  "광주·전라",
]

const modes: Record<Mode, {
  title: string
  desc: string
  defaultBudget: number
  defaultLen: AdLength
}> = {
  business: {
    title: "가게·브랜드 홍보",
    desc: "신메뉴, 오픈 소식, SNS 계정 성장",
    defaultBudget: 50000,
    defaultLen: 15,
  },
  personal: {
    title: "개인 · 마음 전하기",
    desc: "생일 축하, 영상편지, 내가 만든 쇼츠",
    defaultBudget: 10000,
    defaultLen: 30,
  },
}

function ModeSwitch({
  mode,
  setMode,
}: {
  mode: Mode
  setMode: (m: Mode) => void
}) {
  return (
    <div
      role="radiogroup"
      aria-label="광고 목적"
      className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-10"
    >
      {(Object.keys(modes) as Mode[]).map((m) => {
        const on = m === mode
        return (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setMode(m)}
            className={cx(
              "flex items-center justify-between gap-4 rounded-card p-5 text-left transition-all duration-150 md:p-6",
              on
                ? "bg-surface shadow-card ring-2 ring-brand-600"
                : "bg-surface/60 ring-1 ring-line hover:bg-surface",
            )}
          >
            <span>
              <span
                className={cx(
                  "block text-[17px] font-bold",
                  on ? "text-brand-700" : "text-ink",
                )}
              >
                {modes[m].title}
              </span>
              <span className="mt-1 block text-[15px] text-ink-2">
                {modes[m].desc}
              </span>
            </span>
            <span
              aria-hidden
              className={cx(
                "grid size-6 shrink-0 place-items-center rounded-full ring-2 transition-colors",
                on ? "bg-brand-600 ring-brand-600" : "ring-line",
              )}
            >
              {on && <span className="size-2 rounded-full bg-white" />}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function BudgetSimulator({ mode }: { mode: Mode }) {
  const [idx, setIdx] = useState(BUDGETS.indexOf(modes[mode].defaultBudget))
  const [len, setLen] = useState<AdLength>(modes[mode].defaultLen)
  const [region, setRegion] = useState(REGIONS[0])

  useEffect(() => {
    setIdx(BUDGETS.indexOf(modes[mode].defaultBudget))
    setLen(modes[mode].defaultLen)
  }, [mode])

  const budget = BUDGETS[idx]
  const views = viewsFor(budget, len)
  const toViewers = views * REWARD[len]
  const dViews = useCountup(views)
  const dToViewers = useCountup(toViewers)

  return (
    <div className="mt-6 grid overflow-hidden rounded-card bg-surface shadow-card md:grid-cols-[1fr_1fr]">
      <div className="grid gap-8 p-6 md:p-8">
        <Slider
          label="광고 예산"
          value={idx}
          min={0}
          max={BUDGETS.length - 1}
          onChange={setIdx}
          format={(i) => won(BUDGETS[i])}
          hint={["5,000원", "100만원"]}
        />
        <div>
          <p className="text-[15px] font-semibold text-ink-2">광고 길이</p>
          <div className="mt-3">
            <Segmented
              label="광고 길이"
              value={len}
              onChange={setLen}
              options={AD_LENGTHS.map((l) => ({
                value: l,
                label: (
                  <span className="leading-tight">
                    {l}초{" "}
                    <span className="num text-[13px] font-medium opacity-70">
                      · {AD_PRICE[l]}원
                    </span>
                  </span>
                ),
              }))}
            />
          </div>
        </div>
        <div>
          <p className="text-[15px] font-semibold text-ink-2">노출 지역</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={r === region}
                onClick={() => setRegion(r)}
                className={cx(
                  "h-10 rounded-full px-4 text-[15px] font-semibold transition-colors",
                  r === region
                    ? "bg-ink text-white"
                    : "bg-ground text-ink-2 hover:bg-line",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-navy p-6 text-white md:p-8">
        <p className="text-[15px] text-white/60">끝까지 볼 사람</p>
        <p className="num mt-2 text-[48px] leading-none font-extrabold md:text-[56px]">
          {dViews.toLocaleString("ko-KR")}
          <span className="ml-1 font-sans text-2xl font-bold">명</span>
        </p>
        <p className="mt-3 text-[15px] text-white/60">
          {region} · {len}초 광고 · 1명당{" "}
          <b className="num text-white">{AD_PRICE[len]}원</b>
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-white/[0.07] px-5 py-4">
          <span className="text-[15px] text-white/75">
            고객 주머니로 가는 돈
          </span>
          <span className="flex items-center gap-1.5">
            <Coin size={20} />
            <span className="num text-xl font-extrabold text-gold-400">
              {dToViewers.toLocaleString("ko-KR")}원
            </span>
          </span>
        </div>

        <div className="mt-auto pt-8">
          <Button href="#signup" className="w-full">
            {won(budget)}으로 시작하기
          </Button>
          <p className="mt-3 text-center text-[13px] text-white/60">
            영상 길이별 최소 단가 기준이에요
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── 04 왜 다른가 + 도달 규모 ─────────────────────────── */
const differences = [
  {
    title: "끝까지 본 경우에만 냅니다",
    desc: "영상광고는 끝까지 본 1건마다 과금합니다. 중간에 넘기면 0원이고, 소재 노출은 계속 무료예요.",
  },
  {
    title: "돈을 준 브랜드는 잊히지 않습니다",
    desc: "시청자는 당신의 광고를 보고 소득을 받습니다. 광고가 불편한 방해가 아니라 반가운 선물이 됩니다.",
  },
  {
    title: "먼저 찾아서 보는 광고입니다",
    desc: "시청자는 소득을 받으려고 스스로 앱을 엽니다. 건너뛰기 버튼을 찾지 않아요.",
  },
]

function Why() {
  return (
    <Section tone="surface">
      <SectionHead
        eyebrow="무엇이 다른가요"
        title="보는 사람도, 내는 사람도 손해 보지 않는 광고"
      />
      <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-6">
        {differences.map((d) => (
          <div key={d.title} className="rounded-card bg-ground p-6 md:p-8">
            <Check className="size-7 text-brand-600" />
            <h3 className="mt-5 text-[19px] leading-[1.4] font-bold tracking-[-0.02em] text-ink">
              {d.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.7] text-ink-2">
              {d.desc}
            </p>
          </div>
        ))}
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-card bg-line ring-1 ring-line md:grid-cols-4">
        {[
          [STATS.activeViewers, "광고를 기다리는 시청자"],
          ["0원", "소재 노출 비용"],
          [`${BANNER_CPC}원~`, "배너 클릭 1건"],
          [STATS.reviewDays, "소재 심사"],
        ].map(([v, l]) => (
          <div key={l} className="bg-surface p-5 md:p-6">
            <dt className="text-[13px] text-ink-3">{l}</dt>
            <dd className="num mt-1 text-xl font-extrabold text-ink md:text-2xl">
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

/* ── 광고 상품 2종 — 운영정책 · 등록 가이드 기준 ─────────── */
const products = [
  {
    name: "영상광고",
    tagline: "끝까지 본 사람에게만 과금",
    price: `${AD_PRICE[15]}원`,
    unit: "완전시청 1건 · 15초 이내",
    points: [
      `30초 ${AD_PRICE[30]}원 · 60초 ${AD_PRICE[60]}원, 이후 15초마다 +${AD_PRICE_STEP}원 (최대 10분)`,
      "영상 파일(720p 권장) 또는 이미지(png·jpg)로 만들 수 있어요",
      "영상이 끝나면 유튜브·블로그·인스타·홈페이지로 보낼 수 있어요",
    ],
  },
  {
    name: "배너광고",
    tagline: "원하는 페이지로 방문자 모으기",
    price: `${BANNER_CPC}원`,
    unit: "클릭 1건부터",
    points: [
      `5만 원이면 최대 ${(50000 / BANNER_CPC).toLocaleString("ko-KR")}명을 원하는 페이지로`,
      "일반형 720×200 (9:2.5) · 프리미엄형 720×320 (9:4)",
      "노출은 무료, 누른 사람에게만 과금돼요",
    ],
  },
]

function Products() {
  return (
    <Section id="products">
      <SectionHead
        eyebrow="광고 상품"
        title="영상으로 알리거나, 배너로 데려오거나"
        sub="두 상품 모두 광고가 보이는 것만으로는 돈을 내지 않습니다."
      />
      <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
        {products.map((p) => (
          <article key={p.name} className="flex flex-col rounded-card bg-surface p-6 shadow-card md:p-8">
            <p className="text-sm font-semibold text-brand-700">{p.tagline}</p>
            <h3 className="mt-2 text-[24px] font-extrabold tracking-[-0.025em] text-ink">{p.name}</h3>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="num text-[40px] leading-none font-extrabold text-ink">{p.price}</span>
              <span className="text-[15px] text-ink-3">{p.unit}</span>
            </p>
            <ul className="mt-6 grid gap-3 border-t border-line pt-6">
              {p.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-[15px] leading-[1.6] text-ink-2">
                  <Check className="mt-0.5 text-brand-600" />
                  {pt}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <a
        href={LINKS.adGuide}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-1 text-[15px] font-semibold text-brand-700 hover:text-brand-800"
      >
        광고 등록 가이드 자세히 보기 <Arrow className="size-4" />
      </a>
    </Section>
  )
}

/* ── 06 이렇게 쓸 수 있어요 ──────────────────────────── */
const useCases: Record<Mode, {
  title: string
  budget: number
  len: AdLength
  note: string
}[]> = {
  business: [
    {
      title: "동네 카페 신메뉴 알리기",
      budget: 50000,
      len: 15,
      note: "가게 근처 지역만 골라 노출",
    },
    {
      title: "헤어샵 오픈 소식",
      budget: 100000,
      len: 30,
      note: "시술 전후 사진을 영상으로",
    },
    {
      title: "유튜브 채널 구독자 늘리기",
      budget: 30000,
      len: 60,
      note: "쇼츠 하이라이트를 그대로",
    },
  ],
  personal: [
    {
      title: "친구 생일 깜짝 축하",
      budget: 5000,
      len: 15,
      note: "낯선 사람들과 함께 축하하는 경험",
    },
    {
      title: "가족에게 영상편지",
      budget: 10000,
      len: 30,
      note: "여행 영상, 부모님께 드리는 인사",
    },
    {
      title: "내가 만든 쇼츠 자랑",
      budget: 20000,
      len: 60,
      note: "처음 만든 영상을 끝까지 봐 줄 사람들",
    },
  ],
}

function UseCases({ mode }: { mode: Mode }) {
  return (
    <Section tone="surface">
      <SectionHead
        eyebrow={
          mode === "business" ? "가게·브랜드 홍보" : "개인 · 마음 전하기"
        }
        title={
          mode === "business"
            ? "이런 광고에 잘 맞아요"
            : "15원이면 마음도 광고할 수 있어요"
        }
        sub={
          mode === "business"
            ? "예산에 따라 끝까지 볼 사람 수를 계산했습니다."
            : "생일 축하, 영상편지, 쇼츠 자랑. 세상에서 가장 저렴한 전광판입니다."
        }
      />
      <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-6">
        {useCases[mode].map((c) => (
          <li
            key={c.title}
            className="flex flex-col rounded-card bg-ground p-6 md:p-8"
          >
            <h3 className="text-[19px] font-bold tracking-[-0.02em] text-ink">
              {c.title}
            </h3>
            <p className="mt-1 text-[15px] text-ink-2">{c.note}</p>
            <div className="mt-8 flex items-end justify-between gap-4 border-t border-line pt-5">
              <span>
                <span className="block text-[13px] text-ink-3">
                  예산 · {c.len}초
                </span>
                <span className="num text-lg font-bold text-ink">
                  {won(c.budget)}
                </span>
              </span>
              <span className="text-right">
                <span className="block text-[13px] text-ink-3">
                  끝까지 볼 사람
                </span>
                <span className="num text-lg font-extrabold text-brand-700">
                  {people(viewsFor(c.budget, c.len))}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
      {mode === "personal" && (
        <p className="mt-6 flex items-start gap-2 rounded-2xl bg-gold-50 px-5 py-4 text-[15px] leading-[1.6] text-gold-800">
          <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold-100 text-[12px] font-bold">
            !
          </span>
          영상에 다른 사람이 나온다면 미리 동의를 받아 주세요. 동의 없이 얼굴이나
          이름이 드러나면 심사에서 반려됩니다.
        </p>
      )}
    </Section>
  )
}

/* ── 07 시작하는 법 + 08 요금 ──────────────────────────── */
function StartAndPricing() {
  const steps = [
    {
      title: "가입하고 광고 계정 만들기",
      desc: `이메일로 가입한 뒤 개인·사업자 계정을 고릅니다. 개인은 서류 없이 바로, 사업자는 서류 확인에 ${STATS.reviewDays}이 걸려요.`,
    },
    {
      title: "소재와 집행 설정",
      desc: "영상·이미지와 광고 문구, 연결 페이지를 넣고 집행일·예산·단가를 정합니다.",
    },
    {
      title: "광고비 충전",
      desc: "충전한 광고비에서 집행된 만큼만 차감됩니다.",
    },
    {
      title: "심사 후 노출",
      desc: `심사는 ${STATS.reviewDays}. 원하는 집행일보다 5영업일 먼저 등록해 주세요.`,
    },
  ]
  const rows: [string, string][] = [
    [
      "영상광고",
      `끝까지 본 1건 · ${AD_LENGTHS.map((l) => `${l}초 ${AD_PRICE[l]}원`).join(" · ")}`,
    ],
    ["긴 영상", `15초마다 +${AD_PRICE_STEP}원 · 최대 10분`],
    ["배너광고", `클릭 1건 ${BANNER_CPC}원부터`],
    ["소재 노출", "무료"],
    ["결제", "광고비 충전 후 차감 · 카드 · 계좌이체"],
    ["환불", "충전 잔액의 5% 수수료"],
    ["세금계산서", "법인 계좌 이체 건 · 메일로 요청"],
  ]
  return (
    <Section id="pricing">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <SectionHead eyebrow="시작하는 법" title="가입부터 노출까지 네 단계" />
          <ol className="mt-8 grid gap-6 md:mt-10">
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[40px_1fr] gap-4">
                <span className="num grid size-10 place-items-center rounded-full bg-brand-600 text-[15px] font-bold text-white">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-[17px] font-bold text-ink">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-[1.7] text-ink-2">
                    {s.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <SectionHead eyebrow="요금" title="본 만큼만, 누른 만큼만" />
          <dl className="mt-8 overflow-hidden rounded-card bg-surface shadow-card md:mt-10">
            {rows.map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line px-6 py-4 last:border-0"
              >
                <dt className="text-[15px] text-ink-3">{k}</dt>
                <dd className="text-[15px] font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[13px] leading-[1.6] text-ink-3">
            최소 단가 기준이며 더 높게 지정할 수 있어요. 집행 중단 위약금 등
            자세한 기준은{" "}
            <a
              href={LINKS.adPolicy}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-ink-2 underline underline-offset-4"
            >
              서비스 운영정책
            </a>
            을 확인해 주세요.
          </p>
        </div>
      </div>
    </Section>
  )
}

/* ── 09 FAQ ─────────────────────────────────────────── */
function AdFAQ() {
  return (
    <Section tone="surface">
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <SectionHead
          eyebrow="자주 묻는 질문"
          title="광고 올리기 전에 궁금한 것들"
          sub={
            <>
              제휴·대량 집행 문의는{" "}
              <a
                href="mailto:with@brothermaze.com"
                className="font-semibold text-brand-700 underline underline-offset-4"
              >
                with@brothermaze.com
              </a>
            </>
          }
        />
        <FAQ items={ADHAEYO_FAQ} />
      </div>
    </Section>
  )
}

/* ── 10 가입 CTA + 체험 크레딧 ──────────────────────────── */
function SignupCTA({ onSwitchToBomeon }: { onSwitchToBomeon: () => void }) {
  const trialViews = viewsFor(STATS.trialCredit, 15)
  return (
    <section id="signup" className="bg-ground py-20 md:py-30">
      <Container>
        <div className="grid overflow-hidden rounded-[32px] bg-navy-900 text-white md:grid-cols-[1.3fr_1fr]">
          <div className="px-6 py-12 md:px-14 md:py-16">
            <p className="text-sm font-semibold text-gold-400">지금 가입하면</p>
            <h2 className="mt-3 text-[28px] leading-[1.3] font-extrabold tracking-[-0.025em] md:text-[40px]">
              체험 크레딧 {won(STATS.trialCredit)}을
              <br />
              바로 드려요
            </h2>
            <p className="mt-3 text-base text-white/70 md:text-[17px]">
              결제 없이 첫 광고를 집행해 보세요. 15초 광고라면{" "}
              {people(trialViews)}이 끝까지 봅니다.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button variant="white" href={LINKS.console} external>
                무료로 회원가입
              </Button>
              <a
                href={LINKS.console}
                className="text-[15px] font-semibold text-white/70 underline underline-offset-4 hover:text-white"
              >
                이미 계정이 있어요 · 로그인
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center bg-white/[0.04] px-6 py-12 md:px-10">
            <div className="text-center">
              <Money
                value={STATS.trialCredit}
                size="xl"
                className="text-gold-400"
              />
              <p className="mt-3 text-[15px] text-white/60">
                가입 즉시 지급 · 카드 등록 불필요
                <span className="mt-1 block text-[13px] text-white/60">
                  무상 광고비라 환불되지 않아요
                </span>
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onSwitchToBomeon}
          className="group mt-6 flex w-full items-center justify-between gap-4 rounded-card bg-surface p-6 text-left ring-1 ring-line transition-shadow hover:shadow-card md:px-8"
        >
          <span className="flex items-center gap-4">
            <img src={logoBomyeon} alt="" width={44} height={44} className="size-11 shrink-0" />
            <span>
              <span className="block text-[17px] font-bold text-ink">
                광고를 보는 사람들은 누구일까요?
              </span>
              <span className="mt-1 block text-[15px] text-ink-2">
                광고 보고 소득 받는 앱, 보면소득
              </span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-[15px] font-bold text-brand-700">
            <span className="hidden sm:inline">보면소득</span>
            <Arrow className="transition-transform group-hover:translate-x-1" />
          </span>
        </button>
      </Container>
    </section>
  )
}

export default function GwanggoPage({
  onSwitchToBomeon,
}: {
  onSwitchToBomeon: () => void
}) {
  const [mode, setMode] = useState<Mode>("business")
  return (
    <main>
      <Hero />
      <Section id="simulator">
        <SectionHead
          eyebrow="예산 시뮬레이터"
          title="얼마를 쓰면 몇 명이 끝까지 볼까요?"
          sub="가입 없이 먼저 계산해 보세요. 어떤 광고인지 고르면 알맞은 예산으로 맞춰 드립니다."
        />
        <ModeSwitch mode={mode} setMode={setMode} />
        <BudgetSimulator mode={mode} />
      </Section>
      <Why />
      <Products />
      <UseCases mode={mode} />
      <StartAndPricing />
      <AdFAQ />
      <SignupCTA onSwitchToBomeon={onSwitchToBomeon} />
    </main>
  )
}
