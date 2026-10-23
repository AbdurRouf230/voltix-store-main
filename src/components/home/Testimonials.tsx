import { Quote } from "lucide-react";
import Rating from "@/components/ui/Rating";
import SectionHeading from "@/components/ui/SectionHeading";

const TESTIMONIALS = [
  {
    name: "Nadia Rahman",
    role: "UX Designer",
    initials: "NR",
    color: "from-brand-500 to-violet-600",
    rating: 5,
    text: "The Aurora headphones arrived the next day and the noise cancelling is unreal. Checkout was painless and support answered my question in minutes.",
  },
  {
    name: "Tanvir Hasan",
    role: "Software Engineer",
    initials: "TH",
    color: "from-emerald-500 to-teal-600",
    rating: 5,
    text: "I've bought three keyboards and a laptop here. Prices are fair, everything is genuine, and the product pages actually list the specs I care about.",
  },
  {
    name: "Sarah Ahmed",
    role: "Photographer",
    initials: "SA",
    color: "from-amber-500 to-orange-600",
    rating: 4,
    text: "Picked up the Vista mirrorless for a wedding shoot. Great advice from the team on which lens to pair it with. Will be back for my next upgrade.",
  },
];

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container-app">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by 12,000+ customers"
          description="Don't take our word for it — here's what people say after unboxing."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card card-hover relative flex flex-col p-6 sm:p-7">
              <Quote className="absolute right-6 top-6 size-10 text-brand-100" aria-hidden />
              <Rating value={t.rating} />
              <blockquote className="mt-4 flex-1 leading-relaxed text-slate-700">“{t.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span className={`grid size-11 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white ${t.color}`}>
                  {t.initials}
                </span>
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
