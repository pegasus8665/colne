const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Navigate to local file
  await page.goto(`file://${__dirname}/index.html`, { waitUntil: 'networkidle0' });
  
  // Take screenshot
  await page.setViewport({ width: 1440, height: 1080 });
  await page.screenshot({ path: 'preview.png', fullPage: true });

  await browser.close();
  console.log('Preview generated as preview.png');
})();
