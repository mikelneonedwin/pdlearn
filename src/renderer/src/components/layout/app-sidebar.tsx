import { Link, useLocation } from "@tanstack/react-router"
import {
  BookOpenIcon,
  FileIcon,
  FileTextIcon,
  ImageIcon,
  PresentationIcon,
  SettingsIcon,
  SunIcon,
  MoonIcon,
  XIcon,
  GraduationCapIcon,
  FileTypeIcon
} from "lucide-react"
import { useRef } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "@/providers/theme-provider"
import type { Course, MockDocument } from "@/mocks/types"

// ─── File type icon mapping ─────────────────────────────────────

function getFileIcon(type: MockDocument["type"]) {
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

// ─── Document Gallery ───────────────────────────────────────────

function DocumentGallery({
  documents,
  onRemove
}: {
  documents: MockDocument[]
  onRemove: (id: string) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (documents.length === 0) {
    return (
      <div className="px-2 py-3 text-center">
        <p className="text-xs text-muted-foreground">No documents uploaded</p>
      </div>
    )
  }

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto px-2 pb-1 scrollbar-none"
      style={{ scrollBehavior: "smooth" }}
    >
      {documents.map((doc) => {
        const Icon = getFileIcon(doc.type)
        return (
          <Tooltip key={doc.id}>
            <TooltipTrigger>
              <div className="group relative flex shrink-0 flex-col items-center gap-1 rounded-md border border-sidebar-border bg-sidebar-accent/50 p-2 transition-colors hover:bg-sidebar-accent">
                <Icon className="size-5 text-sidebar-foreground/70" />
                <span className="max-w-[4rem] truncate text-[10px] text-sidebar-foreground/70">
                  {doc.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemove(doc.id)
                  }}
                  className="absolute -top-1 -right-1 hidden size-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground group-hover:flex"
                >
                  <XIcon className="size-2.5" />
                </button>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{doc.name}</p>
            </TooltipContent>
          </Tooltip>
        )
      })}
    </div>
  )
}

// ─── Course List ────────────────────────────────────────────────

function CourseList({ courses, activeCourseId }: { courses: Course[]; activeCourseId?: string }) {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
        <GraduationCapIcon className="size-8 text-muted-foreground/50" />
        <p className="text-xs text-muted-foreground">
          No courses yet. Upload documents and create your first course.
        </p>
      </div>
    )
  }

  return (
    <SidebarMenu>
      {courses.map((course) => (
        <SidebarMenuItem key={course.id}>
          <SidebarMenuButton isActive={course.id === activeCourseId} tooltip={course.title}>
            <Link
              to="/course/$courseId"
              params={{ courseId: course.id }}
              className="flex w-full flex-col gap-1.5"
            >
              <span className="truncate font-medium">{course.title}</span>
              <div className="flex items-center gap-2">
                <Progress value={course.progress} className="h-1.5 flex-1" />
                <Badge variant="secondary" className="shrink-0 text-[10px]">
                  {course.progress}%
                </Badge>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

// ─── App Sidebar ────────────────────────────────────────────────

export function AppSidebar({
  documents,
  courses,
  onRemoveDocument,
  onOpenSettings
}: {
  documents: MockDocument[]
  courses: Course[]
  onRemoveDocument: (id: string) => void
  onOpenSettings: () => void
}) {
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  // Extract active course ID from route
  const courseMatch = location.pathname.match(/^\/course\/(.+)/)
  const activeCourseId = courseMatch?.[1]

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <BookOpenIcon className="size-5 text-primary" />
          <span className="truncate text-sm font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            PDLearn
          </span>
        </div>
      </SidebarHeader>

      <Separator className="mx-2 w-auto" />

      <SidebarContent>
        {/* Document Gallery */}
        <SidebarGroup>
          <SidebarGroupLabel>Documents</SidebarGroupLabel>
          <SidebarGroupContent>
            <DocumentGallery documents={documents} onRemove={onRemoveDocument} />
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-2 w-auto" />

        {/* Course List */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel>Courses</SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="flex-1">
              <CourseList courses={courses} activeCourseId={activeCourseId} />
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Separator className="mx-0 w-auto" />
        <div className="flex items-center gap-1 p-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="size-8"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={onOpenSettings} className="size-8">
            <SettingsIcon />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
