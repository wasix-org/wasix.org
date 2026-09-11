# WASIX Docs

Source of [wasix.org](https://wasix.org). Built with [Next.js](https://nextjs.org) and
[Nextra](https://nextra.site), exported as a static site and served on
[Wasmer Edge](https://wasmer.io/products/edge) by `wasmer/static-web-server`.

## Local development

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000/`.

Docs live in `content/`. Sidebar order and titles come from the `_meta.ts` file
in each folder.

## Build and preview the static site

```bash
pnpm build          # writes the static site to ./out and the search index to ./out/_pagefind
pnpm preview        # serves ./out with wasmer/static-web-server on http://localhost:8080
```

## Deploy

Pushes to `main` build and deploy via GitHub Actions. To deploy manually:

```bash
pnpm build
wasmer deploy --owner wasmer --non-interactive
```

## Notes

`zod` is pinned below 4.4 through `pnpm.overrides` in `package.json`. Nextra 4.6.1 strips
`children` before validating the `Layout` props and zod 4.4+ rejects that
(see [shuding/nextra#5008](https://github.com/shuding/nextra/issues/5008)). Drop the pin once
a Nextra release includes the fix.
