import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import Logo from "../components/Logo";
import FooterContent from "../components/FooterContent";
import "../styles/global.css";

const siteUrl = "https://wasix.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WASIX",
    template: "%s",
  },
  description: "The superset of WASI",
  applicationName: "WASIX",
  appleWebApp: { title: "WASIX" },
  openGraph: {
    siteName: "WASIX",
    images: "/og.png",
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
      {
        url: "/favicon-dark.png",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#fff",
  },
};

const banner = (
  <Banner storageKey="2.0-release">
    <Link href="/docs/language-guide/rust/tutorials/wasix-grpc">
      📖 New Tutorial released - WASIX with gRPC. Read the full tutorial →
    </Link>
  </Banner>
);

const navbar = (
  <Navbar
    logo={<Logo />}
    projectLink="https://github.com/wasix-org"
    chatLink="https://discord.gg/rWkMNStrEW"
  />
);

const footer = (
  <Footer>
    <FooterContent />
  </Footer>
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/wasix-org/wasix.org/tree/main"
          editLink="Edit this page on GitHub →"
          feedback={{ content: "Question? Give us feedback →", labels: "feedback" }}
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
