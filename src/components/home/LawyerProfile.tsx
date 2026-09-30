import { business } from "@/data/business";
import { TextReveal } from "@/components/motion/TextReveal";

/**
 * Perfil profesional. Solo se muestra con datos reales (nombre facilitado por
 * el negocio). Nunca usar un retrato de stock como "nuestro abogado".
 */
export function LawyerProfile() {
  const { lawyer } = business;
  if (!lawyer.name) return null;

  const colegiacion =
    lawyer.barAssociation && lawyer.barNumber
      ? `${lawyer.barAssociation} · Nº ${lawyer.barNumber}`
      : lawyer.barAssociation;

  return (
    <TextReveal className="mt-10 flex items-center gap-5 border-t border-navy/12 pt-8">
      {lawyer.photo && (
        <img
          src={lawyer.photo}
          alt={lawyer.name}
          width={96}
          height={96}
          loading="lazy"
          className="h-20 w-20 rounded-full object-cover"
        />
      )}
      <div>
        <p className="font-serif text-[1.5rem] leading-tight font-semibold text-navy">{lawyer.name}</p>
        {lawyer.role && <p className="micro mt-1 text-steel">{lawyer.role}</p>}
        {colegiacion && <p className="mt-1 text-[0.9rem] text-ink-muted">{colegiacion}</p>}
        {lawyer.bio && <p className="mt-3 max-w-md text-[0.95rem] text-ink-muted">{lawyer.bio}</p>}
      </div>
    </TextReveal>
  );
}
