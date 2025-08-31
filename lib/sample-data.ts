import type { ContentResponse } from "@/types/content"

const body = `
# Markdown Demo

This page renders Markdown with **GFM**:

- Headings, bold/italic
- Lists and quotes
- Code blocks

\`\`\`ts
export const greet = (name: string) => \`Hello, \${name}!\`
\`\`\`

> Built with Next.js App Router + TailwindCSS.
`

const markdownBasicsBody = `
# Markdown basics for posts

## What is Markdown?
Markdown is a simple way to add formatting (like headings, bold, italic, links, and lists) to plain text.
Instead of using HTML tags, you use plain characters like \`#\`, \`*\`, and \`[]()\` that are easy to remember.

The best part? Markdown is supported almost everywhere — blogs, GitHub, Notion, and even some chat platforms.

### Quick examples
- \`# Heading 1\`, \`## Heading 2\`
- \`**bold**\`, \`*italic*\`
- Links: \`[title](https://example.com)\`
- Lists: \`- item\`, \`1. item\`
`

const swrBasicsBody = `
# SWR for fast data fetching

## What is SWR?
SWR stands for Stale-While-Revalidate, a caching strategy from HTTP RFC 5861.

- Stale: show cached (stale) data immediately.
- Revalidate: fetch the latest data in the background and update the UI when it arrives.

In simple terms: SWR gives you instant UI with background refreshes.

## Why use SWR?
Traditional \`useEffect + fetch\` can be clunky: the page may render empty first and you must hand-roll caching, refetching, and error handling.

SWR provides out of the box:
- Built‑in caching
- Automatic revalidation
- Request deduplication
- Real‑time data syncing
- Easy integration with any API
`

export const contentDB: ContentResponse = {
  blogs: [
    {
      type: "blog",
      slug: "getting-started",
      title: "Getting Started with the Showcase",
      excerpt: "Understand the structure and how to extend the app.",
      tags: ["guide", "nextjs"],
      date: "2025-08-01",
      cover: "/getting-started-cover.png",
      body,
    },
    {
      type: "blog",
      slug: "dark-mode",
      title: "Dark Mode with Tailwind",
      excerpt: "Implement a dark mode toggle using next-themes.",
      tags: ["tailwind", "theme"],
      date: "2025-08-05",
      cover: "/dark-mode-cover.png",
      body,
    },
    {
      type: "blog",
      slug: "markdown-basics",
      title: "Markdown Basics for Posts",
      excerpt: "Write rich content with headings, lists and code blocks.",
      tags: ["markdown", "content"],
      date: "2025-08-12",
      cover: "/markdown-basics.png",
      body: markdownBasicsBody,
    },
    {
      type: "blog",
      slug: "swr-data-fetching",
      title: "SWR for Fast Data Fetching",
      excerpt: "Leverage caching and revalidation for snappy UIs.",
      tags: ["swr", "data"],
      date: "2025-08-15",
      cover: "/swr-guide.png",
      body: swrBasicsBody,
    },
    {
      type: "blog",
      slug: "routing-in-next-app-router",
      title: "Routing with the App Router",
      excerpt: "Learn nested routes, dynamic segments, and API routes.",
      tags: ["nextjs", "routing"],
      date: "2025-08-20",
      cover: "/app-router.png",
      body,
    },
    // Additional blogs can be added here
  ],
  projects: [
    {
      type: "project",
      slug: "notes-app",
      title: "Notes App",
      excerpt: "A simple notes app with Markdown editing.",
      tags: ["app", "markdown"],
      date: "2025-08-08",
      cover: "/notes-app-cover.png",
      body,
    },
    {
      type: "project",
      slug: "planetary-api",
      title: "Planetary API",
      excerpt: "Demo REST API for planets and satellites.",
      tags: ["api", "typescript"],
      date: "2025-08-10",
      cover: "/planetary-api-cover.png",
      body,
    },
    {
      type: "project",
      slug: "portfolio-site",
      title: "Portfolio Site",
      excerpt: "A responsive portfolio built with Next.js and Tailwind.",
      tags: ["website", "tailwind"],
      date: "2025-08-18",
      cover: "/portfolio-site.png",
      body,
    },
    {
      type: "project",
      slug: "task-tracker",
      title: "Task Tracker",
      excerpt: "CRUD task manager with filters and persistence.",
      tags: ["app", "crud"],
      date: "2025-08-22",
      cover: "/task-tracker.png",
      body,
    },
    {
      type: "project",
      slug: "image-optimizer",
      title: "Image Optimizer",
      excerpt: "Optimize and compress images with a clean UI.",
      tags: ["tooling", "images"],
      date: "2025-08-25",
      cover: "/image-optimizer.png",
      body,
    },
    // Additional projects can be added here
  ],
}
