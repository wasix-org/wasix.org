"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { setMenu, useMenu } from "nextra-theme-docs";
import { Search } from "nextra/components";
import { LuArrowUpRight, LuMenu, LuSearch, LuX } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import Logo from "./Logo";
import ByWasmer from "./ByWasmer";

export default function SiteNavbar() {
  const pathname = usePathname();
  const open = useMenu();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenu(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-nav">
        <div className="site-brand">
          <Link href="/" aria-label="WASIX home" onClick={() => setMenu(false)}>
            <Logo />
          </Link>
          <ByWasmer />
        </div>
        <nav aria-label="Main navigation" className="desktop-navigation">
          <Link href="/#features">Features</Link>
          <Link
            href="/builds"
            aria-current={pathname.startsWith("/builds") ? "page" : undefined}
          >
            Builds
          </Link>
          <Link
            href="/docs"
            aria-current={pathname.startsWith("/docs") ? "page" : undefined}
          >
            Documentation
          </Link>
        </nav>
        <div className="header-search">
          <LuSearch aria-hidden="true" />
          <Search aria-label="Search documentation" />
        </div>
        <div className="nav-actions">
          <a
            href="https://github.com/wasix-org"
            className="github-link"
            aria-label="WASIX on GitHub"
          >
            <SiGithub />
          </a>
          <Link className="site-button small" href="/#install">
            Install WASIX <LuArrowUpRight />
          </Link>
          <button
            type="button"
            ref={menuButton}
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setMenu(!open)}
          >
            {open ? <LuX /> : <LuMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
