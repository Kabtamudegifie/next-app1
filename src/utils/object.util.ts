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
