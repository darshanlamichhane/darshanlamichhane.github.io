# Adding a writing article

Articles are plain static HTML pages. There is no CMS or build step.

1. Create `writing/<article-slug>/index.html`, for example `writing/debugging-a-worker/index.html`.
2. Add the article title and a publication date only when you are ready to publish and can verify the date. Use semantic `<article>`, `<header>`, and heading elements. Add a `<time datetime="YYYY-MM-DD">` only when the date is known.
3. Give the page a unique `<title>` and description. Set its canonical and `og:url` to `https://darshanlamichhane.com.np/writing/<article-slug>/`. Use the article's real title and summary in its Open Graph and X metadata. Reuse `/styles.css` and the existing favicon paths.
4. Add article links to `writing/index.html`, newest first. Add up to three recent links to the homepage Writing section. Remove the writing index empty-state sentence once the first article is published.
5. Add the canonical article URL as a `<url><loc>…</loc></url>` entry in `sitemap.xml`. Do not add a `lastmod` unless you maintain a verified date.

Only add `BlogPosting` JSON-LD for a published article. Include accurate title, author, URL, and description. Include `datePublished` or `dateModified` only when verified. Never add structured data for a draft or nonexistent article.
