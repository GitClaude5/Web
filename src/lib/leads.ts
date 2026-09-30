/**
 * Envío de consultas a Supabase (tabla `leads`, ver supabase/migrations).
 * Minimización de datos: solo se guardan los campos estrictamente necesarios.
 * El formulario no es un expediente jurídico.
 */
export type LeadPayload = {
  name: string;
  phone: string;
  email: string | null;
  subject: string;
  message: string;
  contactPreference: string | null;
  consentTimestamp: string;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const MOCK = import.meta.env.VITE_LEADS_MOCK === "true";

export class LeadSubmissionError extends Error {}

export const leadsBackendConfigured = () => Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export async function submitLead(lead: LeadPayload): Promise<void> {
  if (MOCK) {
    await new Promise((r) => setTimeout(r, 700));
    return;
  }
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new LeadSubmissionError("Backend de consultas no configurado");
  }

  const response = await fetch(`${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      subject: lead.subject,
      message: lead.message,
      contact_preference: lead.contactPreference,
      consent_timestamp: lead.consentTimestamp,
    }),
  });

  if (!response.ok) {
    throw new LeadSubmissionError(`Error ${response.status}`);
  }
}
