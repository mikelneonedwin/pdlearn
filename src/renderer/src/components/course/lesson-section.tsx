import { ScrollArea } from "@/components/ui/scroll-area"
import type { Section } from "@/mocks/types"

export function LessonSection({ section }: { section: Section }) {
  if (!section.content) {
    return <div className="p-8 text-muted-foreground">No content available.</div>
  }

  return (
    <ScrollArea className="flex-1">
      <article className="prose prose-neutral dark:prose-invert max-w-none p-8">
        <MarkdownContent content={section.content} />
      </article>
    </ScrollArea>
  )
}

/**
 * Simple mock markdown renderer.
 * In production, replace with react-markdown or similar.
 */
function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    // Code blocks
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      elements.push(
        <div key={key++} className="my-4 overflow-hidden rounded-lg border bg-muted">
          {lang && (
            <>
              <div className="border-b bg-muted/50 px-4 py-1.5">
                <span className="text-xs font-medium text-muted-foreground">{lang}</span>
              </div>
            </>
          )}
          <pre className="overflow-x-auto p-4">
            <code className="text-sm">{codeLines.join("\n")}</code>
          </pre>
        </div>
      )
      continue
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="mb-3 mt-6 text-lg font-semibold">
          {renderInline(line.slice(4))}
        </h3>
      )
      i++
      continue
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="mb-4 mt-8 text-xl font-bold">
          {renderInline(line.slice(3))}
        </h2>
      )
      i++
      continue
    }

    // Blockquotes
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={key++}
          className="my-4 border-l-4 border-primary/30 pl-4 text-muted-foreground italic"
        >
          {renderInline(line.slice(2))}
        </blockquote>
      )
      i++
      continue
    }

    // Tables
    if (line.includes("|") && line.trim().startsWith("|")) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i])
        i++
      }
      elements.push(<SimpleTable key={key++} lines={tableLines} />)
      continue
    }

    // Unordered list items
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = []
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={key++} className="my-3 flex flex-col gap-1.5 pl-5 list-disc">
          {items.map((item, idx) => (
            <li key={idx} className="text-sm leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Ordered list items
    if (/^\d+\. /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""))
        i++
      }
      elements.push(
        <ol key={key++} className="my-3 flex flex-col gap-1.5 pl-5 list-decimal">
          {items.map((item, idx) => (
            <li key={idx} className="text-sm leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Empty line
    if (line.trim() === "") {
      i++
      continue
    }

    // Paragraph
    elements.push(
      <p key={key++} className="my-2 text-sm leading-relaxed">
        {renderInline(line)}
      </p>
    )
    i++
  }

  return <>{elements}</>
}

function renderInline(text: string): React.ReactNode {
  // Bold
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    // Inline code
    const codeParts = part.split(/(`[^`]+`)/g)
    return codeParts.map((cp, j) => {
      if (cp.startsWith("`") && cp.endsWith("`")) {
        return (
          <code key={`${i}-${j}`} className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
            {cp.slice(1, -1)}
          </code>
        )
      }
      return <span key={`${i}-${j}`}>{cp}</span>
    })
  })
}

function SimpleTable({ lines }: { lines: string[] }) {
  const parseLine = (line: string) =>
    line
      .split("|")
      .filter(Boolean)
      .map((cell) => cell.trim())

  if (lines.length < 2) return null

  const headers = parseLine(lines[0])
  // Skip separator line (lines[1])
  const rows = lines.slice(2).map(parseLine)

  return (
    <div className="my-4 overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
