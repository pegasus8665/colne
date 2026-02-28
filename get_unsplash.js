const puppeteer = require('puppeteer');

async function getImages(query, count) {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(`https://unsplash.com/s/photos/${encodeURIComponent(query)}?license=free`, { waitUntil: 'load', timeout: 60000 });
    
    // Scroll a bit to load images
    await page.evaluate(() => window.scrollBy(0, 1000));
    await new Promise(r => setTimeout(r, 2000));

    const images = await page.evaluate((count) => {
        const imgs = Array.from(document.querySelectorAll('figure img[src^="https://images.unsplash.com/photo"]'));
        return imgs.map(img => img.src.split('?')[0] + '?q=80&w=1200&auto=format&fit=crop').slice(0, count);
    }, count);

    await browser.close();
    return images;
}

(async () => {
    console.log("Fetching Dubai images...");
    const dubaiImgs = await getImages('dubai luxury skyline', 10);
    console.log("Dubai Images:", dubaiImgs);
    
    console.log("Fetching Luxury Interior images...");
    const interiorImgs = await getImages('luxury modern interior', 10);
    console.log("Interior Images:", interiorImgs);

    console.log("Fetching Architecture images...");
    const archImgs = await getImages('modern villa architecture', 5);
    console.log("Arch Images:", archImgs);
})();
