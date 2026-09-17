import {
  ADHAEYO_FAQ,
  AD_PRICE,
  COMPANY,
  LINKS,
  REWARD,
  STATS,
} from "../content"
import {
  Arrow,
  Button,
  ChapterHead,
  Check,
  Container,
  FAQ,
  Section,
} from "../shared/ui"
import adInApp from "../assets/3d/how-1-watch.webp"

/*
 * 현행 adhaeyo.com 의 화면 구성을 그대로 토스 형식으로 옮겼습니다.
 * 히어로(서비스 정의) → 01 15원이면 누구나 쉽게 하는 광고
 * → 02 합리적인 진짜 광고 → 03 한번 보면 잊지 못하는 광고
 * → 04 먼저 보려고 난리나는 광고 → 05 광고하기 정말 쉬워요
 * → FAQ(유지) → 가입 CTA → CONTACT US
 */

/* ── 히어로 ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section aria-label="광고해요 소개" className="bg-ground pt-12 pb-20 md:pt-20 md:pb-30">
      <Container className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <div>
          <p className="text-[15px] font-semibold text-ink-3">광고해요</p>
          <h1 className="mt-4 text-[36px] leading-[1.3] font-bold tracking-[-0.01em] text-ink-strong md:text-[48px]">
            전국민 <span className="text-brand-600">누구나</span>
            <br />
            보면소득에서 <span className="text-brand-600">광고해요</span>
          </h1>
          <p className="mt-5 max-w-[460px] text-[17px] leading-[1.6] text-ink-2 md:text-lg">
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

        <img
          src={adInApp}
          alt="보면소득 앱의 광고 목록 화면. 광고마다 7원 소득과 영상 15초 + 방문 형식이 표시되고, '우리 가게를 직접 쉽게 광고해요' 광고가 걸려 있다"
          className="mx-auto w-full max-w-[320px]"
          width={640}
          height={1156}
          fetchPriority="high"
        />
      </Container>
    </section>
  )
}

/* ── 01 15원이면 누구나 쉽게 하는 광고 — 현행 웹의 5가지 용도 ──── */
const useCases = [
  "동네 손님만 골라서 가게 홍보하고",
  "유튜브·인스타 SNS 친구도 늘리고",
  "내가 만든 쇼츠도 자랑하고",
  "연인에게 영상편지도 보내고",
  "우리 오빠 생일축하도 해보세요",
]

function UseCases() {
  return (
    <Section id="usecases" label="15원이면 누구나 쉽게 하는 광고">
      <ChapterHead
        no="01"
        title={
          <>
            15원이면 누구나
            <br />
            쉽게 하는 광고
          </>
        }
        sub="가게를 알리는 일부터 마음을 전하는 일까지, 짧은 영상 한 편이면 충분해요. 사업자등록증이 없어도 개인 계정으로 바로 시작할 수 있어요."
      />
      <ul className="mx-auto mt-10 max-w-[680px] divide-y divide-line overflow-hidden rounded-card bg-fill-2 ring-1 ring-line md:mt-14">
        {useCases.map((t) => (
          <li key={t} className="flex items-center gap-4 px-6 py-5 md:px-8">
            <Check className="shrink-0 text-brand-600" />
            <span className="text-[17px] leading-[1.5] font-semibold text-ink md:text-[19px]">
              {t}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/* ── 03 무엇이 다른가요 — 합리적인 과금 구조 ─────────────── */
const differences = [
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

function Why() {
  return (
    <Section id="value" tone="gray" label="본 만큼만 내는 합리적인 광고">
      {/* 챕터를 고정하고 카드가 지나가게 합니다. */}
      <div className="md:grid md:grid-cols-[minmax(0,360px)_1fr] md:gap-16">
        <div className="md:sticky md:top-[100px] md:self-start md:py-4">
          <ChapterHead
            no="02"
            center={false}
            title={
              <>
                본 만큼만 내는
                <br />
                합리적인 진짜 광고
              </>
            }
            sub="예산이 어디에 쓰였는지 설명할 수 없는 광고는 그만. 광고해요는 돈이 나가는 조건이 단 하나, 끝까지 본 시청뿐입니다."
          />
        </div>
        <div className="mt-10 grid gap-4 md:mt-0 md:gap-6">
        {differences.map((d) => (
          <div
            key={d.title}
            className="rounded-card bg-surface p-6 shadow-card md:p-8"
          >
            <Check className="size-7 text-brand-600" />
            <h3 className="mt-5 text-[20px] leading-[1.4] font-bold tracking-[-0.01em] text-ink">
              {d.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">
              {d.desc}
            </p>
          </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ── 03 한번 보면 잊지 못하는 광고 ───────────────────────── */
const memories = [
  {
    title: "광고비를 고객에게 직접 나눠줘요",
    desc: `완전시청 1건 ${AD_PRICE[15]}원 중 ${REWARD[15]}원이 광고를 본 그 사람의 주머니로 들어갑니다.`,
  },
  {
    title: "인지도와 호감도가 함께 올라요",
    desc: "광고가 불편한 방해가 아니라 반가운 선물이 됩니다. 브랜드를 좋은 기억으로 만나게 되죠.",
  },
  {
    title: "끝까지 본 사람만 남아요",
    desc: "과금 조건이 완전시청이라, 내 광고를 본 사람은 전부 처음부터 끝까지 본 사람입니다.",
  },
]

function Memory() {
  return (
    <Section id="memory" label="한번 보면 잊지 못하는 광고">
      <ChapterHead
        no="03"
        title={
          <>
            한번 보면
            <br />
            잊지 못하는 광고
          </>
        }
        sub="내 광고를 본 고객에게 직접 내 광고비를 나눠주니 브랜드 인지도와 호감도가 함께 올라갑니다."
      />
      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
        {memories.map((d) => (
          <div
            key={d.title}
            className="rounded-card bg-fill-2 p-6 ring-1 ring-line md:p-8"
          >
            <Check className="size-7 text-brand-600" />
            <h3 className="mt-5 text-[20px] leading-[1.4] font-bold tracking-[-0.01em] text-ink">
              {d.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">
              {d.desc}
            </p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-[680px] rounded-2xl bg-brand-50 px-6 py-5 text-center text-[17px] leading-[1.6] font-bold text-brand-700 md:text-[19px]">
        돈 주는 브랜드를 어떻게 잊어요!
      </p>
    </Section>
  )
}

/* ── 04 먼저 보려고 난리나는 광고 ────────────────────────── */
const rushes = [
  {
    title: "리워드가 있으니 서로 먼저 봐요",
    desc: "시청자는 소득을 받으려고 스스로 앱을 엽니다. 건너뛰기 버튼을 찾지 않아요.",
  },
  {
    title: "먼저 찾아보게 만들어요",
    desc: "유튜브·블로그·인스타·홈페이지로 연결해 두면, 광고가 끝난 뒤 스스로 찾아옵니다.",
  },
  {
    title: "기다리는 시청자가 있어요",
    desc: `볼 광고가 열리기를 기다리는 시청자가 ${STATS.activeViewers}. 노출을 사정할 필요가 없어요.`,
  },
]

function Rush() {
  return (
    <Section id="rush" tone="gray" label="먼저 보려고 난리나는 광고">
      <ChapterHead
        no="04"
        title={
          <>
            먼저 보려고
            <br />
            난리나는 광고
          </>
        }
        sub="광고를 보면 리워드를 받으니 서로 먼저 보려 해요. 밀어 넣지 않아도 알아서 찾아오는 광고입니다."
      />
      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
        {rushes.map((d) => (
          <div
            key={d.title}
            className="rounded-card bg-surface p-6 shadow-card md:p-8"
          >
            <Check className="size-7 text-brand-600" />
            <h3 className="mt-5 text-[20px] leading-[1.4] font-bold tracking-[-0.01em] text-ink">
              {d.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">
              {d.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── 05 광고하기 정말 쉬워요 ─────────────────────────────── */
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
    <Section id="how" label="광고하는 법">
      <ChapterHead
        no="05"
        title={
          <>
            광고하기
            <br />
            정말 쉬워요
          </>
        }
        sub="개인이든 기업이든 전국민 누구나 쉽게. 전단지, 블로그, 동영상, 핸드폰으로 찍은 영상까지, 가지고 있는 이미지나 영상만 있으면 가입부터 노출까지 네 단계면 끝나요."
      />
      <ol className="mx-auto mt-10 grid max-w-[680px] gap-6 md:mt-14">
        {steps.map((s, i) => (
          <li key={s.title} className="grid grid-cols-[40px_1fr] gap-4">
            <span className="num grid size-10 place-items-center rounded-full bg-brand-700 text-[15px] font-bold text-white">
              {i + 1}
            </span>
            <div className="pt-1.5">
              <h3 className="text-[20px] font-bold text-ink">{s.title}</h3>
              <p className="mt-1 text-[15px] leading-[1.6] text-ink-2">
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
          className="inline-flex min-h-11 items-center gap-1 text-[15px] font-semibold text-brand-700 hover:text-brand-800"
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
    <Section id="faq" tone="gray" label="자주 묻는 질문">
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <header className="max-w-[640px]">
          <h2 className="text-[26px] leading-[1.35] font-bold tracking-[-0.01em] text-ink md:text-[36px]">
            광고 올리기 전에
            <br />
            궁금한 것들
          </h2>
          <p className="mt-3 text-base leading-[1.6] text-ink-2">
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
    <section id="signup" aria-label="무료로 시작하기" className="bg-ground pt-20 pb-10 md:pt-30 md:pb-14">
      <Container>
        <div className="relative overflow-hidden rounded-[40px] bg-brand-700 px-6 py-14 text-center text-white md:px-16 md:py-20">
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
              가입은 무료예요. 노출도 무료, 광고비는 끝까지 본 만큼만 나갑니다.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Button variant="white" href={LINKS.console} external>
                무료로 회원가입
              </Button>
              <a
                href={LINKS.console}
                className="inline-flex min-h-11 items-center text-[15px] font-semibold text-white/80 underline underline-offset-4 hover:text-white"
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
    <Section id="contact" label="문의" className="pt-10 md:pt-14">
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

export default function GwanggoPage() {
  return (
    <main id="main">
      <Hero />
      <UseCases />
      <Why />
      <Memory />
      <Rush />
      <EasySteps />
      <AdFAQ />
      <SignupCTA />
      <Contact />
    </main>
  )
}
