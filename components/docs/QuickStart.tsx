import Link from "next/link";
import {
  LuArrowRight,
  LuArrowUpRight,
  LuBookOpen,
  LuBraces,
  LuBoxes,
  LuTerminal,
} from "react-icons/lu";
import { SiPython, SiRust } from "react-icons/si";
import CopyCommand from "../CopyCommand";
import CompiledProgramSteps from "../CompiledProgramSteps";
import { PythonCommand, PythonRunStep } from "../PythonPackages";
import { toolchains } from "../toolchains.mjs";

export default function QuickStart() {
  return (
    <div className="docs-quickstart">
      <div className="docs-toolchains">
        {Object.entries(toolchains).map(([key, toolchain], index) => (
          <section
            className={`docs-toolchain${key === "python" ? " docs-python-toolchain" : ""}`}
            key={key}
            aria-label={`${toolchain.language} quick start`}
          >
            <div className="docs-card-kicker">
              {key === "c" ? (
                <LuBraces />
              ) : key === "rust" ? (
                <SiRust />
              ) : (
                <SiPython />
              )}
              <span>{toolchain.language}</span>
              <span className="docs-card-number">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <Link className="docs-toolchain-title" href={toolchain.docs}>
              {toolchain.name}
              <LuArrowUpRight />
            </Link>
            <p>{toolchain.description}</p>
            {key === "python" ? (
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
            {key === "python" && <PythonRunStep />}
            {(key === "c" || key === "rust") && (
              <CompiledProgramSteps language={key} />
            )}
            <Link className="docs-card-link" href={toolchain.docs}>
              Get started with {toolchain.language}
              <LuArrowRight />
            </Link>
          </section>
        ))}
      </div>
      <div className="docs-runtime-note">
        <LuTerminal />
        <p>
          To run your compiled applications,{" "}
          <a href="https://docs.wasmer.io/install">
            install the Wasmer runtime <LuArrowUpRight />
          </a>
          .
        </p>
      </div>
      <div className="docs-resource-links">
        {[
          {
            icon: LuBookOpen,
            title: "Understand WASIX",
            text: "System capabilities, explained.",
            href: "/docs/explanation/features",
          },
          {
            icon: LuBraces,
            title: "Explore the API",
            text: "Every syscall, in detail.",
            href: "/docs/api-reference",
          },
          {
            icon: LuBoxes,
            title: "Browse the builds",
            text: "Software you already know.",
            href: "/builds",
          },
        ].map(({ icon: Icon, title, text, href }) => (
          <Link href={href} key={href}>
            <Icon />
            <span>
              <strong>{title}</strong>
              <small>{text}</small>
            </span>
            <LuArrowUpRight />
          </Link>
        ))}
      </div>
    </div>
  );
}
