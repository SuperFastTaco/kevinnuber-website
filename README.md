# Kevin Nuber's personal website

A personal coming-soon page for kevinnuber.com, plus an unlisted motion graphics library at `/mglibrary`. No external services or runtime dependencies are required.

## Preview

```sh
npm run build
npm run preview
```

Open http://127.0.0.1:4173, or http://127.0.0.1:4173/mglibrary for the library. Vercel publishes the homepage files and the library snapshot in `dist/`. Former work URLs show the homepage placeholder.

## Update the library

The `mglibrary/` folder is a deployment snapshot of the original motion library's published `site/` folder. It includes all 32 MP4 previews, posters, prompts, fonts, and source references. To refresh it after editing and publishing the original library:

```sh
node scripts/sync-mglibrary.mjs /path/to/bombbomb-motion-library/site
npm run build
```

The sync command adds the deployment base URL and search indexing meta tag without changing the original library. There is no homepage navigation to the library. All deployed pages have `X-Robots-Tag: noindex, nofollow`, and `robots.txt` disallows crawling. This is an unlisted public page, not access-controlled content.

## Recover the original website

The full former website and its Git history remain available at the recovery tag `archive/2026-10-14-before-personal-site`. For the original content before the shutdown redirect, inspect commit `d51e223` in a separate checkout. Only restore former professional content to a live site when approved.
