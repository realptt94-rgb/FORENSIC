import { useEffect } from "react";
import { ToastProvider, useHashRoute } from "./lib/fx";
import Site from "./site";
import Crm from "./crm";

export default function App() {
  const route = useHashRoute();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [route]);

  return (
    <ToastProvider>
      <div className="relative min-h-screen font-body text-ink">
        <div className="gridlines" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />
        <div className="relative z-10">{route === "/crm" ? <Crm /> : <Site />}</div>
      </div>
    </ToastProvider>
  );
}
