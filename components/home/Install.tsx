"use client";
import { useState } from "react";
import Link from "next/link";
import { LuArrowUpRight, LuCheck, LuTerminal } from "react-icons/lu";
import { SiPython, SiRust } from "react-icons/si";
import CopyCommand from "../CopyCommand";
import CompiledProgramSteps from "../CompiledProgramSteps";

import {
  PythonPackageCount,
  PythonCommand,
  PythonRunStep,
} from "../PythonPackages";
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
            Your language.
            <br />
            New possibilities.
          </h2>
          <p>
            Pick your language. Bring your tools and packages.
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
          <div className="language-tabs" aria-label="Choose your language">
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
            <button
              type="button"
              aria-pressed={language === "python"}
              onClick={() => setLanguage("python")}
            >
              <SiPython /> Python <span className="tab-tool">pip</span>
            </button>
          </div>
          <div className="install-card-body" key={language}>
            {language === "python" && <PythonPackageCount />}
            <div className="install-step">
              <span>01</span>
              <h3>
                {language === "python"
                  ? "Install Python packages"
                  : `Install ${toolchain.name}`}
              </h3>
              <a href={toolchain.source} aria-label={toolchain.sourceLabel}>
                <LuArrowUpRight />
              </a>
            </div>
            {language === "python" ? (
              <PythonCommand />
            ) : (
              <div className="command-box">
                <span className="command-prompt">$</span>
                <code>{toolchain.command}</code>
                <CopyCommand
                  command={toolchain.command}
                  label={`Copy ${toolchain.name} installation command`}
                />
              </div>
            )}
            <p className="install-note">{toolchain.note}</p>
            {language === "python" ? (
              <PythonRunStep />
            ) : (
              <CompiledProgramSteps language={language} />
            )}
            <Link className="text-link" href={toolchain.docs}>
              Full {toolchain.language} setup instructions <LuArrowUpRight />
            </Link>
          </div>
          <div className="install-runtime">
            <LuTerminal />
            <span>
              {language === "python"
                ? "Run with WASIX Python on "
                : "Run your .wasm with "}
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
