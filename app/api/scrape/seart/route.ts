import { getBrowser } from "@/lib/puppeteer";
import { scrapeInfiniteScroll } from "@/utils/scrapeInfiniteScroll";

export async function GET() {
  const browser = await getBrowser();
  const page = await browser.newPage();

  await page.goto("https://www.seaart.ai", { waitUntil: "networkidle2" });

  const homeList = await page.$("div.homeList");
  await scrapeInfiniteScroll(page);

  if (!homeList) throw new Error("Home list not found");

  const images = await homeList.$$eval("img.bg-image", (imgs) =>
    imgs.map((i) => i.src)
  );

  await page.close();

  return Response.json({ images });
}
