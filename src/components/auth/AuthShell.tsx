"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { getAuthErrorMessage, useAuth } from "@/context/AuthContext";
import Logo from "@/components/ui/Logo";
import Spinner, { PageLoader } from "@/components/ui/Spinner";

const PERKS = ["Save products and manage your listings", "Add new gadgets to the catalogue", "Faster checkout & order tracking"];

/** Split-screen layout shared by the login and register pages. Redirects home if already signed in. */
export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const { user, loading, configured } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace("/");
  }, [user, loading, router]);

  if (loading || user) return <PageLoader label={user ? "Redirecting…" : "Loading…"} />;

  return (
    <div className="container-app grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 lg:grid-cols-2 lg:py-16">
      <div className="relative hidden h-full min-h-[560px] overflow-hidden rounded-3xl bg-slate-950 p-10 lg:flex lg:flex-col lg:justify-between">
        <div aria-hidden className="absolute -right-20 -top-20 size-80 rounded-full bg-brand-600/40 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 -left-10 size-80 rounded-full bg-violet-600/30 blur-3xl" />
        <Logo light className="relative" />
        <div className="relative">
          <h2 className="text-4xl font-extrabold leading-tight text-white">
            Your next favourite gadget is <span className="text-brand-300">one click away.</span>
          </h2>
          <ul className="mt-8 space-y-4">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 className="size-5 text-emerald-400" /> {perk}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-slate-500">Trusted by 12,000+ tech lovers.</p>
      </div>

      <div className="mx-auto w-full max-w-md animate-fade-up">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-2 text-slate-600">{subtitle}</p>

        {!configured && (
          <div role="alert" className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <AlertTriangle className="size-5 shrink-0" />
            <p>
              Firebase isn&apos;t configured yet. Add your Firebase keys to <code className="font-semibold">.env.local</code> and restart the
              dev server.
            </p>
          </div>
        )}

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

export function GoogleButton() {
  const { loginWithGoogle } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    setBusy(true);
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google. Welcome!");
      router.replace("/");
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  return (
    <button type="button" onClick={handleClick} disabled={busy} className="btn-outline w-full py-3">
      {busy ? (
        <Spinner />
      ) : (
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.66 4.1-5.5 4.1-3.31 0-6-2.74-6-6.2s2.69-6.2 6-6.2c1.88 0 3.14.8 3.86 1.49l2.63-2.53C16.8 3.2 14.6 2.2 12 2.2 6.6 2.2 2.2 6.6 2.2 12s4.4 9.8 9.8 9.8c5.66 0 9.4-3.98 9.4-9.58 0-.64-.07-1.13-.16-1.62H12Z" />
          <path fill="#34A853" d="M3.33 7.44 6.6 9.84C7.48 7.8 9.55 6.2 12 6.2c1.88 0 3.14.8 3.86 1.49l2.63-2.53C16.8 3.2 14.6 2.2 12 2.2 8.24 2.2 4.98 4.33 3.33 7.44Z" />
          <path fill="#FBBC05" d="M12 21.8c2.54 0 4.68-.84 6.24-2.28l-2.88-2.36c-.8.56-1.88.95-3.36.95-2.43 0-4.5-1.64-5.24-3.88l-3.24 2.5C5.16 19.68 8.32 21.8 12 21.8Z" />
          <path fill="#4285F4" d="M21.4 12.22c0-.64-.07-1.13-.16-1.62H12v3.9h5.5c-.26 1.3-1 2.36-2.14 3.06l2.88 2.36c1.7-1.56 3.16-4.06 3.16-7.7Z" />
        </svg>
      )}
      Continue with Google
    </button>
  );
}

export function Divider() {
  return (
    <div className="my-6 flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-slate-400">
      <span className="h-px flex-1 bg-slate-200" /> or <span className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-rose-600">
      {message}
    </p>
  );
}
