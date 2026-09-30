import { createContext, useContext, useEffect } from "react";
import { renderHeadTags, type HeadData } from "@/lib/seo";

/** En SSR se recoge el head de la página para inyectarlo en el HTML prerenderizado. */
export type HeadCollector = { head: HeadData | null };

export const HeadContext = createContext<HeadCollector | null>(null);

export function Seo(props: HeadData) {
  const collector = useContext(HeadContext);
  if (collector) collector.head = props;

  const key = JSON.stringify(props);
  useEffect(() => {
    const template = document.createElement("template");
    template.innerHTML = renderHeadTags(props);
    document.head.querySelectorAll("[data-seo]").forEach((el) => el.remove());
    document.head.append(template.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return null;
}
