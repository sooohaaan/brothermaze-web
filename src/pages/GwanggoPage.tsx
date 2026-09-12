import { ADHAEYO_FAQ, AD_PRICE, COMPANY, LINKS, REWARD, STATS } from "../content"
import {
  Arrow,
  Button,
  ChapterHead,
  Coin,
  Container,
  FAQ,
  Section,
} from "../shared/ui"

/*
 * 현행 adhaeyo.com 의 화면 구성을 그대로 토스 형식으로 옮겼습니다.
 * 히어로(서비스 정의) → 01 15원이면 누구나 쉽게 하는 광고
 * → 02 광고하기 정말 쉬워요 → FAQ(유지) → 가입 CTA → CONTACT US
 */

/* ── 히어로 ─────────────────────────────────────────────── */
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
            보면소득에서 <span className="text-brand-600">광고해요</span>
          </h1>
          <p className="mt-5 max-w-[460px] text-[17px] leading-[1.75] text-ink-2 md:text-lg">
            광고해요는 모바일앱 보면소득에 쉽게 광고할 수 있는 광고 관리
            서비스입니다. 노출은 무료, 끝까지 본 사람에게만 15원. 광고비의
            절반은 광고를 본 그 사람의 주머니로 돌아갑니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#signup">무료로 시작하기</Button>
            <Button href="#usecases" variant="secondary">
              어떤 광고를 할 수 있나요
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

/* ── 01 15원이면 누구나 쉽게 하는 광고 ───────────────────── */
const useCases = [
  {
    group: "가게·브랜드",
    items: [
      { title: "동네 손님만 골라서 가게 홍보", note: "가게 근처 지역만 골라 노출" },
      { title: "유튜브·인스타 SNS 친구 늘리기", note: "쇼츠 하이라이트를 그대로" },
      { title: "신메뉴·오픈 소식 알리기", note: "사진 몇 장으로 영상 광고 완성" },
    ],
  },
  {
    group: "개인 · 마음 전하기",
    items: [
      { title: "내가 만든 쇼츠 자랑하기", note: "처음 만든 영상을 끝까지 봐 줄 사람들" },
      { title: "연인에게 영상편지", note: "세상에서 가장 저렴한 전광판" },
      { title: "우리 오빠 생일 축하", note: "낯선 사람들과 함께 축하하는 경험" },
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
        sub="동네 손님만 골라 가게를 홍보하고, SNS 친구를 늘리고, 쇼츠를 자랑하고, 영상편지와 생일 축하까지. 사업자등록증이 없어도 개인 계정으로 바로 시작해요."
      />
      <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2">
        {useCases.map((g) => (
          <div
            key={g.group}
            className="rounded-card bg-fill-2 p-6 ring-1 ring-line md:p-8"
          >
            <h3 className="text-[15px] font-semibold text-brand-700">
              {g.group}
            </h3>
            <ul className="mt-4 grid gap-4">
              {g.items.map((c) => (
                <li
                  key={c.title}
                  className="rounded-2xl bg-surface p-5 ring-1 ring-line"
                >
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

/* ── 02 광고하기 정말 쉬워요 ─────────────────────────────── */
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
      <div className="mt-10 text-center">
        <a
          href={LINKS.adGuide}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[15px] font-semibold text-brand-700 hover:text-brand-800"
        >
          광고 등록 가이드 자세히 보기 <Arrow className="size-4" />
        </a>
      </div>
    </Section>
  )
}

/* ── FAQ ────────────────────────────────────────────────── */
function AdFAQ() {
  return (
    <Section id="faq">
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
              href={`mailto:${COMPANY.partnerEmail}`}
              className="font-semibold text-brand-700 underline underline-offset-4"
            >
              {COMPANY.partnerEmail}
            </a>
          </p>
        </header>
        <FAQ items={ADHAEYO_FAQ} />
      </div>
    </Section>
  )
}

/* ── 가입 CTA ───────────────────────────────────────────── */
function SignupCTA() {
  return (
    <section id="signup" className="bg-ground pt-20 pb-10 md:pt-30 md:pb-14">
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
    <Section id="contact" className="pt-10 md:pt-14">
      <h2 className="text-center text-[26px] leading-[1.35] font-bold tracking-[-0.01em] text-ink md:text-[36px]">
        궁금한 점이 있다면
        <br />
        언제든 물어보세요
      </h2>
      <div className="mx-auto mt-10 grid max-w-[720px] gap-4 md:grid-cols-2">
        {contacts.map((c) => (
          <a
            key={c.email}
            href={`mailto:${c.email}`}
            className="rounded-card bg-fill-2 p-6 ring-1 ring-line transition-shadow hover:shadow-card md:p-8"
          >
            <p className="text-[15px] font-semibold text-ink-3">{c.label}</p>
            <p className="mt-2 text-[17px] font-bold break-all text-brand-700">
              {c.email}
            </p>
          </a>
        ))}
      </div>
    </Section>
  )
}

export default function GwanggoPage() {
  return (
    <main>
      <Hero />
      <UseCases />
      <EasySteps />
      <AdFAQ />
      <SignupCTA />
      <Contact />
    </main>
  )
}
