import Image from "next/image";
import cypherImage from "../../../public/Cypher.png"
import gitWrapImage from '../../../public/gitWrapImage.png'
import { LucideGithub, ImageOff, ArrowUpRight, Link2Icon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Projects({ limit }: { limit: number }) {

  const data = [
    {
      id: 1,
      title: 'GitWrap',
      desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      image: gitWrapImage,
      liveLink: '',
      gitLink: '',
      category: 'Fullstack',
    },
    {
      id: 2,
      title: 'Cypher',
      desc: 'Lorem ipsum dolor, sit amet consectetur.',
      image: cypherImage,
      liveLink: '',
      gitLink: '',
      category: 'Frontend',
    },
    {
      id: 3,
      title: 'GitWrap',
      desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      image: '',
      liveLink: '',
      gitLink: '',
      category: 'Frontend',
    },
    {
      id: 4,
      title: 'GitWrap',
      desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      image: '',
      liveLink: '',
      gitLink: '',
      category: 'Frontend',
    },
  ]

  const projects = (limit != undefined) ? data.slice(0, limit) : data;

  return (
    <section className="flex flex-col gap-4">
      {limit == undefined ? (<> <Button variant='link' className="text-xs self-start p-0" asChild>
      <Link href="/">
        <ArrowLeft className="size-4" />
        Back to Top
      </Link>
      </Button>
      <hr />
      </>
      ) 
      : null}

      <div className="flex justify-between items-center">
        <h1 className="text-xl text-foreground font-bold">
          { limit != undefined ? 'Featured Projects' : 'Projects'
          }</h1>
        {limit != undefined ? (
          <Button variant='link' className="text-xs px-0" asChild>
            <Link href="/projects" className="p-0">
              View All
            </Link>
          </Button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {projects.map((project) => {
          return (
            <div className="flex flex-col p-2 border border-border bg-card rounded col-span-1" key={project.id} >
              {project.image ? (
                <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <Image src={project.image} alt={project.title} className="text-foreground w-full rounded border border-border" />
                </Link>)
                : (
                  <div className="bg-secondary rounded w-full flex items-center justify-center aspect-[calc(1366/650)] border border-border">
                    <ImageOff />
                  </div>
                )}
              <div className="flex items-center gap-2">
                <h2 className="text-foreground text-sm">{project.title}</h2>
                <div className="flex ml-auto gap-2">
                  <Button variant="link" size="icon-sm" asChild className="text-foreground-muted hover:text-foreground p-1 m-0 w-fit" title="View Live Demo">
                    <Link href={project.gitLink} >
                      <Link2Icon/>
                    </Link>
                  </Button>
                  <Button variant="link" size="icon-sm" asChild className="text-foreground-muted hover:text-foreground p-1 m-0 w-fit" title="View Repo">
                    <Link href={project.gitLink} >
                      <LucideGithub />
                    </Link>
                  </Button>
                </div>
              </div>
              <p className="text-xs line-clamp-2">{project.desc}</p>
            </div>
          )
        })
        }
      </div>
    </section>
  );
}
