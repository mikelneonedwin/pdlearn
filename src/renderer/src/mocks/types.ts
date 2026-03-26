export type DocumentType = "pdf" | "image" | "word" | "slides" | "text"

export interface MockDocument {
  id: string
  name: string
  type: DocumentType
  size: number // bytes
  addedAt: string
}

export type SectionType = "lesson" | "quiz"

export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface QuizQuestion {
  id: string
  type: "multiple-choice" | "short-answer"
  question: string
  options?: QuizOption[]
  correctAnswer?: string
  explanation: string
}

export interface Section {
  id: string
  title: string
  type: SectionType
  completed: boolean
  // Lesson content (markdown-like)
  content?: string
  // Quiz content
  questions?: QuizQuestion[]
}

export interface Chapter {
  id: string
  title: string
  sections: Section[]
}

export interface Course {
  id: string
  title: string
  description: string
  chapters: Chapter[]
  createdAt: string
  progress: number // 0-100
}

export interface Agent {
  id: string
  name: string
  icon: string
  active: boolean
  models: Model[]
}

export interface Model {
  id: string
  name: string
  description: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export type ProcessingStep = "parsing" | "analyzing" | "generating" | "finalizing"

export interface ProcessingState {
  step: ProcessingStep
  message: string
  progress: number
}
