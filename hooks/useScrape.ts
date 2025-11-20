import { useQueries } from "@tanstack/react-query";
import axios from "axios";

interface ScrapeResponse {
  images: string[];
}

const fetchScrape = async () => {
  const res = await axios.get<ScrapeResponse>("/api/scrape");
  return res.data;
};

const fetchScrape2 = async () => {
  const res = await axios.get<ScrapeResponse>("/api/scrape/seart");
  return res.data;
};

export const useScrape = () => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["scrape", "images", "source1"],
        queryFn: fetchScrape,
        staleTime: 1000 * 60 * 60,
      },
      {
        queryKey: ["scrape", "images", "source2"],
        queryFn: fetchScrape2,
        staleTime: 1000 * 60 * 60,
      },
    ],
  });

  const isSuccess = queries.every((query) => query.isSuccess);

  const isLoading = queries.some((query) => query.isLoading);

  const combinedImages = isSuccess
    ? queries.flatMap((query) => query.data?.images || [])
    : [];

  return {
    isLoading,
    isSuccess,
    data: { images: combinedImages },
  };
};
