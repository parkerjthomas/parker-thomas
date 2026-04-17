---
description: Use when creating a new blog post for the /writing section
---

# How to Add a Blog Post

## File location

```
src/content/posts/
  your-post-slug.mdx
```

## MDX frontmatter schema

```mdx
---
title: "Your Post Title"
date: "2026-04-16"
description: "One sentence SEO description."
author: "Parker Thomas"
tags: ["web-design", "local-business"]
---

Post content here in MDX...
```

## Required fields

- `title` — used in `<title>` and as the H1
- `date` — ISO format `YYYY-MM-DD`
- `description` — used in meta description and post cards
- `author` — always "Parker Thomas"

## Optional fields

- `tags` — array of strings, used for filtering
- `featured` — boolean, shows post in featured slot on /writing

## After adding a post

1. Add to `src/app/sitemap.ts` dynamically (or re-run sitemap generation)
2. Confirm post appears at `/writing/your-post-slug` in dev
3. Confirm meta title and description are correct
