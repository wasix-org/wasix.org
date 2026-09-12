"use client";
import { useState } from "react";
import Link from "next/link";
import { LuArrowUpRight, LuCheck, LuTerminal } from "react-icons/lu";
import { SiRust } from "react-icons/si";
import CopyCommand from "../CopyCommand";

import { toolchains } from "../toolchains.mjs";

export default function Install() {
  const [language, setLanguage] = useState<keyof typeof toolchains>("c");
  const toolchain = toolchains[language];
  return (
    <section id="install" className="install-section section-space">
      <div className="site-container install-grid">
        <div className="install-intro">
          <span className="eyebrow">03 / YOUR NEXT BUILD STARTS HERE</span>
          <h2>
            Native code.
            <br />
            New possibilities.
          </h2>
          <p>
            Pick your language. Install your toolchain.
            <br className="desktop-break" /> Make WebAssembly your next target.
          </p>
          <div className="install-perks">
            <span>
              <LuCheck /> Familiar tools
            </span>
            <span>
              <LuCheck /> Open source
            </span>
          </div>
          <Link className="text-link" href="/docs">
            Read the getting started guide <LuArrowUpRight />
          </Link>
        </div>
        <div className="install-card">
          <div className="language-tabs" aria-label="Choose your toolchain">
            <button
              type="button"
              aria-pressed={language === "c"}
              onClick={() => setLanguage("c")}
            >
              <span className="c-icon">
                C<span>++</span>
              </span>{" "}
              C / C++ <span className="tab-tool">wasixcc</span>
            </button>
            <button
              type="button"
              aria-pressed={language === "rust"}
              onClick={() => setLanguage("rust")}
            >
              <SiRust /> Rust <span className="tab-tool">cargo-wasix</span>
            </button>
          </div>
          <div className="install-card-body" key={language}>
            <div className="install-step">
              <span>01</span>
              <h3>Install {toolchain.name}</h3>
              <a
                href={toolchain.source}
                aria-label={`${toolchain.name} on GitHub`}
              >
                <LuArrowUpRight />
              </a>
            </div>
            <div className="command-box">
              <span className="command-prompt">$</span>
              <code>{toolchain.command}</code>
              <CopyCommand
                command={toolchain.command}
                label={`Copy ${toolchain.name} installation command`}
              />
            </div>
            <p className="install-note">{toolchain.note}</p>
            <div className="install-step">
              <span>02</span>
              <h3>Compile something great</h3>
            </div>
            <div className="build-example">
              <span># {toolchain.comment}</span>
              <div className="command-box">
                <span className="command-prompt">$</span>
                <code>{toolchain.build}</code>
                <CopyCommand
                  command={toolchain.build}
                  label="Copy build command"
                />
              </div>
            </div>
            <Link className="text-link" href={toolchain.docs}>
              Full {toolchain.language} setup instructions <LuArrowUpRight />
            </Link>
          </div>
          <div className="install-runtime">
            <LuTerminal />
            <span>
              Run your .wasm with{" "}
              <a href="https://docs.wasmer.io/install">
                Wasmer <LuArrowUpRight />
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
