import { createFileRoute } from "@tanstack/react-router"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { CourseSidebar } from "@/components/course/course-sidebar"
import { LessonSection } from "@/components/course/lesson-section"
import { QuizSection } from "@/components/course/quiz-section"
import { ChatWidget } from "@/components/chat/chat-widget"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockCourses } from "@/mocks/data"
import type { Course, Section } from "@/mocks/types"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export const Route = createFileRoute("/course/$courseId")({
  component: CourseView
})

function CourseView() {
  const { courseId } = Route.useParams()

  // Local state for course (mock) — allows toggling section completion
  const [course, setCourse] = useState<Course | undefined>(() =>
    mockCourses.find((c) => c.id === courseId)
  )

  const allSections = useMemo(() => {
    if (!course) return []
    return course.chapters.flatMap((ch) =>
      ch.sections.map((sec) => ({
        ...sec,
        chapterId: ch.id,
        chapterTitle: ch.title
      }))
    )
  }, [course])

  const [activeSectionId, setActiveSectionId] = useState<string>(allSections[0]?.id ?? "")

  const activeSection = useMemo(
    () => allSections.find((s) => s.id === activeSectionId),
    [allSections, activeSectionId]
  )

  const currentIndex = allSections.findIndex((s) => s.id === activeSectionId)

  const toggleSectionComplete = (sectionId: string) => {
    setCourse((prev) => {
      if (!prev) return prev
      const chapters = prev.chapters.map((ch) => ({
        ...ch,
        sections: ch.sections.map((sec) =>
          sec.id === sectionId ? { ...sec, completed: !sec.completed } : sec
        )
      }))
      const all = chapters.flatMap((ch) => ch.sections)
      const completed = all.filter((s) => s.completed).length
      const progress = Math.round((completed / all.length) * 100)
      return { ...prev, chapters, progress }
    })
  }

  const goToNext = () => {
    if (currentIndex < allSections.length - 1) {
      setActiveSectionId(allSections[currentIndex + 1].id)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setActiveSectionId(allSections[currentIndex - 1].id)
    }
  }

  if (!course) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">Course not found.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Course sidebar */}
      <CourseSidebar
        course={course}
        activeSectionId={activeSectionId}
        onSectionSelect={setActiveSectionId}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Section header */}
        <div className="flex items-center gap-3 border-b px-6 py-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`complete-${activeSectionId}`}
                checked={activeSection?.completed ?? false}
                onCheckedChange={() => toggleSectionComplete(activeSectionId)}
              />
              <label
                htmlFor={`complete-${activeSectionId}`}
                className="text-sm font-semibold leading-tight cursor-pointer"
              >
                {activeSection?.title}
              </label>
            </div>
            {activeSection && "chapterTitle" in activeSection && (
              <p className="mt-0.5 pl-6 text-xs text-muted-foreground">
                {(activeSection as { chapterTitle: string }).chapterTitle}
              </p>
            )}
          </div>
          <Badge variant="secondary" className="shrink-0">
            {activeSection?.type === "quiz" ? "Quiz" : "Lesson"}
          </Badge>
        </div>

        {/* Section content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSectionId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-1 overflow-hidden"
          >
            {activeSection?.type === "quiz" ? (
              <QuizSection section={activeSection as Section} />
            ) : (
              <LessonSection section={activeSection as Section} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation footer */}
        <div className="flex items-center justify-between border-t px-6 py-3">
          <Button variant="outline" size="sm" onClick={goToPrev} disabled={currentIndex <= 0}>
            <ChevronLeftIcon data-icon="inline-start" />
            Previous
          </Button>
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} of {allSections.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNext}
            disabled={currentIndex >= allSections.length - 1}
          >
            Next
            <ChevronRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </div>

      {/* Floating chat widget */}
      <ChatWidget />
    </div>
  )
}
