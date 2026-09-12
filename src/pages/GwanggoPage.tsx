import {
  ADHAEYO_FAQ,
  AD_LENGTHS,
  AD_PRICE,
  AD_PRICE_STEP,
  BANNER_CPC,
  LINKS,
  REWARD,
  STATS,
  type AdLength,
} from "../content"
import {
  Arrow,
  Button,
  ChapterHead,
  Check,
  Coin,
  Container,
  FAQ,
  Money,
  ReadMoreCard,
  Section,
  StatBig,
} from "../shared/ui"
const won = (n: number) => `${n.toLocaleString("ko-KR")}원`
const people = (n: number) => `${n.toLocaleString("ko-KR")}명`
const viewsFor = (budget: number, len: AdLength) =>
  Math.floor(budget / AD_PRICE[len])

/* ── 히어로 — 토스처럼 밝은 배경, 라벨 + 헤드라인 + 한 문단 ── */
function Hero() {
  const viewerShare = Math.round((REWARD[15] / AD_PRICE[15]) * 100)
  return (
    <section className="bg-ground pt-12 pb-20 md:pt-20 md:pb-30">
      <Container className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <div>
          <p className="text-[15px] font-semibold text-ink-3">광고해요</p>
          <h1 className="mt-4 text-[36px] leading-[1.3] font-bold tracking-[-0.01em] text-ink md:text-[48px]">
            전국민 <span className="text-brand-600">누구나</span>
            <br />
            보면소득에서 광고해요
          </h1>
          <p className="mt-5 max-w-[460px] text-[17px] leading-[1.75] text-ink-2 md:text-lg">
            광고해요는 모바일앱 보면소득에 쉽게 광고할 수 있는 광고 관리
            서비스입니다. 노출은 무료, 끝까지 본 사람에게만 15원. 광고비의
            절반은 광고를 본 그 사람의 주머니로 돌아갑니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#signup">무료로 시작하기</Button>
            <Button href="#products" variant="secondary">
              광고 상품 보기
            </Button>
          </div>
        </div>

        {/* 15원이 어디로 가는지 — 정적 카드 */}
        <div className="rounded-card bg-surface p-6 shadow-float ring-1 ring-line md:p-8">
          <p className="text-[15px] text-ink-3">완전시청 1건의 광고비</p>
          <p className="num mt-1 text-[48px] leading-none font-extrabold text-ink">
            15<span className="ml-1 font-sans text-2xl font-bold">원</span>
          </p>
          <div
            className="mt-6 flex h-3 overflow-hidden rounded-full"
            aria-hidden
          >
            <div className="bg-gold-400" style={{ width: `${viewerShare}%` }} />
            <div className="flex-1 bg-line" />
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <dt className="flex items-center gap-2 text-[13px] text-ink-3">
                <span className="size-2 rounded-full bg-gold-400" /> 시청자에게
              </dt>
              <dd className="mt-1 flex items-center gap-1.5">
                <Coin size={20} />
                <span className="num text-2xl font-extrabold text-ink">
                  7원
                </span>
                <span className="num text-[13px] text-ink-3">
                  {viewerShare}%
                </span>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-[13px] text-ink-3">
                <span className="size-2 rounded-full bg-line" /> 운영·노출
              </dt>
              <dd className="num mt-1 text-2xl font-extrabold text-ink-2">
                8원
              </dd>
            </div>
          </dl>
          <p className="mt-6 border-t border-line pt-5 text-[15px] leading-[1.6] text-ink-2">
            중간에 넘기거나 끝까지 보지 않으면{" "}
            <b className="text-ink">0원</b>입니다.
          </p>
        </div>
      </Container>
    </section>
  )
}

/* ── 01 합리적 — 본 만큼만 내는 구조 ─────────────────────── */
const valuePoints = [
  {
    title: "노출은 무료예요",
    desc: "광고가 보이는 것만으로는 한 푼도 내지 않아요. 소재가 아무리 많이 노출돼도 0원입니다.",
  },
  {
    title: "끝까지 본 1건에만 냅니다",
    desc: "영상광고는 완전시청 1건마다 과금돼요. 15초 광고 기준 딱 15원입니다.",
  },
  {
    title: "중간에 넘기면 0원이에요",
    desc: "스킵하거나 끝까지 보지 않은 시청에는 과금하지 않아요. 예산이 새는 곳이 없습니다.",
  },
]

const budgetExamples: { budget: number; note: string }[] = [
  { budget: 10000, note: "동네에 소식 알리기" },
  { budget: 50000, note: "신메뉴·오픈 홍보" },
  { budget: 100000, note: "브랜드·채널 키우기" },
]

function Value() {
  return (
    <Section id="value">
      <ChapterHead
        no="03"
        title={
          <>
            본 만큼만 내는
            <br />
            합리적인 광고예요
          </>
        }
        sub="예산이 어디에 쓰였는지 설명할 수 없는 광고는 그만. 광고해요는 돈이 나가는 조건이 단 하나, 끝까지 본 시청뿐입니다."
      />
      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
        {valuePoints.map((d) => (
          <div key={d.title} className="rounded-card bg-fill-2 p-6 ring-1 ring-line md:p-8">
            <Check className="size-7 text-brand-600" />
            <h3 className="mt-5 text-[19px] leading-[1.4] font-bold tracking-[-0.01em] text-ink">
              {d.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.7] text-ink-2">
              {d.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-card bg-surface shadow-card">
        <p className="border-b border-line px-6 py-4 text-[15px] font-semibold text-ink-2 md:px-8">
          예산별로 몇 명이 끝까지 볼까요? · 15초 광고 기준
        </p>
        <ul className="grid md:grid-cols-3">
          {budgetExamples.map((e) => (
            <li
              key={e.budget}
              className="border-b border-line p-6 last:border-0 md:border-r md:border-b-0 md:p-8"
            >
              <p className="text-[13px] text-ink-3">{e.note}</p>
              <p className="num mt-1 text-xl font-bold text-ink">
                {won(e.budget)}
              </p>
              <p className="mt-4 text-[13px] text-ink-3">끝까지 볼 사람</p>
              <p className="num mt-1 text-[28px] leading-none font-extrabold text-brand-700">
                {people(viewsFor(e.budget, 15))}
              </p>
            </li>
          ))}
        </ul>
        <p className="border-t border-line px-6 py-4 text-[13px] text-ink-3 md:px-8">
          영상 길이별 최소 단가 기준이에요. 단가는 더 높게 직접 정할 수도
          있어요.
        </p>
      </div>
    </Section>
  )
}

/* ── 02 한 번 보면 잊지 못하는 광고 ──────────────────────── */
const memoryPoints = [
  {
    title: "돈을 준 브랜드는 잊히지 않아요",
    desc: "시청자는 당신의 광고를 보고 소득을 받습니다. 광고가 불편한 방해가 아니라 반가운 선물이 됩니다.",
  },
  {
    title: "먼저 찾아서 보는 광고예요",
    desc: "시청자는 소득을 받으려고 스스로 앱을 엽니다. 건너뛰기 버튼을 찾지 않아요.",
  },
  {
    title: "끝까지 보고, 끝까지 기억해요",
    desc: "과금 조건이 완전시청이라, 내 광고를 본 사람은 전부 처음부터 끝까지 본 사람입니다.",
  },
]

function Memory() {
  return (
    <Section tone="gray">
      <ChapterHead
        no="04"
        title={
          <>
            한 번 보면
            <br />
            잊지 못하는 광고예요
          </>
        }
        sub="3초 만에 스킵당하는 광고와, 소득을 받으며 끝까지 본 광고. 어느 쪽이 기억에 남을까요?"
      />
      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
        {memoryPoints.map((d) => (
          <div key={d.title} className="rounded-card bg-surface p-6 shadow-card md:p-8">
            <Check className="size-7 text-brand-600" />
            <h3 className="mt-5 text-[19px] leading-[1.4] font-bold tracking-[-0.01em] text-ink">
              {d.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.7] text-ink-2">
              {d.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── 03 광고 상품 2종 ────────────────────────────────────── */
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
      <ChapterHead
        no="05"
        title={
          <>
            영상으로 알리거나
            <br />
            배너로 데려오거나
          </>
        }
        sub="두 상품 모두 광고가 보이는 것만으로는 돈을 내지 않습니다."
      />
      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
        {products.map((p) => (
          <article
            key={p.name}
            className="flex flex-col rounded-card bg-fill-2 p-6 ring-1 ring-line md:p-8"
          >
            <p className="text-sm font-semibold text-brand-700">{p.tagline}</p>
            <h3 className="mt-2 text-[24px] font-bold tracking-[-0.01em] text-ink">
              {p.name}
            </h3>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="num text-[40px] leading-none font-extrabold text-ink">
                {p.price}
              </span>
              <span className="text-[15px] text-ink-3">{p.unit}</span>
            </p>
            <ul className="mt-6 grid gap-3 border-t border-line pt-6">
              {p.points.map((pt) => (
                <li
                  key={pt}
                  className="flex items-start gap-3 text-[15px] leading-[1.6] text-ink-2"
                >
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

      <div id="pricing" className="mt-16 md:mt-20">
        <h3 className="text-[19px] font-bold tracking-[-0.01em] text-ink">
          요금 — 본 만큼만, 누른 만큼만
        </h3>
        <dl className="mt-5 overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-line">
          {(
            [
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
            ] as [string, string][]
          ).map(([k, v]) => (
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
    </Section>
  )
}

/* ── 04 이렇게 쓰고 있어요 — 가게도, 개인도 ──────────────── */
const useCases = [
  {
    group: "가게·브랜드",
    items: [
      { title: "동네 카페 신메뉴 알리기", note: "가게 근처 지역만 골라 노출" },
      { title: "헤어샵 오픈 소식", note: "시술 전후 사진을 영상으로" },
      { title: "유튜브 채널 구독자 늘리기", note: "쇼츠 하이라이트를 그대로" },
    ],
  },
  {
    group: "개인 · 마음 전하기",
    items: [
      { title: "친구 생일 깜짝 축하", note: "낯선 사람들과 함께 축하하는 경험" },
      { title: "가족에게 영상편지", note: "여행 영상, 부모님께 드리는 인사" },
      { title: "내가 만든 쇼츠 자랑", note: "처음 만든 영상을 끝까지 봐 줄 사람들" },
    ],
  },
]

function UseCases() {
  return (
    <Section id="usecases">
      <ChapterHead
        no="01"
        title={
          <>
            15원이면 누구나
            <br />
            쉽게 하는 광고
          </>
        }
        sub="동네 손님만 골라 가게를 홍보하고, SNS 친구를 늘리고, 내가 만든 쇼츠를 자랑하고, 생일 축하까지. 사업자등록증이 없어도 개인 계정으로 바로 시작해요."
      />
      <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2">
        {useCases.map((g) => (
          <div key={g.group} className="rounded-card bg-fill-2 p-6 ring-1 ring-line md:p-8">
            <h3 className="text-[15px] font-semibold text-brand-700">
              {g.group}
            </h3>
            <ul className="mt-4 grid gap-4">
              {g.items.map((c) => (
                <li key={c.title} className="rounded-2xl bg-surface p-5 ring-1 ring-line">
                  <p className="text-[17px] font-bold text-ink">{c.title}</p>
                  <p className="mt-1 text-[14px] text-ink-2">{c.note}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 flex items-start gap-2 rounded-2xl bg-gold-50 px-5 py-4 text-[15px] leading-[1.6] text-gold-800">
        <span
          aria-hidden
          className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold-100 text-[12px] font-bold"
        >
          !
        </span>
        영상에 다른 사람이 나온다면 미리 동의를 받아 주세요. 동의 없이 얼굴이나
        이름이 드러나면 심사에서 반려됩니다.
      </p>
    </Section>
  )
}

/* ── 02 광고하기 정말 쉬워요 — 네 단계 ──────────────────── */
function EasySteps() {
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
  return (
    <Section id="how" tone="gray">
      <ChapterHead
        no="02"
        title={
          <>
            광고하기
            <br />
            정말 쉬워요
          </>
        }
        sub="전단지, 블로그, 동영상, 핸드폰으로 찍은 영상까지. 가지고 있는 이미지나 영상만 있으면 가입부터 노출까지 네 단계면 끝나요."
      />
      <ol className="mx-auto mt-10 grid max-w-[680px] gap-6 md:mt-14">
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
    </Section>
  )
}

/* ── 숫자로 보는 광고해요 ────────────────────────────────── */
function Numbers() {
  return (
    <Section>
      <h2 className="text-center text-[26px] leading-[1.35] font-bold tracking-[-0.01em] text-ink md:text-[36px]">
        광고를 기다리는 사람들이
        <br />
        여기 있어요
      </h2>
      <div className="mx-auto mt-10 grid max-w-[880px] grid-cols-2 gap-x-6 gap-y-10 md:mt-14 md:grid-cols-4">
        <StatBig value={STATS.activeViewers} label="광고를 기다리는 시청자" />
        <StatBig value="0원" label="소재 노출 비용" />
        <StatBig value={`${BANNER_CPC}원~`} label="배너 클릭 1건" />
        <StatBig value={STATS.reviewDays} label="소재 심사" />
      </div>
      <p className="mt-10 text-center text-[13px] text-ink-3">
        * 2026년 9월 내부 데이터 기준
      </p>
    </Section>
  )
}

/* ── Q&A ─────────────────────────────────────────────────── */
function AdFAQ() {
  return (
    <Section tone="gray">
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <header className="max-w-[640px]">
          <h2 className="text-[26px] leading-[1.35] font-bold tracking-[-0.01em] text-ink md:text-[36px]">
            광고 올리기 전에
            <br />
            궁금한 것들
          </h2>
          <p className="mt-3 text-base leading-[1.7] text-ink-2 md:text-[17px]">
            제휴·대량 집행 문의는{" "}
            <a
              href="mailto:with@brothermaze.com"
              className="font-semibold text-brand-700 underline underline-offset-4"
            >
              with@brothermaze.com
            </a>
          </p>
        </header>
        <FAQ items={ADHAEYO_FAQ} />
      </div>
    </Section>
  )
}

/* ── 가입 CTA + 더 읽어보기 ──────────────────────────────── */
function SignupCTA({ onSwitchToBomeon }: { onSwitchToBomeon: () => void }) {
  return (
    <section id="signup" className="bg-ground py-20 md:py-30">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-brand-600 px-6 py-14 text-center text-white md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/2 size-[520px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #7cc0ff 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <p className="text-sm font-semibold text-white/80">광고해요</p>
            <h2 className="mt-3 text-[28px] leading-[1.3] font-bold tracking-[-0.01em] md:text-[40px]">
              오늘 첫 광고를
              <br />
              올려 보세요
            </h2>
            <p className="mt-3 text-base text-white/85 md:text-[17px]">
              가입은 무료예요. 노출도 무료, 광고비는 끝까지 본 만큼만
              나갑니다.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Button variant="white" href={LINKS.console} external>
                무료로 회원가입
              </Button>
              <a
                href={LINKS.console}
                className="text-[15px] font-semibold text-white/80 underline underline-offset-4 hover:text-white"
              >
                이미 계정이 있어요 · 로그인
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <h2 className="text-[22px] font-bold tracking-[-0.01em] text-ink md:text-[26px]">
            더 읽어보기
          </h2>
          <div className="mt-6">
            <ReadMoreCard
              title="보면소득"
              desc="원하는 콘텐츠를 보기만 해도 소득받는 전국민 보면소득"
              tags={["15초에 7원", "친구 소득의 10%", "현금출금"]}
              onClick={onSwitchToBomeon}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function GwanggoPage({
  onSwitchToBomeon,
}: {
  onSwitchToBomeon: () => void
}) {
  /* 현행 adhaeyo.com 진행 순서 그대로:
   * 히어로(서비스 정의) → 15원이면 누구나 → 광고하기 정말 쉬워요
   * → (보강: 합리적 → 잊지 못하는 광고 → 상품·요금) → CTA */
  return (
    <main>
      <Hero />
      <UseCases />
      <EasySteps />
      <Value />
      <Memory />
      <Products />
      <Numbers />
      <AdFAQ />
      <SignupCTA onSwitchToBomeon={onSwitchToBomeon} />
    </main>
  )
}
