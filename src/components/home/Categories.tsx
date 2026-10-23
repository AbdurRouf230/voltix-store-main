import Link from "next/link";
import { ArrowUpRight, Camera, Gamepad2, Headphones, Laptop, Smartphone, Watch, type LucideIcon } from "lucide-react";
import { CATEGORIES, type CategorySlug } from "@/data/items";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS: Record<CategorySlug, { icon: LucideIcon; tint: string }> = {
  audio: { icon: Headphones, tint: "bg-brand-100 text-brand-600" },
  wearables: { icon: Watch, tint: "bg-emerald-100 text-emerald-600" },
  cameras: { icon: Camera, tint: "bg-amber-100 text-amber-600" },
  computers: { icon: Laptop, tint: "bg-sky-100 text-sky-600" },
  phones: { icon: Smartphone, tint: "bg-rose-100 text-rose-600" },
  gaming: { icon: Gamepad2, tint: "bg-violet-100 text-violet-600" },
};

export default function Categories() {
  return (
    <section className="section bg-white">
      <div className="container-app">
        <SectionHeading
          eyebrow="Browse by category"
          title="Find exactly what you need"
          description="Six focused categories, each curated by people who actually use the gear."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {CATEGORIES.map((category) => {
            const { icon: Icon, tint } = ICONS[category.slug];
            return (
              <Link
                key={category.slug}
                href={`/items?category=${category.slug}`}
                className="card card-hover group flex flex-col gap-4 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:flex-row sm:items-center sm:p-6"
              >
                <span className={`grid size-14 shrink-0 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${tint}`}>
                  <Icon className="size-7" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="flex items-center gap-1 text-base font-bold text-slate-900 sm:text-lg">
                    {category.name}
                    <ArrowUpRight className="size-4 text-slate-400 opacity-0 transition group-hover:translate-x-0.5 group-hover:text-brand-600 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-1 line-clamp-1 text-sm text-slate-500">{category.description}</p>
                  <p className="mt-2 text-xs font-semibold text-brand-600">Shop now →</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
