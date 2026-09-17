// og:image 생성 — 로컬 Chrome + puppeteer-core 로 1200×630 카드를 렌더링
// 사용법: node scripts/make-og.mjs  →  public/og-image.png
import puppeteer from "puppeteer-core"
import path from "node:path"

const CARDS = [
  {
    out: "public/og-image.png",
    badge: "광고 보고 소득 받는 앱",
    head: "원하는 콘텐츠를 보기만 해도<br/>소득받는 <b>전국민 보면소득</b>",
    foot: "15초 광고 하나에 7원 · 소득 1원 = 현금 1원",
    chips: [["보면소득", "blue"], ["광고해요", "line"]],
  },
  {
    out: "public/og-adhaeyo.png",
    badge: "보면소득에 광고하는 광고 관리 서비스",
    head: "전국민 <b>누구나</b><br/>보면소득에서 <b>광고해요</b>",
    foot: "노출은 무료 · 끝까지 본 사람에게만 15원",
    chips: [["광고해요", "blue"], ["보면소득", "line"]],
  },
]

const page = (c) => `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<style>
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    font-family: 'Pretendard Variable', Pretendard, sans-serif;
    background: #ffffff;
    color: #191f28;
    letter-spacing: -0.01em;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 72px 80px;
    position: relative; overflow: hidden;
  }
  .glow {
    position: absolute; right: -160px; top: -160px;
    width: 640px; height: 640px; border-radius: 50%;
    background: radial-gradient(circle, #d4e9ff 0%, transparent 65%);
  }
  .badge { display: flex; align-items: center; gap: 16px; }
  .coin {
    width: 56px; height: 56px; border-radius: 50%;
    display: grid; place-items: center;
    font-weight: 800; font-size: 26px; color: #fff;
    background: radial-gradient(circle at 32% 28%, #ffd76a 0%, #f5b32d 45%, #d99a14 100%);
    box-shadow: inset 0 -2px 0 rgb(0 0 0 / .12), inset 0 2px 0 rgb(255 255 255 / .45);
  }
  .badge span { font-size: 28px; font-weight: 700; color: #4e5968; }
  h1 { font-size: 76px; line-height: 1.28; font-weight: 700; position: relative; }
  h1 b { color: #0d82ff; font-weight: 700; }
  .foot { display: flex; align-items: center; justify-content: space-between; position: relative; }
  .foot p { font-size: 30px; color: #6b7684; font-weight: 600; }
  .foot .brands { display: flex; gap: 12px; }
  .chip {
    height: 56px; padding: 0 26px; border-radius: 28px;
    display: flex; align-items: center;
    font-size: 26px; font-weight: 700;
  }
  .chip.blue { background: #0d82ff; color: #fff; }
  .chip.line { background: #f2f4f6; color: #4e5968; }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="badge"><div class="coin">W</div><span>${c.badge}</span></div>
  <h1>${c.head}</h1>
  <div class="foot">
    <p>${c.foot}</p>
    <div class="brands">
      ${c.chips.map(([t, k]) => `<div class="chip ${k}">${t}</div>`).join("")}
    </div>
  </div>
</body>
</html>`

const browser = await puppeteer.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--hide-scrollbars", "--font-render-hinting=none"],
})
const tab = await browser.newPage()
await tab.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
for (const card of CARDS) {
  const out = path.resolve(process.cwd(), card.out)
  await tab.setContent(page(card), { waitUntil: "domcontentloaded" })
  await tab.evaluate(() => document.fonts.ready)
  await new Promise((r) => setTimeout(r, 400))
  await tab.evaluate(() => document.fonts.ready)
  await tab.screenshot({ path: out, type: "png" })
  console.log("saved", out)
}
await browser.close()
