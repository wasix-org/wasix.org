/** The root follows Cloudflare's /.md convention; other pages use /path.md. */
export function markdownPath(pathname = "/") {
  return `${pathname.replace(/\/+$/, "") || "/"}.md`;
}
