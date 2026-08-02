import type { Metadata, Viewport } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import { NativeShell } from "@/components/NativeShell";

const body = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-display",
  weight: ["500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "מסע 2026 · קורסיקה או סרדיניה",
  description:
    "תכנון הטיול המשפחתי שלנו — קורסיקה מול סרדיניה, יולי 2026. מסלולים, מפות, תקציב, אריזה ומשימות במקום אחד.",
};

export const viewport: Viewport = {
  themeColor: "#0f97a6",
  // Let content run under the status bar and gesture pill; globals.css pads it
  // back out with the safe-area insets. targetSdk 36 makes this mandatory.
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${body.variable} ${display.variable}`}>
      <body className="font-sans antialiased">
        <NativeShell />
        {children}
      </body>
    </html>
  );
}
