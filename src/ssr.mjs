import puppeteer from 'puppeteer';

const RENDER_CACHE = new Map();

export async function ssr(url) {
  console.log("URL :: ", url);
  // get from cache if it's there
  if (RENDER_CACHE.has(url)) return RENDER_CACHE.get(url);
  // process the page
  // const browser = await puppeteer.launch({headless: true});
  const browser = await puppeteer.launch({ headless: true, 
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google\ Chrome' });
  const page = await browser.newPage();
  // await page.setRequestInterception(true);
  // page.on('request', req => {
  //   // 2. Ignore requests for resources that don't produce DOM
  //   // (images, stylesheets, media).
  //   const allowlist = ['document', 'script', 'xhr', 'fetch'];
  //   console.log("RES TYPE :: ", req.resourceType());
  //   if (!allowlist.includes(req.resourceType())) {
  //     // return req.abort();
  //   }

  //   // 3. Pass through all other requests.
  //   req.continue();
  // });
  // await page.goto(url, {waitUntil: 'domcontentloaded'});
  await page.goto(url, {waitUntil: 'networkidle0'});
  // await page.waitForSelector(".product-details");
  /**
   *  Uncomment this line if you want the client to stop hydration
   * 
   *  await page.evaluate(() => {
   *  const elements = document.querySelectorAll('script, link[rel="import"]');
   *   elements.forEach(e => e.remove());
   * });
   */

  await page.evaluate(() => {
    const pageCtx = document.querySelector(".bread-crumb").__vueParentComponent.ctx;
    // console.log("APP INSTANCE :: ", appEl);
    const dynScript = document.createElement("script");
    const inlineCode = document.createTextNode(`window.__PUPPETEER_CTX__ = ${JSON.stringify(pageCtx)}`);
    dynScript.appendChild(inlineCode); 
    document.body.prepend(dynScript);
  });

  await page.evaluate(() => {
    const appEl = document.querySelector('#app');
    // appEl.setAttribute('data-server-rendered', true);
  });
  let content = await page.content();
  RENDER_CACHE.set(url, content);
  // console.log("CONTENT :: ", content);
  await browser.close();
  return content;
};
