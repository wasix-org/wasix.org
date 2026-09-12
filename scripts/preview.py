"""Preview the static export, including inline Markdown documents."""

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit


class PreviewHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        if urlsplit(self.path).path.lower().endswith(".md"):
            # Do not reuse a cached binary response from the old preview server.
            if "If-Modified-Since" in self.headers:
                del self.headers["If-Modified-Since"]
        return super().send_head()

    def guess_type(self, path):
        # Extension lookup misses dotfiles such as the homepage's /.md.
        if path.lower().endswith(".md"):
            accept = self.headers.get("Accept", "").lower()
            if "text/markdown" not in accept:
                # Some browsers download unknown text/* subtypes even with
                # Content-Disposition: inline. Keep the exact Markdown body.
                return "text/plain; charset=utf-8"
            return "text/markdown; charset=utf-8"
        return super().guess_type(path)

    def end_headers(self):
        if urlsplit(self.path).path.lower().endswith(".md"):
            self.send_header("Content-Disposition", "inline")
            self.send_header("Vary", "Accept")
        # Rebuilds must be visible immediately in the local preview.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8080)
    args = parser.parse_args()
    output = Path(__file__).resolve().parent.parent / "out"
    if not (output / "index.html").is_file():
        parser.error("No static export found. Run pnpm build first.")
    server = ThreadingHTTPServer(
        ("127.0.0.1", args.port), partial(PreviewHandler, directory=str(output))
    )
    print(f"Preview: http://127.0.0.1:{args.port}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
