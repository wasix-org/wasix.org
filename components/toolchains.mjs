export const toolchains = {
  c: {
    name: "wasixcc",
    language: "C / C++",
    command: "curl -fsSL https://wasix.cc | sh",
    comment: "Compile your C program to WebAssembly",
    build: "wasixcc hello.c -o hello.wasm",
    note: "For macOS and Linux. Installs the compiler, LLVM, and WASIX sysroot.",
    docs: "/docs/language-guide/c/installation",
    source: "https://github.com/wasix-org/wasixcc",
  },
  rust: {
    name: "cargo-wasix",
    language: "Rust",
    command: "cargo install cargo-wasix",
    comment: "Build your Rust project for WASIX",
    build: "cargo wasix build --release",
    note: "Requires Rust installed through rustup. The WASIX toolchain downloads on your first build.",
    docs: "/docs/language-guide/rust/installation",
    source: "https://github.com/wasix-org/cargo-wasix",
  },
};
