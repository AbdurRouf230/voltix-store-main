import { BadgeCheck, Headset, RotateCcw, ShieldCheck, Truck, Wallet } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const FEATURES = [
  { icon: BadgeCheck, title: "100% authentic", text: "Every product is sourced directly from brands or authorised distributors." },
  { icon: Truck, title: "48-hour delivery", text: "Express shipping on in-stock items, with live tracking from warehouse to door." },
  { icon: RotateCcw, title: "30-day returns", text: "Changed your mind? Send it back within 30 days for a full refund, no questions asked." },
  { icon: ShieldCheck, title: "2-year warranty", text: "Extended warranty on every purchase, handled by us — not a call centre maze." },
  { icon: Wallet, title: "Secure payments", text: "Pay by card, mobile wallet or cash on delivery, all protected end to end." },
  { icon: Headset, title: "Real human support", text: "Talk to tech specialists 7 days a week by chat, email or phone." },
];

export default function WhyChooseUs() {
  return (
    <section className="section bg-white">
      <div className="container-app">
        <SectionHeading
          eyebrow="Why Voltix"
          title="Shopping for tech, made simple"
          description="We obsess over the details so you can focus on enjoying your new gear."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card card-hover group p-6 sm:p-7">
              <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
