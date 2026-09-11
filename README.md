# 보면소득 · 광고해요 웹 프로토타입

광고 보고 소득 받는 앱 **보면소득**(brothermaze.com)과 광고주용 **광고해요**(adhaeyo.com) 랜딩 페이지 개편 프로토타입입니다.

**미리보기** — https://sooohaaan.github.io/brothermaze-web/

| 화면 | 주소 |
|---|---|
| 보면소득 | `/` |
| 광고해요 | `/?site=adhaeyo` |
| 초대 링크 | `/?site=invite` |

> 프로토타입입니다. 총 지급액·시청자 수 등 일부 수치는 예시값이며, `src/content.ts`에서 `[임시]`로 표시돼 있습니다.

## 실행

```bash
pnpm install
pnpm dev
```

## 구조

- `src/content.ts` — 단가·통계·FAQ 등 모든 숫자와 문구의 단일 출처
- `src/shared/ui.tsx` — 공용 컴포넌트 (버튼, 카드, 슬라이더, 폰 화면 등)
- `src/pages/` — 보면소득 · 광고해요 · 초대 링크
- `src/index.css` — 디자인 토큰 (브랜드 블루 `#0D82FF`, 4px 스페이싱)
- `scripts/capture-screens.mjs` — 화면설계서용 섹션 캡처 (`?capture=1` 모드 사용)

React 19 · Vite 8 · Tailwind CSS 4 · Figma Make 스캐폴드 기반.
`main`에 푸시하면 GitHub Actions로 GitHub Pages에 배포됩니다.

> `pnpm format`(oxfmt 0.2)은 타입 선언의 구분자를 지우는 버그가 있어 사용하지 않습니다.
