import { CheckCircle2Icon, CircleIcon, ChevronRightIcon } from "lucide-react"
import { motion } from "framer-motion"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import type { Chapter, Course } from "@/mocks/types"

export function CourseSidebar({
  course,
  activeSectionId,
  onSectionSelect
}: {
  course: Course
  activeSectionId: string
  onSectionSelect: (sectionId: string) => void
}) {
  return (
    <div className="flex h-full w-72 shrink-0 flex-col border-r bg-muted/30">
      {/* Course title */}
      <div className="flex flex-col gap-1 p-4">
        <h2 className="text-sm font-semibold leading-tight">{course.title}</h2>
        <p className="text-xs text-muted-foreground">{course.progress}% complete</p>
      </div>

      <Separator />

      {/* Chapter/section tree */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {course.chapters.map((chapter, chapterIdx) => (
            <ChapterItem
              key={chapter.id}
              chapter={chapter}
              chapterIndex={chapterIdx}
              activeSectionId={activeSectionId}
              onSectionSelect={onSectionSelect}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

function ChapterItem({
  chapter,
  chapterIndex,
  activeSectionId,
  onSectionSelect
}: {
  chapter: Chapter
  chapterIndex: number
  activeSectionId: string
  onSectionSelect: (sectionId: string) => void
}) {
  const completedCount = chapter.sections.filter((s) => s.completed).length
  const allCompleted = completedCount === chapter.sections.length

  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium hover:bg-muted">
        <ChevronRightIcon className="size-4 shrink-0 transition-transform [[data-state=open]>&]:rotate-90" />
        <span className="flex-1 truncate">
          {chapterIndex + 1}. {chapter.title}
        </span>
        {allCompleted && <CheckCircle2Icon className="size-3.5 shrink-0 text-primary" />}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-4 flex flex-col gap-0.5 border-l pl-2">
          {chapter.sections.map((section) => {
            const isActive = section.id === activeSectionId

            return (
              <motion.button
                key={section.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSectionSelect(section.id)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {section.completed ? (
                  <CheckCircle2Icon className="size-3.5 shrink-0 text-primary" />
                ) : (
                  <CircleIcon className="size-3.5 shrink-0" />
                )}
                <span className="truncate">{section.title}</span>
              </motion.button>
            )
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
