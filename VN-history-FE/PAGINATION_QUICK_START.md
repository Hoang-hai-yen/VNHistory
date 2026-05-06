# 🚀 Quick Start - Improved Pagination

## File Structure Created

```
✅ CREATED:
├── src/types/pagination.type.ts
├── src/hooks/usePagination.ts
├── src/hooks/usePaginationUrl.ts
├── src/components/Pagination/
│   ├── PaginationControls.tsx
│   ├── PaginationSizeSelector.tsx
│   └── index.ts
├── src/utils/pagination.utils.ts
├── src/utils/scrollUtils.ts
└── PAGINATION_IMPLEMENTATION.md (full documentation)

✅ MODIFIED:
├── src/components/States/QueryStateWrapper.tsx
└── src/pages/FiguresPage.tsx (example)
```

---

## 📖 3-Step Integration Guide

### Step 1: Import Hook

```tsx
import { usePaginationUrl } from "../hooks/usePaginationUrl";
```

### Step 2: Use in Component

```tsx
function MyListPage() {
  // Get total from API response
  const { data, isLoading } = useMyApi({ page: 1, limit: 10 });
  const total = data?.total || 0;

  // Initialize pagination with auto URL sync
  const { page, limit, totalPages, goToPage, nextPage, prevPage, changeLimit } =
    usePaginationUrl(total, 10);

  // Pass to QueryStateWrapper
  return (
    <QueryStateWrapper
      isLoading={isLoading}
      error={error}
      data={data?.items}
      pagination={{
        page,
        limit,
        totalPages,
        total,
        onNextPage: nextPage,
        onPrevPage: prevPage,
        onGoToPage: goToPage,
        onLimitChange: changeLimit,
      }}
    >
      {/* List items render here */}
      {data?.items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </QueryStateWrapper>
  );
}
```

### Step 3: Done! ✅

- ✅ Pagination controls auto-render
- ✅ Size selector auto-renders
- ✅ URL syncs automatically
- ✅ Scroll to top on page change
- ✅ Loading states handled
- ✅ Validation & boundaries enforced

---

## 🎮 Key APIs

### usePaginationUrl Hook

```tsx
const {
  page, // Current page (1-indexed)
  limit, // Items per page (10, 20, 50, 100)
  totalPages, // Calculated from total
  goToPage, // (page: number) => void
  nextPage, // () => void
  prevPage, // () => void
  changeLimit, // (limit: number) => void
} = usePaginationUrl(total, defaultLimit, options);
```

### Component Props

```tsx
// Pagination in QueryStateWrapper
pagination={{
  page: number;
  limit: number;
  totalPages: number;
  total?: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onGoToPage?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}}
```

---

## 💡 Common Patterns

### Pattern 1: List with Pagination

```tsx
const { page, limit, totalPages, goToPage, nextPage, prevPage, changeLimit } =
  usePaginationUrl(data?.total || 0, 10);

return (
  <QueryStateWrapper
    pagination={{ page, limit, totalPages, total: data?.total, ... }}
  >
    <ItemsList items={data?.items} />
  </QueryStateWrapper>
);
```

### Pattern 2: Search with Pagination

```tsx
const [query, setQuery] = useState("");
const { page, limit, totalPages, ...paginationMethods } = usePaginationUrl(
  searchResults?.total || 0,
  20,
);

const { data: searchResults } = useSearch({ query, page, limit });

return (
  <QueryStateWrapper
    pagination={{
      page,
      limit,
      totalPages,
      ...paginationMethods,
      total: searchResults?.total,
    }}
  >
    <SearchResults results={searchResults?.items} />
  </QueryStateWrapper>
);
```

### Pattern 3: Table with Pagination

```tsx
const { page, limit, totalPages, goToPage, nextPage, prevPage, changeLimit } =
  usePaginationUrl(tableData?.total || 0, 50);

return (
  <QueryStateWrapper
    pagination={{ page, limit, totalPages, total: tableData?.total, ... }}
  >
    <DataTable data={tableData?.items} />
  </QueryStateWrapper>
);
```

---

## 🐛 Troubleshooting

### Issue: Page input not showing

**Solution:** Pass `onGoToPage` to pagination props

```tsx
pagination={{
  ...other props,
  onGoToPage: goToPage  // ← Add this
}}
```

### Issue: Size selector not showing

**Solution:** Pass `onLimitChange` to pagination props

```tsx
pagination={{
  ...other props,
  onLimitChange: changeLimit  // ← Add this
}}
```

### Issue: Pagination not scrolling to top

**Solution:** Check usePaginationUrl options

```tsx
usePaginationUrl(total, 10, {
  scrollToTop: true, // ← Must be true
  behavior: "smooth", // ← smooth or auto
});
```

### Issue: URL params not syncing

**Solution:** Ensure using `usePaginationUrl` (not `usePagination`)

```tsx
// ❌ Wrong - no URL sync
const { ... } = usePagination(total);

// ✅ Correct - has URL sync
const { ... } = usePaginationUrl(total);
```

---

## 🧪 Testing Pages Updated

- ✅ **FiguresPage.tsx** - Working example with new pagination

---

## 📝 Checklist for New Pages

- [ ] Import `usePaginationUrl` hook
- [ ] Get total from API response
- [ ] Initialize hook with total and default limit
- [ ] Wrap component with `QueryStateWrapper`
- [ ] Pass pagination object to wrapper
- [ ] Test: Can change pages?
- [ ] Test: Can change items per page?
- [ ] Test: URL updates?
- [ ] Test: Scrolls to top?
- [ ] Test: Loading states?

---

## 🎯 Examples Ready to Use

### FiguresPage (implemented)

```tsx
src / pages / FiguresPage.tsx;
```

See it in action to understand the pattern!

---

## 📚 Full Documentation

See `PAGINATION_IMPLEMENTATION.md` for complete API reference and detailed guide.

---

**Happy Paginating! 🎉**
