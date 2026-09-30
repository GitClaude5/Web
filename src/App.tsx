import { Route, Routes } from "react-router";
import { LazyMotion, MotionConfig } from "motion/react";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Service from "@/pages/Service";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Guides from "@/pages/Guides";
import Article from "@/pages/Article";
import Legal from "@/pages/Legal";
import Privacy from "@/pages/Privacy";
import Cookies from "@/pages/Cookies";
import NotFound from "@/pages/NotFound";

// Las funciones de animación de Motion se cargan en un chunk aparte, tras el primer render.
const loadMotionFeatures = () => import("./lib/motionFeatures").then((mod) => mod.default);

export function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="servicios" element={<Services />} />
            <Route path="asesoria" element={<About />} />
            <Route path="contacto" element={<Contact />} />
            <Route path="guias" element={<Guides />} />
            <Route path="guias/:slug" element={<Article />} />
            <Route path="aviso-legal" element={<Legal />} />
            <Route path="privacidad" element={<Privacy />} />
            <Route path="cookies" element={<Cookies />} />
            {/* Páginas de servicio en la raíz: /nacionalidad, /arraigo… (404 si no existe) */}
            <Route path=":slug" element={<Service />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MotionConfig>
    </LazyMotion>
  );
}
