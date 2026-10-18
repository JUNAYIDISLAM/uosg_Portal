"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useActionState } from "react";
import { ShieldCheck } from "lucide-react";
import { login, type FormState } from "@/app/actions/auth";
import { buttonClass } from "@/components/ui/button";
import { Field, FormError, TextInput } from "@/components/ui/form";

const notices: Record<string, string> = {
  "no-access": "Your account doesn't have access to the dashboard.",
};

/** Reads ?next= and ?error= from the URL. Streams in on its own so the inputs never remount. */
function UrlFields({ showNotice }: { showNotice: boolean }) {
  const params = useSearchParams();
  const notice = notices[params.get("error") ?? ""];
  return (
    <>
      <input type="hidden" name="next" value={params.get("next") ?? ""} />
      {showNotice && <FormError message={notice} />}
    </>
  );
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(login, {});

  return (
    <form action={formAction} className="space-y-5">
      <Suspense>
        <UrlFields showNotice={!state.error} />
      </Suspense>
      <FormError message={state.error} />

      <Field label="Email" name="email">
        <TextInput
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@unitedopenscout.org"
          defaultValue={state.values?.email}
          required
          autoFocus
        />
      </Field>
      <Field label="Password" name="password">
        <TextInput name="password" type="password" autoComplete="current-password" required />
      </Field>

      <button type="submit" disabled={pending} className={buttonClass("primary", "md", "w-full")}>
        {pending ? "Signing in…" : "Sign in"}
      </button>

      <p className="flex items-center gap-2 text-xs text-muted">
        <ShieldCheck className="size-4 text-brand-600" aria-hidden="true" />
        Guests can browse all public content without an account.
      </p>
    </form>
  );
}
