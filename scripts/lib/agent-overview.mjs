import { toolchains } from "../../components/toolchains.mjs";
import {
  siteUrl,
  resolveLink,
  findAll,
  hasClass,
  textContent,
} from "./agent-markdown.mjs";

export function overview(page, routes) {
  const link = (label, href) =>
    `[${label}](${resolveLink(href, page.route, routes)})`;
  const features = findAll(
    page.main,
    (node) => node.tagName === "a" && hasClass(node, "feature-item"),
  );
  const featureText = features
    .map((node) => {
      const title = textContent(
        findAll(node, (child) => child.tagName === "h3")[0],
      );
      const description = textContent(
        findAll(node, (child) => child.tagName === "p")[0],
      );
      return `- **${link(title, node.properties.href)}**: ${description}`;
    })
    .join("\n");
  const installs = Object.values(toolchains)
    .map(
      (toolchain) =>
        `### ${toolchain.language}: ${toolchain.name}\n\n${toolchain.note}\n\nInstall:\n\n\`\`\`sh\n${toolchain.command}\n\`\`\`\n\n${toolchain.comment}:\n\n\`\`\`sh\n${toolchain.build}\n\`\`\`\n\n${link("Installation guide", toolchain.docs)} · ${link("Source repository", toolchain.source)}`,
    )
    .join("\n\n");
  return `# WASIX\n\nWASIX extends WASI with POSIX-style capabilities so existing C, C++, and Rust applications can target WebAssembly. WASIX applications run with a compatible runtime on servers, at the edge, and in browsers.\n\n## Choose a toolchain\n\n- Use **wasixcc** for C and C++ projects.\n- Use **cargo-wasix** for Rust projects.\n- Use **wasinix** to build software from its Nix-based package collection.\n\n## Install and compile\n\n${installs}\n\n### Run the output\n\nInstall the [Wasmer runtime](https://docs.wasmer.io/install), then run the compiled module:\n\n\`\`\`sh\nwasmer run hello.wasm\n\`\`\`\n\nFor Cargo projects, see ${link("Rust usage", "/docs/language-guide/rust/usage/")}. Capabilities depend on the runtime, target environment, and toolchain configuration; consult the relevant guide and API reference.\n\n## System capabilities\n\n${featureText}\n\n## Build existing software\n\n${link("WASIX builds", "/builds/")} lists curated wasinix recipes for command-line tools, libraries, runtimes, and toolchains. The [wasinix repository](https://github.com/wasix-org/wasinix) is the source for recipes; its [build activity](https://github.com/wasix-org/wasinix/actions) provides current results. A listed recipe is not a guarantee that a particular revision builds successfully.\n\n## Documentation for agents\n\n- ${link("Documentation overview", "/docs/")}\n- ${link("Supported features", "/docs/explanation/features/")}\n- ${link("WASI and WASIX syscall reference", "/docs/api-reference/")}\n- ${link("Developer guide", "/docs/developer-guide/")}\n- [Complete Markdown page index](${siteUrl}/llms.txt)\n\nFollow Markdown links to read guides without a browser. Code blocks contain commands and examples; select the toolchain and instructions for the user's project before running them.\n\n## Community\n\n- [WASIX on GitHub](https://github.com/wasix-org)\n- ${link("Community and governance", "/docs/community-and-governance/")}\n- [Discord](https://discord.gg/rWkMNStrEW)`;
}
