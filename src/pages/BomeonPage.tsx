import { useState } from "react"
import {
  AD_LENGTHS,
  BOMYEON_FAQ,
  CALC,
  REVIEWS,
  REWARD,
  STATS,
  STORE,
} from "../content"
import {
  Arrow,
  Button,
  Check,
  Coin,
  Container,
  FAQ,
  Money,
  PhoneScreen,
  Section,
  SectionHead,
  Slider,
  Stat,
  StoreBadges,
  cx,
  useCountup,
} from "../shared/ui"
import logoBomyeon from "../assets/logo-bomyeon.png"
import heroIncome from "../assets/hero-income.webp"
import appHome from "../assets/app-home-v2.webp"
import appReward from "../assets/app-reward.webp"
import appGiftshop from "../assets/app-giftshop-v2.webp"
import appInvite from "../assets/app-invite.webp"

/* ── 01 히어로 ──────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-ground pt-10 pb-20 md:pt-16 md:pb-30">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[640px] rounded-full opacity-60 blur-3xl"
        style={{
          background: "radial-gradient(circle, #d4e9ff 0%, transparent 65%)",
        }}
      />
      <Container className="relative grid items-center gap-12 md:grid-cols-[1.05fr_1fr] md:gap-10">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-surface py-1.5 pr-4 pl-1.5 text-sm font-semibold text-ink-2 shadow-card">
            <Coin size={22} />
            광고 보고 소득 받는 앱
          </p>
          <h1 className="mt-6 text-[40px] leading-[1.18] font-extrabold tracking-[-0.035em] text-ink md:text-[60px]">
            남는 시간이
            <br />
            <span className="text-brand-600">돈이 됩니다</span>
          </h1>
          <p className="mt-5 max-w-[440px] text-[17px] leading-[1.7] text-ink-2 md:text-lg">
            15초 광고 하나에 7원. 지하철에서, 자기 전에,
            <br className="hidden sm:block" /> 보기만 하면 됩니다.
          </p>
          <StoreBadges className="mt-8" />
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
            <li className="flex items-center gap-1.5">
              <span className="text-gold-600">★</span>
              <b className="num font-bold text-ink">
                {STORE.appStore.rating}
              </b>
              App Store
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-gold-600">★</span>
              <b className="num font-bold text-ink">
                {STORE.playStore.rating}
              </b>
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

        <div className="relative mx-auto w-full max-w-[500px] overflow-hidden rounded-[32px] bg-[#e3e5e6] shadow-float">
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

/* ── 02 소득 계산기 ─────────────────────────────────── */
function IncomeCalculator() {
  const [minutes, setMinutes] = useState(15)
  const [friends, setFriends] = useState(3)

  const mine = minutes * CALC.perMinute * CALC.days
  const earned = Math.round(
    friends *
      CALC.friendMinutesPerDay *
      CALC.perMinute *
      CALC.days *
      CALC.friendShare,
  )
  const total = mine + earned
  const daily = Math.round(total / CALC.days)

  const dTotal = useCountup(total)
  const dMine = useCountup(mine)
  const dEarned = useCountup(earned)

  return (
    <Section id="calculator" tone="surface">
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16">
        <div>
          <SectionHead
            eyebrow="소득 계산기"
            title={
              <>
                하루 몇 분이면
                <br />한 달에 얼마일까요?
              </>
            }
            sub="작은 금액이지만 부풀리지 않았어요. 실제 단가로 계산합니다."
          />
          <div className="mt-8 grid gap-8 md:mt-10">
            <Slider
              label="하루 시청 시간"
              value={minutes}
              min={5}
              max={60}
              step={5}
              onChange={setMinutes}
              format={(v) => `${v}분`}
              hint={["5분", "60분"]}
            />
            <Slider
              label="함께 보는 친구"
              value={friends}
              min={0}
              max={20}
              onChange={setFriends}
              format={(v) => `${v}명`}
              hint={["0명", "20명"]}
            />
          </div>
        </div>

        <div className="rounded-card bg-ground p-6 md:p-8">
          <p className="text-[15px] font-semibold text-ink-2">
            한 달 예상 소득
          </p>
          <div className="mt-3">
            <Money value={dTotal} size="xl" />
          </div>
          <p className="mt-3 text-[15px] text-ink-3">
            하루 약{" "}
            <b className="num font-bold text-ink-2">
              {daily.toLocaleString("ko-KR")}
            </b>
            원
          </p>

          <dl className="mt-6 grid gap-3 border-t border-line pt-6">
            <div className="flex items-center justify-between">
              <dt className="text-[15px] text-ink-2">내 소득</dt>
              <dd className="num text-lg font-bold text-ink">
                {dMine.toLocaleString("ko-KR")}원
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[15px] text-ink-2">
                얻은소득 <span className="text-ink-3">· 친구 소득의 10%</span>
              </dt>
              <dd
                className={cx(
                  "num text-lg font-bold",
                  earned > 0 ? "text-brand-700" : "text-ink-3",
                )}
              >
                +{dEarned.toLocaleString("ko-KR")}원
              </dd>
            </div>
          </dl>

          <Button href="#download" className="mt-8 w-full">
            이 금액부터 시작하기
          </Button>
          <p className="mt-4 text-[13px] leading-[1.6] text-ink-3">
            60초 광고 기준 1분 {CALC.perMinute}원, 친구 1명이 하루{" "}
            {CALC.friendMinutesPerDay}분 본다고 가정했어요.
          </p>
        </div>
      </div>
    </Section>
  )
}

/* ── 03 신뢰 지표 ───────────────────────────────────── */

function Trust() {
  return (
    <Section>
      <SectionHead
        eyebrow="실제로 받은 사람들"
        title="말이 아니라 지급으로 증명합니다"
      />
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 rounded-card bg-surface p-6 shadow-card md:mt-10 md:grid-cols-4 md:p-8">
        <Stat
          value={STORE.playStore.downloads}
          label="Google Play 다운로드"
        />
        <Stat value={STATS.paidTotal} label="총 지급액" />
        <Stat
          value={
            <>
              <span className="text-gold-600">★</span> {STORE.appStore.rating}
            </>
          }
          label="App Store 평점"
        />
        <Stat
          value={
            <>
              <span className="text-gold-600">★</span> {STORE.playStore.rating}
            </>
          }
          label="Google Play 평점"
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
        {REVIEWS.map((r) => (
          <figure
            key={r.name}
            className="flex flex-col rounded-card bg-surface p-6 ring-1 ring-line"
          >
            <p
              className="text-[15px] tracking-[0.1em] text-gold-600"
              aria-label={`별 5개 중 ${r.stars}개`}
            >
              {"★".repeat(r.stars)}
              <span className="text-line">{"★".repeat(5 - r.stars)}</span>
            </p>
            <blockquote className="mt-3 flex-1 text-[17px] leading-[1.6] font-medium text-ink">
              “{r.text}”
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4 text-[13px] text-ink-3">
              <span className="font-semibold text-ink-2">{r.name}</span>
              <span>
                {r.store} · {r.date}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}

/* ── 04 작동 방식 ───────────────────────────────────── */
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
    desc: "보는 즉시 소득이 쌓입니다. 친구가 보면 얻은소득도 매일 더해져요.",
    img: appReward,
    alt: "소득 적립 팝업. 5 소득, 참여소득 받기 성공",
  },
  {
    title: "쓴다",
    desc: "기프트샵에서 편의점·커피 상품을 정가 그대로 사거나, 현금으로 출금합니다.",
    img: appGiftshop,
    alt: "보면소득 소득사용 기프트샵. 현금출금 메뉴와 CU 모바일 금액권 5,000원",
    phone: true,
  },
]

function HowItWorks() {
  return (
    <Section id="how" tone="surface">
      <SectionHead eyebrow="이용 방법" title="세 단계면 충분합니다" center />
      <ol className="mt-8 grid gap-6 md:mt-10 md:grid-cols-3">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="flex flex-col overflow-hidden rounded-card bg-[#e8eaec]"
          >
            <div className="p-6 pb-0 md:p-8 md:pb-0">
              <span className="num text-sm font-bold text-brand-700">
                STEP {i + 1}
              </span>
              <h3 className="mt-2 text-[22px] font-extrabold tracking-[-0.02em] text-ink">
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

/* ── 05 왜 나에게 주는가 + 06 단가 ────────────────────── */
function WhyAndRates() {
  return (
    <Section tone="navy">
      <div className="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-16">
        <div>
          <p className="text-sm font-semibold text-gold-400">
            왜 나에게 주나요
          </p>
          <h2 className="mt-3 text-[26px] leading-[1.35] font-extrabold tracking-[-0.025em] text-white md:text-[36px]">
            나 보라고 만든 광고를 내가 봤는데,
            <br />
            <span className="text-gold-400">
              왜 수익은 다른 사람이 가져가죠?
            </span>
          </h2>
          <p className="mt-5 text-base leading-[1.75] text-white/70 md:text-[17px]">
            지금까지 광고를 본 대가는 플랫폼과 크리에이터에게 돌아갔습니다.
            보면소득은 광고주가 낸 광고비를 끝까지 본 사람에게 직접 나눠
            드립니다.
          </p>
        </div>

        <div className="rounded-card bg-white/[0.06] p-6 ring-1 ring-white/10 md:p-8">
          <div className="flex items-baseline justify-between">
            <h3 className="text-lg font-bold text-white">광고 길이별 소득</h3>
            <span className="text-[13px] text-white/60">끝까지 봤을 때</span>
          </div>
          <ul className="mt-5 grid gap-2">
            {AD_LENGTHS.map((len) => {
              const best = len === 60
              return (
                <li
                  key={len}
                  className={cx(
                    "grid grid-cols-[4rem_1fr_auto] items-center gap-4 rounded-2xl px-5 py-4",
                    best ? "bg-white text-ink" : "bg-white/[0.04] text-white",
                  )}
                >
                  <span
                    className={cx(
                      "num text-[15px] font-semibold",
                      best ? "text-ink-3" : "text-white/60",
                    )}
                  >
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
                  <span
                    className={cx(
                      "num text-[13px]",
                      best ? "text-ink-3" : "text-white/50",
                    )}
                  >
                    초당 {(REWARD[len] / len).toFixed(2)}원
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="mt-4 text-[13px] leading-[1.6] text-white/55">
            길게 볼수록 초당 소득이 커집니다.
          </p>
        </div>
      </div>
    </Section>
  )
}

/* ── 07 친구 초대 ───────────────────────────────────── */
function Referral({ onInvitePreview }: { onInvitePreview: () => void }) {
  const points = [
    "친구가 번 소득의 10%를 매일 얻은소득으로 드려요",
    "친구 소득에서 빼는 게 아니라 보면소득이 추가로 드려요",
    "친구가 보면소득을 쓰는 동안 계속 쌓여요",
  ]
  return (
    <Section id="referral" tone="surface">
      <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <div className="order-2 mx-auto w-full max-w-[420px] md:order-1">
          <img
            src={appInvite}
            alt="보면소득 친구 초대 화면. 내 초대 코드와 파트너 초대 현황"
            loading="lazy"
            className="w-full"
            width={891}
            height={891}
          />
        </div>
        <div className="order-1 md:order-2">
          <SectionHead
            eyebrow="친구 초대"
            title={
              <>
                친구가 볼 때마다
                <br />내 소득도 늘어납니다
              </>
            }
          />
          <ul className="mt-8 grid gap-4 md:mt-10">
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
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="#download">초대 코드 받기</Button>
            <Button variant="secondary" size="lg" onClick={onInvitePreview}>
              초대받은 화면 보기
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ── 08 소득 사용처 ─────────────────────────────────── */
function Spend() {
  const brands = ["스타벅스", "이디야커피", "이마트", "도미노피자"]
  return (
    <Section>
      <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <SectionHead
            eyebrow="소득 사용처"
            title={
              <>
                소득 1원은
                <br />
                현금 1원입니다
              </>
            }
            sub="알고 있는 가격 그대로 삽니다. 할인율이나 전환 수수료가 없어요."
          />
          <ul className="mt-8 flex flex-wrap gap-2 md:mt-10">
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
          <p className="mt-6 text-[15px] leading-[1.7] text-ink-2">
            출금 가능 소득이{" "}
            <b className="font-bold text-ink">{STATS.minPayout}</b> 이상이면
            계좌로도 받을 수 있어요.
          </p>
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

/* ── 09 FAQ ─────────────────────────────────────────── */
function BomyeonFAQ() {
  return (
    <Section id="faq" tone="surface">
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <SectionHead
          eyebrow="자주 묻는 질문"
          title="시작하기 전에 궁금한 것들"
          sub={
            <>
              더 궁금한 점은{" "}
              <a
                href="mailto:qna@brothermaze.com"
                className="font-semibold text-brand-700 underline underline-offset-4"
              >
                qna@brothermaze.com
              </a>
              으로 물어보세요.
            </>
          }
        />
        <FAQ items={BOMYEON_FAQ} />
      </div>
    </Section>
  )
}

/* ── 마지막 CTA + 10 광고주 전환 ──────────────────────── */
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
            <h2 className="mt-6 text-[28px] leading-[1.3] font-extrabold tracking-[-0.025em] text-white md:text-[40px]">
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

        <button
          type="button"
          onClick={onSwitchToAd}
          className="group mt-6 flex w-full items-center justify-between gap-4 rounded-card bg-surface p-6 text-left ring-1 ring-line transition-shadow hover:shadow-card md:px-8"
        >
          <span>
            <span className="block text-[17px] font-bold text-ink">
              사장님이라면, 내 가게도 광고해 보세요
            </span>
            <span className="mt-1 block text-[15px] text-ink-2">
              끝까지 본 사람에게만 <b className="font-bold text-ink">15원</b>.
              노출은 무료입니다.
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-[15px] font-bold text-brand-700">
            <span className="hidden sm:inline">광고해요</span>
            <Arrow className="transition-transform group-hover:translate-x-1" />
          </span>
        </button>
      </Container>
    </section>
  )
}

export default function BomeonPage({
  onSwitchToAd,
  onInvitePreview,
}: {
  onSwitchToAd: () => void
  onInvitePreview: () => void
}) {
  return (
    <main>
      <Hero />
      <IncomeCalculator />
      <Trust />
      <HowItWorks />
      <WhyAndRates />
      <Referral onInvitePreview={onInvitePreview} />
      <Spend />
      <BomyeonFAQ />
      <FinalCTA onSwitchToAd={onSwitchToAd} />
    </main>
  )
}
