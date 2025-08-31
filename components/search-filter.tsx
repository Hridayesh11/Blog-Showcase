"use client"

type Props = {
  query: string
  onQuery: (v: string) => void
  type: "all" | "blog" | "project"
  onType: (v: "all" | "blog" | "project") => void
  allTags: string[]
  activeTag: string | "all"
  onTag: (v: string | "all") => void
  sort: "newest" | "oldest" | "az"
  onSort: (v: "newest" | "oldest" | "az") => void
  onReset?: () => void
}

export function SearchFilter({
  query,
  onQuery,
  type,
  onType,
  allTags,
  activeTag,
  onTag,
  sort,
  onSort,
  onReset,
}: Props) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <input
        aria-label="Search"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="Search by title or tag..."
        className="w-full rounded-md border bg-background px-3 py-2 md:max-w-sm"
      />
      <div className="flex flex-wrap items-center gap-2">
        <select
          aria-label="Type filter"
          value={type}
          onChange={(e) => onType(e.target.value as "all" | "blog" | "project")}
          className="rounded-md border bg-background px-3 py-2"
        >
          <option value="all">All</option>
          <option value="blog">Blogs</option>
          <option value="project">Projects</option>
        </select>

        <select
          aria-label="Tag filter"
          value={activeTag}
          onChange={(e) => onTag(e.target.value as any)}
          className="rounded-md border bg-background px-3 py-2"
        >
          <option value="all">All tags</option>
          {allTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          aria-label="Sort"
          value={sort}
          onChange={(e) => onSort(e.target.value as "newest" | "oldest" | "az")}
          className="rounded-md border bg-background px-3 py-2"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">A–Z</option>
        </select>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
            aria-label="Reset filters"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
