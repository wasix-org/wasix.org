import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { markdownPath } from "../lib/markdown-path.mjs";
import {
  readPage,
  pageBody,
  document,
  siteUrl,
  codeBlocks,
} from "./lib/agent-markdown.mjs";
import { overview } from "./lib/agent-overview.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "out");
async function files(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory() &&
        entry.name !== "_next" &&
        entry.name !== "_pagefind"
          ? files(path.join(directory, entry.name))
          : entry.isFile()
            ? [path.join(directory, entry.name)]
            : [],
      ),
    )
  ).flat();
}

const pages = [];
for (const file of (await files(output))
  .filter((file) => file.endsWith("/index.html"))
  .sort()) {
  const route = `/${path.relative(output, path.dirname(file)).split(path.sep).filter(Boolean).join("/")}`;
  const page = readPage(
    await fs.readFile(file, "utf8"),
    route === "/" ? route : `${route}/`,
  );
  if (page) pages.push(page);
}
if (!pages.length)
  throw new Error("No exported pages found. Run next build first.");
const routes = new Set(
  pages.map(({ route }) => route.replace(/\/$/, "") || "/"),
);
const sources = (await files(path.join(root, "content"))).filter((file) =>
  file.endsWith(".mdx"),
);
for (const source of sources) {
  const route = `/${path
    .relative(path.join(root, "content"), source)
    .replace(/\.mdx$/, "")
    .replace(/(^|\/)index$/, "")
    .replace(/\/$/, "")}`;
  if (!routes.has(route))
    throw new Error(`Missing exported content page: ${route}`);
  const page = pages.find(
    (page) => (page.route.replace(/\/$/, "") || "/") === route,
  );
  page.codes = codeBlocks(await fs.readFile(source, "utf8"));
}
for (const page of pages) {
  const body =
    page.route === "/" ? overview(page, routes) : await pageBody(page, routes);
  const content = document(page, body);
  await fs.writeFile(path.join(output, markdownPath(page.route)), content);
  // Also support appending .md to a trailing-slash page URL.
  if (page.route !== "/")
    await fs.writeFile(path.join(output, page.route, ".md"), content);
}
const groups = [
  ["Start here", (route) => ["/", "/docs/", "/builds/"].includes(route)],
  [
    "Guides and community",
    (route) =>
      !["/", "/docs/", "/builds/"].includes(route) &&
      !route.startsWith("/docs/api-reference"),
  ],
  ["API reference", (route) => route.startsWith("/docs/api-reference")],
];
const index = `# WASIX\n\n> WASIX extends WASI with POSIX-style capabilities for C, C++, and Rust applications targeting WebAssembly.\n\nEach page below is available as Markdown with its canonical HTML URL in the frontmatter. Start with the overview, select wasixcc for C/C++ or cargo-wasix for Rust, then follow the guide for the task.\n\n${groups
  .map(
    ([title, match]) =>
      `## ${title}\n\n${pages
        .filter(({ route }) => match(route))
        .map(
          (page) =>
            `- [${page.title.replace(/[\[\]]/g, "")}](${siteUrl}${markdownPath(page.route)})`,
        )
        .join("\n")}`,
  )
  .join("\n\n")}\n`;
await fs.writeFile(path.join(output, "llms.txt"), index);
console.log(
  `Generated ${pages.length} agent Markdown pages, trailing-slash aliases, and llms.txt.`,
);
