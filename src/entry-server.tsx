import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "./App";
import { HeadContext, type HeadCollector } from "@/components/seo/Seo";
import { renderHeadTags } from "@/lib/seo";
import { staticRoutes } from "./routes";

export { staticRoutes };

export function render(url: string) {
  const collector: HeadCollector = { head: null };
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={collector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  );
  const head = collector.head ? renderHeadTags(collector.head) : "";
  return { html, head };
}
