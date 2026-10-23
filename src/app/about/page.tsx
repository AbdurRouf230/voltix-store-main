import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartHandshake, Leaf, Sparkles } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Voltix — who we are and how we pick the tech we sell.",
};

const VALUES = [
  { icon: Sparkles, title: "Curated, not crowded", text: "We test hundreds of gadgets a year and only list the ones we'd buy ourselves." },
  { icon: HeartHandshake, title: "Honest advice", text: "Clear specs, real reviews and support from people who know the products." },
  { icon: Leaf, title: "Built to last", text: "We favour repairable, long-supported devices and recycle every return we can." },
];

const STATS = [
  { value: "2021", label: "Founded" },
  { value: "12k+", label: "Customers" },
  { value: "300+", label: "Products tested" },
  { value: "4.8★", label: "Store rating" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Voltix"
        description="A small team of tech lovers helping people find gear that genuinely makes life better."
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
      />

      <section className="section">
        <div className="container-app grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80&auto=format&fit=crop"
                alt="The Voltix team working together"
                className="size-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden rounded-2xl bg-brand-600 p-5 text-white shadow-xl sm:block">
              <p className="text-3xl font-extrabold">5 years</p>
              <p className="text-sm text-brand-100">of happy unboxings</p>
            </div>
          </div>

          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Tech shopping should feel exciting, not exhausting</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-slate-600">
              <p>
                Voltix started in 2021 when three friends got tired of scrolling through endless listings full of knock-offs and confusing
                specs. We wanted a store where every product was hand-picked, honestly described and backed by real support.
              </p>
              <p>
                Today we serve more than 12,000 customers. This app is our storefront: browse the catalogue, filter by what matters to you,
                and — once you sign in — add and manage your own product listings.
              </p>
            </div>
            <Link href="/items" className="btn-primary mt-8">
              Explore products <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <dl className="container-app grid grid-cols-2 gap-8 py-12 text-center md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <dd className="text-3xl font-extrabold text-brand-600 sm:text-4xl">{s.value}</dd>
              <dt className="mt-1 text-sm font-medium text-slate-500">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="section">
        <div className="container-app">
          <SectionHeading eyebrow="What we believe" title="Our values" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card card-hover p-7 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
