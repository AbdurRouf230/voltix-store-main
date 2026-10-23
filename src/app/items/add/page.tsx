import type { Metadata } from "next";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AddItemForm from "@/components/items/AddItemForm";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Add Product" };

export default function AddItemPage() {
  return (
    <ProtectedRoute>
      <PageHeader
        title="Add a new product"
        description="Fill in the details below. Your product will appear in the catalogue right away."
        crumbs={[{ href: "/", label: "Home" }, { href: "/items", label: "Products" }, { label: "Add Product" }]}
      />
      <div className="container-app py-10 sm:py-12">
        <AddItemForm />
      </div>
    </ProtectedRoute>
  );
}
