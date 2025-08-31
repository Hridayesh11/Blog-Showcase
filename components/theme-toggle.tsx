"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Avoid hydration mismatch; render disabled skeleton until mounted
  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-1">
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs bg-background text-muted-foreground opacity-60"
          aria-hidden
          disabled
        >
          <Sun className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Light</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs bg-background text-muted-foreground opacity-60"
          aria-hidden
          disabled
        >
          <Moon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Dark</span>
        </button>
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="inline-flex items-center gap-1">
      <button
        type="button"
        aria-label="Set light theme"
        className={cn(
          "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition",
          !isDark ? "bg-primary text-primary-foreground" : "bg-background hover:bg-accent",
        )}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Light</span>
      </button>
      <button
        type="button"
        aria-label="Set dark theme"
        className={cn(
          "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition",
          isDark ? "bg-primary text-primary-foreground" : "bg-background hover:bg-accent",
        )}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Dark</span>
      </button>
    </div>
  )
}
