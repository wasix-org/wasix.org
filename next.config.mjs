import nextra from "nextra";

const withNextra = nextra({
  defaultShowCopyCode: true,
});

export default withNextra({
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
});
