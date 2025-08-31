import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function MDContent({ markdown }: { markdown: string }) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  )
}
