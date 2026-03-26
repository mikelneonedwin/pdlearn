import { useCallback, useMemo, useState } from "react"

import {
  mockAgents,
  mockChatMessages,
  mockCourses,
  mockDocuments,
  mockProcessingSteps
} from "./data"
import type { ChatMessage, Course, MockDocument, ProcessingState, Section } from "./types"

// ─── Documents ──────────────────────────────────────────────────
export function useDocuments() {
  const [documents, setDocuments] = useState<MockDocument[]>(mockDocuments)

  const addDocument = useCallback((doc: MockDocument) => {
    setDocuments((prev) => [...prev, doc])
  }, [])

  const removeDocument = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
  }, [])

  return { documents, addDocument, removeDocument }
}

// ─── Courses ────────────────────────────────────────────────────
export function useCourses() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)

  const getCourse = useCallback((id: string) => courses.find((c) => c.id === id), [courses])

  const toggleSectionComplete = useCallback((courseId: string, sectionId: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course
        const chapters = course.chapters.map((ch) => ({
          ...ch,
          sections: ch.sections.map((sec) =>
            sec.id === sectionId ? { ...sec, completed: !sec.completed } : sec
          )
        }))
        // Recalculate progress
        const allSections = chapters.flatMap((ch) => ch.sections)
        const completed = allSections.filter((s) => s.completed).length
        const progress = Math.round((completed / allSections.length) * 100)
        return { ...course, chapters, progress }
      })
    )
  }, [])

  const addCourse = useCallback((course: Course) => {
    setCourses((prev) => [...prev, course])
  }, [])

  return { courses, getCourse, toggleSectionComplete, addCourse }
}

// ─── Agents ─────────────────────────────────────────────────────
export function useAgents() {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(
    mockAgents.find((a) => a.active)?.id ?? mockAgents[0].id
  )
  const [selectedModelId, setSelectedModelId] = useState<string>(
    mockAgents.find((a) => a.active)?.models[0]?.id ?? ""
  )

  const agents = useMemo(() => mockAgents, [])

  const selectedAgent = useMemo(
    () => agents.find((a) => a.id === selectedAgentId),
    [agents, selectedAgentId]
  )

  const selectAgent = useCallback(
    (agentId: string) => {
      setSelectedAgentId(agentId)
      const agent = agents.find((a) => a.id === agentId)
      if (agent?.models[0]) {
        setSelectedModelId(agent.models[0].id)
      }
    },
    [agents]
  )

  return {
    agents,
    selectedAgent,
    selectedAgentId,
    selectedModelId,
    selectAgent,
    setSelectedModelId
  }
}

// ─── Chat Messages ──────────────────────────────────────────────
export function useChatMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages)
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback((content: string) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toISOString()
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-reply`,
        role: "assistant",
        content:
          "That's a great question! Based on the course material, I can help you understand this concept better. The key takeaway is that these methods work together to form a comprehensive learning framework.",
        timestamp: new Date().toISOString()
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }, [])

  return { messages, isLoading, sendMessage }
}

// ─── Processing ─────────────────────────────────────────────────
export function useProcessing() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const steps: ProcessingState[] = mockProcessingSteps

  const startProcessing = useCallback(
    (onComplete: () => void) => {
      setIsProcessing(true)
      setCurrentStep(0)

      let step = 0
      const interval = setInterval(() => {
        step++
        if (step >= steps.length) {
          clearInterval(interval)
          setIsProcessing(false)
          onComplete()
        } else {
          setCurrentStep(step)
        }
      }, 2000)

      return () => clearInterval(interval)
    },
    [steps.length]
  )

  return {
    isProcessing,
    currentStep: steps[currentStep],
    startProcessing
  }
}

// ─── Section navigation ─────────────────────────────────────────
export function useSectionNavigation(course: Course | undefined) {
  const allSections = useMemo(() => {
    if (!course) return []
    return course.chapters.flatMap((ch) => ch.sections.map((sec) => ({ ...sec, chapterId: ch.id })))
  }, [course])

  const [activeSectionId, setActiveSectionId] = useState<string>(allSections[0]?.id ?? "")

  const activeSection = useMemo(
    () => allSections.find((s) => s.id === activeSectionId) as Section | undefined,
    [allSections, activeSectionId]
  )

  return { activeSectionId, setActiveSectionId, activeSection, allSections }
}
