import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Layout({children , projects, blogs}: {children: React.ReactNode, projects?: boolean, blogs?: boolean}) {
  return (
    <div className="flex w-full flex-col gap-">
      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          {projects}
        </TabsContent>
        <TabsContent value="blogs">
          {blogs}
        </TabsContent>
      </Tabs>
    </div>
  )
}
