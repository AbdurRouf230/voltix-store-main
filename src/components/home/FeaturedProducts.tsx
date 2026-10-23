"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useItems } from "@/lib/items-store";
import ItemCard from "@/components/items/ItemCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FeaturedProducts() {
  const items = useItems();
  const featured = [...items].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 4);

  return (
    <section className="section">
      <div className="container-app">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Featured products"
            title="Top-rated by our customers"
            description="The gadgets people can't stop talking about this month."
          />
          <Link href="/items" className="btn-outline shrink-0">
            View all products <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
