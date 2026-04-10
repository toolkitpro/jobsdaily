import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  /** Optional: remove default horizontal/max-width padding (e.g. for hero sections) */
  fullWidth?: boolean;
}

export function Layout({ children, fullWidth = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main
        className={`flex-1 ${fullWidth ? "" : "max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6"}`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
