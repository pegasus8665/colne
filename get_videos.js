const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');

async function downloadVideo(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', err => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        console.log("Searching Pexels for Dubai videos...");
        await page.goto('https://www.pexels.com/search/videos/dubai%20city/?orientation=landscape', { waitUntil: 'load', timeout: 60000 });
        
        await page.waitForSelector('source');
        
        // Grab some video URLs from the search results
        const videoUrls = await page.evaluate(() => {
            const sources = Array.from(document.querySelectorAll('article video source'));
            return sources.map(s => s.src).slice(0, 10);
        });
        
        console.log("Found videos:", videoUrls.length);

        if (videoUrls.length > 0) {
            for(let i=0; i<8 && i<videoUrls.length; i++) {
                const url = videoUrls[i];
                console.log(`Downloading video ${i+1}...`);
                await downloadVideo(url, `video_${i+1}.mp4`);
                console.log(`Saved video_${i+1}.mp4`);
            }
        }
        
        await browser.close();
    } catch(err) {
        console.error(err);
    }
})();
