"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import { requirePermission } from "@/lib/auth/current-user";
import { db } from "@/lib/db";

// ── Public contact form ──────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address."),
  message: z.string().trim().min(10, "Your message should be at least 10 characters.").max(2000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
  /** Submitted values, so React's form reset doesn't wipe them on errors. */
  values?: Record<"name" | "email" | "message", string>;
};

const MAX_MESSAGES_PER_HOUR = 3;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const state = await saveContactMessage(formData);
  if (state.status !== "error") return state;
  const value = (key: string) => String(formData.get(key) ?? "");
  return { ...state, values: { name: value("name"), email: value("email"), message: value("message") } };
}

async function saveContactMessage(formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("website")) {
    return { status: "success", message: "Thanks! Your message has been sent." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    const errors = z.flattenError(parsed.error).fieldErrors;
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: {
        name: errors.name?.[0],
        email: errors.email?.[0],
        message: errors.message?.[0],
      },
    };
  }

  const email = parsed.data.email.toLowerCase();
  const recent = await db.contactMessage.count({
    where: { email, createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) } },
  });
  if (recent >= MAX_MESSAGES_PER_HOUR) {
    return {
      status: "error",
      message: "You've sent several messages recently. Please try again later.",
    };
  }

  await db.contactMessage.create({ data: { ...parsed.data, email } });
  return { status: "success", message: "Thanks! Your message has been sent. We’ll be in touch." };
}

// ── Dashboard ────────────────────────────────────────────────────────

export async function setMessageRead(messageId: string, read: boolean) {
  await requirePermission("messages.read");
  await db.contactMessage.update({
    where: { id: messageId },
    data: { readAt: read ? new Date() : null },
  });
  refresh();
}

export async function deleteMessage(messageId: string) {
  await requirePermission("messages.read");
  await db.contactMessage.delete({ where: { id: messageId } });
  refresh();
}
