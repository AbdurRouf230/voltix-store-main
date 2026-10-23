"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, BadgeCheck, CalendarDays, Package, RotateCcw, ShieldCheck, Tag, Truck } from "lucide-react";
import { toast } from "sonner";
import { FALLBACK_ITEM_ID, getCategoryName } from "@/data/items";
import { useHydrated, useItems } from "@/lib/items-store";
import { formatDate, formatPrice } from "@/lib/utils";
import ItemCard from "@/components/items/ItemCard";
import ItemImage from "@/components/ui/ItemImage";
import Rating from "@/components/ui/Rating";

/** Reads the product id from the URL, so the shared fallback page works for any id. */
function useItemId() {
  const pathname = usePathname() ?? "";
  const segment = pathname.split("/").filter(Boolean)[1] ?? "";
  return decodeURIComponent(segment);
}

export default function ItemDetails() {
  const id = useItemId();
  const items = useItems();
  const hydrated = useHydrated();
  const item = items.find((i) => i.id === id);

  // User-added products only exist in localStorage, so wait for the browser before saying "not found".
  if (!hydrated && (!item || id === FALLBACK_ITEM_ID)) return <ItemDetailsSkeleton />;

  if (!item) {
    return (
      <div className="container-app grid min-h-[60vh] place-items-center py-16 text-center">
        <div>
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-slate-100">
            <Package className="size-7 text-slate-400" />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">Product not found</h1>
          <p className="mt-2 text-slate-500">It may have been removed, or the link is incorrect.</p>
          <Link href="/items" className="btn-primary mt-6">
            <ArrowLeft className="size-4" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const related = items.filter((i) => i.category === item.category && i.id !== item.id).slice(0, 4);
  const inStock = item.stock > 0;

  const info = [
    { icon: Tag, label: "Price", value: formatPrice(item.price) },
    { icon: Package, label: "Category", value: getCategoryName(item.category) },
    { icon: CalendarDays, label: "Release date", value: formatDate(item.releaseDate) },
    { icon: BadgeCheck, label: "Brand", value: item.brand },
  ];

  return (
    <div className="container-app py-8 sm:py-12">
      <Link href="/items" className="btn-ghost -ml-3 mb-6 px-3">
        <ArrowLeft className="size-4" /> Back to Products
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ItemImage src={item.image} alt={item.title} className="card aspect-[4/3] animate-fade-up lg:aspect-square" />

        <div className="animate-fade-up [animation-delay:100ms]">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/items?category=${item.category}`} className="badge bg-brand-50 text-brand-700 hover:bg-brand-100">
              {getCategoryName(item.category)}
            </Link>
            <span className={`badge ${inStock ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
              {inStock ? `In stock · ${item.stock} left` : "Out of stock"}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{item.title}</h1>
          <Rating value={item.rating} reviews={item.reviews} className="mt-3" />
          <p className="mt-5 text-4xl font-extrabold text-brand-600">{formatPrice(item.price)}</p>
          <p className="mt-5 leading-relaxed text-slate-600">{item.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="btn-primary flex-1 py-3 text-base"
              disabled={!inStock}
              onClick={() => toast.success(`${item.title} added to your cart.`)}
            >
              Add to Cart
            </button>
            <Link href="/items" className="btn-outline flex-1 py-3 text-base">
              Continue Shopping
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 border-t border-slate-200 pt-6 text-sm text-slate-600 sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Truck className="size-4 text-brand-600" /> Free 48h delivery
            </li>
            <li className="flex items-center gap-2">
              <RotateCcw className="size-4 text-brand-600" /> 30-day returns
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-brand-600" /> 2-year warranty
            </li>
          </ul>
        </div>
      </div>

      {/* Key information + specs */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <section className="card p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Key information</h2>
          <dl className="mt-5 space-y-4">
            {info.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="size-5" />
                </span>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
                  <dd className="font-semibold text-slate-900">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </section>

        <section className="card p-6 sm:p-8 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900">Specifications</h2>
          {item.specs.length > 0 ? (
            <dl className="mt-5 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100">
              {item.specs.map((spec, i) => (
                <div key={`${spec.label}-${i}`} className="grid grid-cols-5 gap-4 px-4 py-3 odd:bg-slate-50/70">
                  <dt className="col-span-2 text-sm font-medium text-slate-500">{spec.label}</dt>
                  <dd className="col-span-3 text-sm font-semibold text-slate-900">{spec.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No specifications were provided for this product.</p>
          )}
        </section>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Related products</h2>
            <Link href={`/items?category=${item.category}`} className="text-sm font-semibold text-brand-600 hover:underline">
              See all
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ItemCard key={r.id} item={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export function ItemDetailsSkeleton() {
  return (
    <div className="container-app animate-pulse py-8 sm:py-12" role="status" aria-label="Loading product">
      <div className="mb-6 h-9 w-40 rounded-xl bg-slate-200" />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="aspect-[4/3] rounded-2xl bg-slate-200 lg:aspect-square" />
        <div className="space-y-4">
          <div className="h-6 w-32 rounded-full bg-slate-200" />
          <div className="h-10 w-3/4 rounded bg-slate-200" />
          <div className="h-5 w-40 rounded bg-slate-100" />
          <div className="h-10 w-32 rounded bg-slate-200" />
          <div className="h-24 w-full rounded bg-slate-100" />
          <div className="h-12 w-full rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
