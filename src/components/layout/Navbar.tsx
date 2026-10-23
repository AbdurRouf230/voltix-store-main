"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutList, LogOut, Menu, PlusCircle, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth, type AppUser } from "@/context/AuthContext";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const USER_LINKS = [
  { href: "/items/add", label: "Add Product", icon: PlusCircle },
  { href: "/items/manage", label: "Manage Products", icon: LayoutList },
];

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || (href === "/items" && pathname.startsWith("/items/") && !pathname.startsWith("/items/add") && !pathname.startsWith("/items/manage"));
}

/** Reads the current path for active-link highlighting (wrapped in Suspense by the layout). */
export default function Navbar() {
  const pathname = usePathname();
  return <NavbarView pathname={pathname} />;
}

/** Same navbar without active-link state, used as the Suspense fallback. */
export function NavbarFallback() {
  return <NavbarView pathname={null} />;
}

function NavbarView({ pathname }: { pathname: string | null }) {
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg transition-shadow duration-300",
        scrolled ? "border-slate-200 shadow-sm" : "border-transparent",
      )}
    >
      <nav className="container-app flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  isActive(pathname, link.href) ? "text-brand-600" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                {link.label}
                {isActive(pathname, link.href) && (
                  <span className="absolute inset-x-4 -bottom-[1px] h-0.5 rounded-full bg-brand-600" aria-hidden />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop auth area */}
        <div className="hidden items-center gap-2 md:flex">
          {loading ? (
            <div className="h-10 w-36 animate-pulse rounded-xl bg-slate-100" aria-hidden />
          ) : user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Link href="/login" className="btn-ghost">
                Log in
              </Link>
              <Link href="/register" className="btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="btn-ghost px-2.5 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {mobileOpen && <MobileMenu pathname={pathname} onNavigate={closeMobile} />}
    </header>
  );
}

function Avatar({ user, size = "md" }: { user: AppUser; size?: "md" | "lg" }) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const dim = size === "lg" ? "size-11 text-base" : "size-8 text-xs";

  if (user.photoURL) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.photoURL}
        alt=""
        referrerPolicy="no-referrer"
        className={cn("rounded-full object-cover ring-2 ring-white", dim)}
      />
    );
  }
  return (
    <span className={cn("grid place-items-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 font-bold text-white ring-2 ring-white", dim)}>
      {initials}
    </span>
  );
}

function useLogout() {
  const { logout } = useAuth();
  const router = useRouter();
  return async () => {
    try {
      await logout();
      toast.success("You've been logged out.");
      router.push("/");
    } catch {
      toast.error("Couldn't log out. Please try again.");
    }
  };
}

function UserMenu({ user }: { user: AppUser }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleLogout = useLogout();

  // Close on outside click and Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 transition hover:border-brand-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <Avatar user={user} />
        <span className="max-w-32 truncate text-sm font-semibold text-slate-700">{user.name}</span>
        <ChevronDown className={cn("size-4 text-slate-500 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-72 origin-top-right animate-fade-in overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 p-4">
            <Avatar user={user} size="lg" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">{user.name}</p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
          </div>
          <div className="p-2">
            {USER_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-700 focus-visible:bg-brand-50 focus-visible:outline-none"
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </div>
          <div className="border-t border-slate-100 p-2">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50 focus-visible:bg-rose-50 focus-visible:outline-none"
            >
              <LogOut className="size-4" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu({ pathname, onNavigate }: { pathname: string | null; onNavigate: () => void }) {
  const { user, loading } = useAuth();
  const handleLogout = useLogout();

  return (
    <div id="mobile-menu" className="animate-fade-in border-t border-slate-200 bg-white md:hidden">
      <div className="container-app space-y-1 py-4">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "block rounded-xl px-4 py-3 text-base font-semibold transition",
              isActive(pathname, link.href) ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-50",
            )}
          >
            {link.label}
          </Link>
        ))}

        <div className="mt-3 border-t border-slate-100 pt-4">
          {loading ? null : user ? (
            <>
              <div className="mb-2 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <Avatar user={user} size="lg" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">{user.name}</p>
                  <p className="truncate text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
              {USER_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onNavigate}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Icon className="size-5 text-brand-600" />
                  {label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  onNavigate();
                  handleLogout();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="size-5" />
                Log out
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Link href="/login" onClick={onNavigate} className="btn-outline">
                Log in
              </Link>
              <Link href="/register" onClick={onNavigate} className="btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
