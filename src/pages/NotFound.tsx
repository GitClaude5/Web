import { Seo } from "@/components/seo/Seo";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { business, telHref } from "@/data/business";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Página no encontrada | Asesoría Sefoz"
        description="La página que buscas no existe o ha cambiado de dirección."
        path="/404"
        noindex
      />
      <section aria-labelledby="nf-title" className="grid-lines relative">
        <div className="container-x flex min-h-[70vh] flex-col justify-center py-24">
          <Eyebrow>Error 404</Eyebrow>
          <h1 id="nf-title" className="display-1 mt-7 max-w-4xl text-navy">
            <span className="block">Este camino </span>
            <span className="block">no lleva al </span>
            <span className="block">trámite que buscas.</span>
          </h1>
          <p className="lead mt-8 text-ink-muted">Volvamos al inicio.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink to="/" arrow>Volver</ButtonLink>
            <ButtonLink to="/servicios" variant="secondary">Ver servicios</ButtonLink>
            <TextLink to={telHref} className="justify-center sm:ml-3">
              {business.phoneDisplay}
            </TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
