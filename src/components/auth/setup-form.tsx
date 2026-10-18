"use client";

import { useActionState } from "react";
import { setupFirstAdmin, type FormState } from "@/app/actions/auth";
import { buttonClass } from "@/components/ui/button";
import { Field, FormError, TextInput } from "@/components/ui/form";

export function SetupForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(setupFirstAdmin, {});
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <FormError message={state.error} />
      <Field label="Full name" name="name" error={errors.name}>
        <TextInput
          name="name"
          autoComplete="name"
          required
          defaultValue={state.values?.name}
          error={errors.name}
        />
      </Field>
      <Field label="Email" name="email" error={errors.email}>
        <TextInput
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          error={errors.email}
        />
      </Field>
      <Field label="Password" name="password" error={errors.password} hint="At least 8 characters.">
        <TextInput
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          error={errors.password}
        />
      </Field>
      <Field label="Confirm password" name="confirm" error={errors.confirm}>
        <TextInput
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          error={errors.confirm}
        />
      </Field>
      <button type="submit" disabled={pending} className={buttonClass("primary", "md", "w-full")}>
        {pending ? "Creating account…" : "Create admin account"}
      </button>
    </form>
  );
}
