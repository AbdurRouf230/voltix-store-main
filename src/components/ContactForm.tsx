"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { FieldError } from "@/components/auth/AuthShell";
import Spinner from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";

type Values = { name: string; email: string; message: string };
const EMPTY: Values = { name: "", email: "", message: "" };

function validate(v: Values) {
  const e: Partial<Record<keyof Values, string>> = {};
  if (!v.name.trim()) e.name = "Name is required.";
  if (!v.email.trim()) e.email = "Email is required.";
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
  return e;
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [sending, setSending] = useState(false);
  const errors = validate(values);
  const err = (k: keyof Values) => (touched[k] ? errors[k] : undefined);

  const field = (k: keyof Values) => ({
    id: `contact-${k}`,
    value: values[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValues((v) => ({ ...v, [k]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
    "aria-invalid": Boolean(err(k)),
    "aria-describedby": `contact-${k}-error`,
    className: cn("input", err(k) && "input-error"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setValues(EMPTY);
    setTouched({});
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900">Send us a message</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label">
            Name
          </label>
          <input type="text" autoComplete="name" placeholder="Jane Doe" {...field("name")} />
          <FieldError id="contact-name-error" message={err("name")} />
        </div>
        <div>
          <label htmlFor="contact-email" className="label">
            Email
          </label>
          <input type="email" autoComplete="email" placeholder="you@example.com" {...field("email")} />
          <FieldError id="contact-email-error" message={err("email")} />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="label">
          Message
        </label>
        <textarea rows={6} placeholder="How can we help?" {...field("message")} />
        <FieldError id="contact-message-error" message={err("message")} />
      </div>
      <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto">
        {sending ? <Spinner /> : <Send className="size-4" />}
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
