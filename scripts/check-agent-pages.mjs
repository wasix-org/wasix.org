import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { markdownPath } from "../lib/markdown-path.mjs";
import {
  codeBlocks,
  findAll,
  normalizeCode,
  readPage,
  siteUrl,
} from "./lib/agent-markdown.mjs";
import { toolchains } from "../components/toolchains.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const out = path.join(root, "out");
const parser = unified().use(remarkParse).use(remarkGfm);
async function sourceFiles(directory) {
  return (
    await Promise.all(
      (await fs.readdir(directory, { withFileTypes: true })).map((entry) =>
        entry.isDirectory()
          ? sourceFiles(path.join(directory, entry.name))
          : entry.name.endsWith(".mdx")
            ? [path.join(directory, entry.name)]
            : [],
      ),
    )
  ).flat();
}
let checked = 0;
let examples = 0;
const targets = new Set();
const index = await fs.readFile(path.join(out, "llms.txt"), "utf8");
for (const source of await sourceFiles(path.join(root, "content"))) {
  const route = `/${path
    .relative(path.join(root, "content"), source)
    .replace(/\.mdx$/, "")
    .replace(/(^|\/)index$/, "")
    .replace(/\/$/, "")}`;
  const html = await fs.readFile(path.join(out, route, "index.html"), "utf8");
  const page = readPage(html, route);
  const head = findAll(page.tree, (node) => node.tagName === "head")[0];
  const alternates = findAll(
    head,
    (node) =>
      node.tagName === "link" &&
      node.properties?.rel?.includes("alternate") &&
      node.properties?.type === "text/markdown",
  );
  assert.equal(
    alternates.length,
    1,
    `${route}: exactly one Markdown alternate is required in <head>`,
  );
  assert.equal(
    new URL(alternates[0].properties.href, siteUrl).pathname,
    markdownPath(route),
  );
  const md = await fs.readFile(path.join(out, markdownPath(route)), "utf8");
  assert.match(md, /^---\ntitle: /);
  assert.match(md, /^# /m, `${route}: missing page heading`);
  assert.ok(
    index.includes(`${siteUrl}${markdownPath(route)})`),
    `${route}: absent from llms.txt`,
  );
  if (route !== "/")
    assert.equal(await fs.readFile(path.join(out, route, ".md"), "utf8"), md);
  const body = md.replace(/^---\n[\s\S]*?\n---\n/, "");
  const tree = parser.parse(body);
  const renderedCodes = codeBlocks(body);
  for (const code of codeBlocks(await fs.readFile(source, "utf8"))) {
    assert.ok(
      renderedCodes.some(
        (output) =>
          normalizeCode(output.value) === normalizeCode(code.value) &&
          output.lang === code.lang,
      ),
      `${route}: missing or changed ${code.lang || "plain"} code block`,
    );
    examples++;
  }
  for (const link of findAll(tree, (node) => node.type === "link")) {
    const url = new URL(link.url, siteUrl);
    if (url.origin === siteUrl && url.pathname.endsWith(".md"))
      targets.add(decodeURIComponent(url.pathname));
  }
  checked++;
}
for (const target of targets) await fs.access(path.join(out, target));
const home = await fs.readFile(path.join(out, ".md"), "utf8");
for (const toolchain of Object.values(toolchains)) {
  assert.ok(home.includes(toolchain.command));
  assert.ok(home.includes(toolchain.build));
}
console.log(
  `Verified ${checked} Markdown alternates, ${examples} code examples, and ${targets.size} internal Markdown link targets.`,
);
