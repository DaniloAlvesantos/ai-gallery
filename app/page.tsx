"use client";

import {
  ScrapedImage,
  ScrapedImageSleton,
} from "@/components/card/scrapedImage";
import { title } from "@/components/primitives";
import { useGetSearch } from "@/hooks/useGetSearch";
import { useScrape } from "@/hooks/useScrape";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const scrape = useScrape();
  const search = useGetSearch(query ?? "");

  const result = useMemo(() => {
    if (query && search.data?.images?.length) return search.data.images;
    return scrape.data?.images ?? [];
  }, [query, scrape.data, search.data]);

  const isLoading = scrape.isLoading || search.isLoading;

  return (
    <section id="main">
      <span>
        <h1 className={title()}>AI Gallery</h1>
        <p>Scroll for AI generated images</p>
      </span>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-6 mt-6">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <ScrapedImageSleton key={i} />
            ))
          : result.map((image) => <ScrapedImage source={image} key={image} />)}
      </div>
    </section>
  );
}
