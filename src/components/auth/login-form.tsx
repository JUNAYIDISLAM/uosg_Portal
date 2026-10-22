"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useActionState, useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { login, type FormState } from "@/app/actions/auth";
import { buttonClass } from "@/components/ui/button";
import { Field, FormError, inputClass, TextInput } from "@/components/ui/form";

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

const iconClass =
  "pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-muted";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(login, {});
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-5">
      <Suspense>
        <UrlFields showNotice={!state.error} />
      </Suspense>
      <FormError message={state.error} />

      <Field label="Email" name="email">
        <div className="relative">
          <Mail className={iconClass} aria-hidden="true" />
          <TextInput
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@unitedopenscout.org"
            defaultValue={state.values?.email}
            required
            autoFocus
            className={`${inputClass} py-3 pl-11`}
          />
        </div>
      </Field>
      <Field label="Password" name="password">
        <div className="relative">
          <Lock className={iconClass} aria-hidden="true" />
          <TextInput
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            className={`${inputClass} py-3 pr-11 pl-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((shown) => !shown)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:text-ink"
          >
            {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
          </button>
        </div>
      </Field>

      <button
        type="submit"
        disabled={pending}
        className={buttonClass("primary", "lg", "mt-7 w-full")}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
