import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import Logo from "./Logo";
import ByWasmer from "./ByWasmer";

export default function FooterContent() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-main">
        <div>
          <div className="site-brand">
            <Link href="/" aria-label="WASIX home">
              <Logo />
            </Link>
            <ByWasmer />
          </div>
          <p>
            More possibility.
            <br />
            Same WebAssembly.
          </p>
        </div>
        <div className="footer-links">
          <span>BUILD</span>
          <Link href="/#install">Install WASIX</Link>
          <Link href="/builds">Explore builds</Link>
          <Link href="/docs">Documentation</Link>
        </div>
        <div className="footer-links">
          <span>EXPLORE</span>
          <Link href="/docs/api-reference">API reference</Link>
          <a href="https://github.com/wasix-org/wasinix">
            wasinix <LuArrowUpRight />
          </a>
          <a href="https://github.com/wasix-org">
            GitHub <LuArrowUpRight />
          </a>
        </div>
        <div className="footer-links">
          <span>CONNECT</span>
          <a href="https://discord.gg/rWkMNStrEW">
            Discord <LuArrowUpRight />
          </a>
          <Link href="/docs/community-and-governance">Community</Link>
          <a href="https://wasmer.io">
            Wasmer <LuArrowUpRight />
          </a>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>© {new Date().getFullYear()} Wasmer, Inc.</span>
        <span>Open source. Built for what’s next.</span>
        <a href="https://wasmer.io">
          Made with care at <strong>Wasmer ↗</strong>
        </a>
      </div>
    </footer>
  );
}
