const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080 });
  await page.goto('https://ohio.clbthemes.com/demo34/homedemo34-elementor/', { waitUntil: 'networkidle0' });
  
  // Custom scrolling to lazy load all elements before screenshot
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 300;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if(totalHeight >= scrollHeight){
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 300);
    });
  });
  
  // Wait a bit more for images to render
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  await browser.close();
})();
