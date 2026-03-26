import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2Icon, XCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { QuizQuestion, Section } from "@/mocks/types"

export function QuizSection({ section }: { section: Section }) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  if (!section.questions || section.questions.length === 0) {
    return <div className="p-8 text-muted-foreground">No questions available.</div>
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-6 p-8">
        <div>
          <h2 className="text-xl font-bold">{section.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Answer all questions and submit to check your understanding.
          </p>
        </div>

        <Separator />

        {section.questions.map((question, idx) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={idx}
            answer={answers[question.id] ?? ""}
            onAnswer={(val) => setAnswers((prev) => ({ ...prev, [question.id]: val }))}
            submitted={submitted}
          />
        ))}

        <div className="flex gap-3">
          {!submitted ? (
            <Button onClick={handleSubmit} size="lg">
              Submit Answers
            </Button>
          ) : (
            <Button onClick={handleReset} variant="outline" size="lg">
              Try Again
            </Button>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}

function QuestionCard({
  question,
  index,
  answer,
  onAnswer,
  submitted
}: {
  question: QuizQuestion
  index: number
  answer: string
  onAnswer: (value: string) => void
  submitted: boolean
}) {
  const isCorrect =
    question.type === "multiple-choice"
      ? question.options?.find((o) => o.id === answer)?.isCorrect
      : answer.toLowerCase().trim() === question.correctAnswer?.toLowerCase().trim()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          {index + 1}. {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {question.type === "multiple-choice" && question.options ? (
          <RadioGroup value={answer} onValueChange={onAnswer} disabled={submitted}>
            <div className="flex flex-col gap-2">
              {question.options.map((option) => {
                const isSelected = answer === option.id
                const showCorrect = submitted && option.isCorrect
                const showWrong = submitted && isSelected && !option.isCorrect

                return (
                  <div
                    key={option.id}
                    className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                      showCorrect
                        ? "border-primary/50 bg-primary/5"
                        : showWrong
                          ? "border-destructive/50 bg-destructive/5"
                          : isSelected
                            ? "border-primary/30 bg-primary/5"
                            : ""
                    }`}
                  >
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="flex-1 cursor-pointer text-sm">
                      {option.text}
                    </Label>
                    {showCorrect && <CheckCircle2Icon className="size-4 text-primary" />}
                    {showWrong && <XCircleIcon className="size-4 text-destructive" />}
                  </div>
                )
              })}
            </div>
          </RadioGroup>
        ) : (
          <div className="flex flex-col gap-2">
            <Input
              value={answer}
              onChange={(e) => onAnswer(e.target.value)}
              placeholder="Type your answer…"
              disabled={submitted}
            />
            {submitted && (
              <p className="text-xs text-muted-foreground">Expected: {question.correctAnswer}</p>
            )}
          </div>
        )}

        {/* Feedback */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-lg border bg-muted/30 p-3"
            >
              <div className="flex items-start gap-2">
                {isCorrect ? (
                  <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                ) : (
                  <XCircleIcon className="mt-0.5 size-4 shrink-0 text-destructive" />
                )}
                <div>
                  <p className="text-sm font-medium">{isCorrect ? "Correct!" : "Incorrect"}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{question.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
