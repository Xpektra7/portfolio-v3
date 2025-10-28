"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { EDITOR_JS_TOOLS } from "@/components/tools";
import type EditorJS from "@editorjs/editorjs";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "@/lib/firebase"; // assumes you already have firebase.ts config

interface EditorProps {
  data?: any;
  editorBlock: string;
}

export default function Editor({ data, editorBlock }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const [saving, setSaving] = useState(false);
  const db = getFirestore(app);

  useEffect(() => {
    import("@editorjs/editorjs").then(({ default: EditorJS }) => {
      if (!editorRef.current) {
        const editor = new EditorJS({
          holder: editorBlock,
          tools: EDITOR_JS_TOOLS as any,
          data,
        });

        editorRef.current = editor;
      }
    });

    return () => {
      editorRef.current?.destroy?.();
    };
  }, [data, editorBlock]);

  const handlePublish = async () => {
    if (!editorRef.current) return;

    setSaving(true);
    const content = await editorRef.current.save();

    const titleBlock = content.blocks.find((b: any) => b.type === "header");
    const title = titleBlock ? titleBlock.data.text : "Untitled";

    await addDoc(collection(db, "blogs"), {
      title,
      content,
      createdAt: serverTimestamp(),
    });

    setSaving(false);
    alert("Published to Firestore!");
  };

  return (
    <div className="flex flex-col gap-4">
      <div id={editorBlock} className="h-fit w-full p-4" />
      <Button onClick={handlePublish} disabled={saving} className="w-full">
        {saving ? "Publishing..." : "Publish"}
      </Button>
    </div>
  );
}
