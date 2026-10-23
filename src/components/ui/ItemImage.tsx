"use client";

import { useState } from "react";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

/** Product image with a graceful icon fallback when the URL is missing or broken. */
export default function ItemImage({
  src,
  alt,
  className,
  imgClassName,
}: {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showFallback = !src || failedSrc === src;

  return (
    <div className={cn("relative overflow-hidden bg-slate-100", className)}>
      {showFallback ? (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-brand-50 via-white to-violet-100">
          <PackageOpen className="size-12 text-brand-400" strokeWidth={1.5} aria-hidden />
          <span className="sr-only">{alt}</span>
        </div>
      ) : (
        // Plain <img> so any user-supplied image URL works without remotePatterns config.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailedSrc(src)}
          className={cn("absolute inset-0 size-full object-cover", imgClassName)}
        />
      )}
    </div>
  );
}
