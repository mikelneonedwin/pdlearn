import { AppSidebar, navItems } from "@renderer/components/layout/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@renderer/components/ui/breadcrumb"
import { Separator } from "@renderer/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@renderer/components/ui/sidebar"
import { TooltipProvider } from "@renderer/components/ui/tooltip"
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

const fuzzyLinks = navItems.filter((item) => !("activeOptions" in item))

const RootLayout = () => {
  const pathname = useLocation({
    select: (s) => s.pathname
  })
  const activeLink = navItems.find((item) => {
    if ("activeOptions" in item && item.activeOptions.exact) {
      return item.to === pathname
    } else return pathname.startsWith(item.to)
  })
  return (
    <TooltipProvider>
      <SidebarProvider
        defaultOpen={false}
        style={
          {
            "--sidebar-width": "350px"
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
            {fuzzyLinks.some((link) => pathname.startsWith(link.to)) && (
              <>
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-full"
                />
              </>
            )}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbItem>
                    <BreadcrumbPage>PDLearn</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbItem>
                {activeLink && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{activeLink.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <Outlet />
          <TanStackRouterDevtools position="bottom-right" />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

export const Route = createRootRoute({ component: RootLayout })
