import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

const appName = "Александр Ливанов";

export const metadata: Metadata = {
  title: `${appName} — Портфолио`,
  description:
    "Креативный продюсер. Event, Digital и производство контента.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body className="antialiased">
        {children}
        <Toaster position="bottom-right" theme="dark" />
        <footer className="border-t border-border/40 py-6 text-center text-sm text-muted-foreground">
          <div className="mx-auto max-w-6xl px-4">
            © {new Date().getFullYear()} {appName}. Все права защищены.
          </div>
        </footer>
      </body>
    </html>
  );
}
