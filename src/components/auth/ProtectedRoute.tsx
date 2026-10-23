"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PageLoader } from "@/components/ui/Spinner";

/** Renders children only for signed-in users; everyone else is sent to /login. */
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading) return <PageLoader label="Checking your session…" />;
  if (!user) return <PageLoader label="Redirecting to login…" />;
  return <>{children}</>;
}
