"use client";

import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TextEditorToggle from "../text_editors";

// define your extension array
const extensions = [
  StarterKit,
  Highlight.configure({ multicolor: true }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

const contentDefault = "";

const Editor = ({ onChange, content }: { onChange: any; content?: any }) => {
  return (
    <div className="border p-5 border-black-80 h-[250px]">
      <EditorProvider
        extensions={extensions}
        content={content || contentDefault}
        slotBefore={<TextEditorToggle />}
        onUpdate={(e) => onChange(e.editor.getHTML())}></EditorProvider>
    </div>
  );
};

export default Editor;
