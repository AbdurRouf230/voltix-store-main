import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Voltix home"
      className={cn("group inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500", className)}
    >
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-md shadow-brand-600/30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
        <Zap className="size-5" fill="currentColor" />
      </span>
      <span className={cn("text-xl font-extrabold tracking-tight", light ? "text-white" : "text-slate-900")}>
        Volt<span className="text-brand-500">ix</span>
      </span>
    </Link>
  );
}
