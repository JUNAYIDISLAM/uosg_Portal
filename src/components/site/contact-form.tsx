"use client";

import { useState } from "react";
import { siteInfo } from "@/content/site";
import { buttonClass } from "@/components/ui/button";

const inputClass =
  "mt-2 block w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20";

// Until messages are stored in the database (dashboard phase), the form hands the
// message to the visitor's email app so nothing is silently lost.
export function ContactForm() {
  const [opened, setOpened] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Website enquiry from ${name}`;
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${siteInfo.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-mist p-6 sm:p-8">
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
            minLength={2}
            maxLength={100}
            className={inputClass}
          />
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
            className={inputClass}
          />
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
          minLength={10}
          maxLength={2000}
          className={`${inputClass} resize-y`}
        />
      </div>

      <button type="submit" className={buttonClass("primary", "md", "mt-6 w-full")}>
        Send message
      </button>

      <p aria-live="polite" className="mt-3 text-sm text-body">
        {opened && (
          <>
            Your email app should open with the message ready to send. If it didn’t, email us at{" "}
            <a href={`mailto:${siteInfo.email}`} className="font-medium text-brand-700 underline">
              {siteInfo.email}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
