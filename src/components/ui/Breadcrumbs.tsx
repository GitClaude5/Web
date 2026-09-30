import { Link } from "react-router";
import type { Crumb } from "@/lib/seo";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="micro text-ink-muted">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-3">
              {last ? (
                <span aria-current="page" className="text-navy">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link to={item.path} className="nav-underline transition-colors hover:text-navy">
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="text-gold-dark">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
