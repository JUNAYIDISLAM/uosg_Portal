import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export const inputClass =
  "block w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 aria-invalid:border-ember-500 disabled:bg-mist";

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: ReactNode;
  children?: ReactNode;
};

/** Label + control + error text, wired up for screen readers. */
export function Field({ label, name, error, hint, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-ember-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  name,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { name: string; error?: string }) {
  return (
    <input
      id={name}
      name={name}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${name}-error` : undefined}
      className={inputClass}
      {...props}
    />
  );
}

export function SelectInput({
  name,
  error,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { name: string; error?: string }) {
  return (
    <select
      id={name}
      name={name}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${name}-error` : undefined}
      className={inputClass}
      {...props}
    >
      {children}
    </select>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-lg bg-ember-500/10 px-3.5 py-2.5 text-sm text-ember-600">
      {message}
    </p>
  );
}

export function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="status" className="rounded-lg bg-brand-50 px-3.5 py-2.5 text-sm text-brand-700">
      {message}
    </p>
  );
}
