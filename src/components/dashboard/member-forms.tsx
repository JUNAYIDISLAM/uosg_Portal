"use client";

import { useActionState } from "react";
import { UserPlus } from "lucide-react";
import type { Role } from "@/generated/prisma/enums";
import {
  changeOwnPassword,
  createMember,
  resetMemberPassword,
  updateMember,
} from "@/app/actions/members";
import { buttonClass } from "@/components/ui/button";
import { Field, FormError, FormSuccess, SelectInput, TextInput } from "@/components/ui/form";
import { roleLabels, rolesByRank } from "@/lib/permissions";

function RoleOptions() {
  return rolesByRank.map((role) => (
    <option key={role} value={role}>
      {roleLabels[role]}
    </option>
  ));
}

export function AddMemberForm() {
  const [state, action, pending] = useActionState(createMember, {});
  const errors = state.fieldErrors ?? {};

  return (
    <form action={action} className="space-y-4">
      <FormError message={state.error} />
      <FormSuccess message={state.success} />
      <Field label="Full name" name="name" error={errors.name}>
        <TextInput name="name" required defaultValue={state.values?.name} error={errors.name} />
      </Field>
      <Field label="Email" name="email" error={errors.email}>
        <TextInput
          name="email"
          type="email"
          required
          defaultValue={state.values?.email}
          error={errors.email}
        />
      </Field>
      <Field label="Role" name="role" error={errors.role}>
        <SelectInput name="role" defaultValue={state.values?.role ?? "ROVER"} error={errors.role}>
          <RoleOptions />
        </SelectInput>
      </Field>
      <Field
        label="Temporary password"
        name="password"
        error={errors.password}
        hint="They can change it from their Account page."
      >
        <TextInput
          name="password"
          type="text"
          autoComplete="off"
          required
          minLength={8}
          error={errors.password}
        />
      </Field>
      <button type="submit" disabled={pending} className={buttonClass("primary", "md", "w-full")}>
        <UserPlus className="size-4" aria-hidden="true" />
        {pending ? "Adding…" : "Add member"}
      </button>
    </form>
  );
}

type Member = { id: string; name: string; email: string; role: Role; active: boolean };

export function EditMemberForm({ member, isSelf }: { member: Member; isSelf: boolean }) {
  const [state, action, pending] = useActionState(updateMember.bind(null, member.id), {});
  const errors = state.fieldErrors ?? {};
  const values = state.values;

  return (
    <form action={action} className="space-y-4">
      <FormError message={state.error} />
      <FormSuccess message={state.success} />
      <Field label="Full name" name="name" error={errors.name}>
        <TextInput
          name="name"
          defaultValue={values?.name ?? member.name}
          required
          error={errors.name}
        />
      </Field>
      <Field label="Email" name="email" error={errors.email}>
        <TextInput
          name="email"
          type="email"
          defaultValue={values?.email ?? member.email}
          required
          error={errors.email}
        />
      </Field>
      <Field
        label="Role"
        name="role"
        error={errors.role}
        hint={isSelf ? "You can't change your own role." : undefined}
      >
        <SelectInput
          name="role"
          defaultValue={values?.role ?? member.role}
          disabled={isSelf}
          error={errors.role}
        >
          <RoleOptions />
        </SelectInput>
        {/* Disabled selects aren't submitted, so send the current value. */}
        {isSelf && <input type="hidden" name="role" value={member.role} />}
      </Field>
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          name="active"
          defaultChecked={values ? values.active === "on" : member.active}
          disabled={isSelf}
          className="mt-0.5 size-4 accent-brand-600"
        />
        <span>
          <span className="font-medium text-ink">Active account</span>
          <span className="block text-muted">Inactive members can’t sign in.</span>
        </span>
      </label>
      {isSelf && <input type="hidden" name="active" value="on" />}
      <button type="submit" disabled={pending} className={buttonClass("primary")}>
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

export function ResetPasswordForm({ memberId }: { memberId: string }) {
  const [state, action, pending] = useActionState(resetMemberPassword.bind(null, memberId), {});
  const errors = state.fieldErrors ?? {};

  return (
    <form action={action} className="space-y-4">
      <FormError message={state.error} />
      <FormSuccess message={state.success} />
      <Field label="New temporary password" name="password" error={errors.password}>
        <TextInput
          name="password"
          type="text"
          autoComplete="off"
          required
          minLength={8}
          error={errors.password}
        />
      </Field>
      <button type="submit" disabled={pending} className={buttonClass("outline")}>
        {pending ? "Resetting…" : "Reset password"}
      </button>
    </form>
  );
}

/** A submit button that asks for confirmation first. */
export function ConfirmButton({
  children,
  message,
  className,
}: {
  children: React.ReactNode;
  message: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changeOwnPassword, {});
  const errors = state.fieldErrors ?? {};

  return (
    <form action={action} className="space-y-4">
      <FormError message={state.error} />
      <FormSuccess message={state.success} />
      <Field label="Current password" name="current" error={errors.current}>
        <TextInput
          name="current"
          type="password"
          autoComplete="current-password"
          required
          error={errors.current}
        />
      </Field>
      <Field label="New password" name="password" error={errors.password} hint="At least 8 characters.">
        <TextInput
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          error={errors.password}
        />
      </Field>
      <Field label="Confirm new password" name="confirm" error={errors.confirm}>
        <TextInput
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          error={errors.confirm}
        />
      </Field>
      <button type="submit" disabled={pending} className={buttonClass("primary")}>
        {pending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
