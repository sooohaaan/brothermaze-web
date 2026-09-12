import { AD_LENGTHS, BOMYEON_FAQ, REVIEWS, REWARD, STATS, STORE } from "../content"
import {
  Button,
  ChapterHead,
  Check,
  Coin,
  Container,
  FAQ,
  Money,
  PhoneScreen,
  ReadMoreCard,
  Section,
  StatBig,
  StoreBadges,
  cx,
} from "../shared/ui"
import logoBomyeon from "../assets/logo-bomyeon.png"
import heroIncome from "../assets/hero-income.webp"
import appHome from "../assets/app-home-v2.webp"
import appReward from "../assets/app-reward.webp"
import appGiftshop from "../assets/app-giftshop-v2.webp"
import appInvite from "../assets/app-invite.webp"

/* ── 히어로 — 토스처럼 카테고리 라벨 + 감성 헤드라인 + 한 문단 ── */
function Hero() {
  return (
    <section className="bg-ground pt-12 pb-20 md:pt-20 md:pb-30">
      <Container className="grid items-center gap-12 md:grid-cols-[1.05fr_1fr] md:gap-10">
        <div>
          <p className="text-[15px] font-semibold text-ink-3">보면소득</p>
          <h1 className="mt-4 text-[36px] leading-[1.3] font-bold tracking-[-0.01em] text-ink md:text-[48px]">
            원하는 콘텐츠를 보기만 해도
            <br />
            소득받는 <span className="text-brand-600">전국민 보면소득</span>
          </h1>
          <p className="mt-5 max-w-[440px] text-[17px] leading-[1.75] text-ink-2 md:text-lg">
            15초 광고 하나에 7원. 지하철에서, 자기 전에, 보기만 하면 소득이
            쌓여요. 쌓인 소득은 현금 1원과 똑같이 쓰거나 내 계좌로 출금할 수
            있죠.
          </p>
          <StoreBadges className="mt-8" />
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
            <li className="flex items-center gap-1.5">
              <span className="text-gold-600">★</span>
              <b className="num font-bold text-ink">{STORE.appStore.rating}</b>
              App Store
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-gold-600">★</span>
              <b className="num font-bold text-ink">{STORE.playStore.rating}</b>
              Google Play
            </li>
            <li className="flex items-center gap-1.5">
              <b className="num font-bold text-ink">
                {STORE.playStore.downloads}
              </b>
              다운로드
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[500px] overflow-hidden rounded-[32px] bg-fill shadow-float">
          <img
            src={heroIncome}
            alt="보면소득 앱의 소득 화면. 총 소득 150,000원, 내 소득 100,000원, 얻은소득 50,000원"
            className="block w-full"
            width={539}
            height={500}
            fetchPriority="high"
          />
        </div>
      </Container>
    </section>
  )
}

/* ── 01 내가 보는 만큼 내가 버는 — 왜 주는지 + 단가 ────────
 * 현행 홈페이지 두 번째 화면(꼭 필요했던 소득)의 순서를 그대로 따릅니다. */
function WhyAndRates() {
  return (
    <Section id="why">
      <ChapterHead
        no="01"
        title={
          <>
            내가 보는 만큼 내가 버는
            <br />꼭 필요했던 소득
          </>
        }
        sub="나 보라고 만든 광고를 내가 봤는데, 왜 수익은 크리에이터가 벌까요? 보면소득에서는 광고를 보면 내가 법니다."
      />
      <div className="mx-auto mt-10 max-w-[680px] rounded-card bg-fill-2 p-6 ring-1 ring-line md:mt-14 md:p-8">
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg font-bold text-ink">광고 길이별 소득</h3>
          <span className="text-[13px] text-ink-3">끝까지 봤을 때</span>
        </div>
        <ul className="mt-5 grid gap-2">
          {AD_LENGTHS.map((len) => {
            const best = len === 60
            return (
              <li
                key={len}
                className={cx(
                  "grid grid-cols-[4rem_1fr_auto] items-center gap-4 rounded-2xl px-5 py-4",
                  best ? "bg-surface shadow-card" : "bg-surface ring-1 ring-line",
                )}
              >
                <span className="num text-[15px] font-semibold text-ink-3">
                  {len}초
                </span>
                <span className="flex items-center gap-2">
                  <Money value={REWARD[len]} size="sm" />
                  {best && (
                    <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[12px] font-bold text-white">
                      가장 유리
                    </span>
                  )}
                </span>
                <span className="num text-[13px] text-ink-3">
                  초당 {(REWARD[len] / len).toFixed(2)}원
                </span>
              </li>
            )
          })}
        </ul>
        <p className="mt-4 text-[13px] leading-[1.6] text-ink-3">
          길게 볼수록 초당 소득이 커지고, 제한 없이 벌 수 있어요.
        </p>
      </div>
    </Section>
  )
}

/* ── 05 남는 시간에는 언제든지 — 세 단계 ─────────────────── */
const steps = [
  {
    title: "본다",
    desc: "앱을 열고 원하는 광고를 고릅니다. 끝까지 보면 바로 적립돼요.",
    img: appHome,
    alt: "보면소득 앱의 광고 목록. 총 누적소득 13,497원, 높은 소득 탭, 영상 15초 + 방문 7원 광고 카드",
    phone: true,
    screenBg: "#ffffff",
  },
  {
    title: "쌓인다",
    desc: "보는 즉시 소득이 쌓입니다. 매일 확인하는 재미가 있어요.",
    img: appReward,
    alt: "소득 적립 팝업. 5 소득, 참여소득 받기 성공",
  },
  {
    title: "쓴다",
    desc: "기프트샵에서 정가 그대로 사거나, 현금으로 출금합니다.",
    img: appGiftshop,
    alt: "보면소득 소득사용 기프트샵. 현금출금 메뉴와 CU 모바일 금액권 5,000원",
    phone: true,
  },
]

function EasyAnytime() {
  return (
    <Section id="how">
      <ChapterHead
        no="05"
        title={
          <>
            단 몇 초라도
            <br />
            남는 시간에는 언제든지
          </>
        }
        sub="지하철 탈 때, 혼밥할 때, 자기 전에. 그냥 보기만 해도 되는 가장 쉬운 소득이에요. 세 단계면 충분합니다."
      />
      <ol className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="flex flex-col overflow-hidden rounded-card bg-fill-2 ring-1 ring-line"
          >
            <div className="p-6 pb-0 md:p-8 md:pb-0">
              <span className="num text-sm font-bold text-brand-700">
                STEP {i + 1}
              </span>
              <h3 className="mt-2 text-[22px] font-bold tracking-[-0.01em] text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.7] text-ink-2">
                {s.desc}
              </p>
            </div>
            <div className="mt-6 flex flex-1 items-end justify-center px-6">
              {"phone" in s ? (
                <PhoneScreen
                  src={s.img}
                  alt={s.alt}
                  ratio="1 / 1"
                  screenBg={"screenBg" in s ? s.screenBg : undefined}
                  bleed
                  className="w-full max-w-[240px]"
                />
              ) : (
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  className="w-full max-w-[300px]"
                  width={900}
                  height={900}
                />
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/* ── 02 얻은소득 10% — 매일, 자동으로 버는 구조 ──────────── */
function Referral() {
  const points = [
    "친구가 번 소득의 10%를 매일 얻은소득으로 드려요",
    "친구 소득에서 빼는 게 아니라 보면소득이 추가로 드려요",
    "한 번 초대해 두면 친구가 보면소득을 쓰는 동안 자동으로 계속 쌓여요",
  ]
  return (
    <Section id="referral">
      <ChapterHead
        no="02"
        title={
          <>
            내가 안 봐도
            <br />
            매일, 자동으로 쌓여요
          </>
        }
        sub="친구를 초대해 보세요. 친구가 번 소득의 10%가 매일 내 소득에 자동으로 더해집니다."
      />
      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:items-center md:gap-16">
        <div className="mx-auto w-full max-w-[420px]">
          <img
            src={appInvite}
            alt="보면소득 친구 초대 화면. 내 초대 코드와 파트너 초대 현황"
            loading="lazy"
            className="w-full"
            width={891}
            height={891}
          />
        </div>
        <div>
          <h3 className="text-[22px] leading-[1.4] font-bold tracking-[-0.01em] text-ink md:text-[26px]">
            자는 동안에도 더해지는
            <br />
            &lsquo;얻은소득&rsquo;
          </h3>
          <ul className="mt-6 grid gap-4">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-base leading-[1.6] text-ink"
              >
                <Check className="mt-0.5 text-brand-600" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl bg-brand-50 px-5 py-4">
            <p className="text-[15px] leading-[1.7] font-semibold text-brand-700">
              친구 10명이 하루 5분씩만 봐도, 나는 아무것도 하지 않고 매일
              얻은소득이 들어와요.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ── 03 소득 1원 = 현금 1원 ─────────────────────────────── */
function OneToOne() {
  const brands = ["스타벅스", "이디야커피", "이마트", "도미노피자", "CU"]
  return (
    <Section>
      <ChapterHead
        no="03"
        title={
          <>
            소득 1원은
            <br />
            현금 1원이에요
          </>
        }
        sub="포인트처럼 가치가 깎이지 않아요. 1,000소득이면 1,000원짜리를 삽니다. 할인율도, 전환 수수료도 없어요."
      />
      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <div className="flex items-center gap-4 rounded-card bg-fill-2 p-6 ring-1 ring-line md:p-8">
            <div className="flex items-center gap-2">
              <Coin size={28} />
              <span className="num text-[28px] font-extrabold text-ink">1</span>
            </div>
            <span className="text-[22px] font-bold text-ink-3">=</span>
            <span className="num text-[28px] font-extrabold text-ink">
              ₩1
            </span>
            <span className="ml-auto text-[15px] font-semibold text-ink-2">
              언제나 1:1
            </span>
          </div>
          <p className="mt-6 text-base leading-[1.75] text-ink-2">
            기프트샵에서 알고 있는 가격 그대로 삽니다. 커피, 편의점, 마트,
            외식 상품까지요.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {brands.map((b) => (
              <li
                key={b}
                className="rounded-full bg-surface px-4 py-2 text-[15px] font-semibold text-ink-2 ring-1 ring-line"
              >
                {b}
              </li>
            ))}
            <li className="rounded-full px-4 py-2 text-[15px] text-ink-3">
              외 브랜드샵
            </li>
          </ul>
        </div>
        <PhoneScreen
          src={appGiftshop}
          alt="보면소득 소득사용 기프트샵. 소득사용내역·쿠폰구매내역·현금출금 메뉴와 인기상품 CU 모바일 금액권 5,000원"
          ratio="900 / 1145"
          className="mx-auto w-full max-w-[340px]"
        />
      </div>
    </Section>
  )
}

/* ── 04 현금출금 ────────────────────────────────────────── */
function CashOut() {
  const rows: [string, string][] = [
    ["출금 시작 금액", `${STATS.minPayout}부터`],
    ["입금까지", `신청 후 ${STATS.payoutDays} 이내`],
    ["받는 계좌", "본인 명의 계좌"],
    ["수수료", "없음"],
  ]
  return (
    <Section id="cash" tone="gray">
      <ChapterHead
        no="04"
        title={
          <>
            모은 소득은
            <br />내 계좌로 출금해요
          </>
        }
        sub="상품으로만 쓰는 포인트가 아니에요. 출금 가능 소득이 모이면 내 은행 계좌로 진짜 현금을 받습니다."
      />
      <div className="mx-auto mt-10 max-w-[680px] md:mt-14">
        <dl className="overflow-hidden rounded-card bg-surface shadow-card">
          {rows.map(([k, v]) => (
            <div
              key={k}
              className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line px-6 py-5 last:border-0 md:px-8"
            >
              <dt className="text-[15px] text-ink-3">{k}</dt>
              <dd className="text-[17px] font-bold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-center text-[13px] leading-[1.6] text-ink-3">
          주 5일 금융 거래일 기준이며, 시스템 점검이나 금융기관 사정으로 늦어질
          수 있어요.
        </p>
      </div>
    </Section>
  )
}

/* ── 05 개인도 광고할 수 있어요 ──────────────────────────── */
function PersonalAd({ onSwitchToAd }: { onSwitchToAd: () => void }) {
  const cases = [
    {
      title: "친구 생일 깜짝 축하",
      desc: "낯선 사람들과 함께 축하하는 특별한 경험을 선물해요.",
    },
    {
      title: "가족에게 영상편지",
      desc: "여행 영상, 부모님께 드리는 인사를 광고로 띄워요.",
    },
    {
      title: "내가 만든 쇼츠 자랑",
      desc: "처음 만든 영상을 끝까지 봐 줄 사람들을 만나요.",
    },
  ]
  return (
    <Section>
      <ChapterHead
        no="06"
        title={
          <>
            기업이든 개인이든
            <br />
            누구나 쉽게 광고해요
          </>
        }
        sub="전단지, 블로그, 동영상, 핸드폰 영상까지. 원하는 이미지나 영상으로 나를, 내 가게를, 내 친구를 직접 광고해 보세요. 사업자등록증 없이도 15초 광고 한 편에 15원부터예요."
      />
      <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
        {cases.map((c) => (
          <li
            key={c.title}
            className="rounded-card bg-fill-2 p-6 ring-1 ring-line md:p-8"
          >
            <h3 className="text-[19px] font-bold tracking-[-0.01em] text-ink">
              {c.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.7] text-ink-2">
              {c.desc}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Button variant="secondary" onClick={onSwitchToAd}>
          광고해요에서 시작하기
        </Button>
      </div>
    </Section>
  )
}

/* ── 숫자로 보는 보면소득 — 토스식 거대 숫자 + 기준일 각주 ── */
function Numbers() {
  return (
    <Section tone="gray">
      <h2 className="text-center text-[26px] leading-[1.35] font-bold tracking-[-0.01em] text-ink md:text-[36px]">
        말이 아니라
        <br />
        지급으로 증명합니다
      </h2>
      <div className="mx-auto mt-10 grid max-w-[880px] grid-cols-2 gap-x-6 gap-y-10 md:mt-14 md:grid-cols-4">
        <StatBig value={STORE.playStore.downloads} label="Google Play 다운로드" />
        <StatBig value={STATS.paidTotal} label="총 지급액" />
        <StatBig
          value={
            <>
              <span className="text-gold-600">★</span> {STORE.appStore.rating}
            </>
          }
          label="App Store 평점"
        />
        <StatBig
          value={
            <>
              <span className="text-gold-600">★</span> {STORE.playStore.rating}
            </>
          }
          label="Google Play 평점"
        />
      </div>
      <div className="mx-auto mt-12 grid max-w-[880px] gap-4 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure
            key={r.name}
            className="rounded-card bg-surface p-6 ring-1 ring-line"
          >
            <p
              className="text-[14px] tracking-[0.1em] text-gold-600"
              aria-label={`별 5개 중 ${r.stars}개`}
            >
              {"★".repeat(r.stars)}
            </p>
            <blockquote className="mt-2 text-[15px] leading-[1.6] font-medium text-ink">
              “{r.text}”
            </blockquote>
            <figcaption className="mt-4 text-[13px] text-ink-3">
              {r.name} · {r.store} · {r.date}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-8 text-center text-[13px] text-ink-3">
        * {STORE.asOf} 스토어 기준
      </p>
    </Section>
  )
}

/* ── Q&A — 의심을 정면으로 받는 질문들 ────────────────────── */
function BomyeonFAQ() {
  return (
    <Section id="faq">
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <header className="max-w-[640px]">
          <h2 className="text-[26px] leading-[1.35] font-bold tracking-[-0.01em] text-ink md:text-[36px]">
            시작하기 전에
            <br />
            궁금한 것들
          </h2>
          <p className="mt-3 text-base leading-[1.7] text-ink-2 md:text-[17px]">
            더 궁금한 점은{" "}
            <a
              href="mailto:qna@brothermaze.com"
              className="font-semibold text-brand-700 underline underline-offset-4"
            >
              qna@brothermaze.com
            </a>
            으로 물어보세요.
          </p>
        </header>
        <FAQ items={BOMYEON_FAQ} />
      </div>
    </Section>
  )
}

/* ── 마지막 CTA + 더 읽어보기 ────────────────────────────── */
function FinalCTA({ onSwitchToAd }: { onSwitchToAd: () => void }) {
  return (
    <section id="download" className="bg-ground pt-20 pb-20 md:pt-30 md:pb-30">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-brand-600 px-6 py-14 text-center md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/2 size-[520px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #7cc0ff 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <img
              src={logoBomyeon}
              alt=""
              width={64}
              height={64}
              className="mx-auto size-16 rounded-[14px] shadow-[0_8px_24px_rgb(0_40_110/0.35)] ring-2 ring-white/70"
            />
            <h2 className="mt-6 text-[28px] leading-[1.3] font-bold tracking-[-0.01em] text-white md:text-[40px]">
              오늘 남는 시간부터
              <br />
              소득으로 바꿔 보세요
            </h2>
            <p className="mt-3 text-base font-medium text-white md:text-[17px]">
              설치하고 첫 광고를 보면 바로 적립됩니다.
            </p>
            <StoreBadges className="mt-8 justify-center" />
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <h2 className="text-[22px] font-bold tracking-[-0.01em] text-ink md:text-[26px]">
            더 읽어보기
          </h2>
          <div className="mt-6">
            <ReadMoreCard
              title="광고해요"
              desc="전국민 누구나 보면소득에서 광고해요"
              tags={["완전시청 15원", "노출 무료", "개인도 가능"]}
              onClick={onSwitchToAd}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function BomeonPage({
  onSwitchToAd,
}: {
  onSwitchToAd: () => void
}) {
  /* 현행 홈페이지 진행 순서 그대로:
   * 히어로 → 보는 만큼 버는(단가) → 얻은소득 10% → 소득 1원=현금 1원(+출금)
   * → 남는 시간 언제든지 → 누구나 광고 → CTA */
  return (
    <main>
      <Hero />
      <WhyAndRates />
      <Referral />
      <OneToOne />
      <CashOut />
      <EasyAnytime />
      <PersonalAd onSwitchToAd={onSwitchToAd} />
      <Numbers />
      <BomyeonFAQ />
      <FinalCTA onSwitchToAd={onSwitchToAd} />
    </main>
  )
}
