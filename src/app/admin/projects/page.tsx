"use client";
import Image from "next/image";
import { LucideGithub, ImageOff, Link2Icon, PlusIcon, } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Loading from "./loading";
import ErrorComponent from "../../../components/error";

interface Project {
  id?: string;
  title: string;
  desc: string;
  image: string;
  liveLink: string;
  gitLink: string;
  category: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const data: Project[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Project, "id">),
        }));
        setProjects(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (error) return <ErrorComponent />


  return (
    <section className="flex flex-col gap-4">

      {!loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {projects.map((project) => (
            <div
              className="flex flex-col p-2 border border-border bg-card rounded col-span-1"
              key={project.id}
            >
              {project.image ? (
                <Link
                  href={`https://${project.liveLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="text-foreground w-full aspect-[calc(1366/650)] rounded border border-border"
                    width={1366}
                    height={650}
                    quality={75}
                    priority={false}
                  />
                </Link>
              ) : (
                <div className="bg-secondary rounded w-full flex items-center justify-center aspect-[calc(1366/650)] border border-border">
                  <ImageOff />
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <h2 className="text-foreground text-sm">{project.title}</h2>
                <div className="flex ml-auto gap-2">
                  {project.liveLink && (
                    <Button
                      variant="link"
                      size="icon-sm"
                      asChild
                      className="text-muted-foreground hover:text-foreground p-1 m-0 w-fit"
                      title="View Live Demo"
                    >
                      <Link href={`https://${project.liveLink}`}>
                        <Link2Icon />
                      </Link>
                    </Button>
                  )}
                  {project.gitLink && (
                    <Button
                      variant="link"
                      size="icon-sm"
                      asChild
                      className="text-muted-foreground hover:text-foreground p-1 m-0 w-fit"
                      title="View Repo"
                    >
                      <Link href={`https://${project.gitLink}`}>
                        <LucideGithub />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-xs line-clamp-2">{project.desc}</p>
            </div>
          ))}
        </div>
      ) : <Loading />}

      <Button variant="outline">
        <Link href="/admin/addProject" className="flex items-center gap-2">
          <PlusIcon />
          Add Project
        </Link>
      </Button>
    </section>
  );
}
