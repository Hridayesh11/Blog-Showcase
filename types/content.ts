export type BaseItem = {
  type: "blog" | "project"
  slug: string
  title: string
  excerpt: string
  tags: string[]
  date?: string
  cover?: string
  body: string // markdown
}

export type ContentResponse = {
  blogs: BaseItem[]
  projects: BaseItem[]
}
