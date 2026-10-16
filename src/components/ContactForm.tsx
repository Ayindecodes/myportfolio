"use client";

import { useRef, useState, type FormEvent } from "react";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Please tell me your name.";
  if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = "Enter an email address I can reply to.";
  if (fields.message.trim().length < 10) errors.message = "Add a little more detail (at least 10 characters).";
  return errors;
}

/**
 * Composes the message in the visitor's own email app (no server or third-party service involved).
 */
export function ContactForm({ to }: { to: string }) {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [composed, setComposed] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function update(field: keyof Fields, value: string) {
    const next = { ...fields, [field]: value };
    setFields(next);
    setComposed(false);
    if (errors[field]) setErrors((current) => ({ ...current, [field]: validate(next)[field] }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    const subject = `Portfolio enquiry from ${fields.name.trim()}`;
    const body = `${fields.message.trim()}\n\n${fields.name.trim()}\n${fields.email.trim()}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setComposed(true);
  }

  const fieldProps = (field: keyof Fields) => ({
    id: `contact-${field}`,
    name: field,
    value: fields[field],
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    className: "field",
  });

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} aria-describedby="contact-form-note" className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="meta text-[10.5px] text-dim">
            Name
          </label>
          <input {...fieldProps("name")} type="text" autoComplete="name" required onChange={(e) => update("name", e.target.value)} />
          <FieldError field="name" message={errors.name} />
        </div>
        <div>
          <label htmlFor="contact-email" className="meta text-[10.5px] text-dim">
            Email
          </label>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            onChange={(e) => update("email", e.target.value)}
          />
          <FieldError field="email" message={errors.email} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="meta text-[10.5px] text-dim">
          Message
        </label>
        <textarea
          {...fieldProps("message")}
          rows={4}
          required
          className="field resize-y"
          onChange={(e) => update("message", e.target.value)}
        />
        <FieldError field="message" message={errors.message} />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" className="btn btn-primary">
          Compose email
          <span aria-hidden="true" className="nudge-r">
            →
          </span>
        </button>
        <p id="contact-form-note" className="text-[13px] leading-snug text-dim">
          Opens your email app with this message filled in.
        </p>
      </div>

      <p role="status" className="text-[13.5px] text-live">
        {composed ? `Your email app should now be open with the message ready to send. If nothing happened, write to ${to}.` : ""}
      </p>
    </form>
  );
}

function FieldError({ field, message }: { field: keyof Fields; message?: string }) {
  if (!message) return null;
  return (
    <p id={`contact-${field}-error`} className="mt-2 text-[13px] text-[#f87171]">
      {message}
    </p>
  );
}
