import {
  AD_LENGTHS,
  BOMYEON_FAQ,
  COMPANY,
  REWARD,
  STATS,
  STORE,
} from "../content"
import {
  Button,
  ChapterHead,
  Check,
  Coin,
  Container,
  FAQ,
  Money,
  Section,
  SplitWords,
  StoreBadges,
  cx,
} from "../shared/ui"
import logoBomyeon from "../assets/logo-bomyeon.png"
import hero3d from "../assets/3d/hero-dollar-3d.webp"
import how1Watch from "../assets/3d/how-1-watch.webp"
import how2Earn from "../assets/3d/how-2-earn.webp"
import how3Spend from "../assets/3d/how-3-spend.webp"
import cashGiftshop from "../assets/3d/cash-giftshop.webp"
import referral3d from "../assets/3d/referral-3d-alpha.webp"

/*
 * 현행 brothermaze.com 의 화면 구성을 그대로 토스 형식으로 옮겼습니다.
 * 히어로 → 01 꼭 필요했던 소득(단가) → 02 얻은소득 10% → 03 현금처럼(1:1+출금)
 * → 04 남는 시간 언제든지 → 05 누구나 광고 → FAQ → 시작 CTA → CONTACT US
 */

/* ── 히어로 ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section aria-label="보면소득 소개" className="bg-ground pt-12 pb-20 md:pt-20 md:pb-30">
      <Container className="grid items-center gap-12 md:grid-cols-[1.05fr_1fr] md:gap-10">
        <div>
          <p className="text-[15px] font-semibold text-ink-3">보면소득</p>
          <h1 className="reveal-words mt-4 text-[36px] leading-[1.3] font-bold tracking-[-0.01em] text-ink-strong md:text-[48px] 2xl:text-[56px]">
            <SplitWords>
              원하는 콘텐츠를 보기만 해도
              <br />
              소득받는 <span className="text-brand-600">전국민 보면소득</span>
            </SplitWords>
          </h1>
          <p className="mt-5 max-w-[440px] text-[17px] leading-[1.6] text-ink-2 md:text-lg">
            15초 광고 하나에 7원. 지하철에서, 자기 전에, 보기만 하면 소득이
            쌓여요. 쌓인 소득은 현금 1원과 똑같이 쓰거나 내 계좌로 출금할 수
            있죠.
          </p>
          <StoreBadges className="mt-8" />
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="text-gold-600">★</span>
              <b className="num font-bold text-ink">{STORE.appStore.rating}</b>
              App Store
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="text-gold-600">★</span>
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

        <div className="relative mx-auto w-full max-w-[500px] overflow-hidden rounded-[40px] bg-fill-3 shadow-float">
          <img
            src={hero3d}
            alt="보면소득 앱 홈 화면을 띄운 스마트폰과 주변에 떠 있는 금화. 총 누적 소득 13,571원, 안 쓴 소득 12,571원"
            className="block w-full"
            width={1200}
            height={1128}
            fetchPriority="high"
          />
        </div>
      </Container>
    </section>
  )
}

/* ── 01 내가 보는 만큼 내가 버는, 꼭 필요했던 소득 ────────── */
function WhyAndRates() {
  return (
    <Section id="why" label="내가 보는 만큼 내가 버는 소득">
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
      {/* 길수록 커지는 막대 — 보면 볼수록 쌓인다는 걸 높이로 보여줍니다 */}
      <ol className="mx-auto mt-10 grid max-w-[760px] grid-cols-3 gap-2 md:mt-14 md:gap-6">
        {AD_LENGTHS.map((len) => (
          <li
            key={len}
            className="flex flex-col items-center rounded-card bg-fill-2 px-2 py-6 ring-1 ring-line md:px-6 md:py-7"
          >
            <span className="num text-[13px] font-semibold text-ink-2 md:text-[15px]">
              {len}초 광고
            </span>
            <div
              aria-hidden
              className="mt-5 flex h-24 w-full items-end justify-center md:mt-6 md:h-28"
            >
              <div
                className="grow w-10 rounded-t-xl bg-brand-600 md:w-14"
                style={{
                  height: `${(REWARD[len] / REWARD[60]) * 100}%`,
                  ["--i" as string]: AD_LENGTHS.indexOf(len),
                }}
              />
            </div>
            <span className="mt-4 block md:hidden">
              <Money value={REWARD[len]} size="sm" />
            </span>
            <span className="mt-5 hidden md:block">
              <Money value={REWARD[len]} size="md" />
            </span>
          </li>
        ))}
      </ol>

      {/* 제한 없음 — 흐려지며 이어지는 코인으로 '계속'을 표현 */}
      <div className="mx-auto mt-4 flex max-w-[760px] flex-col items-center justify-between gap-4 rounded-card bg-brand-50 px-6 py-6 sm:flex-row md:mt-6 md:px-8">
        <p className="text-center text-[17px] leading-[1.5] font-bold text-brand-700 sm:text-left md:text-[19px]">
          하루 상한도, 횟수 제한도 없어요
          <span className="mt-1 block text-[15px] font-semibold text-brand-700/80">
            보면 볼수록 계속 쌓입니다.
          </span>
        </p>
        <span
          aria-hidden
          className="coin-stream flex shrink-0 items-center gap-1.5"
        >
          {[1, 0.8, 0.6, 0.4, 0.22].map((o, i) => (
            <span
              key={o}
              style={{ opacity: o, ["--i" as string]: i }}
              className="flex"
            >
              <Coin size={26} />
            </span>
          ))}
          <span
            className="num text-xl font-extrabold text-brand-700/40"
            style={{ ["--i" as string]: 5 }}
          >
            ···
          </span>
        </span>
      </div>

      <p className="mx-auto mt-4 max-w-[760px] text-center text-[13px] leading-[1.6] text-ink-3 sm:text-left">
        광고를 끝까지 봤을 때 받는 소득이에요.
      </p>
    </Section>
  )
}

/* ── 02 친구가 번 소득의 10%를 매일 추가로 ───────────────── */
function Referral() {
  const points = [
    "친구가 번 소득의 10%를 매일 얻은소득으로 드려요",
    "친구 소득에서 빼는 게 아니라 보면소득이 추가로 드려요",
    "함께 보는 친구가 많을수록 내 소득이 계속 늘어나요",
  ]
  return (
    <Section id="referral" tone="gray" label="친구 소득의 10%를 매일 추가로">
      <ChapterHead
        no="02"
        title={
          <>
            친구가 번 소득의 <span className="text-brand-600">10%</span>가
            <br />
            <span className="text-brand-600">매일, 자동으로</span> 쌓여요
          </>
        }
        sub="한 번 초대해 두면 끝. 친구가 보면소득을 쓰는 동안 내가 아무것도 하지 않아도 소득이 자동으로 늘어나는 구조예요. 친구를 더 많이 모으세요. 먼저 시작할수록 유리해요."
      />
      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:items-center md:gap-16">
        <div className="mx-auto w-full max-w-[340px]">
          <img
            src={referral3d}
            alt="보면소득 앱의 친구 초대 화면을 띄운 스마트폰. 내 소득코드와 소득 친구 현황"
            loading="lazy"
            className="w-full"
            width={900}
            height={1269}
          />
        </div>
        <div>
          <h3 className="text-[22px] leading-[1.4] font-bold tracking-[-0.01em] text-ink md:text-[28px] 2xl:text-[32px]">
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
            <p className="text-[15px] leading-[1.6] font-semibold text-brand-700">
              친구 10명이 하루 5분씩만 봐도, 나는 아무것도 하지 않고 매일
              얻은소득이 들어와요.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ── 03 소득을 현금처럼 사용하세요 — 1:1 + 현금출금 ───────── */
function CashLike() {
  /* 두 줄이 서로 반대로 흐릅니다. */
  const brandRows = [
    [
      "네이버페이",
      "투썸플레이스",
      "맘스터치",
      "메가커피",
      "CU",
      "컴포트커피",
      "이마트24",
      "올리브영",
      "파리바게트",
      "GS25",
      "설빙",
      "빽다방",
    ],
    [
      "스마일머니",
      "죠스떡볶이",
      "카카오이모티콘플러스",
      "굽네치킨",
      "교보문고",
      "뚜레쥬르",
      "롯데시네마",
      "배스킨라빈스",
      "커피스미스",
      "다이소",
      "달리는커피",
      "상무초밥",
    ],
  ]
  const rows: [string, string][] = [
    ["출금 시작 금액", `${STATS.minPayout}부터`],
    ["입금까지", `신청 후 ${STATS.payoutDays} 이내`],
    ["받는 계좌", "본인 명의 계좌"],
    ["수수료", "단 500원"],
  ]
  return (
    <Section id="cash" label="소득을 현금처럼 사용하기">
      <ChapterHead
        no="03"
        title={
          <>
            소득을 현금처럼 사용하세요
            <br />
            소득 1원 = 현금 1원
          </>
        }
        sub="알고 있는 그 가격 그대로 상품을 살 수 있어요. 포인트처럼 가치가 깎이지 않고, 할인율도 전환 수수료도 없어요. 그리고 모으면 내 계좌로 현금출금까지 됩니다."
      />
      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <h3 className="text-[22px] leading-[1.4] font-bold tracking-[-0.01em] text-ink md:text-[28px] 2xl:text-[32px]">
            기프트샵에서 <span className="text-brand-600">정가 그대로</span>
          </h3>
          <p className="mt-3 text-base leading-[1.6] text-ink-2 2xl:text-[18px]">
            1,000소득이면 1,000원짜리 상품을 삽니다. 할인율도, 전환 수수료도
            없어요.
          </p>
          <div className="mt-6 flex w-fit items-center gap-4 rounded-2xl bg-fill-2 px-7 py-5 ring-1 ring-line">
            <div className="flex items-center gap-2">
              <Coin size={28} />
              <span className="num text-[28px] font-extrabold text-ink">1</span>
            </div>
            <span className="text-[22px] font-bold text-ink-3">=</span>
            <span className="num text-[28px] font-extrabold text-ink">₩1</span>
          </div>
          <ul className="mt-6 grid gap-3">
            {[
              "커피·편의점·마트·외식 상품까지",
              "산 쿠폰은 바로 쓸 수 있어요",
              "소득사용내역·쿠폰구매내역에서 확인해요",
            ].map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 text-base leading-[1.6] text-ink"
              >
                <Check className="mt-0.5 text-brand-600" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={cashGiftshop}
          alt="보면소득 소득사용 기프트샵을 띄운 스마트폰. 소득사용내역·쿠폰구매내역·현금출금 메뉴와 인기상품 CU 모바일 금액권 5,000원"
          loading="lazy"
          className="mx-auto w-full max-w-[300px]"
          width={800}
          height={1444}
        />
      </div>

      {/* 브랜드 띠 — 컨테이너 좌우 여백을 넘어 화면 끝까지 흐릅니다. */}
      <div className="marquee mt-12 -mx-5 md:-mx-12">
        {brandRows.map((row, i) => (
          <ul
            key={i}
            aria-label={i === 0 ? "소득으로 살 수 있는 브랜드" : undefined}
            className={cx("marquee-track gap-2 py-1", i === 1 && "is-reverse mt-2")}
          >
            {[...row, ...row].map((b, j) => (
              <li
                key={`${b}-${j}`}
                aria-hidden={j >= row.length ? true : undefined}
                className="shrink-0 rounded-full bg-surface px-4 py-2 text-[15px] font-semibold whitespace-nowrap text-ink-2 ring-1 ring-line"
              >
                {b}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <p className="mt-4 text-center text-[15px] text-ink-3">외 브랜드샵</p>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:items-center md:gap-16">
        <img
          src={how3Spend}
          alt="보면소득 앱의 소득 출금 화면을 띄운 스마트폰. 125,500원 출금 신청을 완료했다는 안내와 입금 계좌"
          loading="lazy"
          className="order-2 mx-auto w-full max-w-[300px] md:order-1"
          width={640}
          height={1156}
        />
        <div className="order-1 md:order-2">
          <h3 className="text-[22px] leading-[1.4] font-bold tracking-[-0.01em] text-ink md:text-[28px] 2xl:text-[32px]">
            모은 소득은 내 계좌로{" "}
            <span className="text-brand-600">현금출금</span>
          </h3>
          <p className="mt-3 text-base leading-[1.6] text-ink-2 2xl:text-[18px]">
            상품으로만 바꿀 수 있는 포인트가 아니에요. 진짜 현금으로
            돌려받습니다.
          </p>
          <dl className="mt-6 overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-line">
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
          <p className="mt-4 text-[13px] leading-[1.6] text-ink-3">
            주 5일 금융 거래일 기준이며, 시스템 점검이나 금융기관 사정으로
            늦어질 수 있어요.
          </p>
        </div>
      </div>
    </Section>
  )
}

/* ── 04 단 몇 초라도, 남는 시간에는 언제든지 ──────────────── */
const steps = [
  {
    title: "본다",
    desc: "앱을 열고 원하는 광고를 고릅니다. 끝까지 보면 바로 적립돼요.",
    more: "다양한 영상을 골라 볼 수 있어요.",
    img: how1Watch,
    alt: "보면소득 앱의 광고 목록 화면. 총 누적소득 13,571원, 높은 소득 탭, 영상 15초 + 방문 7원 광고 카드",
  },
  {
    title: "쌓인다",
    desc: "보는 즉시 소득이 쌓입니다. 매일 확인하는 재미가 있어요.",
    more: "영상광고 말고 참여소득으로도 쌓을 수 있어요.",
    img: how2Earn,
    alt: "소득 적립 완료 팝업. 참여소득 받기 성공",
  },
  {
    title: "쓴다",
    desc: "기프트샵에서 정가 그대로 사거나, 현금으로 출금합니다.",
    more: "출금은 횟수 제한없이 신청할 수 있어요.",
    img: how3Spend,
    alt: "보면소득 소득 출금 화면. 12,500원 출금 신청을 완료하였습니다",
  },
]

function EasyAnytime() {
  return (
    <Section id="how" tone="gray" label="남는 시간에는 언제든지">
      {/* 토스처럼 챕터를 고정하고 단계 카드가 지나가게 합니다. */}
      <div className="md:grid md:grid-cols-[minmax(0,360px)_1fr] md:gap-16">
        <div className="md:sticky md:top-[100px] md:self-start md:py-4">
          <ChapterHead
            no="04"
            center={false}
            title={
              <>
                단 몇 초라도
                <br />
                남는 시간에는 언제든지
              </>
            }
            sub="지하철 탈 때, 혼밥할 때, 알바할 때, 자기 전에. 그냥 보기만 해도 돈 버는 가장 쉬운 보편소득이에요. 세 단계면 충분합니다."
          />
        </div>
        <ol className="mt-10 grid gap-6 md:mt-0">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="overflow-hidden rounded-card bg-surface ring-1 ring-line md:grid md:grid-cols-[1fr_280px] md:items-center md:gap-8"
          >
            <div className="p-6 pb-0 md:p-8">
              <span className="num text-sm font-bold text-brand-700">
                STEP {i + 1}
              </span>
              <h3 className="mt-2 text-[20px] font-bold tracking-[-0.01em] text-ink 2xl:text-[24px]">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-ink-2 2xl:text-base">
                {s.desc}
              </p>
              <p className="mt-3 border-t border-line pt-3 text-[15px] leading-[1.6] text-ink-3">
                {s.more}
              </p>
            </div>
            {/* 폰 화면은 잘리지 않게 두고 높이만 제한합니다. */}
            <div className="mt-4 flex justify-center px-4 md:mt-0 md:px-0 md:pr-8">
              <img
                src={s.img}
                alt={s.alt}
                loading="lazy"
                className="w-full max-w-[250px] md:h-[420px] md:w-auto md:max-w-none"
                width={640}
                height={1156}
              />
            </div>
          </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

/* ── 05 기업이든 개인이든 누구나 쉽게 광고 ────────────────── */
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
    <Section label="개인도 광고할 수 있어요">
      <ChapterHead
        no="05"
        title={
          <>
            <span className="text-brand-600">개인도</span> 광고할 수 있어요
            <br />
            재미있게 나를 알려 보세요
          </>
        }
        sub="광고는 기업만 하는 게 아니에요. 전단지, 블로그, 동영상, 핸드폰 영상까지. 원하는 이미지나 영상으로 나를, 내 가게를, 내 친구를 직접 광고해 보세요. 사업자등록증 없이도 15초 광고 한 편에 15원부터예요."
      />
      <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
        {cases.map((c) => (
          <li
            key={c.title}
            className="rounded-card bg-fill-2 p-6 ring-1 ring-line md:p-8"
          >
            <h3 className="text-[20px] font-bold tracking-[-0.01em] text-ink 2xl:text-[24px]">
              {c.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-2 2xl:text-base">
              {c.desc}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Button variant="secondary" onClick={onSwitchToAd}>
          보면소득에 광고해보세요
        </Button>
      </div>
    </Section>
  )
}

/* ── FAQ ────────────────────────────────────────────────── */
function BomyeonFAQ() {
  return (
    <Section id="faq" tone="gray" label="자주 묻는 질문">
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
        {/* 다른 2열 섹션과 같이 제목을 고정합니다. */}
        <div className="md:sticky md:top-[100px] md:self-start md:py-4">
          <header className="max-w-[640px]">
            <h2 className="reveal-words text-[26px] leading-[1.35] font-bold tracking-[-0.01em] text-ink md:text-[36px] 2xl:text-[40px]">
              <SplitWords>
                시작하기 전에
                <br />
                궁금한 것들
              </SplitWords>
            </h2>
            <p className="mt-3 text-base leading-[1.6] text-ink-2 2xl:text-[18px]">
              더 궁금한 점은{" "}
              <a
                href={`mailto:${COMPANY.email}`}
                className="font-semibold text-brand-700 underline underline-offset-4"
              >
                {COMPANY.email}
              </a>
              으로 물어보세요.
            </p>
          </header>
        </div>
        <FAQ items={BOMYEON_FAQ} />
      </div>
    </Section>
  )
}

/* ── 시작 CTA — 현행 사이트의 마지막 문구 ─────────────────── */
function FinalCTA() {
  return (
    <section id="download" aria-label="앱 다운로드" className="bg-ground pt-20 pb-10 md:pt-30 md:pb-14">
      <Container>
        <div className="relative overflow-hidden rounded-[40px] bg-brand-700 px-6 py-14 text-center md:px-16 md:py-20">
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
            <h2 className="reveal-words mt-6 text-[28px] leading-[1.3] font-bold tracking-[-0.01em] text-white md:text-[40px] 2xl:text-[44px]">
              <SplitWords>
                전국민 보편소득 보면소득을
                <br />
                지금 바로 시작해 보세요
              </SplitWords>
            </h2>
            <p className="mt-3 text-base font-medium text-white md:text-[17px]">
              원하는 콘텐츠 보면서 소득 버는 쉬운 방법.
            </p>
            <StoreBadges className="mt-8 justify-center" />
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ── CONTACT US — 현행 사이트의 문의 섹션 ─────────────────── */
function Contact() {
  const contacts = [
    {
      label: "보면소득 제휴 및 광고 문의",
      email: COMPANY.partnerEmail,
    },
    {
      label: "보면소득 서비스 관련 문의",
      email: COMPANY.email,
    },
  ]
  return (
    <Section id="contact" label="문의" className="pt-10 md:pt-14">
      <h2 className="reveal-words text-center text-[26px] leading-[1.35] font-bold tracking-[-0.01em] text-ink md:text-[36px] 2xl:text-[40px]">
        <SplitWords>
          궁금한 점이 있다면
          <br />
          언제든 물어보세요
        </SplitWords>
      </h2>
      <div className="mx-auto mt-10 grid max-w-[720px] gap-4 md:grid-cols-2">
        {contacts.map((c) => (
          <a
            key={c.email}
            href={`mailto:${c.email}`}
            className="rounded-card bg-fill-2 p-6 ring-1 ring-line transition-shadow hover:shadow-card md:p-8"
          >
            <p className="text-[15px] font-semibold text-ink-2">{c.label}</p>
            <p className="mt-2 text-[17px] font-bold break-all text-brand-700">
              {c.email}
            </p>
          </a>
        ))}
      </div>
    </Section>
  )
}

export default function BomeonPage({
  onSwitchToAd,
}: {
  onSwitchToAd: () => void
}) {
  return (
    <main id="main">
      <Hero />
      <WhyAndRates />
      <Referral />
      <CashLike />
      <EasyAnytime />
      <PersonalAd onSwitchToAd={onSwitchToAd} />
      <BomyeonFAQ />
      <FinalCTA />
      <Contact />
    </main>
  )
}
