import { NextResponse } from "next/server"
import { contentDB } from "@/lib/sample-data"

type Params = { params: { type: "blogs" | "projects"; slug: string } }

export async function GET(_: Request, { params }: Params) {
  const list = params.type === "blogs" ? contentDB.blogs : contentDB.projects
  const item = list.find((i) => i.slug === params.slug)
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(item)
}
