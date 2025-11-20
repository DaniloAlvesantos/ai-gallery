import { getBrowser } from "@/lib/puppeteer";
import { scrapeInfiniteScroll } from "@/utils/scrapeInfiniteScroll";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  const search = request.nextUrl.searchParams.get("s");

  await page.goto("https://www.seaart.ai", { waitUntil: "networkidle2" });

  const searchInput = await page.$("input[placeholder=Search]");
  await searchInput?.type(search || "");
  await searchInput?.press("Enter");

  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.waitForSelector("div.homeList");

  const homeList = await page.$("div.homeList");
  await scrapeInfiniteScroll(page);

  if (!homeList) throw new Error("Home list not found");

  const images = await homeList.$$eval("img.bg-image", (imgs) =>
    imgs.map((i) => i.src)
  );

  await page.close();

  const respose = NextResponse.json({ images });

  respose.headers.set(
    "Cache-Control",
    "public, max-age=30, s-maxage=30, stale-while-revalidate=120"
  );

  return respose;
}
