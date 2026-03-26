import { BotIcon, CpuIcon, PaletteIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/providers/theme-provider"
import { mockAgents } from "@/mocks/data"

export function SettingsDialog({
  open,
  onOpenChange
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { theme, setTheme } = useTheme()
  const [defaultAgent, setDefaultAgent] = useState(mockAgents[0].id)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Configure your agents, models, and preferences.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="agents" className="mt-2">
          <TabsList className="w-full">
            <TabsTrigger value="agents" className="flex-1">
              <BotIcon data-icon="inline-start" />
              Agents
            </TabsTrigger>
            <TabsTrigger value="models" className="flex-1">
              <CpuIcon data-icon="inline-start" />
              Models
            </TabsTrigger>
            <TabsTrigger value="general" className="flex-1">
              <PaletteIcon data-icon="inline-start" />
              General
            </TabsTrigger>
          </TabsList>

          {/* Agents Tab */}
          <TabsContent value="agents" className="flex flex-col gap-4 pt-4">
            <div className="flex flex-col gap-3">
              {mockAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <BotIcon className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {agent.models.length} model{agent.models.length !== 1 && "s"} available
                      </p>
                    </div>
                  </div>
                  <Badge variant={agent.active ? "default" : "secondary"}>
                    {agent.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <Label htmlFor="default-agent">Default Agent</Label>
              <Select value={defaultAgent} onValueChange={(v) => v && setDefaultAgent(v)}>
                <SelectTrigger id="default-agent">
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {mockAgents
                      .filter((a) => a.active)
                      .map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          {/* Models Tab */}
          <TabsContent value="models" className="flex flex-col gap-4 pt-4">
            {mockAgents.map((agent) => (
              <div key={agent.id} className="flex flex-col gap-2">
                <h4 className="text-sm font-medium">{agent.name}</h4>
                <div className="flex flex-col gap-2">
                  {agent.models.map((model) => (
                    <div
                      key={model.id}
                      className="flex items-center justify-between rounded-md border px-3 py-2"
                    >
                      <div>
                        <p className="text-sm">{model.name}</p>
                        <p className="text-xs text-muted-foreground">{model.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-1" />
              </div>
            ))}
          </TabsContent>

          {/* General Tab */}
          <TabsContent value="general" className="flex flex-col gap-4 pt-4">
            <div className="flex flex-col gap-2">
              <Label>Theme</Label>
              <div className="flex gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                >
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                >
                  Dark
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("system")}
                >
                  System
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <Label htmlFor="api-key">API Key (mock)</Label>
              <Input id="api-key" type="password" placeholder="sk-••••••••••••" disabled />
              <p className="text-xs text-muted-foreground">
                API key configuration will be available in a future update.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
