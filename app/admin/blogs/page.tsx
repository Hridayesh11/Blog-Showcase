"use client"

import { BlogEditor } from "@/components/blog-editor"

export default function AdminBlogsPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight mb-6 text-balance">Write Blog</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Create, edit, and manage your local drafts. Drafts are saved to your browser’s localStorage and appear instantly
        in the editor. Use Export JSON to back up or share content. You can copy Markdown to reuse anywhere.
      </p>
      <BlogEditor />
    </main>
  )
}
