import type { MetaRecord } from "nextra";

const meta: MetaRecord = {
  index: {
    type: "page",
    title: "WASIX",
    display: "hidden",
    theme: {
      layout: "full",
      sidebar: false,
      toc: false,
      breadcrumb: false,
      pagination: false,
      timestamp: false,
      copyPage: false,
    },
  },
  features: { type: "page", title: "Features", href: "/#features" },
  builds: {
    type: "page",
    title: "Builds",
    theme: {
      layout: "full",
      sidebar: false,
      toc: false,
      breadcrumb: false,
      pagination: false,
      timestamp: false,
      copyPage: false,
    },
  },
  docs: {
    type: "page",
    title: "Documentation",
  },
};

export default meta;
