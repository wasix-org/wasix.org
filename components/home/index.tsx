import Link from "next/link";
import {
  LuArrowDown,
  LuArrowRight,
  LuArrowUpRight,
  LuBox,
  LuCpu,
  LuFolderOpen,
  LuGitBranch,
  LuGlobe,
  LuNetwork,
  LuTerminal,
  LuWorkflow,
  LuZap,
} from "react-icons/lu";
import { SiPython, SiSqlite, SiTokio } from "react-icons/si";
import Install from "./Install";
import RuntimeDiagram from "./RuntimeDiagram";

const features = [
  {
    icon: LuNetwork,
    title: "Real networking",
    description:
      "Connect to the world with TCP and UDP sockets, IPv4, IPv6, and DNS resolution.",
    tags: "socket · bind · connect",
    href: "/docs/api-reference/wasix/sock_open",
  },
  {
    icon: LuCpu,
    title: "Threads that work together",
    description:
      "Bring parallel workloads to Wasm with native threading primitives and synchronization.",
    tags: "pthreads · thread_spawn · futex",
    href: "/docs/api-reference/wasix/thread_spawn",
  },
  {
    icon: LuGitBranch,
    title: "The whole process",
    description:
      "Fork processes, launch programs, and wait for results. Keep your application’s workflow intact.",
    tags: "fork · exec · wait",
    href: "/docs/api-reference/wasix/proc_spawn",
  },
  {
    icon: LuFolderOpen,
    title: "A familiar filesystem",
    description:
      "Read, write, and navigate files with POSIX-style operations, directories, and pipes.",
    tags: "open · read · write · chdir",
    href: "/docs/api-reference/wasi/path_open",
  },
  {
    icon: LuZap,
    title: "Built for async",
    description:
      "Poll sockets and files without blocking. Build event-driven applications with runtimes like Tokio.",
    tags: "poll · events · async I/O",
    href: "/docs/language-guide/rust/usage",
  },
  {
    icon: LuTerminal,
    title: "Keep your tools feeling native",
    description:
      "Support interactive terminals, signals, and familiar C control flow with setjmp and longjmp.",
    tags: "TTY · signals · setjmp / longjmp",
    href: "/docs/explanation/extensions-to-wasi",
  },
];
export default function Home() {
  return (
    <div className="marketing-page">
      <section className="hero site-container">
        <div className="hero-copy">
          <a
            className="announcement"
            href="https://github.com/wasix-org/wasinix"
          >
            <span className="status-dot" /> MEET WASINIX{" "}
            <span className="announcement-description">
              A growing world of WASIX builds
            </span>
            <LuArrowUpRight />
          </a>
          <h1>
            Your code.
            <br />
            Unbound<span className="hero-period">.</span>
          </h1>
          <p className="hero-description">
            The power of POSIX.
            <br />
            The portability of WebAssembly.
          </p>
          <p className="hero-detail">
            WASIX extends WASI with the features real applications need. Bring
            your C, C++, Rust, and Python applications to WebAssembly—with the
            tools you already know.
          </p>
          <div className="hero-buttons">
            <Link className="site-button" href="#install">
              Start building <LuArrowUpRight />
            </Link>
            <Link className="site-button secondary" href="/docs">
              Explore the docs <LuArrowRight />
            </Link>
          </div>
          <div className="hero-meta">
            <span>
              <span className="status-dot" /> OPEN SOURCE
            </span>
            <span>BUILT ON WASI</span>
            <span>POWERED BY WASMER</span>
          </div>
        </div>
        <RuntimeDiagram />
      </section>
      <section className="ecosystem-strip" aria-label="WASIX ecosystem">
        <div className="site-container">
          <p>
            Familiar software.
            <br />
            <strong>New territory.</strong>
          </p>
          <div className="ecosystem-names">
            <span>
              <LuTerminal /> bash
            </span>
            <span className="curl-word">curl</span>
            <span>
              <SiTokio aria-hidden="true" /> Tokio
            </span>
            <span>
              <SiPython aria-hidden="true" /> Python
            </span>
            <span className="git-word">
              <LuGitBranch /> git
            </span>
            <span>
              <SiSqlite aria-hidden="true" /> SQLite
            </span>
          </div>
          <Link href="/builds" aria-label="Explore WASIX builds">
            <LuArrowUpRight />
          </Link>
        </div>
      </section>
      <section
        id="features"
        className="features-section section-space site-container"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / MORE OF WHAT YOUR CODE NEEDS</span>
            <h2>
              WebAssembly.
              <br />
              With the missing pieces.
            </h2>
          </div>
          <p>
            Keep the portability. Add the system capabilities.
            <br />
            WASIX builds on the WASI ABI to bring more existing software to
            Wasm.
          </p>
        </div>
        <div className="feature-grid">
          {features.map(
            ({ icon: Icon, title, description, tags, href }, index) => (
              <Link href={href} className="feature-item" key={title}>
                <div className="feature-top">
                  <Icon />
                  <span>0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="feature-bottom">
                  <code>{tags}</code>
                  <LuArrowUpRight />
                </div>
              </Link>
            ),
          )}
        </div>
        <div className="feature-footnote">
          <span>
            Capabilities depend on the runtime and toolchain configuration.
          </span>
          <Link href="/docs/explanation/extensions-to-wasi">
            Explore the WASIX extensions <LuArrowRight />
          </Link>
        </div>
      </section>
      <section className="builds-teaser">
        <div className="site-container builds-teaser-grid">
          <div>
            <span className="eyebrow">
              02 / REAL SOFTWARE, ALREADY BUILDING
            </span>
            <h2>
              A whole ecosystem.
              <br />
              Within reach.
            </h2>
            <p>
              From command-line essentials to language runtimes. Explore the
              packages and toolchains being built for WASIX with wasinix, our
              Nix-based package collection.
            </p>
            <Link className="site-button light" href="/builds">
              Explore the builds <LuArrowUpRight />
            </Link>
            <a
              className="teaser-source"
              href="https://github.com/wasix-org/wasinix"
            >
              Open source on GitHub <LuArrowUpRight />
            </a>
          </div>
          <div className="build-preview">
            <div className="build-preview-header">
              <span>
                <LuBox /> wasinix / packages
              </span>
              <span className="catalog-label">BUILD CATALOG</span>
            </div>
            {[
              {
                name: "curl",
                description: "Transfer data. Anywhere.",
                language: "C",
              },
              {
                name: "Python",
                description: "A familiar runtime. A new target.",
                language: "C",
              },
              {
                name: "Git",
                description: "Version control, meets Wasm.",
                language: "C",
              },
            ].map((pkg) => (
              <Link href="/builds" className="build-preview-row" key={pkg.name}>
                <LuBox />
                <span>
                  <strong>{pkg.name}</strong>
                  <small>{pkg.description}</small>
                </span>
                <code>{pkg.language}</code>
                <LuArrowUpRight />
              </Link>
            ))}
            <Link className="build-preview-footer" href="/builds">
              Discover the package collection <LuArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <Install />
      <section className="open-section site-container">
        <LuWorkflow />
        <div>
          <h2>Built in the open. Built to go further.</h2>
          <p>Help shape a more capable WebAssembly ecosystem.</p>
        </div>
        <a
          className="site-button secondary"
          href="https://github.com/wasix-org"
        >
          Build with us <LuArrowUpRight />
        </a>
      </section>
      <div className="site-container page-signoff">
        <span>WASI, EXTENDED.</span>
        <LuGlobe />
        <a href="#install">
          LET’S BUILD <LuArrowDown />
        </a>
      </div>
    </div>
  );
}
