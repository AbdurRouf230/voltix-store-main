import type { Metadata } from "next";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ManageItems from "@/components/items/ManageItems";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Manage Products" };

export default function ManageItemsPage() {
  return (
    <ProtectedRoute>
      <PageHeader
        title="Manage products"
        description="View or remove products from the catalogue."
        crumbs={[{ href: "/", label: "Home" }, { href: "/items", label: "Products" }, { label: "Manage" }]}
      />
      <div className="container-app py-10 sm:py-12">
        <ManageItems />
      </div>
    </ProtectedRoute>
  );
}
