import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BotIcon, SendIcon, SparklesIcon, TerminalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileUploadZone } from "@/components/upload/file-upload-zone"
import { FileChip } from "@/components/upload/file-chip"
import { useAgents } from "@/mocks/hooks"
import type { MockDocument } from "@/mocks/types"

export const Route = createFileRoute("/")({ component: HomePage })

function getAgentIcon(icon: string) {
  switch (icon) {
    case "terminal":
      return TerminalIcon
    case "sparkles":
      return SparklesIcon
    case "bot":
      return BotIcon
    default:
      return BotIcon
  }
}

function HomePage() {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<MockDocument[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    agents,
    selectedAgentId,
    selectedModelId,
    selectAgent,
    setSelectedModelId,
    selectedAgent
  } = useAgents()

  const handleFilesAdded = (docs: MockDocument[]) => {
    setUploadedFiles((prev) => [...prev, ...docs])
  }

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((d) => d.id !== id))
  }

  const handleSubmit = () => {
    if (uploadedFiles.length === 0 && !prompt.trim()) return

    setIsSubmitting(true)
    // Simulate a small delay then navigate to processing
    setTimeout(() => {
      navigate({ to: "/processing" })
    }, 500)
  }

  return (
    <ScrollArea className="flex-1">
      <div className="flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold tracking-tight"
            >
              Create a new course
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-muted-foreground"
            >
              Upload your documents and let AI generate a structured learning experience.
            </motion.p>
          </div>

          {/* Upload Zone */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FileUploadZone onFilesAdded={handleFilesAdded} />
          </motion.div>

          {/* Uploaded Files */}
          <AnimatePresence>
            {uploadedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex flex-wrap gap-2"
              >
                {uploadedFiles.map((doc) => (
                  <FileChip key={doc.id} document={doc} onRemove={handleRemoveFile} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Prompt Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4"
          >
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Add instructions (optional)…"
              className="min-h-[100px] resize-none"
            />
          </motion.div>

          {/* Controls Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex flex-wrap items-center gap-3"
          >
            {/* Agent Selector */}
            <Select value={selectedAgentId} onValueChange={(v) => v && selectAgent(v)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {agents
                    .filter((a) => a.active)
                    .map((agent) => {
                      const AgentIcon = getAgentIcon(agent.icon)
                      return (
                        <SelectItem key={agent.id} value={agent.id}>
                          <div className="flex items-center gap-2">
                            <AgentIcon className="size-3.5" />
                            {agent.name}
                          </div>
                        </SelectItem>
                      )
                    })}
                </SelectGroup>
                <SelectGroup>
                  {agents
                    .filter((a) => !a.active)
                    .map((agent) => {
                      const AgentIcon = getAgentIcon(agent.icon)
                      return (
                        <SelectItem key={agent.id} value={agent.id} disabled>
                          <div className="flex items-center gap-2 opacity-50">
                            <AgentIcon className="size-3.5" />
                            {agent.name}
                            <Badge variant="secondary" className="text-[10px]">
                              Inactive
                            </Badge>
                          </div>
                        </SelectItem>
                      )
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Model Selector */}
            <Select value={selectedModelId} onValueChange={(v) => v && setSelectedModelId(v)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectedAgent?.models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Submit Button */}
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting || (uploadedFiles.length === 0 && !prompt.trim())}
            >
              {isSubmitting ? (
                <>
                  <Spinner data-icon="inline-start" />
                  Generating…
                </>
              ) : (
                <>
                  <SendIcon data-icon="inline-start" />
                  Generate Course
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </ScrollArea>
  )
}
