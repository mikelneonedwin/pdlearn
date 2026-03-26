import { motion } from "framer-motion"
import { XIcon } from "lucide-react"

import type { MockDocument } from "@/mocks/types"
import { useMemo } from "react"
import { getFileTypeIcon } from "./file-upload-zone"

export function FileChip({
  document,
  onRemove
}: {
  document: MockDocument
  onRemove: (id: string) => void
}) {
  const Icon = useMemo(() => getFileTypeIcon(document.type), [document.type])
  const sizeStr = formatSize(document.size)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 text-sm shadow-sm"
    >
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <span className="max-w-[120px] truncate">{document.name}</span>
      <span className="text-xs text-muted-foreground">{sizeStr}</span>
      <button
        onClick={() => onRemove(document.id)}
        className="ml-1 rounded-full p-0.5 opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
      >
        <XIcon className="size-3" />
      </button>
    </motion.div>
  )
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
