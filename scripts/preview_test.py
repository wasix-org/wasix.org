"""Check real HTTP responses for browser and agent Markdown requests."""

from functools import partial
from http.client import HTTPConnection
from http.server import ThreadingHTTPServer
from pathlib import Path
from tempfile import TemporaryDirectory
from threading import Thread
import unittest

from preview import PreviewHandler


class QuietHandler(PreviewHandler):
    def log_message(self, *_args):
        pass


class PreviewTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.directory = TemporaryDirectory()
        root = Path(cls.directory.name)
        (root / "docs").mkdir()
        cls.markdown = "# WASIX\n\nC, C++, and Rust → WebAssembly.\n".encode()
        for name in (".md", "docs.md", "docs/.md"):
            (root / name).write_bytes(cls.markdown)
        (root / "index.html").write_text("<h1>WASIX</h1>")
        cls.server = ThreadingHTTPServer(
            ("127.0.0.1", 0), partial(QuietHandler, directory=str(root))
        )
        cls.thread = Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()
        cls.directory.cleanup()

    def request(self, route, method="GET", headers=None):
        connection = HTTPConnection("127.0.0.1", self.server.server_port)
        try:
            connection.request(method, route, headers=headers or {})
            response = connection.getresponse()
            return response.status, dict(response.getheaders()), response.read()
        finally:
            connection.close()

    def test_markdown_displays_inline_for_browsers(self):
        for route in ("/.md", "/docs.md", "/docs/.md", "/docs.md?view=raw"):
            for accept in ("*/*", "text/html,application/xhtml+xml"):
                with self.subTest(route=route, accept=accept):
                    status, headers, body = self.request(
                        route, headers={"Accept": accept}
                    )
                    self.assertEqual(status, 200)
                    self.assertEqual(headers["Content-type"], "text/plain; charset=utf-8")
                    self.assertEqual(headers["Content-Disposition"], "inline")
                    self.assertEqual(headers["Vary"], "Accept")
                    self.assertEqual(body, self.markdown)

    def test_agents_receive_markdown_and_head_has_no_body(self):
        for method in ("GET", "HEAD"):
            status, headers, body = self.request(
                "/.md", method, {"Accept": "text/markdown"}
            )
            self.assertEqual(status, 200)
            self.assertEqual(headers["Content-type"], "text/markdown; charset=utf-8")
            self.assertEqual(body, self.markdown if method == "GET" else b"")

    def test_old_download_responses_are_not_reused(self):
        status, headers, body = self.request(
            "/.md", headers={"If-Modified-Since": "Wed, 01 Jan 2098 00:00:00 GMT"}
        )
        self.assertEqual(status, 200)
        self.assertEqual(headers["Content-type"], "text/plain; charset=utf-8")
        self.assertEqual(body, self.markdown)

    def test_html_stays_html_and_missing_files_stay_404(self):
        status, headers, body = self.request("/")
        self.assertEqual(status, 200)
        self.assertEqual(headers["Content-type"], "text/html")
        self.assertNotIn("Content-Disposition", headers)
        self.assertEqual(body, b"<h1>WASIX</h1>")
        self.assertEqual(self.request("/missing.md")[0], 404)


if __name__ == "__main__":
    unittest.main()
