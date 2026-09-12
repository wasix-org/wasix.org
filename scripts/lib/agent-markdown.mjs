import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import remarkParse from "remark-parse";
import { markdownPath } from "../../lib/markdown-path.mjs";

export const siteUrl = "https://wasix.org";
const htmlParser = unified().use(rehypeParse);
const sourceParser = unified().use(remarkParse).use(remarkGfm);
const markdown = unified()
  .use(rehypeRemark)
  .use(remarkGfm, { tableCellPadding: false, tablePipeAlign: false })
  .use(remarkStringify, { bullet: "-", fences: true, listItemIndent: "one" });

export const text = (value) => ({ type: "text", value });
export const element = (tagName, children = [], properties = {}) => ({
  type: "element",
  tagName,
  properties,
  children,
});
export function textContent(node) {
  if (!node) return "";
  if (node.tagName === "br") return " ";
  return node.type === "text"
    ? node.value
    : (node.children || []).map(textContent).join("");
}
export function findAll(node, predicate) {
  return [
    ...(predicate(node) ? [node] : []),
    ...(node.children || []).flatMap((child) => findAll(child, predicate)),
  ];
}
export function hasClass(node, name) {
  return node.properties?.className?.includes(name);
}
export function readPage(html, route) {
  const tree = htmlParser.parse(html);
  const main = findAll(
    tree,
    (node) =>
      node.tagName === "main" &&
      node.properties?.dataPagefindBody !== undefined,
  )[0];
  if (!main) return null;
  const heading = findAll(main, (node) => /^h[1-6]$/.test(node.tagName))[0];
  const titleNode = findAll(tree, (node) => node.tagName === "title")[0];
  const title =
    route === "/"
      ? "WASIX"
      : route === "/builds/"
        ? "WASIX builds — wasinix package collection"
        : textContent(heading || titleNode)
            .replace(/#$/, "")
            .trim();
  const description = findAll(main, (node) => node.tagName === "p")
    .map(textContent)
    .find((value) => value.trim().length > 40)
    ?.replace(/\s+/g, " ")
    .trim();
  return { route, tree, main, title, description };
}

export function codeBlocks(source) {
  return findAll(sourceParser.parse(source), (node) => node.type === "code");
}
export const normalizeCode = (value) =>
  value
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trimEnd();

/** Prefer an existing sibling route for source-relative MDX links. */
export function resolveLink(href, route, routes) {
  if (!href || /^(mailto:|tel:|data:)/i.test(href)) return href;
  const url = new URL(href, `${siteUrl}${route}`);
  if (url.hostname !== new URL(siteUrl).hostname) return url.href;
  let pathname = url.pathname.replace(/\/+$/, "") || "/";
  if (
    !routes.has(pathname) &&
    !href.startsWith("/") &&
    !/^[a-z]+:/i.test(href)
  ) {
    const sibling = new URL(href, `${siteUrl}${route.replace(/\/$/, "")}`);
    const candidate = sibling.pathname.replace(/\/+$/, "") || "/";
    if (routes.has(candidate)) pathname = candidate;
  }
  if (routes.has(pathname))
    return `${siteUrl}${markdownPath(pathname)}${url.search}${pathname === "/" ? { "#install": "#install-and-compile", "#features": "#system-capabilities" }[url.hash] || url.hash : url.hash}`;
  return `${siteUrl}${url.pathname}${url.search}${url.hash}`;
}

function clean(node, context, inFileTree = false) {
  if (node.type === "comment") return null;
  if (node.type !== "element") return { ...node };
  const props = node.properties || {};
  const fileTree = inFileTree || hasClass(node, "nextra-filetree");
  if (
    ((props.ariaHidden === "true" || props.hidden) && !fileTree) ||
    ["script", "style", "nav", "input", "select", "svg"].includes(node.tagName)
  )
    return null;
  if (node.tagName === "button" && !fileTree) return null;
  if (
    props.role === "status" ||
    props.ariaLabel === "Permalink for this section"
  )
    return null;
  if (
    [
      "docs-page-eyebrow",
      "catalog-controls",
      "catalog-count",
      "eyebrow",
      "copy-control",
      "copy-status",
    ].some((name) => hasClass(node, name))
  )
    return null;
  if ((props.role === "img" || node.tagName === "figure") && props.ariaLabel)
    return element("p", [text(props.ariaLabel)]);
  if (hasClass(node, "docs-card-kicker")) return null;
  if (hasClass(node, "command-box")) {
    const command = findAll(node, (child) => child.tagName === "code")[0];
    return element("pre", [
      element("code", [text(textContent(command))], {
        className: ["language-sh"],
      }),
    ]);
  }
  if (hasClass(node, "package-grid")) {
    const cards = findAll(node, (child) => hasClass(child, "package-card"));
    return element("table", [
      element("thead", [
        element(
          "tr",
          ["Package", "Category", "Language", "Description"].map((label) =>
            element("th", [text(label)]),
          ),
        ),
      ]),
      element(
        "tbody",
        cards.map((card) =>
          element("tr", [
            element("td", [
              element(
                "a",
                [
                  text(
                    textContent(
                      findAll(card, (child) => child.tagName === "h3")[0],
                    ),
                  ),
                ],
                {
                  href: resolveLink(
                    card.properties.href,
                    context.route,
                    context.routes,
                  ),
                },
              ),
            ]),
            ...[
              (child) => hasClass(child, "package-category"),
              (child) => child.tagName === "code",
              (child) => child.tagName === "p",
            ].map((match) =>
              element("td", [text(textContent(findAll(card, match)[0]))]),
            ),
          ]),
        ),
      ),
    ]);
  }

  const result = {
    ...node,
    properties: { ...props },
    children: (node.children || [])
      .map((child) => clean(child, context, fileTree))
      .filter(Boolean),
  };
  if (node.tagName === "button") result.tagName = "span";
  if (hasClass(node, "nextra-callout")) result.tagName = "blockquote";
  if (node.tagName === "a")
    result.properties.href = resolveLink(
      props.href,
      context.route,
      context.routes,
    );
  if (hasClass(node, "nextra-card")) return element("p", [result]);
  if (hasClass(node, "docs-toolchain-title")) return element("h2", [result]);
  if (hasClass(node, "hero-buttons"))
    return element(
      "ul",
      result.children
        .filter((child) => child.tagName === "a")
        .map((child) => element("li", [child])),
    );
  if (hasClass(node, "docs-resource-links"))
    return element(
      "ul",
      result.children
        .filter((child) => child.tagName === "a")
        .map((child) => {
          const label = textContent(
            findAll(child, (item) => item.tagName === "strong")[0],
          );
          const description = textContent(
            findAll(child, (item) => item.tagName === "small")[0],
          );
          return element("li", [
            element("a", [text(label)], child.properties),
            text(` — ${description}`),
          ]);
        }),
    );
  if (context.route === "/builds/" && node.tagName === "h1")
    result.children = [text("WASIX builds")];
  if (/^h[1-6]$/.test(node.tagName))
    result.children = result.children.map((child) =>
      child.tagName === "br" ? text(" ") : child,
    );
  if (node.tagName === "img" && props.src)
    result.properties.src = new URL(
      props.src,
      `${siteUrl}${context.route}`,
    ).href;
  // Nextra excludes its code blocks from Pagefind, but they are essential here.
  if (node.tagName === "pre") {
    const code = findAll(result, (child) => child.tagName === "code")[0];
    if (code) {
      const original = context.codes?.find(
        (block) =>
          normalizeCode(block.value) === normalizeCode(textContent(code)),
      );
      const language =
        original?.lang ||
        props.dataLanguage ||
        code.properties?.dataLanguage ||
        (props.className || [])
          .find((name) => name.startsWith("language-"))
          ?.slice(9);
      if (language) code.properties.className = [`language-${language}`];
      if (original) code.children = [text(original.value)];
      result.children = [code];
    }
  }
  if (
    node.tagName === "div" &&
    hasClass(node, "nextra-code") &&
    result.children.some((child) => child.tagName === "pre")
  ) {
    const label = result.children.find((child) => child.tagName === "div");
    if (label)
      result.children = [
        element("p", [
          text("File: "),
          element("code", [text(textContent(label))]),
        ]),
        ...result.children.filter((child) => child !== label),
      ];
  }
  return result;
}

export async function pageBody(page, routes) {
  const main = clean(page.main, {
    route: page.route,
    routes,
    codes: page.codes,
  });
  const headings = findAll(main, (node) => /^h[1-6]$/.test(node.tagName));
  const shift = headings.length ? Number(headings[0].tagName[1]) - 1 : 0;
  for (const heading of headings)
    heading.tagName = `h${Math.max(1, Number(heading.tagName[1]) - shift)}`;
  if (!headings.length) {
    const first = main.children.findIndex((node) => textContent(node).trim());
    if (first >= 0 && textContent(main.children[first]).trim() === page.title)
      main.children.splice(first, 1);
    main.children.unshift(element("h1", [text(page.title)]));
  }
  const result = await markdown.run({ type: "root", children: main.children });
  return markdown.stringify(result).trim();
}

export function document(page, body) {
  const frontmatter = {
    title: page.title,
    description: page.description,
    url: `${siteUrl}${page.route}`,
    markdown: `${siteUrl}${markdownPath(page.route)}`,
  };
  return `---\n${Object.entries(frontmatter)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(
      "\n",
    )}\n---\n\n${body}\n\n---\n\n[Documentation index](${siteUrl}/llms.txt) · [HTML version](${siteUrl}${page.route})\n`;
}
