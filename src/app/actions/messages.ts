"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import { siteInfo } from "@/content/site";
import { requirePermission } from "@/lib/auth/current-user";
import { db } from "@/lib/db";

// ── Public contact form ──────────────────────────────────────────────

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name.").max(50),
  lastName: z.string().trim().min(1, "Please enter your last name.").max(50),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/, "Please enter a valid phone number."),
  message: z.string().trim().min(10, "Your message should be at least 10 characters.").max(2000),
});

type ContactField = "firstName" | "lastName" | "email" | "phone" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  /** Submitted values, so React's form reset doesn't wipe them on errors. */
  values?: Record<ContactField, string>;
};

const MAX_MESSAGES_PER_HOUR = 3;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  let state: ContactState;
  try {
    state = await saveContactMessage(formData);
  } catch (error) {
    console.error("[contact] could not save message:", error);
    state = {
      status: "error",
      message: `Sorry, we couldn't send your message right now. Please email us at ${siteInfo.email}.`,
    };
  }
  if (state.status !== "error") return state;
  const value = (key: string) => String(formData.get(key) ?? "");
  return {
    ...state,
    values: {
      firstName: value("firstName"),
      lastName: value("lastName"),
      email: value("email"),
      phone: value("phone"),
      message: value("message"),
    },
  };
}

async function saveContactMessage(formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("website")) {
    return { status: "success", message: "Thanks! Your message has been sent." };
  }

  const parsed = contactSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    const errors = z.flattenError(parsed.error).fieldErrors;
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: {
        firstName: errors.firstName?.[0],
        lastName: errors.lastName?.[0],
        email: errors.email?.[0],
        phone: errors.phone?.[0],
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

  // The form asks for first and last name separately; they are stored together as one name.
  const { firstName, lastName, phone, message } = parsed.data;
  await db.contactMessage.create({
    data: { name: `${firstName} ${lastName}`, email, phone, message },
  });
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
