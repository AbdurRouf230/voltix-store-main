import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Voltix team.",
};

const CHANNELS = [
  { icon: Mail, label: "Email", value: "support@voltix.store" },
  { icon: Phone, label: "Phone", value: "+880 1700-000000" },
  { icon: MapPin, label: "Address", value: "House 12, Road 5, Dhaka 1207" },
  { icon: Clock, label: "Hours", value: "Sat – Thu, 10am – 8pm" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact us"
        description="Questions about an order or a product? We usually reply within a few hours."
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
      />
      <section className="container-app grid gap-8 py-10 sm:py-12 lg:grid-cols-3">
        <div className="space-y-4">
          {CHANNELS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="card card-hover flex items-center gap-4 p-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="font-semibold text-slate-900">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
