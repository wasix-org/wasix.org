import {
  pythonInstallCommand,
  pythonRunCommand,
  pythonRegistry,
} from "./python-registry.mjs";

export const toolchains = {
  c: {
    name: "wasixcc",
    language: "C / C++",
    description:
      "Bring your C and C++ projects to WebAssembly with a Clang-based toolchain.",
    sourceLabel: "Source repository",
    command: "curl -fsSL https://wasix.cc | sh",
    comment: "Compile your C program to WebAssembly",
    build: "wasixcc hello.c -o hello.wasm",
    run: "wasmer run hello.wasm",
    runNote: "Run the WebAssembly module you just compiled.",
    note: "For macOS and Linux. Installs the compiler, LLVM, and WASIX sysroot.",
    docs: "/docs/language-guide/c/installation",
    source: "https://github.com/wasix-org/wasixcc",
  },
  rust: {
    name: "cargo-wasix",
    language: "Rust",
    description:
      "Build, run, and test your Rust applications with familiar Cargo commands.",
    sourceLabel: "Source repository",
    command: "cargo install cargo-wasix",
    comment: "Build your Rust project for WASIX",
    build: "cargo wasix build --release",
    run: "wasmer run target/wasm32-wasmer-wasi/release/hello-wasix.wasm",
    runNote:
      "Replace hello-wasix with your project's binary name. Run from the project directory.",
    note: "Requires Rust installed through rustup. The WASIX toolchain downloads on your first build.",
    docs: "/docs/language-guide/rust/installation",
    source: "https://github.com/wasix-org/cargo-wasix",
  },
  python: {
    name: "pip",
    language: "Python",
    description: `${pythonRegistry.packageCount} packages in the WASIX Python registry. Install prebuilt wheels with familiar pip commands.`,
    command: pythonInstallCommand(),
    comment: "Run with Wasmer and print the installed FastAPI version",
    build: pythonRunCommand(),
    note: "Run pip on your host to install wheels for WASIX CPython 3.13. Use a Python version that matches your target interpreter.",
    docs: "/docs/language-guide/python/installation",
    source: pythonRegistry.url,
    sourceLabel: "Python package registry",
  },
};
