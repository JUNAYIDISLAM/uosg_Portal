"use client";

import { useActionState, type InputHTMLAttributes } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/messages";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "block w-full rounded-md border border-line bg-white px-5 py-4 text-base text-ink outline-none transition placeholder:text-muted focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 aria-invalid:border-ember-500";

type Field = "firstName" | "lastName" | "email" | "phone" | "message";

/** Placeholder shows the label; a hidden label keeps it readable for screen readers. */
function ContactInput({
  name,
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { name: Field; label: string; error?: string }) {
  const id = `contact-${name}`;
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        placeholder={`${label}*`}
        required
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-ember-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const errors = state.fieldErrors ?? {};
  const values = state.values;

  return (
    // Fills the row height so its bottom lines up with the cards; the message box takes the slack
    <form action={formAction} className="flex h-full flex-col rounded-2xl bg-white" noValidate>
      {/* Spam trap: hidden from people, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="leading-relaxed text-body">
        Please fill out the form below with your details and message, and our team will get back to
        you as soon as possible.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <ContactInput
          name="firstName"
          label="First Name"
          autoComplete="given-name"
          defaultValue={values?.firstName}
          error={errors.firstName}
        />
        <ContactInput
          name="lastName"
          label="Last Name"
          autoComplete="family-name"
          defaultValue={values?.lastName}
          error={errors.lastName}
        />
        <ContactInput
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          defaultValue={values?.email}
          error={errors.email}
        />
        <ContactInput
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          defaultValue={values?.phone}
          error={errors.phone}
        />
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <label htmlFor="contact-message" className="sr-only">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="Write Message"
          defaultValue={values?.message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${inputClass} min-h-32 flex-1 resize-none`}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-ember-600">
            {errors.message}
          </p>
        )}
      </div>

      {/* Above the button, so the form bottom stays level with the cards */}
      <p
        aria-live="polite"
        className={`mt-4 text-sm empty:mt-0 ${state.status === "success" ? "text-brand-700" : "text-ember-600"}`}
      >
        {state.message}
      </p>

      <button
        type="submit"
        disabled={pending}
        className="mt-7 inline-flex h-12 self-start items-center justify-center rounded-full bg-brand-600 px-8 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
