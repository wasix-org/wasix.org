// Curated entry points into wasinix, verified against its package inventory.
// These are recipes, not a claim that a particular CI revision is passing.
export const wasinixUrl = "https://github.com/wasix-org/wasinix";
export const categories = [
  "All",
  "Command-line tools",
  "Runtimes",
  "Libraries",
  "Toolchains",
] as const;
export type Category = (typeof categories)[number];
export const packages: {
  name: string;
  description: string;
  category: Exclude<Category, "All">;
  language: string;
  path: string;
}[] = [
  {
    name: "Bash",
    description: "The familiar Unix shell, ready for a new target.",
    category: "Command-line tools",
    language: "C",
    path: "b/bash",
  },
  {
    name: "curl",
    description: "Transfer data with URLs and network protocols.",
    category: "Command-line tools",
    language: "C",
    path: "c/curl",
  },
  {
    name: "Git",
    description: "Distributed version control for your projects.",
    category: "Command-line tools",
    language: "C",
    path: "g/git",
  },
  {
    name: "jq",
    description: "A lightweight command-line JSON processor.",
    category: "Command-line tools",
    language: "C",
    path: "j/jq",
  },
  {
    name: "Python",
    description: "The Python interpreter and its WASIX build recipes.",
    category: "Runtimes",
    language: "C",
    path: "p/python3",
  },
  {
    name: "PHP",
    description: "A scripting runtime for web applications and beyond.",
    category: "Runtimes",
    language: "C",
    path: "p/php",
  },
  {
    name: "SQLite",
    description: "A small, self-contained SQL database engine.",
    category: "Libraries",
    language: "C",
    path: "s/sqlite.nix",
  },
  {
    name: "OpenSSL",
    description: "Cryptography and TLS for connected applications.",
    category: "Libraries",
    language: "C",
    path: "o/openssl",
  },
  {
    name: "zlib",
    description: "The widely used compression library.",
    category: "Libraries",
    language: "C",
    path: "z/zlib.nix",
  },
  {
    name: "wasixcc",
    description: "The Clang-based C and C++ toolchain for WASIX.",
    category: "Toolchains",
    language: "C / C++",
    path: "w/wasixcc",
  },
  {
    name: "cargo-wasix",
    description: "Build Rust projects for WASIX with familiar Cargo commands.",
    category: "Toolchains",
    language: "Rust",
    path: "c/cargo-wasix",
  },
  {
    name: "WASIX Rust",
    description: "The Rust compiler toolchain targeting WASIX.",
    category: "Toolchains",
    language: "Rust",
    path: "w/wasix-rust",
  },
];
export function recipeUrl(path: string) {
  return `${wasinixUrl}/${path.endsWith(".nix") ? "blob" : "tree"}/main/pkgs/overlays/${path}`;
}
