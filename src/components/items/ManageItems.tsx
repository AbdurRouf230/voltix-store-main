"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Boxes, DollarSign, Eye, LayoutGrid, PackageOpen, Plus, RotateCcw, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getCategoryName, type Item } from "@/data/items";
import { deleteItem, resetItems, useItems } from "@/lib/items-store";
import { formatDate, formatPrice } from "@/lib/utils";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ItemImage from "@/components/ui/ItemImage";
import Rating from "@/components/ui/Rating";

export default function ManageItems() {
  const items = useItems();
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Item | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter((i) => `${i.title} ${i.brand} ${getCategoryName(i.category)}`.toLowerCase().includes(term));
  }, [items, query]);

  const stats = useMemo(() => {
    const total = items.length;
    const categories = new Set(items.map((i) => i.category)).size;
    const avg = total ? items.reduce((sum, i) => sum + i.price, 0) / total : 0;
    return [
      { label: "Total products", value: String(total), icon: Boxes, tint: "bg-brand-50 text-brand-600" },
      { label: "Categories", value: String(categories), icon: LayoutGrid, tint: "bg-emerald-50 text-emerald-600" },
      { label: "Average price", value: formatPrice(Math.round(avg)), icon: DollarSign, tint: "bg-amber-50 text-amber-600" },
    ];
  }, [items]);

  const closeDelete = useCallback(() => setPendingDelete(null), []);
  const closeReset = useCallback(() => setConfirmReset(false), []);

  const handleDelete = () => {
    if (!pendingDelete) return;
    deleteItem(pendingDelete.id);
    toast.success(`"${pendingDelete.title}" was deleted.`);
    setPendingDelete(null);
  };

  const handleReset = () => {
    resetItems();
    toast.success("Demo catalogue restored.");
    setConfirmReset(false);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, tint }) => (
          <div key={label} className="card flex items-center gap-4 p-5">
            <span className={`grid size-12 place-items-center rounded-xl ${tint}`}>
              <Icon className="size-6" />
            </span>
            <div>
              <p className="text-sm text-slate-500">{label}</p>
              <p className="text-2xl font-extrabold text-slate-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative w-full sm:max-w-sm">
          <span className="sr-only">Search your products</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" className="input pl-11" />
        </label>
        <div className="flex gap-3">
          <button type="button" onClick={() => setConfirmReset(true)} className="btn-outline flex-1 sm:flex-none">
            <RotateCcw className="size-4" /> Restore demo data
          </button>
          <Link href="/items/add" className="btn-primary flex-1 sm:flex-none">
            <Plus className="size-4" /> Add Product
          </Link>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="card flex flex-col items-center px-6 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-slate-100">
            <PackageOpen className="size-7 text-slate-400" />
          </span>
          <h3 className="mt-5 text-lg font-bold text-slate-900">{items.length ? "No matching products" : "No products yet"}</h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            {items.length ? "Try a different search term." : "Add your first product or restore the demo catalogue."}
          </p>
        </div>
      ) : (
        <>
          {/* Table (tablet & desktop) */}
          <div className="card hidden overflow-hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th scope="col" className="px-5 py-3.5">Product</th>
                    <th scope="col" className="px-5 py-3.5">Category</th>
                    <th scope="col" className="px-5 py-3.5">Price</th>
                    <th scope="col" className="hidden px-5 py-3.5 lg:table-cell">Rating</th>
                    <th scope="col" className="px-5 py-3.5">Stock</th>
                    <th scope="col" className="hidden px-5 py-3.5 xl:table-cell">Release date</th>
                    <th scope="col" className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visible.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-brand-50/40">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <ItemImage src={item.image} alt="" className="size-12 shrink-0 rounded-xl" />
                          <div className="min-w-0">
                            <p className="max-w-xs truncate font-semibold text-slate-900">{item.title}</p>
                            <p className="truncate text-xs text-slate-500">{item.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="badge bg-slate-100 text-slate-700">{getCategoryName(item.category)}</span>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-900">{formatPrice(item.price)}</td>
                      <td className="hidden px-5 py-4 lg:table-cell">
                        <Rating value={item.rating} reviews={item.reviews === 0 ? 0 : undefined} />
                      </td>
                      <td className="px-5 py-4">
                        <StockBadge stock={item.stock} />
                      </td>
                      <td className="hidden px-5 py-4 text-slate-600 xl:table-cell">{formatDate(item.releaseDate)}</td>
                      <td className="px-5 py-4">
                        <RowActions item={item} onDelete={setPendingDelete} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards (mobile) */}
          <ul className="grid gap-4 md:hidden">
            {visible.map((item) => (
              <li key={item.id} className="card p-4">
                <div className="flex gap-4">
                  <ItemImage src={item.image} alt="" className="size-20 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">
                      {getCategoryName(item.category)} · {item.brand}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-bold text-brand-600">{formatPrice(item.price)}</span>
                      <StockBadge stock={item.stock} />
                    </div>
                  </div>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <RowActions item={item} onDelete={setPendingDelete} stretch />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this product?"
        description={
          <>
            <span className="font-semibold text-slate-900">{pendingDelete?.title}</span> will be permanently removed from the catalogue.
          </>
        }
        onConfirm={handleDelete}
        onCancel={closeDelete}
      />
      <ConfirmDialog
        open={confirmReset}
        title="Restore demo data?"
        description="This replaces your current catalogue with the original 12 demo products. Products you added will be removed."
        confirmLabel="Restore"
        onConfirm={handleReset}
        onCancel={closeReset}
      />
    </div>
  );
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) return <span className="badge bg-rose-50 text-rose-700">Out of stock</span>;
  if (stock < 10) return <span className="badge bg-amber-50 text-amber-700">Low · {stock}</span>;
  return <span className="badge bg-emerald-50 text-emerald-700">{stock} in stock</span>;
}

function RowActions({ item, onDelete, stretch = false }: { item: Item; onDelete: (item: Item) => void; stretch?: boolean }) {
  const size = stretch ? "flex-1" : "";
  return (
    <div className={`flex gap-2 ${stretch ? "" : "justify-end"}`}>
      <Link href={`/items/${item.id}`} className={`btn-outline px-3 py-2 ${size}`} aria-label={`View ${item.title}`}>
        <Eye className="size-4" /> View
      </Link>
      <button
        type="button"
        onClick={() => onDelete(item)}
        className={`btn border border-rose-200 bg-white px-3 py-2 text-rose-600 hover:border-rose-300 hover:bg-rose-50 focus-visible:ring-rose-500 ${size}`}
        aria-label={`Delete ${item.title}`}
      >
        <Trash2 className="size-4" /> Delete
      </button>
    </div>
  );
}
