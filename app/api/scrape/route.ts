import { getBrowser } from "@/lib/puppeteer";
import { scrapeInfiniteScroll } from "@/utils/scrapeInfiniteScroll";

export async function GET() {
  const browser = await getBrowser();
  const page = await browser.newPage();

  await page.goto("https://lexica.art", { waitUntil: "networkidle2" });
  await scrapeInfiniteScroll(page);

  const images = await page.$$eval("img", (imgs) =>
    imgs.map((i) => i.src).filter(Boolean)
  );

  await page.close();

  return Response.json({ images });
}
