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
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useCurrentEditor, useEditor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pen,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
} from "@phosphor-icons/react";
import { colors } from "@/constants/main";
import { List, ListOrdered } from "lucide-react";
import React from "react";

export default function TextEditorToogle() {
  const { editor } = useCurrentEditor();
  // const editor = useEditor({
  //   extensions: [
  //     Document,
  //     Paragraph,
  //     Text,
  //     Bold,
  //     Italic,
  //     TextStyle,
  //     Highlight.configure({ multicolor: true }),
  //     Heading.configure({
  //       levels: [1, 2, 3, 4, 5, 6],
  //     }),
  //     Underline,
  //     BulletList,
  //     OrderedList,
  //     ListItem,
  //     Color,
  //   ],
  //   content: `
  //       <p>This isn’t bold.</p>
  //       <p><strong>This is bold.</strong></p>
  //       <p><b>And this.</b></p>
  //       <p style="font-weight: bold">This as well.</p>
  //       <p style="font-weight: bolder">Oh, and this!</p>
  //       <p style="font-weight: 500">Cool, isn’t it!?</p>
  //       <p style="font-weight: 999">Up to font weight 999!!!</p>
  //     `,
  // });

  return (
    <>
      <div className="w-full flex flex-row gap-x-3 flex-wrap border-b border-line-20 py-4 px-2">
        <div className="control-group w-full">
          <div className="button-group max-w-2xl horizontalScroll flex flex-row gap-x-3">
            <div className="w-3/12 flex flex-row gap-x-3 px-3">
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`${editor?.isActive("bold") ? "is-active" : ""} border border-line-20 rounded-lg px-3`}>
                B
              </button>

              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                className={`${editor?.isActive("underline") ? "is-active" : ""} border border-line-20 rounded-lg px-3`}>
                U
              </button>

              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`${editor?.isActive("italic") ? "is-active" : ""} border border-line-20 rounded-lg px-4`}>
                I
              </button>
            </div>

            <div className="w-full flex flex-row gap-x-3">
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().setTextAlign("left").run()
                }
                className={`
                  ${editor?.isActive({ textAlign: "left" }) ? "is-active" : ""} border border-line-20 rounded-lg px-3`}>
                <TextAlignLeft className="w-6 h-6 text-black-80" />
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().setTextAlign("center").run()
                }
                className={`
                  ${editor?.isActive({ textAlign: "center" }) ? "is-active" : ""} border border-line-20 rounded-lg px-3`}>
                <TextAlignCenter className="w-6 h-6 text-black-80" />
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().setTextAlign("right").run()
                }
                className={`
                  ${editor?.isActive({ textAlign: "right" }) ? "is-active" : ""} border border-line-20 rounded-lg px-3`}>
                <TextAlignRight className="w-6 h-6 text-black-80" />
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().setTextAlign("justify").run()
                }
                className={`
                  ${editor?.isActive({ textAlign: "justify" }) ? "is-active" : ""} border border-line-20 rounded-lg px-3`}>
                <TextAlignJustify className="w-6 h-6 text-black-80" />
              </button>
            </div>

            <div className="w-2/12 flex flex-row items-center gap-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="border border-line-20 px-5 py-2 rounded-lg">
                    <Pen className="w-6 h-6 text-black-80" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full max-w-xl bg-line-10 flex flex-col">
                  <DropdownMenuLabel>Pilih Warna</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="w-full flex flex-row flex-wrap gap-x-0.5">
                    {colors.map(
                      (
                        item: { id: number; color: string; name: string },
                        i: number
                      ) => {
                        const color = item.color.startsWith("#")
                          ? item.color
                          : `#${item.color}`;

                        return (
                          <DropdownMenuItem
                            key={i}
                            style={{
                              borderColor: color,
                              backgroundColor: color,
                            }}
                            onClick={() =>
                              editor
                                ?.chain()
                                .focus()
                                .toggleHighlight({ color: color })
                                .run()
                            }
                            className={`${editor?.isActive("highlight", { color: color }) ? "is-active" : ""} py-3 px-3 border`}></DropdownMenuItem>
                        );
                      }
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <input
                type="color"
                onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                  editor?.chain().focus().setColor(event?.target?.value).run()
                }
                value={editor?.getAttributes("textStyle")?.color}
                data-testid="setColor"
              />
            </div>

            <div className="w-8/12 flex flex-row gap-x-3">
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={`
                  ${editor?.isActive("heading", { level: 1 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2
                `}>
                H1
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={`
                  ${editor?.isActive("heading", { level: 2 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2
                `}>
                H2
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={`
                  ${editor?.isActive("heading", { level: 3 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2
                `}>
                H3
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={`
                  ${editor?.isActive("heading", { level: 4 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2
                `}>
                H4
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 5 }).run()
                }
                className={`
                  ${editor?.isActive("heading", { level: 5 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2
                `}>
                H5
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 6 }).run()
                }
                className={`
                  ${editor?.isActive("heading", { level: 6 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2
                `}>
                H6
              </button>
            </div>

            <div className="w-full flex flex-row gap-x-3">
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`${editor?.isActive("bulletList") ? "is-active" : ""} border border-line-20 rounded-lg px-2`}>
                <List className="w-6 h-6 text-black-80" />
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleOrderedList().run()
                }
                className={`${editor?.isActive("orderedList") ? "is-active" : ""} border border-line-20 rounded-lg px-2`}>
                <ListOrdered className="w-6 h-6 text-black-80" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditorContent editor={editor} />
    </>
  );
}