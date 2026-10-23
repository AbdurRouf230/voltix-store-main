import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, Truck } from "lucide-react";

const STATS = [
  { value: "12k+", label: "Happy customers" },
  { value: "4.8", label: "Average rating" },
  { value: "48h", label: "Express delivery" },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950">
      {/* Background glow + grid */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 size-[32rem] rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute -bottom-40 right-0 size-[28rem] rounded-full bg-violet-600/25 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      </div>

      <div className="container-app grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="animate-fade-up text-center lg:text-left">
          <span className="badge border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-brand-200">
            <span className="size-1.5 rounded-full bg-emerald-400" /> New season drops are live
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tech that powers your{" "}
            <span className="bg-gradient-to-r from-brand-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">everyday</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 lg:mx-0">
            Discover hand-picked headphones, wearables, cameras and more — tested by our team, delivered to your door in 48 hours.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href="/items" className="btn-primary px-7 py-3 text-base">
              Shop Products <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/about"
              className="btn border border-white/15 px-7 py-3 text-base text-white hover:border-white/30 hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-extrabold text-white sm:text-3xl">{s.value}</dd>
                <dd className="mt-1 text-xs text-slate-400 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:150ms] lg:max-w-none">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-brand-900/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1000&q=80&auto=format&fit=crop"
              alt="Assorted gadgets on a desk"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent" />
          </div>

          <div className="absolute -left-4 top-10 hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/95 p-3 pr-5 shadow-xl sm:flex">
            <span className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
              <Truck className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">Free shipping</p>
              <p className="text-xs text-slate-500">On orders over $99</p>
            </div>
          </div>

          <div className="absolute -right-4 bottom-10 hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/95 p-3 pr-5 shadow-xl sm:flex">
            <span className="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-500">
              <Star className="size-5 fill-current" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">4.8 / 5 rating</p>
              <p className="text-xs text-slate-500">From 12,000+ reviews</p>
            </div>
          </div>

          <div className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-lg sm:flex">
            <ShieldCheck className="size-4" /> 2-year warranty on everything
          </div>
        </div>
      </div>
    </section>
  );
}
