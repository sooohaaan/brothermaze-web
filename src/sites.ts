/*
 * 두 사이트의 문서 메타 — App 과 빌드 스크립트(vite.config.ts)가 함께 씁니다.
 * 여기 값이 바뀌면 화면 전환 시의 메타와 정적 HTML 이 같이 갱신됩니다.
 */
export type SiteId = "bomyeon" | "adhaeyo"

export type SiteMeta = {
  id: SiteId
  label: string
  /* 경로 — 보면소득이 기본, 광고해요는 /adhaeyo/ */
  path: string
  title: string
  description: string
  ogImage: string
}

export const SITES: SiteMeta[] = [
  {
    id: "bomyeon",
    label: "보면소득",
    path: "",
    title: "보면소득 — 원하는 콘텐츠를 보기만 해도 소득받는 전국민 보면소득",
    description:
      "15초 광고 하나에 7원. 보기만 하면 소득이 쌓이고, 소득 1원은 현금 1원처럼 쓰거나 내 계좌로 출금할 수 있어요.",
    ogImage: "og-image.png",
  },
  {
    id: "adhaeyo",
    label: "광고해요",
    path: "adhaeyo/",
    title: "광고해요 — 전국민 누구나 보면소득에서 광고해요",
    description:
      "보면소득에 광고를 올리는 광고 관리 서비스. 노출은 무료, 끝까지 본 사람에게만 15원. 광고비의 절반은 광고를 본 사람에게 돌아갑니다.",
    ogImage: "og-adhaeyo.png",
  },
]

export const siteMeta = (id: SiteId) => SITES.find((s) => s.id === id)!

/*
 * 광고해요 서비스 이용 가이드 — 노션에 있던 가이드를 웹으로 옮긴 화면.
 * /adhaeyo/guide/ 가 목차, /adhaeyo/guide/<slug>/ 가 각 문서입니다.
 * 본문은 src/guide/docs.tsx, 여기는 주소와 문서 메타만 둡니다.
 */
export type GuideSlug = "signup" | "about" | "register" | "review" | "policy"

export type GuideMeta = {
  slug: GuideSlug
  title: string
  description: string
}

export const GUIDE_HOME = {
  path: "adhaeyo/guide/",
  title: "광고해요 서비스 이용 가이드",
  description:
    "광고해요 가입부터 광고 계정 만들기, 광고 등록, 소재 심사, 운영 정책까지 한곳에서 확인하세요.",
  ogImage: "og-adhaeyo.png",
}

export const GUIDE_DOCS: GuideMeta[] = [
  {
    slug: "signup",
    title: "이용자 가입 및 광고 계정 만들기",
    description: "광고해요 이용자 가입부터 개인·사업자 광고 계정 생성과 심사까지 차례로 안내합니다.",
  },
  {
    slug: "about",
    title: "광고해요 궁금해요",
    description: "광고해요가 어떤 서비스인지, 영상광고와 배너광고는 어떻게 다른지 알려드려요.",
  },
  {
    slug: "register",
    title: "광고 등록 가이드",
    description: "광고 등록 절차와 영상·배너광고 준비물, 랜딩페이지 URL 규칙을 확인하세요.",
  },
  {
    slug: "review",
    title: "광고 소재 심사 가이드",
    description: "광고 소재 심사 기준, 광고 금지 사항, 심의필 번호, 심사 프로세스를 안내합니다.",
  },
  {
    slug: "policy",
    title: "서비스 운영 정책",
    description: "광고 계정, 광고 등록·심사, 이용 요금, 위약금, 환불, 세금계산서 규정을 담았습니다.",
  },
]

export const guidePath = (slug?: GuideSlug) =>
  GUIDE_HOME.path + (slug ? `${slug}/` : "")
