import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/fetch.function";

export default function useGetInfiniteCharacters(url: string) {
  return useInfiniteQuery({
    queryKey: ["characters"],
    queryFn: ({ pageParam }) =>
      fetchData({
        pageParam,
        url,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const maxPages = Math.ceil(lastPage.total / 3);
      const nextPage = pages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
    getPreviousPageParam: (_firstPage, pages) => {
      return pages.length > 1 ? pages.length - 1 : undefined;
    },
  });
}
