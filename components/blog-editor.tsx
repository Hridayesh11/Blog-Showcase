"use client"

import { useEffect, useMemo, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MDContent } from "@/components/md-content"
import { cn } from "@/lib/utils"

type BlogDraft = {
  type: "blog"
  title: string
  slug: string
  excerpt: string
  tags: string[]
  date: string
  cover?: string
  markdown: string
}

const STORAGE_KEY = "userBlogs"

function readDrafts(): BlogDraft[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as BlogDraft[]) : []
  } catch {
    return []
  }
}

function writeDrafts(drafts: BlogDraft[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts))
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

const emptyDraft: BlogDraft = {
  type: "blog",
  title: "",
  slug: "",
  excerpt: "",
  tags: [],
  date: new Date().toISOString().slice(0, 10),
  cover: "/generic-book-cover.png",
  markdown: "# New Post\n\nWrite your content here...",
}

export function BlogEditor() {
  const [drafts, setDrafts] = useState<BlogDraft[]>([])
  const [draft, setDraft] = useState<BlogDraft>(emptyDraft)
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setDrafts(readDrafts())
  }, [])

  // Auto-generate slug when title changes
  const updateTitle = (title: string) => {
    setDraft((d) => ({ ...d, title, slug: slugify(title) }))
  }

  const updateField = <K extends keyof BlogDraft>(key: K, value: BlogDraft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }))
  }

  const debouncedAutoExcerpt = useDebouncedCallback((markdown: string) => {
    if (!draft.excerpt) {
      const firstLine =
        markdown
          .replace(/\r\n/g, "\n")
          .split("\n")
          .find((l) => l && !l.startsWith("#")) || ""
      setDraft((d) => ({ ...d, excerpt: firstLine.slice(0, 180) }))
    }
  }, 400)

  useEffect(() => {
    debouncedAutoExcerpt(draft.markdown)
  }, [draft.markdown, debouncedAutoExcerpt])

  const saveDraft = () => {
    if (!draft.title || !draft.slug) {
      alert("Please add a title to generate a slug.")
      return
    }
    setSaving(true)
    const next = [...drafts]
    const idx = next.findIndex((d) => d.slug === draft.slug)
    if (idx >= 0) next[idx] = draft
    else next.unshift(draft)
    writeDrafts(next)
    setDrafts(next)
    setSelectedSlug(draft.slug)
    setSaving(false)
  }

  const newDraft = () => {
    setSelectedSlug(null)
    setDraft({ ...emptyDraft, date: new Date().toISOString().slice(0, 10) })
  }

  const loadDraft = (slug: string) => {
    const d = drafts.find((x) => x.slug === slug)
    if (d) {
      setSelectedSlug(slug)
      setDraft(d)
    }
  }

  const deleteDraft = () => {
    if (!selectedSlug) return
    const next = drafts.filter((d) => d.slug !== selectedSlug)
    writeDrafts(next)
    setDrafts(next)
    newDraft()
  }

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${draft.slug || "blog-draft"}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const tagsText = useMemo(() => draft.tags.join(", "), [draft.tags])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Drafts list */}
      <Card className="md:col-span-1 h-fit sticky top-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Your Drafts</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {drafts.length === 0 && (
            <p className="text-sm text-muted-foreground">No drafts yet. Create your first blog post.</p>
          )}
          <div className="flex flex-col gap-1">
            {drafts.map((d) => (
              <button
                key={d.slug}
                onClick={() => loadDraft(d.slug)}
                className={cn(
                  "text-left text-sm rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground",
                  selectedSlug === d.slug && "bg-accent text-accent-foreground",
                )}
              >
                <div className="font-medium">{d.title || d.slug}</div>
                <div className="text-muted-foreground text-xs">{d.date}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {d.tags.slice(0, 3).map((t) => (
                    <Badge key={t} variant="secondary" className="text-[10px]">
                      {t}
                    </Badge>
                  ))}
                </div>
              </button>
            ))}
          </div>
          <Separator className="my-3" />
          <div className="flex gap-2">
            <Button onClick={newDraft} variant="secondary">
              New
            </Button>
            <Button onClick={saveDraft} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
            <Button onClick={deleteDraft} variant="destructive" disabled={!selectedSlug}>
              Delete
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportJSON} variant="outline">
              Export JSON
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(draft.markdown || "")
              }}
            >
              Copy Markdown
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Editor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={draft.title}
                placeholder="My awesome post"
                onChange={(e) => updateTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Slug</label>
              <Input
                value={draft.slug}
                placeholder="my-awesome-post"
                onChange={(e) => updateField("slug", slugify(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Tags (comma separated)</label>
              <Input
                value={tagsText}
                placeholder="nextjs, react, tips"
                onChange={(e) =>
                  updateField(
                    "tags",
                    e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  )
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={draft.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Cover URL</label>
            <Input
              value={draft.cover || ""}
              onChange={(e) => updateField("cover", e.target.value)}
              placeholder="/generic-book-cover.png"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Excerpt</label>
            <Textarea
              value={draft.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              placeholder="A short summary that appears on the card."
              className="mt-1"
              rows={3}
            />
          </div>

          <Tabs defaultValue="write">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="write" className="mt-3">
              <Textarea
                value={draft.markdown}
                onChange={(e) => updateField("markdown", e.target.value)}
                rows={16}
                className="font-mono"
                placeholder="# Heading 1\n\nWrite markdown here..."
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-3">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <MDContent markdown={draft.markdown} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
