"use client";
import { useEffect, useRef, useState } from "react";

export default function Editor({ data, readerBlock }) {
  const editorRef = useRef(null);
  const [savedData, setSavedData] = useState([]);

  const EDITOR_JS_TOOLS = {
    header: require("@editorjs/header"),
    embed: require("@editorjs/embed"),
    marker: require("@editorjs/marker"),
    list: require("@editorjs/list"),
    linkTool: {
      class: require("@editorjs/link"),
      config: { endpoint: "http://localhost:8008/fetchUrl" },
    },
    code: require("@editorjs/code"),
    quote: require("@editorjs/quote"),
    image: require("@editorjs/simple-image"),
    inlineCode: require("@editorjs/inline-code"),
  };

  useEffect(() => {
    import("@editorjs/editorjs").then(({ default: EditorJS }) => {
      if (!editorRef.current) {
        editorRef.current = new EditorJS({
          holder: readerBlock,
          tools: EDITOR_JS_TOOLS,
          data: data,
          readOnly: true,
        });
      }
    });

    return () => {
      editorRef.current?.destroy?.();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div id={readerBlock} className="h-fit w-full min-h-[40vh] p-4" />
    </div>
  );
}
