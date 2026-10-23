import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { CATEGORIES } from "@/data/items";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    path: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2Z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 7.38A4.62 4.62 0 1 0 16.62 12 4.62 4.62 0 0 0 12 7.38Zm0 7.62a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm5.88-7.8a1.08 1.08 0 1 1-1.08-1.08 1.08 1.08 0 0 1 1.08 1.08ZM21.94 8.1a5.33 5.33 0 0 0-1.46-3.78 5.36 5.36 0 0 0-3.78-1.46C15.21 2.78 8.79 2.78 7.3 2.86a5.35 5.35 0 0 0-3.78 1.45A5.34 5.34 0 0 0 2.06 8.1c-.08 1.49-.08 7.91 0 9.4a5.33 5.33 0 0 0 1.46 3.78 5.37 5.37 0 0 0 3.78 1.46c1.49.08 7.91.08 9.4 0a5.33 5.33 0 0 0 3.78-1.46 5.36 5.36 0 0 0 1.46-3.78c.08-1.49.08-7.9 0-9.4Zm-2 11a3.03 3.03 0 0 1-1.71 1.71c-1.18.47-4 .36-5.23.36s-4.06.1-5.23-.36a3.03 3.03 0 0 1-1.71-1.71c-.47-1.18-.36-4-.36-5.23s-.1-4.06.36-5.23A3.03 3.03 0 0 1 6.77 4.9c1.18-.47 4-.36 5.23-.36s4.06-.1 5.23.36a3.03 3.03 0 0 1 1.71 1.71c.47 1.18.36 4 .36 5.23s.1 4.06-.36 5.23Z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 2.06-2.06 2.06 2.06 0 0 1-2.06 2.06ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77A1.75 1.75 0 0 0 0 1.73v20.54A1.75 1.75 0 0 0 1.77 24h20.45A1.76 1.76 0 0 0 24 22.27V1.73A1.76 1.76 0 0 0 22.22 0Z",
  },
];

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/items", label: "All Products" },
      ...CATEGORIES.slice(0, 4).map((c) => ({ href: `/items?category=${c.slug}`, label: c.name })),
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/items/add", label: "Sell a Product" },
      { href: "/items/manage", label: "Manage Products" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-950 text-slate-400">
      <div className="container-app grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed">
            Hand-picked tech for work, play and everything in between. Fast shipping, honest prices and a 30-day return promise.
          </p>
          <div className="flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-xl bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">{col.title}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm transition hover:text-white focus-visible:text-white focus-visible:outline-none">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" />
              House 12, Road 5, Dhaka 1207
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-brand-400" />
              +880 1700-000000
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-brand-400" />
              support@voltix.store
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app flex flex-col items-center justify-between gap-3 py-6 text-sm sm:flex-row">
          <p>© 2026 Voltix. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/about" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/about" className="transition hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
