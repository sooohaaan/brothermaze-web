// 화면설계서용 섹션 캡처 — 로컬 Chrome + puppeteer-core
// 사용법: (web 폴더에서) npm run dev -- --port 5173 으로 서버를 띄운 뒤
//   npm i -D puppeteer-core && node scripts/capture-screens.mjs
// 결과: ../화면캡처/ 에 섹션별 2배 PNG + manifest.json
import puppeteer from "puppeteer-core"
import fs from "node:fs"
import path from "node:path"

const OUT = path.resolve(process.cwd(), "../화면캡처")
const BASE = "http://127.0.0.1:5173/"

const PAGES = [
  {
    key: "bomyeon",
    title: "보면소득",
    query: "?capture=1",
    names: ["헤더", "히어로", "소득 계산기", "신뢰 지표·후기", "이용 방법", "왜 나에게 주나요·단가", "친구 초대", "소득 사용처", "FAQ", "다운로드 CTA", "푸터"],
  },
  {
    key: "adhaeyo",
    title: "광고해요",
    query: "?site=adhaeyo&capture=1",
    names: ["헤더", "히어로", "예산 시뮬레이터", "무엇이 다른가요", "광고 상품", "활용 예시", "시작하는 법·요금", "FAQ", "가입 CTA", "푸터"],
  },
  { key: "invite", title: "초대 링크", query: "?site=invite&capture=1", names: ["전체"] },
]

const VIEWPORTS = [
  { key: "D", label: "Desktop", width: 1440, height: 900, mobile: false },
  { key: "M", label: "Mobile", width: 390, height: 844, mobile: true },
]

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--hide-scrollbars", "--font-render-hinting=none"],
})

const manifest = []

for (const vp of VIEWPORTS) {
  for (const pg of PAGES) {
    const page = await browser.newPage()
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2, isMobile: vp.mobile, hasTouch: vp.mobile })
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "light" },
      { name: "prefers-reduced-motion", value: "reduce" },
    ])
    await page.goto(BASE + pg.query, { waitUntil: "networkidle0" })
    // 캡처가 섹션에 겹치지 않게 고정 헤더를 풀고, 지연 로딩 이미지를 모두 로드
    await page.addStyleTag({ content: "header{position:static!important} html{scroll-behavior:auto!important}" })
    await page.evaluate(async () => {
      document.querySelectorAll("img").forEach((i) => (i.loading = "eager"))
      await document.fonts.ready
      await Promise.all(
        [...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r }))),
      )
    })
    await new Promise((r) => setTimeout(r, 400))

    let targets
    if (pg.key === "invite") {
      targets = [await page.$("#top")]
    } else {
      targets = [await page.$("header"), ...(await page.$$("main > section")), await page.$("footer")]
    }
    if (targets.length !== pg.names.length) {
      throw new Error(`${pg.key}/${vp.key}: 섹션 ${targets.length}개, 이름 ${pg.names.length}개 불일치`)
    }

    for (let i = 0; i < targets.length; i++) {
      const box = await targets[i].boundingBox()
      const idx = String(i + 1).padStart(2, "0")
      const file = `${pg.title}_${vp.label}_${idx}_${pg.names[i]}.png`
      await targets[i].screenshot({ path: path.join(OUT, file) })
      manifest.push({
        page: pg.title,
        viewport: vp.label,
        order: i + 1,
        name: pg.names[i],
        file,
        width: Math.round(box.width),
        height: Math.round(box.height),
      })
    }
    await page.close()
  }
}

await browser.close()
fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2))
console.log(`${manifest.length}장 저장 → ${OUT}`)
for (const m of manifest) console.log(`${m.viewport.padEnd(7)} ${m.page} ${String(m.order).padStart(2)} ${m.name.padEnd(12)} ${m.width}×${m.height}`)
