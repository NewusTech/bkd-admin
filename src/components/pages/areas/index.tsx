"use client";

import { Color } from "@tiptap/extension-color";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Highlight from "@tiptap/extension-highlight";
import Document from "@tiptap/extension-document";
import TextAlign from "@tiptap/extension-text-align";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorProvider } from "@tiptap/react";
import React from "react";
import StarterKit from "@tiptap/starter-kit";
import TextEditorToogle from "@/components/elements/toggle_text_editor";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name, TextAlign.name] }),
  TextStyle.configure({}),
  StarterKit?.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  TextAlign?.configure({
    types: ["heading", "paragraph"],
  }),
  Highlight.configure({ multicolor: true }),
  Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
  Underline.configure({}),
  Paragraph.configure({})
];

export default function EditorProvide({
  onChange,
  content,
}: {
  onChange: (content: any) => void;
  content?: any;
}) {
  return (
    <EditorProvider
      editorProps={{
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
        },
      }}
      slotBefore={<TextEditorToogle />}
      extensions={extensions}
      content={content}
      onUpdate={(e) => onChange(e.editor.getHTML())}></EditorProvider>
  );
}
