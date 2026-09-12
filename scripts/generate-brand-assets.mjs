// Keep browser icons, downloadable logos, and the social image in sync with the UI.
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const projectDir = fileURLToPath(new URL("../", import.meta.url));
const mark = JSON.parse(
  await fs.readFile(
    path.join(projectDir, "assets/brand/wasix-mark.json"),
    "utf8",
  ),
);
const { default: sharp } = await import(
  pathToFileURL(
    require.resolve("sharp", {
      paths: [require.resolve("next/package.json")],
    }),
  ).href
);
const publicDir = path.join(projectDir, "public");

function paths(ink, accent) {
  return `<g fill="none" stroke-width="${mark.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="${mark.loop}" stroke="${ink}"/><path d="${mark.crossing}" stroke="${accent}" stroke-linecap="butt"/></g>`;
}

function wordmark(ink, accent) {
  return `<g transform="translate(0 2) scale(.75)">${paths(ink, accent)}</g><text x="64" y="31" fill="${ink}" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" letter-spacing="-2">wasix<tspan fill="${accent}">.</tspan></text>`;
}

async function generate() {
  for (const [suffix, ink, accent] of [
    ["", mark.ink, mark.accent],
    ["-dark", mark.lightInk, mark.darkAccent],
  ]) {
    const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -12 72 72">${paths(ink, accent)}</svg>\n`;
    await fs.writeFile(path.join(publicDir, `favicon${suffix}.svg`), icon);
    await sharp(Buffer.from(icon))
      .resize(64, 64)
      .png()
      .toFile(path.join(publicDir, `favicon${suffix}.png`));
    await fs.writeFile(
      path.join(publicDir, `wasix-logo${suffix}.svg`),
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 40" role="img" aria-label="WASIX">${wordmark(ink, accent)}</svg>\n`,
    );
    await fs.writeFile(
      path.join(publicDir, `wasix-icon${suffix}.svg`),
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${mark.viewBox}" role="img" aria-label="WASIX infinity mark with a highlighted X">${paths(ink, accent)}</svg>\n`,
    );
  }

  // A square, opaque icon keeps the mark legible in profile avatar crops.
  const avatar = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 96 96"><rect width="96" height="96" fill="#f3f5ec"/><g transform="translate(12 24)">${paths(mark.ink, mark.accent)}</g></svg>\n`;
  await fs.writeFile(path.join(publicDir, "wasix-avatar.svg"), avatar);
  await sharp(Buffer.from(avatar))
    .png()
    .toFile(path.join(publicDir, "wasix-avatar.png"));

  const ogPath = path.join(publicDir, "og.svg");
  const og = (await fs.readFile(ogPath, "utf8"))
    .replace(
      /<!-- WASIX_BRAND_START -->[\s\S]*?<!-- WASIX_BRAND_END -->/,
      `<!-- WASIX_BRAND_START --><g transform="translate(56 28)">${wordmark(mark.ink, mark.accent)}</g><!-- WASIX_BRAND_END -->`,
    )
    .replace(
      /<!-- WASIX_RUNTIME_MARK_START -->[\s\S]*?<!-- WASIX_RUNTIME_MARK_END -->/,
      `<!-- WASIX_RUNTIME_MARK_START --><g transform="translate(65 57.333) scale(1.194444)">${paths(mark.lightInk, mark.darkAccent)}</g><!-- WASIX_RUNTIME_MARK_END -->`,
    );
  await fs.writeFile(ogPath, og);
  await sharp(Buffer.from(og)).png().toFile(path.join(publicDir, "og.png"));
}

generate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
