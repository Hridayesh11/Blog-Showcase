"use client"

import useSWR from "swr"
import { useParams } from "next/navigation"
import { MDContent } from "@/components/md-content"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useSWR(slug ? `/api/content/blogs/${slug}` : null, fetcher)

  if (!data) return <div className="container mx-auto px-4 py-8">Loading…</div>

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="mx-auto max-w-3xl">
        <img
          src={data.cover || "/placeholder.svg?height=240&width=800&query=Blog%20detail%20cover" || "/placeholder.svg"}
          alt={`${data.title} cover`}
          className="mb-6 w-full rounded-xl border"
        />
        <h1 className="text-balance text-3xl font-bold">{data.title}</h1>
        <p className="mt-2 text-muted-foreground">{data.excerpt}</p>
        <div className="mt-6">
          <MDContent markdown={data.body} />
        </div>
      </article>
    </main>
  )
}
