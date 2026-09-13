import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { SiPython } from "react-icons/si";
import CopyCommand from "./CopyCommand";
import {
  pythonInstallCommand,
  pythonRunCommand,
  pythonRegistry,
} from "./python-registry.mjs";

export function PythonPackageCount() {
  return (
    <a className="python-package-count" href={pythonRegistry.url}>
      <SiPython aria-hidden="true" />
      <span>
        <strong>{pythonRegistry.packageCount} packages</strong>
        <small>
          In the Python registry · checked {pythonRegistry.checkedLabel}
        </small>
      </span>
      <LuArrowUpRight aria-hidden="true" />
    </a>
  );
}

export function PythonCommand() {
  const command = pythonInstallCommand();
  return (
    <div className="command-box command-box-multiline">
      <span className="command-prompt" aria-hidden="true">
        $
      </span>
      <code>{command}</code>
      <CopyCommand
        command={command}
        label="Copy Python package installation command"
      />
    </div>
  );
}

export function PythonRunStep() {
  const command = pythonRunCommand();
  return (
    <div className="python-run-step">
      <div className="install-step">
        <span>02</span>
        <h3>Run it with Wasmer</h3>
        <a
          href="https://wasmer.io/python/python"
          aria-label="Python package on Wasmer"
        >
          <LuArrowUpRight />
        </a>
      </div>
      <div className="command-box command-box-multiline">
        <span className="command-prompt" aria-hidden="true">
          $
        </span>
        <code>{command}</code>
        <CopyCommand command={command} label="Copy Python run command" />
      </div>
      <p className="python-run-note">
        <a href="https://docs.wasmer.io/install">Install Wasmer 7 or newer</a>,
        then run this command from the same directory as pip. It mounts your
        packages and prints the FastAPI version from inside WASIX Python.
      </p>
    </div>
  );
}

export default function PythonPackages() {
  return (
    <section
      className="python-packages-section site-container"
      aria-labelledby="python-packages-title"
    >
      <div className="python-packages-intro">
        <span className="eyebrow">PYTHON, WITH YOUR PACKAGES</span>
        <h2 id="python-packages-title">
          Your ecosystem.
          <br />
          Ready for WASIX.
        </h2>
        <p>
          From FastAPI to NumPy. Bring familiar Python packages to WebAssembly
          with prebuilt wheels from the WASIX registry.
        </p>
        <div
          className="python-package-tags"
          aria-label="Example Python packages"
        >
          {pythonRegistry.examples.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
        <Link
          className="text-link"
          href="/docs/language-guide/python/installation"
        >
          Python installation guide <LuArrowUpRight />
        </Link>
      </div>
      <div className="python-packages-card">
        <PythonPackageCount />
        <div className="install-step">
          <span>01</span>
          <h3>Install packages for WASIX</h3>
        </div>
        <PythonCommand />
        <p>
          Replace <code>fastapi</code> with your package. This installs wheels
          for WASIX CPython 3.13 into <code>./wasix-packages</code>.
        </p>
        <PythonRunStep />
        <a className="text-link" href={pythonRegistry.url}>
          Browse all Python packages <LuArrowUpRight />
        </a>
      </div>
    </section>
  );
}
