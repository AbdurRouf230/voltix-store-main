import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { href?: string; label: string };

/** Consistent header band used at the top of inner pages. */
export default function PageHeader({
  title,
  description,
  crumbs,
  children,
}: {
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-brand-100/60 blur-3xl" />
      <div className="container-app relative flex flex-col gap-6 py-10 sm:py-12 md:flex-row md:items-end md:justify-between">
        <div>
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1 text-sm text-slate-500">
              {crumbs.map((crumb, i) => (
                <span key={crumb.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="size-4 text-slate-300" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition hover:text-brand-600">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-slate-700">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          {description && <p className="mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
