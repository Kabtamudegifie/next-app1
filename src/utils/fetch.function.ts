interface GetArgs {
  pageParam: number;
  url: string;
}
export const fetchData = async ({ pageParam = 1, url }: GetArgs) => {
  const res = await fetch(`${url}?page=${pageParam}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  const results = await res.json();
  return results;
};
