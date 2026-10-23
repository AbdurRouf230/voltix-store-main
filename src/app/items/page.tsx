import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/ui/PageHeader";
import ItemsBrowser, { ItemsBrowserFallback } from "@/components/items/ItemsBrowser";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse and filter our full catalogue of gadgets.",
};

export default function ItemsPage() {
  return (
    <>
      <PageHeader
        title="All Products"
        description="Search the full catalogue and filter by category, price or rating to find your next favourite gadget."
        crumbs={[{ href: "/", label: "Home" }, { label: "Products" }]}
      />
      <div className="container-app py-10 sm:py-12">
        {/* useSearchParams needs a Suspense boundary for prerendering. */}
        <Suspense fallback={<ItemsBrowserFallback />}>
          <ItemsBrowser />
        </Suspense>
      </div>
    </>
  );
}
