import type { Metadata } from "next";
import { Layout } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import "../styles/global.css";
import "../styles/docs.css";
import "../styles/header.css";

const siteUrl = "https://wasix.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WASIX — Your code. Unbound.",
    template: "%s",
  },
  description:
    "The power of POSIX. The portability of WebAssembly. Compile C, C++, and Rust with WASIX: threads, networking, processes, and more.",
  applicationName: "WASIX",
  appleWebApp: { title: "WASIX" },
  openGraph: {
    siteName: "WASIX",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "WASIX — Your code. Unbound. The power of POSIX. The portability of WebAssembly.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: "/og.png",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#fff",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <Head
        color={{
          hue: 82,
          saturation: { light: 35, dark: 65 },
          lightness: { light: 35, dark: 70 },
        }}
        backgroundColor={{ light: "#f9faf6", dark: "#1d2419" }}
      />
      <body>
        <Layout
          navbar={<SiteNavbar key="navbar" />}
          search={null}
          footer={<SiteFooter key="footer" />}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/wasix-org/wasix.org/tree/main"
          editLink="Edit this page on GitHub →"
          feedback={{
            content: "Question? Give us feedback →",
            labels: "feedback",
          }}
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
