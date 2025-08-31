"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

export default function CreateHomeButton() {
  const pathname = usePathname()
  // Only show on the homepage
  if (pathname !== "/") return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button asChild size="lg" className="shadow-lg" aria-label="Create a new blog post">
        <Link href="/admin/blogs">
          <Pencil className="mr-2 h-4 w-4" />
          Create Blog
        </Link>
      </Button>
    </div>
  )
}
