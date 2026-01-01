import "./globals.css";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Srinath Venkataraman | Software Developer",
  description:
    "Portfolio of Srinath Venkataraman, Software Developer specializing in Java, Spring Boot, Node.js, React, and modern web technologies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


