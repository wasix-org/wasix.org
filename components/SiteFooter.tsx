"use client";

import { usePathname } from "next/navigation";
import { Footer } from "nextra-theme-docs";
import FooterContent from "./FooterContent";

export default function SiteFooter() {
  const pathname = usePathname();
  return (
    <>
      {pathname.startsWith("/docs") && <Footer />}
      <FooterContent />
    </>
  );
}
