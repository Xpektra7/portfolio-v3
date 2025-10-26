"use client";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useRouter } from "next/navigation";

export default function Layout({children, addProject }: {children: React.ReactNode, addProject?: React.ReactNode}) {
  const router = useRouter(); 
  return (
    <div className="flex w-full flex-col gap-4">
          <Tabs defaultValue="" className="space-y-4">
              <TabsList>
                <TabsTrigger value="projects" onClick={() => {router.push("/admin/projects")}}>Projects</TabsTrigger>
                <TabsTrigger value="blogs" onClick={() => {router.push("/admin/blogs")}}>Blogs</TabsTrigger>
              </TabsList>
            </Tabs>
      
      {children}
      {addProject}
    </div>  
  )
}
