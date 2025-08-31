import Link from "next/link"
import type { BaseItem } from "@/types/content"

function formatDate(d?: string) {
  if (!d) return ""
  try {
    return new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return d
  }
}

export function ContentCard({ item }: { item: BaseItem }) {
  const href = item.type === "blog" ? `/posts/${item.slug}` : `/projects/${item.slug}`

  return (
    <article className="group rounded-xl border bg-card p-4 transition hover:shadow-sm">
      <Link
        href={href}
        className="block"
        aria-label={`${item.type === "blog" ? "Read post" : "View project"}: ${item.title}`}
      >
        <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-muted">
          <img
            src={item.cover || "/placeholder.svg?height=180&width=320&query=Card%20cover%20image" || "/placeholder.svg"}
            alt={`${item.title} cover`}
            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          />
        </div>
        <h3 className="mt-3 text-lg font-semibold text-pretty">{item.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span key={t} className="rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <time dateTime={item.date || undefined}>{formatDate(item.date)}</time>
          <span className="inline-flex items-center gap-1">
            {item.type === "blog" ? "Read post" : "View project"}
            <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </article>
  )
}
