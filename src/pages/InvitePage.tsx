import { STATS, STORE } from "../content"
import { Button, Money, storeLink } from "../shared/ui"
import appReward from "../assets/app-reward.webp"

/*
 * 초대 링크 전용 랜딩 — 이 화면의 유일한 목적은 설치.
 * 실제 서비스에서는 초대자 이름·코드를 URL에서 받아 채웁니다.
 */
const INVITER = "김브라더"
const CODE = "TM0148R2UB"

export default function InvitePage() {
  return (
    <main className="min-h-[calc(100dvh-44px)] bg-ground px-5 pt-10 pb-16">
      <div className="mx-auto flex max-w-[400px] flex-col items-center text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-surface py-1.5 pr-4 pl-1.5 shadow-card">
          <span className="grid size-7 place-items-center rounded-full bg-brand-50 text-[13px] font-bold text-brand-700">
            {INVITER[0]}
          </span>
          <span className="text-[15px] font-semibold text-ink">
            <b className="text-brand-700">{INVITER}</b>님이 초대했어요
          </span>
        </p>

        <h1 className="mt-6 text-[30px] leading-[1.3] font-extrabold tracking-[-0.03em] text-ink">
          광고 보고 소득 받는 앱,
          <br />
          같이 시작해요
        </h1>

        <img
          src={appReward}
          alt="보면소득 앱에서 소득을 받는 화면"
          className="mt-6 w-full max-w-[300px]"
          width={900}
          height={900}
        />

        <div className="-mt-6 w-full rounded-card bg-surface p-6 shadow-float">
          <p className="text-[15px] font-semibold text-ink-2">
            가입하고 첫 광고를 보면
          </p>
          <div className="mt-2 flex justify-center">
            <Money value={STATS.signupBonus} size="xl" sign="+" />
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-2 text-left">
            <div className="rounded-2xl bg-brand-50 p-4">
              <dt className="text-[13px] font-semibold text-brand-700">나</dt>
              <dd className="mt-1 text-[15px] font-semibold text-ink">
                가입 보너스 {STATS.signupBonus}원
              </dd>
            </div>
            <div className="rounded-2xl bg-gold-50 p-4">
              <dt className="text-[13px] font-semibold text-gold-800">
                {INVITER}님
              </dt>
              <dd className="mt-1 text-[15px] font-semibold text-ink">
                내 소득의 10%를 추가로
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-[13px] leading-[1.6] text-ink-3">
            {INVITER}님이 받는 10%는 보면소득이 따로 드려요. 내 소득은 줄지
            않습니다.
          </p>
        </div>

        <Button href={storeLink()} external className="mt-6 w-full">
          앱 설치하고 {STATS.signupBonus}원 받기
        </Button>
        <p className="mt-3 flex items-center gap-1.5 text-[13px] text-ink-3">
          초대 코드 <span className="num font-semibold text-ink-2">{CODE}</span>{" "}
          자동 적용
        </p>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-ink-2">
          <li className="flex items-center gap-1">
            <span className="text-gold-600">★</span>
            <b className="num text-ink">{STORE.appStore.rating}</b> App Store
          </li>
          <li className="flex items-center gap-1">
            <span className="text-gold-600">★</span>
            <b className="num text-ink">{STORE.playStore.rating}</b> Google Play
          </li>
          <li className="flex items-center gap-1">
            <b className="num text-ink">{STORE.playStore.downloads}</b> 다운로드
          </li>
        </ul>
      </div>
    </main>
  )
}
