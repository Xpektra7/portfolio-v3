"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {  ArrowDownToLine, LinkedinIcon, TwitterIcon, Github, MailIcon } from "lucide-react";


export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-8">
        <section id="hero" className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-foreground text-2xl font-semibold font-sans">Hey, I’m <span className="text-chart-4 font-sans">Xpektra</span>.</h1>
          </div>

          <p className="text-sm">I’m a frontend and embedded systems engineer who thrives at the intersection of hardware and software. I design and build systems that connect the physical and digital, from intelligent traffic prototypes to seamless web interfaces.
            <br />
            <br />
            My work blends precision engineering with creative design thinking. I turn abstract ideas into high performance solutions, whether optimizing sensor data flows or refining UI motion down to a single pixel.
          </p>
          <Button variant="outline" size="sm" asChild className="w-fit">
            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
              <ArrowDownToLine />
            </Link>
          </Button>
        </section>

        <div className="flex items-center text-foreground gap-2 border-t border-border py-4">
          <Button variant="secondary" size="icon-sm" asChild aria-label="Link to my Github account">
            <Link href="https://github.com/Xpektra7" target="_blank" rel="noopener noreferrer">
              <Github />
            </Link>
          </Button>
          <Button variant="secondary" size="icon-sm" asChild aria-label="Link to my Twitter account">
            <Link href="https://www.x.com/Xpektra7" target="_blank" rel="noopener noreferrer">
              <TwitterIcon />
            </Link>
          </Button>
          <Button variant="secondary" size="icon-sm" asChild aria-label="Link to my Linkedin account">
            <Link href="https://www.linkedin.com/in/ogungbayi-imran-9a4ba9291" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon />
            </Link>
          </Button>
          <Button variant="secondary" size="icon-sm" asChild aria-label="Send me an Email">
            <Link href="mailto:xpektra7@gmail.com" target="_blank" rel="noopener noreferrer">
              <MailIcon />
            </Link>
          </Button>
        </div>

      </main>
    </>
  );
}
