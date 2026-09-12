"use client";
import { useState } from "react";
import Link from "next/link";
import {
  LuArrowRight,
  LuArrowUpRight,
  LuBox,
  LuCode,
  LuGitBranch,
  LuSearch,
  LuTerminal,
  LuX,
} from "react-icons/lu";
import CopyCommand from "../CopyCommand";
import {
  categories,
  packages,
  recipeUrl,
  wasinixUrl,
  type Category,
} from "./packages";

const buildCommand =
  "nix build .#legacyPackages.x86_64-linux.packages.wasix.preferred.git";
export default function Builds() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const filtered = packages.filter(
    (pkg) =>
      (category === "All" || pkg.category === category) &&
      `${pkg.name} ${pkg.description} ${pkg.language}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div className="marketing-page builds-page">
      <section className="site-container builds-hero">
        <div>
          <span className="eyebrow">
            <span className="status-dot" /> THE WASIX BUILD COLLECTION
          </span>
          <h1>
            Great software.
            <br />
            <span>New possibilities.</span>
          </h1>
          <p>
            Explore the tools, libraries, and runtimes being built for
            WebAssembly. Powered by{" "}
            <a href={wasinixUrl}>
              wasinix <LuArrowUpRight />
            </a>
            , the Nix-based WASIX package collection.
          </p>
          <div className="hero-buttons">
            <a className="site-button" href={wasinixUrl}>
              Explore wasinix <LuArrowUpRight />
            </a>
            <a className="text-link" href={`${wasinixUrl}/actions`}>
              View build activity <LuArrowUpRight />
            </a>
          </div>
        </div>
        <div className="builds-emblem" aria-hidden="true">
          <div>
            <LuBox />
          </div>
          <span>source → build → .wasm</span>
        </div>
      </section>
      <section
        className="catalog-section site-container"
        aria-labelledby="catalog-title"
      >
        <div className="catalog-heading">
          <div>
            <span className="eyebrow">EXPLORE THE ECOSYSTEM</span>
            <h2 id="catalog-title">Find your next building block.</h2>
          </div>
          <a
            className="text-link"
            href={`${wasinixUrl}/tree/main/pkgs/overlays`}
          >
            Full package collection <LuArrowUpRight />
          </a>
        </div>
        <div className="catalog-controls">
          <div
            className="catalog-filters"
            aria-label="Filter packages by category"
          >
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="catalog-search">
            <LuSearch />
            <input
              type="search"
              aria-label="Search packages"
              placeholder="Search packages…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <LuX />
              </button>
            )}
          </div>
        </div>
        <div className="catalog-count" role="status">
          {filtered.length} featured{" "}
          {filtered.length === 1 ? "recipe" : "recipes"}
          <span>Source recipes in wasinix</span>
        </div>
        <div className="package-grid">
          {filtered.map((pkg) => (
            <a
              className="package-card"
              href={recipeUrl(pkg.path)}
              key={pkg.name}
            >
              <div className="package-top">
                <span className="package-icon">
                  {pkg.category === "Toolchains" ? (
                    <LuCode />
                  ) : pkg.category === "Command-line tools" ? (
                    <LuTerminal />
                  ) : (
                    <LuBox />
                  )}
                </span>
                <span className="package-category">{pkg.category}</span>
                <LuArrowUpRight />
              </div>
              <h3>{pkg.name}</h3>
              <p>{pkg.description}</p>
              <div className="package-bottom">
                <code>{pkg.language}</code>
                <span>
                  View build recipe <LuArrowRight />
                </span>
              </div>
            </a>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="catalog-empty">
            <LuSearch />
            <h3>No matching recipes</h3>
            <p>Try another package name or explore a different category.</p>
            <button
              type="button"
              className="site-button secondary"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
        <div className="catalog-note">
          <LuGitBranch />
          <p>
            This is a curated selection of build recipes. For current versions,
            build results, and artifacts, explore{" "}
            <a href={`${wasinixUrl}/actions`}>
              wasinix on GitHub <LuArrowUpRight />
            </a>
            .
          </p>
        </div>
      </section>
      <section className="reproduce-section">
        <div className="site-container reproduce-grid">
          <div>
            <span className="eyebrow">FROM SOURCE TO SOMETHING NEW</span>
            <h2>
              Build it yourself.
              <br />
              Make it your own.
            </h2>
            <p>
              wasinix keeps package recipes and toolchains together in a Nix
              flake. Start with the setup guide, then build a package or
              contribute your own.
            </p>
            <a
              className="text-link"
              href={`${wasinixUrl}/blob/main/docs/setup.md`}
            >
              Get set up with wasinix <LuArrowUpRight />
            </a>
          </div>
          <div className="nix-example">
            <div>
              <LuTerminal /> Example · Git for WASIX
            </div>
            <pre>
              <code className="language-sh">
                <span># Clone the package collection</span>
                {
                  "\ngit clone https://github.com/wasix-org/wasinix.git\ncd wasinix\n\n"
                }
                <span># Build the Git package</span>
                {"\n"}
                {buildCommand}
              </code>
            </pre>
            <CopyCommand
              command={`git clone https://github.com/wasix-org/wasinix.git\ncd wasinix\n${buildCommand}`}
              label="Copy wasinix build example"
            />
            <p>
              Requires Git and Nix with flakes enabled on x86_64 Linux. Follow
              the setup guide to configure your builder.
            </p>
            <a href={`${wasinixUrl}/blob/main/docs/building.md`}>
              Read the build guide <LuArrowUpRight />
            </a>
          </div>
        </div>
      </section>
      <section className="open-section site-container">
        <LuCode />
        <div>
          <h2>Have code of your own?</h2>
          <p>Get the C / C++ or Rust toolchain and start building for WASIX.</p>
        </div>
        <Link className="site-button" href="/#install">
          Install WASIX <LuArrowUpRight />
        </Link>
      </section>
    </div>
  );
}
