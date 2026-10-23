import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Item } from "@/data/items";
import { getCategoryName } from "@/data/items";
import { formatPrice } from "@/lib/utils";
import ItemImage from "@/components/ui/ItemImage";
import Rating from "@/components/ui/Rating";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative">
        <ItemImage
          src={item.image}
          alt={item.title}
          className="aspect-[4/3]"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <span className="badge absolute left-3 top-3 bg-white/90 text-slate-700 shadow-sm backdrop-blur">
          {getCategoryName(item.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900" title={item.title}>
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm leading-5 text-slate-600">{item.shortDescription}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xl font-extrabold text-brand-600">{formatPrice(item.price)}</span>
          <Rating value={item.rating} reviews={item.reviews} />
        </div>

        <Link
          href={`/items/${item.id}`}
          className="btn-outline mt-5 w-full group-hover:border-brand-500 group-hover:bg-brand-600 group-hover:text-white"
        >
          View Details
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function ItemCardSkeleton() {
  return (
    <div className="card flex h-full animate-pulse flex-col overflow-hidden">
      <div className="aspect-[4/3] bg-slate-200" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-2/3 rounded bg-slate-200" />
        <div className="h-4 w-full rounded bg-slate-100" />
        <div className="h-4 w-4/5 rounded bg-slate-100" />
        <div className="h-10 w-full rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}
