import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpenIcon, CheckCircleIcon } from "lucide-react"

import { Progress } from "@/components/ui/progress"
import { mockProcessingSteps } from "@/mocks/data"

export const Route = createFileRoute("/processing")({
  component: ProcessingPage
})

function ProcessingPage() {
  const navigate = useNavigate()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const currentStep = mockProcessingSteps[currentStepIndex]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const next = prev + 1
        setCompletedSteps((c) => [...c, prev])

        if (next >= mockProcessingSteps.length) {
          clearInterval(interval)
          // Navigate to course after final step
          setTimeout(() => {
            navigate({ to: "/course/$courseId", params: { courseId: "course-1" } })
          }, 800)
          return prev
        }
        return next
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [navigate])

  return (
    <div className="flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-md flex-col items-center gap-8"
      >
        {/* Animated book icon */}
        <motion.div
          animate={{
            rotate: [0, -5, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="rounded-2xl bg-primary/10 p-6"
        >
          <BookOpenIcon className="size-12 text-primary" />
        </motion.div>

        {/* Progress bar */}
        <div className="w-full">
          <Progress value={currentStep?.progress ?? 100} className="h-2" />
        </div>

        {/* Step messages */}
        <div className="flex w-full flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {mockProcessingSteps.map((step, idx) => {
              const isCompleted = completedSteps.includes(idx)
              const isCurrent = idx === currentStepIndex
              const isUpcoming = idx > currentStepIndex

              if (isUpcoming) return null

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  {isCompleted ? (
                    <CheckCircleIcon className="size-5 shrink-0 text-primary" />
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="size-5 shrink-0 rounded-full border-2 border-primary border-t-transparent"
                    />
                  ) : null}
                  <span
                    className={
                      isCompleted
                        ? "text-sm text-muted-foreground line-through"
                        : "text-sm font-medium"
                    }
                  >
                    {step.message}
                  </span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
