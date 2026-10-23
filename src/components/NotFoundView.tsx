"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ItemDetails from "@/components/items/ItemDetails";
import { PageLoader } from "@/components/ui/Spinner";
import { useHydrated } from "@/lib/items-store";

/**
 * Products added in the browser have no pre-built page, so their URLs hit the 404 page
 * (e.g. in `npm run dev` or on hosts without the Netlify rewrite). For `/items/<id>` URLs
 * we show the product details instead; ItemDetails reads the id from the URL.
 */
export default function NotFoundView() {
  const pathname = usePathname() ?? "";
  const hydrated = useHydrated();
  // The pre-built 404 page doesn't know the real URL, so decide only once running in the browser.
  if (!hydrated) return <PageLoader />;
  if (/^\/items\/[^/]+\/?$/.test(pathname)) return <ItemDetails />;

  return (
    <div className="container-app grid min-h-[70vh] place-items-center py-16 text-center">
      <div>
        <p className="bg-gradient-to-r from-brand-500 to-violet-600 bg-clip-text text-8xl font-extrabold text-transparent">404</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-600">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="size-4" /> Back home
          </Link>
          <Link href="/items" className="btn-outline">
            Browse products
          </Link>
        </div>
      </div>
    </div>
  );
}
