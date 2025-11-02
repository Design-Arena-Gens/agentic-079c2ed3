import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Train Management System",
  description: "Comprehensive train management application for mobile and web",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
