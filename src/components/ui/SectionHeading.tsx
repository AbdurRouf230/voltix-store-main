import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>}
    </div>
  );
}
