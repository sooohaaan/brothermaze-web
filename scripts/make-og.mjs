// og:image 생성 — 로컬 Chrome + puppeteer-core 로 1200×630 카드를 렌더링
// 사용법: node scripts/make-og.mjs  →  public/og-image.png
import puppeteer from "puppeteer-core"
import path from "node:path"

const OUT = path.resolve(process.cwd(), "public/og-image.png")

const html = `<!doctype html>
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
  <div class="badge"><div class="coin">W</div><span>광고 보고 소득 받는 앱</span></div>
  <h1>원하는 콘텐츠를 보기만 해도<br/>소득받는 <b>전국민 보면소득</b></h1>
  <div class="foot">
    <p>15초 광고 하나에 7원 · 소득 1원 = 현금 1원</p>
    <div class="brands">
      <div class="chip blue">보면소득</div>
      <div class="chip line">광고해요</div>
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
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: "networkidle0" })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: OUT, type: "png" })
await browser.close()
console.log("saved", OUT)
