"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { EDITOR_JS_TOOLS } from "@/components/tools";
import type EditorJS from "@editorjs/editorjs";

interface EditorProps {
  data?: any;
  editorBlock: string;
}

export default function Editor({ data, editorBlock }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const [savedData, setSavedData] = useState<any[]>([]);

  useEffect(() => {
    import("@editorjs/editorjs").then(({ default: EditorJS }) => {
      if (!editorRef.current) {
        const editor = new EditorJS({
          holder: editorBlock,
          tools: EDITOR_JS_TOOLS as any,
          data,
          async onChange(api) {
            const content = await api.saver.save();
            setSavedData((prev) => [...prev.slice(-4), content]); // keep only last 5 versions
          },
        });

        editorRef.current = editor;
      }
    });

    return () => {
      editorRef.current?.destroy?.();
    };
  }, [data, editorBlock]);

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(savedData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "editorData.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4">
      <div id={editorBlock} className="h-fit w-full min-h-[40vh] p-4" />
      <Button onClick={downloadJSON} className="w-full">
        Download JSON
      </Button>
    </div>
  );
}
