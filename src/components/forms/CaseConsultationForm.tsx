import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod/mini";
import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, Loader2, Phone } from "lucide-react";
import { business, telHref } from "@/data/business";
import {
  consultationTypes,
  contactPreferences,
  isConsultationType,
} from "@/data/consultation";
import { submitLead } from "@/lib/leads";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const MESSAGE_MAX = 1200;

const schema = z.object({
  name: z
    .string()
    .check(z.trim(), z.minLength(2, "Introduce tu nombre."), z.maxLength(80, "El nombre es demasiado largo.")),
  phone: z
    .string()
    .check(
      z.trim(),
      z.refine(
        (v) => /^\+?[\d\s().-]+$/.test(v) && /^\d{9,15}$/.test(v.replace(/\D/g, "")),
        "Introduce un número de teléfono válido.",
      ),
    ),
  email: z
    .string()
    .check(
      z.trim(),
      z.maxLength(120, "El email es demasiado largo."),
      z.refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), "Introduce un email válido."),
    ),
  subject: z
    .string()
    .check(z.refine((v): boolean => isConsultationType(v), "Selecciona el tipo de consulta.")),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(10, "Cuéntanos brevemente tu situación (mínimo 10 caracteres)."),
      z.maxLength(MESSAGE_MAX, `El mensaje no puede superar los ${MESSAGE_MAX} caracteres.`),
    ),
  contactPreference: z.string(),
  privacy: z
    .boolean()
    .check(z.refine((v) => v, "Debes aceptar la Política de Privacidad para enviar la consulta.")),
  /** Honeypot anti-spam: debe quedar vacío. */
  website: z.string().check(z.maxLength(0)),
});

type FormValues = z.infer<typeof schema>;
type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full rounded-md border bg-white px-4 text-[1rem] text-graphite placeholder:text-muted transition-colors duration-200 focus:border-navy focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-[0.88rem] font-medium text-error">
      <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
      <span>{message}</span>
    </p>
  );
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[0.9rem] font-semibold text-navy">
      {children}
      {required ? (
        <span className="text-bronze" aria-hidden="true">
          {" "}*
        </span>
      ) : (
        <span className="font-normal text-ink-muted"> (opcional)</span>
      )}
    </label>
  );
}

export function CaseConsultationForm() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = (name: string) => `${uid}-${name}`;
  const [status, setStatus] = useState<Status>("idle");
  const started = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const preset = searchParams.get("consulta");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: isConsultationType(preset) ? preset : "",
      message: "",
      contactPreference: "",
      privacy: false,
      website: "",
    },
  });

  // Preselección desde CTA (?consulta=arraigo).
  useEffect(() => {
    if (isConsultationType(preset)) setValue("subject", preset, { shouldValidate: false });
  }, [preset, setValue]);

  useEffect(() => {
    if (status === "success" || status === "error") statusRef.current?.focus();
  }, [status]);

  const messageLength = watch("message")?.length ?? 0;

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    trackEvent("start_form");
  };

  const onSubmit = async (values: FormValues) => {
    // Honeypot relleno: se descarta en silencio.
    if (values.website) {
      setStatus("success");
      return;
    }
    setStatus("submitting");
    try {
      await submitLead({
        name: values.name,
        phone: values.phone,
        email: values.email || null,
        subject: values.subject,
        message: values.message,
        contactPreference: values.contactPreference || null,
        consentTimestamp: new Date().toISOString(),
      });
      trackEvent("submit_form", { subject: values.subject });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="on-light rounded-xl bg-paper p-8 text-graphite outline-none md:p-12"
      >
        <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-navy" strokeWidth={1.3} />
        <p className="mt-6 font-serif text-[2.2rem] leading-[1.05] font-semibold text-navy">
          Hemos recibido tu consulta.
        </p>
        <p className="lead mt-4 text-ink-muted">Nos pondremos en contacto contigo.</p>
        <p className="mt-8 text-[0.92rem] text-ink-muted">
          Si lo prefieres, también puedes llamarnos al{" "}
          <a href={telHref} className="font-semibold text-navy underline decoration-gold underline-offset-4">
            {business.phoneDisplay}
          </a>{" "}
          en horario de atención.
        </p>
      </div>
    );
  }

  const describedBy = (name: keyof FormValues, extra?: string) =>
    [errors[name] ? id(`${name}-error`) : null, extra].filter(Boolean).join(" ") || undefined;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onFocus={onStart}
      aria-labelledby={id("title")}
      className="on-light rounded-xl bg-paper p-6 text-graphite shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)] sm:p-8 md:p-10"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 id={id("title")} className="font-serif text-[1.9rem] leading-tight font-semibold text-navy">
          Consultar mi caso
        </h3>
        <p className="text-[0.8rem] text-ink-muted">
          <span className="text-bronze" aria-hidden="true">*</span> Obligatorio
        </p>
      </div>
      <p className="mt-2 text-[0.92rem] text-ink-muted">
        Solo necesitamos lo imprescindible para contactar contigo.
      </p>

      {status === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex flex-col gap-4 rounded-md border border-error/30 bg-error/5 p-5 outline-none sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="flex items-start gap-3 text-[0.95rem] font-medium text-error">
            <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2} />
            <span>
              No hemos podido enviar la consulta. Puedes llamarnos al {business.phoneDisplay}.
            </span>
          </p>
          <a
            href={telHref}
            onClick={() => trackEvent("click_phone", { location: "form_error" })}
            className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-md bg-navy px-6 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-gold hover:text-navy"
          >
            <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            Llamar
          </a>
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor={id("name")} required>Nombre</Label>
          <input
            id={id("name")}
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={cn(fieldBase, "h-[52px]", errors.name ? "border-error" : "border-navy/20")}
            {...register("name")}
          />
          <FieldError id={id("name-error")} message={errors.name?.message} />
        </div>

        <div>
          <Label htmlFor={id("phone")} required>Teléfono</Label>
          <input
            id={id("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-required="true"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
            className={cn(fieldBase, "h-[52px]", errors.phone ? "border-error" : "border-navy/20")}
            {...register("phone")}
          />
          <FieldError id={id("phone-error")} message={errors.phone?.message} />
        </div>

        <div>
          <Label htmlFor={id("email")}>Email</Label>
          <input
            id={id("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={cn(fieldBase, "h-[52px]", errors.email ? "border-error" : "border-navy/20")}
            {...register("email")}
          />
          <FieldError id={id("email-error")} message={errors.email?.message} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor={id("subject")} required>Tipo de consulta</Label>
          <div className="relative">
            <select
              id={id("subject")}
              aria-required="true"
              aria-invalid={errors.subject ? true : undefined}
              aria-describedby={describedBy("subject")}
              className={cn(
                fieldBase,
                "h-[52px] appearance-none pr-12",
                errors.subject ? "border-error" : "border-navy/20",
              )}
              {...register("subject")}
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              {consultationTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy"
              strokeWidth={1.8}
            />
          </div>
          <FieldError id={id("subject-error")} message={errors.subject?.message} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor={id("message")} required>Mensaje</Label>
          <textarea
            id={id("message")}
            rows={5}
            maxLength={MESSAGE_MAX}
            placeholder="Cuéntanos brevemente en qué situación te encuentras."
            aria-required="true"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message", id("message-hint"))}
            className={cn(
              fieldBase,
              "min-h-[140px] resize-y py-3.5 leading-relaxed",
              errors.message ? "border-error" : "border-navy/20",
            )}
            {...register("message")}
          />
          <div className="mt-2 flex items-start justify-between gap-4">
            <p id={id("message-hint")} className="text-[0.82rem] leading-relaxed text-ink-muted">
              No incluyas números de documento (NIE, pasaporte), expedientes ni datos de terceros.
              La documentación se revisa después por un canal adecuado.
            </p>
            <p aria-hidden="true" className="shrink-0 text-[0.78rem] tabular-nums text-ink-muted">
              {messageLength}/{MESSAGE_MAX}
            </p>
          </div>
          <FieldError id={id("message-error")} message={errors.message?.message} />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="mb-3 text-[0.9rem] font-semibold text-navy">
            Preferencia de contacto <span className="font-normal text-ink-muted">(opcional)</span>
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {contactPreferences.map((p) => (
              <label key={p.value} className="relative">
                <input
                  type="radio"
                  value={p.value}
                  className="peer sr-only"
                  {...register("contactPreference")}
                />
                <span className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full border border-navy/20 bg-white px-5 text-[0.9rem] font-medium text-navy transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-dark">
                  {p.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Honeypot (oculto para personas y lectores de pantalla) */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>No rellenar</label>
          <input id={id("website")} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id={id("privacy")}
              type="checkbox"
              aria-required="true"
              aria-invalid={errors.privacy ? true : undefined}
              aria-describedby={describedBy("privacy", id("privacy-info"))}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-navy"
              {...register("privacy")}
            />
            <label htmlFor={id("privacy")} className="cursor-pointer text-[0.95rem] leading-snug text-graphite">
              He leído y acepto la{" "}
              <Link to="/privacidad" className="font-semibold text-navy underline decoration-gold underline-offset-4">
                Política de Privacidad
              </Link>
              .<span className="text-bronze" aria-hidden="true"> *</span>
            </label>
          </div>
          <FieldError id={id("privacy-error")} message={errors.privacy?.message} />
          <p id={id("privacy-info")} className="mt-3 text-[0.8rem] leading-relaxed text-ink-muted">
            Información básica: {business.name} tratará tus datos únicamente para atender tu consulta,
            con tu consentimiento. Puedes ejercer tus derechos como se indica en la Política de
            Privacidad.
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-8 inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-md bg-navy px-8 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-ivory transition-colors duration-300 hover:bg-gold hover:text-navy disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            Enviar consulta
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.6} />
          </>
        )}
      </button>
    </form>
  );
}
