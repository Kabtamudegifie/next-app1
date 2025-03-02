import { MORTY_STORAGE_KEY } from "@/constants";

export function mergeLocalData<T>(apiData: T[]) {
  try {
    const localData = localStorage.getItem(MORTY_STORAGE_KEY);
    if (localData) {
      const parsedLocalCharacter = (JSON.parse(localData) as T[]) ?? [];
      if (parsedLocalCharacter.length > 0) {
        const mergedData: T[] = [
          ...structuredClone(parsedLocalCharacter),
          ...structuredClone(apiData),
        ];
        return mergedData;
      } else {
        return apiData;
      }
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Error: unable to parse data");
    } else {
      throw new Error("Something went wrong.");
    }
  }

  return apiData;
}

export function deleteLocalItemAndMerge<T extends { id: string }>(
  apiData: T[],
  item: T
) {
  const data = localStorage.getItem(MORTY_STORAGE_KEY);
  if (data) {
    const localMorties: T[] = JSON.parse(data);
    const filterLocalMorties = localMorties.filter(
      (localMorty) => localMorty.id !== item.id
    );
    localStorage.setItem(MORTY_STORAGE_KEY, JSON.stringify(filterLocalMorties));
    const allData: T[] = [
      ...structuredClone(filterLocalMorties),
      ...structuredClone(apiData),
    ];
    return allData;
  }
}
