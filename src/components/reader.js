"use client";
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

export default function Editor({ data, readerBlock }) {
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
