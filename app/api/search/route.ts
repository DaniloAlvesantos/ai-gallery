import { getBrowser } from "@/lib/puppeteer";
import { scrapeInfiniteScroll } from "@/utils/scrapeInfiniteScroll";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  const search = request.nextUrl.searchParams.get("s");

  await page.goto("https://lexica.art", { waitUntil: "networkidle2" });
  const searchInput = await page.$("input#main-search");
  await searchInput?.type(search || "");
  await searchInput?.press("Enter");

  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.waitForSelector("div[role=grid]");
  await scrapeInfiniteScroll(page);

  const images = await page.$$eval("img", (imgs) =>
    imgs.map((i) => i.src).filter(Boolean)
  );

  await page.close();

  const respose = NextResponse.json({ images });

  respose.headers.set(
    "Cache-Control",
    "public, max-age=30, s-maxage=30, stale-while-revalidate=120"
  );

  return respose;
}
