import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Rating({
  value,
  reviews,
  className,
}: {
  value: number;
  reviews?: number;
  className?: string;
}) {
  if (reviews === 0) {
    return (
      <div className={cn("flex items-center gap-1.5 text-sm text-slate-400", className)}>
        <Star className="size-4 fill-slate-200 text-slate-200" aria-hidden />
        No reviews yet
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1.5 text-sm", className)}>
      <div className="flex" aria-label={`Rated ${value} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            aria-hidden
            className={cn("size-4", i < Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200")}
          />
        ))}
      </div>
      <span className="font-semibold text-slate-700">{value.toFixed(1)}</span>
      {reviews !== undefined && <span className="text-slate-400">({reviews.toLocaleString("en-US")})</span>}
    </div>
  );
}
