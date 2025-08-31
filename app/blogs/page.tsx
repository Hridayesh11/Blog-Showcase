"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export default function BlogsIndex() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/?type=blog")
  }, [router])
  return null
}
