"use client";

import { useEffect, useRef } from "react";
import { EDITOR_JS_TOOLS } from "@/components/tools";
import type EditorJS from "@editorjs/editorjs";

interface ReaderProps {
  data?: any;
  readerBlock: string;
}

export default function Reader({ data, readerBlock }: ReaderProps) {
  const readerRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    import("@editorjs/editorjs").then(({ default: EditorJS }) => {
      if (!readerRef.current) {
        readerRef.current = new EditorJS({
          holder: readerBlock,
          tools: EDITOR_JS_TOOLS as any,
          data,
          readOnly: true,
        });
      }
    });

    return () => {
      readerRef.current?.destroy?.();
      readerRef.current = null;
    };
  }, [readerBlock, data]);

  return (
    <div className="flex flex-col gap-4">
      <div id={readerBlock} className="h-fit w-full min-h-[40vh] p-4" />
    </div>
  );
}
