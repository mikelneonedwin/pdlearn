import { cn } from "@renderer/lib/utils"
import { useTheme } from "@renderer/providers/theme-provider"
import { Link, linkOptions, useLocation } from "@tanstack/react-router"
import {
  BookOpen,
  FileText,
  Folder,
  HelpCircle,
  LayoutDashboard,
  MessageCircle,
  Moon,
  Settings,
  Sun,
  TerminalIcon
} from "lucide-react"
import { ComponentProps, FC } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "../ui/sidebar"

export const navItems = linkOptions([
  {
    label: "Home",
    icon: LayoutDashboard,
    to: "/",
    activeOptions: {
      exact: true
    }
  },
  {
    label: "Chats",
    icon: MessageCircle,
    // TODO
    to: "/chat" as never
  },
  {
    label: "Courses",
    icon: BookOpen,
    // TODO
    to: "/course" as never
  },
  {
    label: "Summaries",
    icon: FileText,
    // TODO
    to: "/summary" as never
  },
  {
    label: "Quizzes",
    icon: HelpCircle,
    // TODO
    to: "/quiz" as never
  },
  {
    label: "Materials",
    icon: Folder,
    // TODO
    to: "/materials" as never,
    activeOptions: {
      exact: true
    }
  }
])

export const AppSidebar: FC<ComponentProps<typeof Sidebar>> = ({ className, ...props }) => {
  const { setOpen } = useSidebar()
  const pathname = useLocation({
    select: (s) => s.pathname
  })
  const { setTheme } = useTheme()
  return (
    <Sidebar
      {...props}
      collapsible="icon"
      className={cn("overflow-hidden *:data-[sidebar=sidebar]:flex-row", className)}
    >
      <Sidebar collapsible="none" className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="md:h-8 md:p-0"
                render={<Link to="/" />}
                onClick={() => setOpen(false)}
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <TerminalIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">PDLearn</span>
                  <span className="truncate text-xs">Education</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {navItems.map(({ label, icon: Icon, ...link }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      tooltip={{
                        children: label,
                        hidden: false
                      }}
                      render={<Link {...link} />}
                      onClick={() => {
                        if ("activeOptions" in link && link.activeOptions.exact) setOpen(false)
                        else setOpen(true)
                      }}
                      isActive={
                        "activeOptions" in link && link.activeOptions.exact
                          ? link.to === pathname
                          : pathname.startsWith(link.to)
                      }
                      className="px-2.5 md:px-2"
                    >
                      <Icon />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarGroup className="p-0">
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={{
                      children: "Settings",
                      hidden: false
                    }}
                    className="px-2.5 md:px-2"
                  >
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <SidebarMenuButton
                          tooltip={{
                            children: "Toggle theme",
                            hidden: false
                          }}
                          className="px-2.5 md:px-2"
                        >
                          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                          <span>Toggle theme</span>
                        </SidebarMenuButton>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  )
}
