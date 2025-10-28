"use client";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });


export default function Blog() {

  return (
    <div className="relative border-t border-border">
      <Editor data={null} editorBlock="editorjs-container" />
    </div>
  );
}
