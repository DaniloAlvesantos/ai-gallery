import { useQueries } from "@tanstack/react-query";
import axios from "axios";

interface ScrapeResponse {
  images: string[];
}

const fetchScrape = async (search: string) => {
  const res = await axios.get<ScrapeResponse>("/api/search?s=" + search);
  return res.data;
};

const fetchScrape2 = async (search: string) => {
  const res = await axios.get<ScrapeResponse>("/api/search/seart?s=" + search);
  return res.data;
};

export const useGetSearch = (search: string) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["scrape", "search", "source1", search],
        queryFn: () => fetchScrape(search),
        staleTime: 1000 * 60 * 60,
        enabled: Boolean(search),
      },
      {
        queryKey: ["scrape", "search", "source2", search],
        queryFn: () => fetchScrape2(search),
        staleTime: 1000 * 60 * 60,
        enabled: Boolean(search),
      },
    ],
  });

  const isLoading = queries.every((q) => q.isLoading);

  const anySuccess = queries.some((q) => q.isSuccess);

  const combinedImages = queries
    .filter((q) => q.data?.images)
    .flatMap((q) => q.data!.images);

  return {
    isLoading,
    isSuccess: anySuccess,
    data: { images: combinedImages },
  };
};
