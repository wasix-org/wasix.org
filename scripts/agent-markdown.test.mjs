import assert from "node:assert/strict";
import test from "node:test";
import { markdownPath } from "../lib/markdown-path.mjs";
import {
  codeBlocks,
  pageBody,
  readPage,
  resolveLink,
} from "./lib/agent-markdown.mjs";

const routes = new Set(["/", "/docs", "/docs/api/foo", "/docs/api/bar"]);
test("Markdown routes and internal links include root, sibling, hash, and external cases", () => {
  assert.equal(markdownPath("/"), "/.md");
  assert.equal(markdownPath("/docs/api/foo/"), "/docs/api/foo.md");
  assert.equal(
    resolveLink("/#install", "/docs/", routes),
    "https://wasix.org/.md#install-and-compile",
  );
  assert.equal(
    resolveLink("/#features", "/docs/", routes),
    "https://wasix.org/.md#system-capabilities",
  );
  assert.equal(
    resolveLink("./bar#ipv4", "/docs/api/foo/", routes),
    "https://wasix.org/docs/api/bar.md#ipv4",
  );
  assert.equal(
    resolveLink("#syntax", "/docs/api/foo/", routes),
    "https://wasix.org/docs/api/foo.md#syntax",
  );
  assert.equal(
    resolveLink("http://wasix.org/docs", "/", routes),
    "https://wasix.org/docs.md",
  );
  assert.equal(
    resolveLink("https://example.com/file.md", "/", routes),
    "https://example.com/file.md",
  );
  assert.equal(
    resolveLink("/assets/example.wasm", "/", routes),
    "https://wasix.org/assets/example.wasm",
  );
});

test("conversion preserves source code, tables, callouts, file trees, and links without UI", async () => {
  const html = `<html><head><title>Test</title></head><body><nav>Navigation noise</nav><main data-pagefind-body>
    <div class="docs-page-eyebrow">WASIX / API</div>
    <h2>Example<a aria-label="Permalink for this section">#</a></h2>
    <div class="nextra-code" data-pagefind-ignore="all"><div><span>main.rs</span><button>Copy code</button></div><pre><button>Copy code</button><code><span>fn main() {</span>\n<span>    println!(&quot;&lt;hello&gt;&quot;);</span>\n<span> </span>\n<span>}</span></code></pre></div>
    <div class="nextra-callout"><p>Requires version 4.1.1 or higher.</p></div>
    <ul class="nextra-filetree"><li><button>src</button><ul hidden aria-hidden="true"><li>main.rs</li></ul></li></ul>
    <table><thead><tr><th>Type</th><th>Value</th></tr></thead><tbody><tr><td>Flag</td><td><code>a|b</code></td></tr></tbody></table>
    <a href="./bar#ipv4">Other syscall</a><div role="status">Copied!</div>
    <div role="img" aria-label="Server, Edge, and Browser"><svg>decorative</svg></div>
  </main><footer>Footer noise</footer></body></html>`;
  const source = '```rust\nfn main() {\n    println!("<hello>");\n\n}\n```';
  const page = readPage(html, "/docs/api/foo/");
  page.codes = codeBlocks(source);
  const result = await pageBody(page, routes);
  assert.match(result, /^# Example/m);
  assert.ok(
    result.includes('```rust\nfn main() {\n    println!("<hello>");\n\n}\n```'),
  );
  assert.match(result, /File: `main.rs`/);
  assert.match(result, /> Requires version 4\.1\.1 or higher/);
  assert.match(result, /- src\n\s+- main\.rs/);
  assert.match(result, /\|Type\|Value\|/);
  assert.ok(result.includes("`a\\|b`"));
  assert.ok(result.includes("(https://wasix.org/docs/api/bar.md#ipv4)"));
  assert.match(result, /Server, Edge, and Browser/);
  assert.doesNotMatch(
    result,
    /Navigation noise|Footer noise|Copy code|Copied!|decorative|WASIX \/ API/,
  );
});

test("pages without semantic headings receive a title without duplicating it", async () => {
  const page = readPage(
    "<html><head><title>Socket example</title></head><body><main data-pagefind-body><strong>Socket example</strong><p>Use a socket.</p></main></body></html>",
    "/docs/api/foo/",
  );
  const result = await pageBody(page, routes);
  assert.equal(result, "# Socket example\n\nUse a socket.");
});

test("rendered build recipes become one concise table", async () => {
  const page = readPage(
    `<main data-pagefind-body><h1>Builds</h1><div class="package-grid"><a class="package-card" href="https://github.com/wasix-org/wasinix"><span class="package-category">Libraries</span><h3>SQLite</h3><p>SQL database.</p><code>C</code><span>View build recipe</span></a></div></main>`,
    "/builds/",
  );
  const result = await pageBody(page, routes);
  assert.match(result, /\|Package\|Category\|Language\|Description\|/);
  assert.match(
    result,
    /\[SQLite\]\(https:\/\/github.com\/wasix-org\/wasinix\)/,
  );
  assert.match(result, /\|Libraries\|C\|SQL database\.\|/);
  assert.doesNotMatch(result, /View build recipe/);
});
