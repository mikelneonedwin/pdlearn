import { createRootRoute, Outlet } from "@tanstack/react-router"
import { useState } from "react"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { SettingsDialog } from "@/components/layout/settings-dialog"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { useDocuments, useCourses } from "@/mocks/hooks"

function RootLayout() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { documents, removeDocument } = useDocuments()
  const { courses } = useCourses()

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          documents={documents}
          courses={courses}
          onRemoveDocument={removeDocument}
          onOpenSettings={() => setSettingsOpen(true)}
        />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <span className="text-sm font-medium text-muted-foreground">PDLearn</span>
          </header>
          <main className="flex flex-1 flex-col overflow-hidden">
            <Outlet />
          </main>
        </SidebarInset>
        <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      </SidebarProvider>
    </TooltipProvider>
  )
}

export const Route = createRootRoute({ component: RootLayout })
