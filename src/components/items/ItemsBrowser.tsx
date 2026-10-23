"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES } from "@/data/items";
import { useItems } from "@/lib/items-store";
import { cn } from "@/lib/utils";
import ItemCard, { ItemCardSkeleton } from "@/components/items/ItemCard";

export const PRICE_RANGES = [
  { value: "under-100", label: "Under $100", min: 0, max: 100 },
  { value: "100-500", label: "$100 – $500", min: 100, max: 500 },
  { value: "500-1000", label: "$500 – $1,000", min: 500, max: 1000 },
  { value: "over-1000", label: "Over $1,000", min: 1000, max: Infinity },
];

const RATINGS = [
  { value: "4.5", label: "4.5★ & up" },
  { value: "4", label: "4★ & up" },
  { value: "3", label: "3★ & up" },
];

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
];

type FilterKey = "category" | "price" | "rating" | "sort";

export default function ItemsBrowser() {
  const items = useItems();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [q, setQ] = useState("");

  const category = searchParams.get("category") ?? "";
  const price = searchParams.get("price") ?? "";
  const rating = searchParams.get("rating") ?? "";
  const sort = searchParams.get("sort") ?? "featured";

  // Filters live in the URL so results are shareable and category links from the homepage work.
  const setParam = (key: FilterKey, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  };

  const clearAll = () => {
    setQ("");
    window.history.replaceState(null, "", window.location.pathname);
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const range = PRICE_RANGES.find((r) => r.value === price);
    const minRating = Number(rating) || 0;

    const result = items.filter((item) => {
      if (term && !`${item.title} ${item.shortDescription} ${item.brand}`.toLowerCase().includes(term)) return false;
      if (category && item.category !== category) return false;
      if (range && (item.price < range.min || item.price >= range.max)) return false;
      if (minRating && item.rating < minRating) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "rating":
        return [...result].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...result].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
      default:
        return result;
    }
  }, [items, q, category, price, rating, sort]);

  const activeFilters = [
    category && { key: "category" as const, label: CATEGORIES.find((c) => c.slug === category)?.name ?? category },
    price && { key: "price" as const, label: PRICE_RANGES.find((r) => r.value === price)?.label ?? price },
    rating && { key: "rating" as const, label: `${rating}★ & up` },
  ].filter(Boolean) as { key: FilterKey; label: string }[];

  return (
    <div>
      {/* Search + controls */}
      <div className="card flex flex-col gap-3 p-3 sm:p-4 lg:flex-row lg:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search headphones, laptops, brands…"
            className="input py-3 pl-12"
          />
        </label>

        <button
          type="button"
          onClick={() => setShowFilters((s) => !s)}
          aria-expanded={showFilters}
          className="btn-outline lg:hidden"
        >
          <SlidersHorizontal className="size-4" />
          Filters {activeFilters.length > 0 && <span className="badge bg-brand-600 text-white">{activeFilters.length}</span>}
        </button>

        <div className={cn("gap-3 sm:grid-cols-2 lg:flex lg:items-center", showFilters ? "grid" : "hidden")}>
          <Select label="Category" value={category} onChange={(v) => setParam("category", v)}>
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
          <Select label="Price" value={price} onChange={(v) => setParam("price", v)}>
            <option value="">Any price</option>
            {PRICE_RANGES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </Select>
          <Select label="Rating" value={rating} onChange={(v) => setParam("rating", v)}>
            <option value="">Any rating</option>
            {RATINGS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </Select>
          <Select label="Sort by" value={sort === "featured" ? "" : sort} onChange={(v) => setParam("sort", v)}>
            {SORTS.map((s) => (
              <option key={s.value} value={s.value === "featured" ? "" : s.value}>
                {s.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Result summary + active filter chips */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <p className="mr-2 text-sm text-slate-600">
          Showing <span className="font-bold text-slate-900">{filtered.length}</span> of {items.length} products
        </p>
        {activeFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setParam(f.key, "")}
            className="badge border border-brand-200 bg-brand-50 py-1 text-brand-700 transition hover:bg-brand-100"
            aria-label={`Remove ${f.label} filter`}
          >
            {f.label}
            <X className="size-3.5" />
          </button>
        ))}
        {(activeFilters.length > 0 || q) && (
          <button type="button" onClick={clearAll} className="text-sm font-semibold text-slate-500 underline-offset-4 hover:text-brand-600 hover:underline">
            Clear all
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="card mt-6 flex flex-col items-center px-6 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-slate-100">
            <Search className="size-7 text-slate-400" />
          </span>
          <h3 className="mt-5 text-lg font-bold text-slate-900">No products match your filters</h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500">Try a different search term or remove some filters to see more results.</p>
          <button type="button" onClick={clearAll} className="btn-primary mt-6">
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="input cursor-pointer py-3 pr-9 lg:w-44" aria-label={label}>
        {children}
      </select>
    </label>
  );
}

export function ItemsBrowserFallback() {
  return (
    <div>
      <div className="card h-[76px] animate-pulse bg-white" />
      <div className="mt-6 h-6 w-48 animate-pulse rounded bg-slate-200" />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <ItemCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
