"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAuthErrorMessage, useAuth } from "@/context/AuthContext";
import AuthShell, { Divider, FieldError, GoogleButton } from "@/components/auth/AuthShell";
import Spinner from "@/components/ui/Spinner";
import { cn, isValidUrl } from "@/lib/utils";

type Values = { name: string; email: string; photoURL: string; password: string; confirm: string };
type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = "Name is required.";
  else if (v.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";
  if (!v.email.trim()) errors.email = "Email is required.";
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) errors.email = "Enter a valid email address.";
  if (v.photoURL.trim() && !isValidUrl(v.photoURL.trim())) errors.photoURL = "Enter a valid image URL (http/https).";
  if (!v.password) errors.password = "Password is required.";
  else if (v.password.length < 6) errors.password = "Password must be at least 6 characters.";
  else if (!/[A-Z]/.test(v.password) || !/[a-z]/.test(v.password))
    errors.password = "Use at least one uppercase and one lowercase letter.";
  if (!v.confirm) errors.confirm = "Please confirm your password.";
  else if (v.confirm !== v.password) errors.confirm = "Passwords don't match.";
  return errors;
}

const FIELDS: Array<{ name: keyof Values; label: string; type: string; placeholder: string; autoComplete: string; optional?: boolean }> = [
  { name: "name", label: "Full name", type: "text", placeholder: "Jane Doe", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email" },
  { name: "photoURL", label: "Photo URL", type: "url", placeholder: "https://…", autoComplete: "photo", optional: true },
  { name: "password", label: "Password", type: "password", placeholder: "At least 6 characters", autoComplete: "new-password" },
  { name: "confirm", label: "Confirm password", type: "password", placeholder: "Repeat your password", autoComplete: "new-password" },
];

export default function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [values, setValues] = useState<Values>({ name: "", email: "", photoURL: "", password: "", confirm: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);

  const errors = validate(values);
  const showError = (field: keyof Values) => (touched[field] ? errors[field] : undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, photoURL: true, password: true, confirm: true });
    if (Object.keys(errors).length) return;

    setSubmitting(true);
    try {
      await register(values.name.trim(), values.email.trim(), values.password, values.photoURL.trim() || undefined);
      toast.success("Account created. Welcome to Voltix!");
      router.replace("/");
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell title="Create your account" subtitle="Join Voltix to start listing and managing products.">
      <GoogleButton />
      <Divider />

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {FIELDS.map((field) => {
          const error = showError(field.name);
          return (
            <div key={field.name}>
              <label htmlFor={field.name} className="label">
                {field.label} {field.optional && <span className="font-normal text-slate-400">(optional)</span>}
              </label>
              <input
                id={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, [field.name]: true }))}
                aria-invalid={Boolean(error)}
                aria-describedby={`${field.name}-error`}
                className={cn("input", error && "input-error")}
              />
              <FieldError id={`${field.name}-error`} message={error} />
            </div>
          );
        })}

        <button type="submit" disabled={submitting} className="btn-primary mt-2 w-full py-3 text-base">
          {submitting && <Spinner />}
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-600 hover:underline">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
