"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES, type CategorySlug, type Item } from "@/data/items";
import { useAuth } from "@/context/AuthContext";
import { addItem, slugify } from "@/lib/items-store";
import { cn, formatPrice, isValidUrl } from "@/lib/utils";
import { FieldError } from "@/components/auth/AuthShell";
import ItemImage from "@/components/ui/ItemImage";
import Spinner from "@/components/ui/Spinner";

type Values = {
  title: string;
  shortDescription: string;
  description: string;
  price: string;
  category: CategorySlug | "";
  brand: string;
  releaseDate: string;
  stock: string;
  image: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  title: "",
  shortDescription: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  releaseDate: "",
  stock: "",
  image: "",
};

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.title.trim()) e.title = "Title is required.";
  else if (v.title.trim().length < 3) e.title = "Title must be at least 3 characters.";

  if (!v.shortDescription.trim()) e.shortDescription = "Short description is required.";
  else if (v.shortDescription.trim().length > 120) e.shortDescription = "Keep it under 120 characters.";

  if (!v.description.trim()) e.description = "Full description is required.";
  else if (v.description.trim().length < 30) e.description = "Write at least 30 characters.";

  const price = Number(v.price);
  if (!v.price) e.price = "Price is required.";
  else if (!Number.isFinite(price) || price <= 0) e.price = "Enter a price greater than 0.";

  if (!v.category) e.category = "Choose a category.";
  if (!v.brand.trim()) e.brand = "Brand is required.";
  if (!v.releaseDate) e.releaseDate = "Pick a release date.";

  const stock = Number(v.stock);
  if (v.stock === "") e.stock = "Stock is required.";
  else if (!Number.isInteger(stock) || stock < 0) e.stock = "Enter a whole number (0 or more).";

  if (v.image.trim() && !isValidUrl(v.image.trim())) e.image = "Enter a valid image URL (http/https).";
  return e;
}

export default function AddItemForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [values, setValues] = useState<Values>(EMPTY);
  const [specs, setSpecs] = useState([{ label: "", value: "" }]);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);

  const errors = validate(values);
  const err = (field: keyof Values) => (touched[field] ? errors[field] : undefined);

  const bind = (field: keyof Values) => ({
    id: field,
    name: field,
    value: values[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [field]: true })),
    "aria-invalid": Boolean(err(field)),
    "aria-describedby": `${field}-error`,
    className: cn("input", err(field) && "input-error"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])));
    if (Object.keys(errors).length) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    // Small delay so the loading state is visible; data is saved to localStorage.
    await new Promise((resolve) => setTimeout(resolve, 600));

    const item: Item = {
      id: `${slugify(values.title)}-${Math.random().toString(36).slice(2, 7)}`,
      title: values.title.trim(),
      shortDescription: values.shortDescription.trim(),
      description: values.description.trim(),
      price: Number(values.price),
      category: values.category as CategorySlug,
      brand: values.brand.trim(),
      releaseDate: values.releaseDate,
      stock: Number(values.stock),
      image: values.image.trim(),
      rating: 0,
      reviews: 0,
      specs: specs.filter((s) => s.label.trim() && s.value.trim()).map((s) => ({ label: s.label.trim(), value: s.value.trim() })),
      createdBy: user?.email,
    };

    addItem(item);
    setSubmitting(false);
    setValues(EMPTY);
    setSpecs([{ label: "", value: "" }]);
    setTouched({});
    toast.success("Product added successfully!", {
      description: `"${item.title}" is now live in the catalogue.`,
      action: { label: "View", onClick: () => router.push(`/items/${item.id}`) },
    });
  };

  const updateSpec = (index: number, key: "label" | "value", value: string) =>
    setSpecs((list) => list.map((s, i) => (i === index ? { ...s, [key]: value } : s)));

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {/* Basic info */}
        <fieldset className="card space-y-5 p-6 sm:p-8">
          <legend className="sr-only">Basic information</legend>
          <h2 className="text-lg font-bold text-slate-900">Basic information</h2>

          <div>
            <label htmlFor="title" className="label">
              Title
            </label>
            <input type="text" placeholder="e.g. Aurora ANC Headphones" {...bind("title")} />
            <FieldError id="title-error" message={err("title")} />
          </div>

          <div>
            <label htmlFor="shortDescription" className="label">
              Short description
            </label>
            <input type="text" placeholder="One line that sells the product" maxLength={140} {...bind("shortDescription")} />
            <div className="flex justify-between gap-4">
              <FieldError id="shortDescription-error" message={err("shortDescription")} />
              <span className={cn("ml-auto mt-1.5 text-xs", values.shortDescription.length > 120 ? "text-rose-600" : "text-slate-400")}>
                {values.shortDescription.length}/120
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="label">
              Full description
            </label>
            <textarea rows={5} placeholder="Describe features, materials, what's in the box…" {...bind("description")} />
            <FieldError id="description-error" message={err("description")} />
          </div>
        </fieldset>

        {/* Pricing & details */}
        <fieldset className="card grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
          <legend className="sr-only">Pricing and details</legend>
          <h2 className="text-lg font-bold text-slate-900 sm:col-span-2">Pricing & details</h2>

          <div>
            <label htmlFor="price" className="label">
              Price (USD)
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
              <input type="number" min="0" step="0.01" inputMode="decimal" placeholder="0.00" {...bind("price")} className={cn(bind("price").className, "pl-8")} />
            </div>
            <FieldError id="price-error" message={err("price")} />
          </div>

          <div>
            <label htmlFor="stock" className="label">
              Stock quantity
            </label>
            <input type="number" min="0" step="1" inputMode="numeric" placeholder="0" {...bind("stock")} />
            <FieldError id="stock-error" message={err("stock")} />
          </div>

          <div>
            <label htmlFor="category" className="label">
              Category
            </label>
            <select {...bind("category")} className={cn(bind("category").className, "cursor-pointer", !values.category && "text-slate-400")}>
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug} className="text-slate-900">
                  {c.name}
                </option>
              ))}
            </select>
            <FieldError id="category-error" message={err("category")} />
          </div>

          <div>
            <label htmlFor="brand" className="label">
              Brand
            </label>
            <input type="text" placeholder="e.g. Aurora" {...bind("brand")} />
            <FieldError id="brand-error" message={err("brand")} />
          </div>

          <div>
            <label htmlFor="releaseDate" className="label">
              Release date
            </label>
            <input type="date" {...bind("releaseDate")} />
            <FieldError id="releaseDate-error" message={err("releaseDate")} />
          </div>

          <div>
            <label htmlFor="image" className="label">
              Image URL <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input type="url" placeholder="https://…" {...bind("image")} />
            <FieldError id="image-error" message={err("image")} />
          </div>
        </fieldset>

        {/* Specifications */}
        <fieldset className="card p-6 sm:p-8">
          <legend className="sr-only">Specifications</legend>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Specifications</h2>
              <p className="text-sm text-slate-500">Optional. Shown as a table on the product page.</p>
            </div>
            <button
              type="button"
              onClick={() => setSpecs((s) => [...s, { label: "", value: "" }])}
              disabled={specs.length >= 8}
              className="btn-outline px-3 py-2"
            >
              <Plus className="size-4" /> Add row
            </button>
          </div>
          <div className="mt-5 space-y-3">
            {specs.map((spec, i) => (
              <div key={i} className="flex gap-3">
                <input
                  aria-label={`Specification ${i + 1} name`}
                  placeholder="e.g. Battery"
                  value={spec.label}
                  onChange={(e) => updateSpec(i, "label", e.target.value)}
                  className="input"
                />
                <input
                  aria-label={`Specification ${i + 1} value`}
                  placeholder="e.g. 40 hours"
                  value={spec.value}
                  onChange={(e) => updateSpec(i, "value", e.target.value)}
                  className="input"
                />
                <button
                  type="button"
                  aria-label={`Remove specification ${i + 1}`}
                  onClick={() => setSpecs((s) => (s.length === 1 ? [{ label: "", value: "" }] : s.filter((_, idx) => idx !== i)))}
                  className="btn-ghost shrink-0 px-3 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Live preview + submit */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card overflow-hidden">
          <ItemImage src={isValidUrl(values.image.trim()) ? values.image.trim() : undefined} alt="Image preview" className="aspect-[4/3]" />
          <div className="p-5">
            <p className="eyebrow text-xs">Live preview</p>
            <div className="mt-2 flex items-start justify-between gap-3">
              <h3 className="line-clamp-1 text-lg font-bold text-slate-900">{values.title || "Product title"}</h3>
              <span className="shrink-0 text-lg font-extrabold text-brand-600">
                {Number(values.price) > 0 ? formatPrice(Number(values.price)) : "$0"}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-slate-600">{values.shortDescription || "Your short description will appear here."}</p>
          </div>
        </div>

        <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full py-3 text-base">
          {submitting && <Spinner />}
          {submitting ? "Adding product…" : "Submit"}
        </button>
        <Link href="/items/manage" className="btn-ghost mt-2 w-full">
          Go to Manage Products
        </Link>
      </aside>
    </form>
  );
}
