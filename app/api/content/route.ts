import { NextResponse } from "next/server"
import { contentDB } from "@/lib/sample-data"

export async function GET() {
  return NextResponse.json(contentDB)
}
