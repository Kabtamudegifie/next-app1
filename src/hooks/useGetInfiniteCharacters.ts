import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/fetch.function";
export interface Response<Entity> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Entity[];
}
export default function useGetInfiniteCharacters<Entity>(url: string) {
  return useInfiniteQuery<
    Response<Entity>,
    Error,
    InfiniteData<Response<Entity>, number>,
    string[],
    number
  >({
    queryKey: ["characters"],
    queryFn: ({ pageParam }) =>
      fetchData({
        pageParam,
        url,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const maxPages = Math.ceil(lastPage.info.count / 3);
      const nextPage = pages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
    getPreviousPageParam: (_firstPage, pages) => {
      return pages.length > 1 ? pages.length - 1 : undefined;
    },
  });
}
