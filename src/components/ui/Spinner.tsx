import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Spinner({ className }: { className?: string }) {
  return <Loader2 aria-hidden className={cn("size-4 animate-spin", className)} />;
}

export function PageLoader({ label = "Loading…" }: { label?: string }) {
  return (
    <div role="status" className="grid min-h-[60vh] place-items-center">
      <div className="flex flex-col items-center gap-3 text-slate-500">
        <Spinner className="size-8 text-brand-600" />
        <p className="text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}
