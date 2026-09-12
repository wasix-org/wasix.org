import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "../../mdx-components";
import { markdownPath } from "../../lib/markdown-path.mjs";

type PageProps = {
  params: Promise<{ mdxPath?: string[] }>;
};

export const generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(params.mdxPath);
  // React hoists this into <head>. The metadata API adds a trailing slash to
  // the root dotfile URL when trailingSlash is enabled.
  const markdownAlternate = (
    <link
      rel="alternate"
      type="text/markdown"
      href={markdownPath(`/${(params.mdxPath || []).join("/")}`)}
    />
  );
  if (!params.mdxPath?.length || params.mdxPath.join("/") === "builds") {
    return (
      <>
        {markdownAlternate}
        <main id="nextra-skip-nav" data-pagefind-body>
          <MDXContent {...props} params={params} />
        </main>
      </>
    );
  }
  const section = params.mdxPath?.[1];
  const sectionLabels: Record<string, string> = {
    "language-guide": "LANGUAGE GUIDE",
    "api-reference": "API REFERENCE",
    "developer-guide": "DEVELOPER GUIDE",
    explanation: "THE WASIX PLATFORM",
    "community-and-governance": "COMMUNITY",
  };
  const sectionLabel = section
    ? sectionLabels[section] || "DOCUMENTATION"
    : "START HERE";
  return (
    <>
      {markdownAlternate}
      <div
        className="docs-layout"
        data-docs-page={params.mdxPath?.slice(1).join("/") || "overview"}
      >
        <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
          <div className="docs-page-eyebrow" data-pagefind-ignore>
            <span /> WASIX / {sectionLabel}
          </div>
          <MDXContent {...props} params={params} />
        </Wrapper>
      </div>
    </>
  );
}
