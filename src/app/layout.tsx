import type { Metadata, Viewport } from "next";
import { ModalitaInput } from "@/components/ModalitaInput";
import "./globals.css";

const TITOLO = "Benvenuto — Lingua italiana";
const DESCRIZIONE = "Corso A2: grammatica, vocabolario, esercizi e comunicazione.";

// Anteprima dei link: immagini in app/opengraph-image.png e app/twitter-image.png.
export const metadata: Metadata = {
  metadataBase: new URL("https://benvenuto-it.vercel.app"),
  title: TITOLO,
  description: DESCRIZIONE,
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Benvenuto",
    title: TITOLO,
    description: DESCRIZIONE,
  },
  twitter: {
    card: "summary_large_image",
    title: TITOLO,
    description: DESCRIZIONE,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    // = --bg-grouped (fondo delle pagine): niente striscia bianca sopra la barra.
    { media: "(prefers-color-scheme: light)", color: "#F2F2F7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it">
      <body className="font-sans antialiased">
        <ModalitaInput />
        {children}
      </body>
    </html>
  );
}
