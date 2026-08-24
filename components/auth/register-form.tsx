"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeSlash,
  LockKey,
  ShieldCheck,
  WarningCircle,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

import {
  getPasswordStrength,
  type RegistrationData,
  type RegistrationErrors,
  validateRegistrationStep,
} from "@/lib/registration-validation";

const initialData: RegistrationData = {
  ageConfirmed: false,
  confirmPassword: "",
  email: "",
  experience: "",
  firstName: "",
  investmentRange: "",
  lastName: "",
  objective: "",
  password: "",
  phone: "",
  riskAccepted: false,
  termsAccepted: false,
};

const steps = ["Personal details", "Account security", "Investor profile"] as const;

export function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<RegistrationData>(initialData);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [currentStep]);

  function updateField<K extends keyof RegistrationData>(
    field: K,
    value: RegistrationData[K],
  ) {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  }

  function continueToNextStep() {
    const nextErrors = validateRegistrationStep(currentStep, data);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setCurrentStep((step) => Math.min(step + 1, steps.length));
  }

  function goBack() {
    setErrors({});
    setCurrentStep((step) => Math.max(step - 1, 1));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRegistrationStep(3, data);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setData((current) => ({ ...current, confirmPassword: "", password: "" }));
  }

  const passwordStrength = getPasswordStrength(data.password);

  return (
    <section className="order-1 rounded-[2rem] border border-[var(--color-border)] bg-white p-5 shadow-[0_26px_75px_rgba(18,45,72,0.1)] sm:p-8 lg:order-2 lg:p-10" aria-labelledby="registration-form-title">
      <div className="flex items-center justify-between gap-5">
        <div>
          <p className="text-xs font-extrabold tracking-[0.16em] text-[var(--color-brand-hover)] uppercase">
            Account Registration
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] text-[var(--color-ink)]" id="registration-form-title">
            Create your TradeUply profile
          </h2>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--color-brand-soft)] text-[var(--color-brand-hover)]">
          <LockKey aria-hidden="true" size={25} weight="duotone" />
        </span>
      </div>

      <ol aria-label="Registration progress" className="mt-8 grid grid-cols-3 gap-2">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isComplete = currentStep > stepNumber;

          return (
            <li aria-current={isActive ? "step" : undefined} key={label}>
              <div className={`h-1.5 rounded-full ${isActive || isComplete ? "bg-[var(--color-brand)]" : "bg-slate-200"}`} />
              <div className="mt-2 flex items-center gap-2">
                <span className={`grid size-6 shrink-0 place-items-center rounded-full text-[0.65rem] font-extrabold ${isActive || isComplete ? "bg-[var(--color-brand-soft)] text-[var(--color-brand-hover)]" : "bg-slate-100 text-slate-400"}`}>
                  {isComplete ? <Check aria-hidden="true" size={13} weight="bold" /> : stepNumber}
                </span>
                <span className={`hidden text-[0.67rem] font-extrabold sm:block ${isActive ? "text-[var(--color-ink)]" : "text-[var(--color-text-muted)]"}`}>
                  {label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      <form className="mt-9" noValidate onSubmit={handleSubmit}>
        <h3 className="sr-only" ref={stepHeadingRef} tabIndex={-1}>
          Step {currentStep}: {steps[currentStep - 1]}
        </h3>

        {currentStep === 1 && (
          <fieldset>
            <legend className="text-lg font-extrabold tracking-[-0.025em] text-[var(--color-ink)]">
              Tell us about yourself
            </legend>
            <p className="mt-2 text-sm leading-6 font-medium text-[var(--color-text-muted)]">
              Use an email address and phone number you can access.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <TextField autoComplete="given-name" error={errors.firstName} id="firstName" label="First name" onChange={(value) => updateField("firstName", value)} value={data.firstName} />
              <TextField autoComplete="family-name" error={errors.lastName} id="lastName" label="Last name" onChange={(value) => updateField("lastName", value)} value={data.lastName} />
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <TextField autoComplete="email" error={errors.email} id="email" inputMode="email" label="Email address" onChange={(value) => updateField("email", value)} placeholder="name@example.com" type="email" value={data.email} />
              <TextField autoComplete="tel" error={errors.phone} help="Include the international country code." id="phone" inputMode="tel" label="Phone number" onChange={(value) => updateField("phone", value)} placeholder="+91 98765 43210" type="tel" value={data.phone} />
            </div>
          </fieldset>
        )}

        {currentStep === 2 && (
          <fieldset>
            <legend className="text-lg font-extrabold tracking-[-0.025em] text-[var(--color-ink)]">
              Secure your account
            </legend>
            <p className="mt-2 text-sm leading-6 font-medium text-[var(--color-text-muted)]">
              Create a strong password that you do not use elsewhere.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <PasswordField error={errors.password} id="password" label="Password" onChange={(value) => updateField("password", value)} onToggle={() => setShowPassword((visible) => !visible)} show={showPassword} value={data.password} />
              <PasswordField error={errors.confirmPassword} id="confirmPassword" label="Confirm password" onChange={(value) => updateField("confirmPassword", value)} onToggle={() => setShowPassword((visible) => !visible)} show={showPassword} value={data.confirmPassword} />
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-5 gap-1.5" aria-label={`Password strength ${passwordStrength} out of 5`}>
                {[1, 2, 3, 4, 5].map((level) => (
                  <span className={`h-1.5 rounded-full ${level <= passwordStrength ? "bg-[var(--color-brand)]" : "bg-slate-200"}`} key={level} />
                ))}
              </div>
              <p className="mt-2 text-xs font-semibold text-[var(--color-text-muted)]">
                Use 8+ characters with uppercase, lowercase, and a number.
              </p>
            </div>

            <div className="mt-7 grid gap-3">
              <CheckboxField checked={data.ageConfirmed} error={errors.ageConfirmed} id="ageConfirmed" onChange={(checked) => updateField("ageConfirmed", checked)}>
                I confirm that I am at least 18 years old.
              </CheckboxField>
              <CheckboxField checked={data.termsAccepted} error={errors.termsAccepted} id="termsAccepted" onChange={(checked) => updateField("termsAccepted", checked)}>
                I agree to the Terms and Conditions and acknowledge the Privacy Policy.
              </CheckboxField>
            </div>
          </fieldset>
        )}

        {currentStep === 3 && (
          <fieldset>
            <legend className="text-lg font-extrabold tracking-[-0.025em] text-[var(--color-ink)]">
              Complete your investor profile
            </legend>
            <p className="mt-2 text-sm leading-6 font-medium text-[var(--color-text-muted)]">
              These preferences help structure your account experience and do not constitute investment advice.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <SelectField error={errors.investmentRange} id="investmentRange" label="Intended investment range" onChange={(value) => updateField("investmentRange", value)} value={data.investmentRange}>
                <option value="">Select a range</option>
                <option value="$100–$999">$100–$999</option>
                <option value="$1,000–$4,999">$1,000–$4,999</option>
                <option value="$5,000–$24,999">$5,000–$24,999</option>
                <option value="$25,000+">$25,000+</option>
              </SelectField>
              <SelectField error={errors.experience} id="experience" label="Investment experience" onChange={(value) => updateField("experience", value)} value={data.experience}>
                <option value="">Select experience</option>
                <option value="New investor">New investor</option>
                <option value="Some experience">Some experience</option>
                <option value="Experienced">Experienced</option>
              </SelectField>
            </div>
            <div className="mt-5">
              <SelectField error={errors.objective} id="objective" label="Primary investment objective" onChange={(value) => updateField("objective", value)} value={data.objective}>
                <option value="">Select an objective</option>
                <option value="Short-term opportunity">Short-term opportunity</option>
                <option value="Portfolio diversification">Portfolio diversification</option>
                <option value="Income generation">Income generation</option>
                <option value="Capital growth">Capital growth</option>
              </SelectField>
            </div>

            <dl className="mt-7 grid grid-cols-2 gap-3 rounded-2xl bg-[#f4f8f6] p-4 text-sm sm:grid-cols-4">
              <ReviewItem label="Name" value={`${data.firstName} ${data.lastName}`} />
              <ReviewItem label="Email" value={data.email} />
              <ReviewItem label="Phone" value={data.phone} />
              <ReviewItem label="Range" value={data.investmentRange || "Not selected"} />
            </dl>

            <div className="mt-6">
              <CheckboxField checked={data.riskAccepted} error={errors.riskAccepted} id="riskAccepted" onChange={(checked) => updateField("riskAccepted", checked)}>
                I understand that investment objectives and calculator results are illustrative, returns are not guaranteed, and capital may be at risk.
              </CheckboxField>
            </div>
          </fieldset>
        )}

        {submitted && (
          <div aria-live="polite" className="mt-7 flex items-start gap-3 rounded-2xl border border-[#d5a553]/30 bg-[#fff8e9] p-4 text-[#704d16]">
            <WarningCircle aria-hidden="true" className="mt-0.5 shrink-0" size={21} weight="duotone" />
            <p className="text-xs leading-5 font-semibold">
              Your details passed frontend validation, but no account was created and no
              data was transmitted. Secure submission will be enabled after TradeUply’s
              first-party registration service is connected.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {currentStep > 1 ? (
            <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] px-5 text-sm font-extrabold text-[var(--color-ink)] transition hover:border-[var(--color-brand)]" onClick={goBack} type="button">
              <ArrowLeft aria-hidden="true" size={17} weight="bold" />
              Previous
            </button>
          ) : (
            <p className="text-center text-sm font-semibold text-[var(--color-text-muted)] sm:text-left">
              Already have an account?{" "}
              <Link
                className="font-extrabold text-[var(--color-brand-hover)] hover:underline"
                href="/login"
              >
                Log In
              </Link>
            </p>
          )}

          {currentStep < steps.length ? (
            <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[var(--color-brand-hover)]" onClick={continueToNextStep} type="button">
              Continue
              <ArrowRight aria-hidden="true" size={17} weight="bold" />
            </button>
          ) : (
            <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[var(--color-brand-hover)]" type="submit">
              <ShieldCheck aria-hidden="true" size={18} weight="duotone" />
              Create My Account
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

type TextFieldProps = {
  autoComplete?: string;
  error?: string;
  help?: string;
  id: string;
  inputMode?: "email" | "tel" | "text";
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "email" | "tel" | "text";
  value: string;
};

function TextField({ autoComplete, error, help, id, inputMode, label, onChange, placeholder, type = "text", value }: TextFieldProps) {
  const descriptionId = error ? `${id}-error` : help ? `${id}-help` : undefined;

  return (
    <div>
      <label className="text-sm font-extrabold text-[var(--color-ink)]" htmlFor={id}>{label}</label>
      <input aria-describedby={descriptionId} aria-invalid={Boolean(error)} autoComplete={autoComplete} className={`mt-2.5 h-13 w-full rounded-xl border bg-[#f8faf9] px-4 text-sm font-bold text-[var(--color-ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[var(--color-brand)]/10 ${error ? "border-[#dc765a]" : "border-[var(--color-border)]"}`} id={id} inputMode={inputMode} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} type={type} value={value} />
      {error ? <FieldMessage error id={`${id}-error`}>{error}</FieldMessage> : help ? <FieldMessage id={`${id}-help`}>{help}</FieldMessage> : null}
    </div>
  );
}

type PasswordFieldProps = { error?: string; id: string; label: string; onChange: (value: string) => void; onToggle: () => void; show: boolean; value: string };

function PasswordField({ error, id, label, onChange, onToggle, show, value }: PasswordFieldProps) {
  return (
    <div>
      <label className="text-sm font-extrabold text-[var(--color-ink)]" htmlFor={id}>{label}</label>
      <div className="relative mt-2.5">
        <input aria-describedby={error ? `${id}-error` : undefined} aria-invalid={Boolean(error)} autoComplete={id === "password" ? "new-password" : "new-password"} className={`h-13 w-full rounded-xl border bg-[#f8faf9] pr-12 pl-4 text-sm font-bold text-[var(--color-ink)] outline-none transition focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[var(--color-brand)]/10 ${error ? "border-[#dc765a]" : "border-[var(--color-border)]"}`} id={id} onChange={(event) => onChange(event.target.value)} type={show ? "text" : "password"} value={value} />
        <button aria-label={show ? "Hide password" : "Show password"} className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-[var(--color-text-muted)] hover:bg-slate-100" onClick={onToggle} type="button">
          {show ? <EyeSlash aria-hidden="true" size={20} /> : <Eye aria-hidden="true" size={20} />}
        </button>
      </div>
      {error && <FieldMessage error id={`${id}-error`}>{error}</FieldMessage>}
    </div>
  );
}

type SelectFieldProps = { children: ReactNode; error?: string; id: string; label: string; onChange: (value: string) => void; value: string };

function SelectField({ children, error, id, label, onChange, value }: SelectFieldProps) {
  return (
    <div>
      <label className="text-sm font-extrabold text-[var(--color-ink)]" htmlFor={id}>{label}</label>
      <select aria-describedby={error ? `${id}-error` : undefined} aria-invalid={Boolean(error)} className={`mt-2.5 h-13 w-full rounded-xl border bg-[#f8faf9] px-4 text-sm font-bold text-[var(--color-ink)] outline-none transition focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[var(--color-brand)]/10 ${error ? "border-[#dc765a]" : "border-[var(--color-border)]"}`} id={id} onChange={(event) => onChange(event.target.value)} value={value}>
        {children}
      </select>
      {error && <FieldMessage error id={`${id}-error`}>{error}</FieldMessage>}
    </div>
  );
}

type CheckboxFieldProps = { checked: boolean; children: ReactNode; error?: string; id: string; onChange: (checked: boolean) => void };

function CheckboxField({ checked, children, error, id, onChange }: CheckboxFieldProps) {
  return (
    <div>
      <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-xs leading-5 font-semibold ${error ? "border-[#dc765a] bg-[#fff8f5]" : "border-[var(--color-border)] bg-[#f8faf9] text-[var(--color-ink-soft)]"}`} htmlFor={id}>
        <input aria-describedby={error ? `${id}-error` : undefined} aria-invalid={Boolean(error)} checked={checked} className="mt-0.5 size-4 accent-[var(--color-brand)]" id={id} onChange={(event) => onChange(event.target.checked)} type="checkbox" />
        <span>{children}</span>
      </label>
      {error && <FieldMessage error id={`${id}-error`}>{error}</FieldMessage>}
    </div>
  );
}

function FieldMessage({ children, error = false, id }: { children: ReactNode; error?: boolean; id: string }) {
  return <p className={`mt-2 text-xs font-semibold ${error ? "text-[#b94f32]" : "text-[var(--color-text-muted)]"}`} id={id}>{children}</p>;
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[0.62rem] font-extrabold tracking-[0.08em] text-[var(--color-text-muted)] uppercase">{label}</dt>
      <dd className="mt-1.5 truncate text-xs font-extrabold text-[var(--color-ink)]">{value}</dd>
    </div>
  );
}
