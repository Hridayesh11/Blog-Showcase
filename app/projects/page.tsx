"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export default function ProjectsIndex() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/?type=project")
  }, [router])
  return null
}
