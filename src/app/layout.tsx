//? METADATA | [S.E.O] Search Engine Optimization
import type { Metadata } from "next";

//? MetaData | Next.js
export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "AMENOMINAKANUSHI",
    template: "%s | AMENOMINAKANUSHI",
  },
  description: "Creator, Developer & Artist",
  openGraph: {
    title: "AMENOMINAKANUSHI",
    description: "Creator, Developer & Artist",
    url: "http://localhost:3000",
    siteName: "AMENOMINAKANUSHI",
    locale: "en_UK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-UK">
      <body
      >
        {children}
      </body>
    </html>
  );
}
