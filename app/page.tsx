"use client"

import useSWR from "swr"
import { useMemo, useState, useEffect } from "react"
import type { ContentResponse, BaseItem } from "@/types/content"
import { SearchFilter } from "@/components/search-filter"
import { ContentCard } from "@/components/content-card"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function HomePage() {
  const { data } = useSWR<ContentResponse>("/api/content", fetcher)
  const params = useSearchParams()

  const [query, setQuery] = useState("")
  const [type, setType] = useState<"all" | "blog" | "project">("all")
  const [tag, setTag] = useState<string | "all">("all")
  const [sort, setSort] = useState<"newest" | "oldest" | "az">("newest")
  const [visible, setVisible] = useState(6)

  useEffect(() => {
    const pType = params.get("type")
    if (pType === "blog" || pType === "project") setType(pType)
  }, [params])

  const items: BaseItem[] = useMemo(() => {
    if (!data) return []
    return [...data.blogs, ...data.projects]
  }, [data])

  const allTags = useMemo(() => {
    const s = new Set<string>()
    items.forEach((i) => i.tags.forEach((t) => s.add(t)))
    return Array.from(s).sort()
  }, [items])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return items.filter((i) => {
      const typeOk = type === "all" || i.type === type
      const qOk = !q || i.title.toLowerCase().includes(q) || i.tags.some((t) => t.toLowerCase().includes(q))
      const tagOk = tag === "all" || i.tags.includes(tag)
      return typeOk && qOk && tagOk
    })
  }, [items, query, type, tag])

  const filteredSorted = useMemo(() => {
    const list = [...filtered]
    if (sort === "az") {
      return list.sort((a, b) => a.title.localeCompare(b.title))
    }
    const getTime = (i: BaseItem) => (i.date ? new Date(i.date).getTime() : 0)
    return list.sort((a, b) => (sort === "newest" ? getTime(b) - getTime(a) : getTime(a) - getTime(b)))
  }, [filtered, sort])

  const visibleItems = useMemo(() => filteredSorted.slice(0, visible), [filteredSorted, visible])

  const totals = {
    blogs: data?.blogs.length ?? 0,
    projects: data?.projects.length ?? 0,
    tags: allTags.length,
  }

  const handleReset = () => {
    setQuery("")
    setType("all")
    setTag("all")
    setSort("newest")
    setVisible(6)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-10">
        <div>
          <h1 className="text-balance text-3xl font-bold md:text-4xl">Blog & Project Showcase</h1>
          <p className="mt-2 text-muted-foreground">
            Cards on the homepage, Markdown details pages, dark mode, and search/filter.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 md:max-w-lg">
          <div className="rounded-lg border bg-card p-3 text-center">
            <div className="text-sm text-muted-foreground">Blogs</div>
            <div className="text-xl font-semibold">{totals.blogs}</div>
          </div>
          <div className="rounded-lg border bg-card p-3 text-center">
            <div className="text-sm text-muted-foreground">Projects</div>
            <div className="text-xl font-semibold">{totals.projects}</div>
          </div>
          <div className="rounded-lg border bg-card p-3 text-center">
            <div className="text-sm text-muted-foreground">Tags</div>
            <div className="text-xl font-semibold">{totals.tags}</div>
          </div>
        </div>
      </section>

      <SearchFilter
        query={query}
        onQuery={setQuery}
        type={type}
        onType={(v) => {
          setType(v)
          setVisible(6)
        }}
        allTags={allTags}
        activeTag={tag}
        onTag={(v) => {
          setTag(v)
          setVisible(6)
        }}
        sort={sort}
        onSort={(v) => {
          setSort(v)
          setVisible(6)
        }}
        onReset={handleReset}
      />

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {allTags.map((t) => {
          const active = tag === t
          return (
            <button
              key={t}
              type="button"
              aria-pressed={active}
              onClick={() => setTag(active ? "all" : t)}
              className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs ${
                active ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"
              }`}
              title={`Filter by ${t}`}
            >
              {t}
            </button>
          )
        })}
      </div>

      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => (
          <ContentCard key={`${item.type}-${item.slug}`} item={item} />
        ))}
      </section>

      {filteredSorted.length === 0 && (
        <p className="mt-6 text-center text-sm text-muted-foreground">No results. Try adjusting your filters.</p>
      )}

      {visible < filteredSorted.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + 6)}
            className="rounded-md border bg-background px-4 py-2 text-sm hover:bg-muted"
            aria-label="Load more"
          >
            Load more
          </button>
        </div>
      )}

      <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-pretty text-xl font-semibold">About the Blog Posts</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Short, practical articles covering Next.js, TailwindCSS, and front‑end patterns. Each post supports full
            Markdown so you’ll find code blocks, lists, and links for further reading.
          </p>
          <div className="mt-4">
            <Link href="/blogs" className="text-sm font-medium text-primary hover:underline">
              Browse all blogs →
            </Link>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-pretty text-xl font-semibold">About the Projects</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A curated set of demo apps and utilities showcasing component‑based architecture and responsive design.
            Explore source links and live previews where available.
          </p>
          <div className="mt-4">
            <Link href="/projects" className="text-sm font-medium text-primary hover:underline">
              Explore all projects →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
