import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  PresentationIcon,
  UploadCloudIcon,
  FileTypeIcon
} from "lucide-react"
import { useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import type { DocumentType, MockDocument } from "@/mocks/types"

const ACCEPTED_TYPES: Record<string, DocumentType> = {
  "application/pdf": "pdf",
  "image/png": "image",
  "image/jpeg": "image",
  "image/gif": "image",
  "image/webp": "image",
  "application/msword": "word",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "word",
  "application/vnd.ms-powerpoint": "slides",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "slides",
  "text/plain": "text"
}

function getDocumentType(mimeType: string): DocumentType {
  return ACCEPTED_TYPES[mimeType] ?? "text"
}

export function getFileTypeIcon(type: DocumentType) {
  switch (type) {
    case "pdf":
      return FileTextIcon
    case "image":
      return ImageIcon
    case "word":
      return FileTypeIcon
    case "slides":
      return PresentationIcon
    case "text":
      return FileIcon
    default:
      return FileIcon
  }
}

export function FileUploadZone({ onFilesAdded }: { onFilesAdded: (docs: MockDocument[]) => void }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      const docs: MockDocument[] = files.map((file) => ({
        id: `doc-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: file.name,
        type: getDocumentType(file.type),
        size: file.size,
        addedAt: new Date().toISOString()
      }))

      onFilesAdded(docs)
    },
    [onFilesAdded]
  )

  const handleClick = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.multiple = true
    input.accept = Object.keys(ACCEPTED_TYPES).join(",")
    input.onchange = () => {
      const files = Array.from(input.files ?? [])
      const docs: MockDocument[] = files.map((file) => ({
        id: `doc-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: file.name,
        type: getDocumentType(file.type),
        size: file.size,
        addedAt: new Date().toISOString()
      }))
      onFilesAdded(docs)
    }
    input.click()
  }, [onFilesAdded])

  return (
    <motion.div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      animate={{
        scale: isDragging ? 1.02 : 1,
        borderColor: isDragging ? "var(--primary)" : "var(--border)"
      }}
      className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed p-8 transition-colors hover:border-primary/50 hover:bg-muted/30"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDragging ? "dragging" : "idle"}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="flex flex-col items-center gap-2"
        >
          <UploadCloudIcon className="size-10 text-muted-foreground/60" />
          <p className="text-sm font-medium text-muted-foreground">
            {isDragging ? "Drop your files here" : "Drag & drop files, or click to browse"}
          </p>
          <p className="text-xs text-muted-foreground/60">PDF, Images, Word, Slides, Text files</p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
