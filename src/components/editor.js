"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import Code from "@editorjs/code";
import Embed from "@editorjs/embed";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import SimpleImage from "@editorjs/simple-image";
import InlineCode from "@editorjs/inline-code";

export default function Editor({ data, editorBlock }) {
  const editorRef = useRef(null);
  const [savedData, setSavedData] = useState([]);

  const EDITOR_JS_TOOLS = {
    header: Header,
    embed: Embed,
    marker: Marker,
    list: List,
    linkTool: {
      class: LinkTool,
      config: {
        endpoint: "http://localhost:8008/fetchUrl",
      },
    },
    code: Code,
    quote: Quote,
    image: SimpleImage,
    inlineCode: InlineCode,
  };

  useEffect(() => {
    import("@editorjs/editorjs").then(({ default: EditorJS }) => {
      if (!editorRef.current) {
        editorRef.current = new EditorJS({
          holder: editorBlock,
          tools: EDITOR_JS_TOOLS,
          data: data,
          async onChange(api) {
            const content = await api.saver.save();
            setSavedData((prev) => [...prev.slice(-4), content]); // keep only last 5 versions
          },
        });
      }
    });

    return () => {
      editorRef.current?.destroy?.();
    };
  }, []);

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
      <Button
        variant=""
        onClick={downloadJSON}
        className="w-full"
      >
        Download JSON
      </Button>
    </div>
  );
}
