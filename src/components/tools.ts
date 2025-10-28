export const EDITOR_JS_TOOLS = {
  header: require("@editorjs/header"),
  embed: require("@editorjs/embed"),
  marker: require("@editorjs/marker"),
  list: require("@editorjs/list"),
  linkTool: {
    class: require("@editorjs/link"),
    config: {
      endpoint: "/api/fetchUrl",
    },
  },
  code: require("@editorjs/code"),
  quote: require("@editorjs/quote"),
  image: {
    class: require("@editorjs/image"),
    config: {
      endpoints: {
        byFile: '/api/uploadFile', // Your backend file uploader endpoint
        byUrl: '/api/fetchUrl/', // Your endpoint that provides uploading by Url
      }
    }
  },
  inlineCode: require("@editorjs/inline-code"),
};
