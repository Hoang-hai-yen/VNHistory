import { useMemo } from "react";
import { useSearchParams } from "react-router";

export function useArchiveFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryId = searchParams.get("category") ?? "";
  const dynastyId = searchParams.get("dynasty") ?? "";

  const hasFilters = useMemo(
    () => Boolean(categoryId || dynastyId),
    [categoryId, dynastyId],
  );

  const updateFilter = (key: "category" | "dynasty", value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");
    setSearchParams(params);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("dynasty");
    params.set("page", "1");
    setSearchParams(params);
  };

  return {
    categoryId,
    dynastyId,
    hasFilters,
    setCategoryId: (value: string) => updateFilter("category", value),
    setDynastyId: (value: string) => updateFilter("dynasty", value),
    clearFilters,
  };
}
