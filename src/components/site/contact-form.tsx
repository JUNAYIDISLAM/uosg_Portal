"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/messages";
import { buttonClass } from "@/components/ui/button";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "mt-2 block w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 aria-invalid:border-ember-500";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="rounded-2xl bg-mist p-6 sm:p-8" noValidate>
      {/* Spam trap: hidden from people, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClass}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-xs text-ember-600">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputClass}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-xs text-ember-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          defaultValue={state.values?.message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${inputClass} resize-y`}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-ember-600">
            {errors.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={pending} className={buttonClass("primary", "md", "mt-6 w-full")}>
        {pending ? "Sending…" : "Send message"}
      </button>

      <p
        aria-live="polite"
        className={`mt-3 text-sm ${state.status === "success" ? "text-brand-700" : "text-ember-600"}`}
      >
        {state.message}
      </p>
    </form>
  );
}
