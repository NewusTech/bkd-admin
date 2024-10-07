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
import { Filter, List, ListCollapse, ListOrdered } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import TypingEffect from "@/components/ui/TypingEffect";

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
      {/* Mobile */}
      <div className="md:hidden">
        <div className="w-full flex flex-row gap-x-3 flex-wrap border-b border-line-20 py-2 px-2">
          <div className="control-group w-full">
            <div className="button-group max-w-2xl horizontalScroll flex flex-row gap-x-3 justify-between">
              <div className="w-full flex flex-row gap-x-3">
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`${editor?.isActive("bold") ? "is-active" : ""} border border-line-20 rounded-lg px-3 text-xs md:text-sm`}>
                  B
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                  className={`${editor?.isActive("underline") ? "is-active" : ""} border border-line-20 rounded-lg px-3 text-xs md:text-sm`}>
                  U
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`${editor?.isActive("italic") ? "is-active" : ""} border border-line-20 rounded-lg px-4 text-xs md:text-sm`}>
                  I
                </button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300 border border-line-20 rounded-lg px-4">
                    <ListCollapse className="text-primary w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-96 transition-all duration-300 ease-in-out opacity-1 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-white border border-gray-300 shadow-2xl rounded-md mr-4">
                  <DropdownMenuLabel className="font-semibold text-primary text-sm w-full shadow-md">
                    <TypingEffect text={["Detail Text Editor..."]} />
                  </DropdownMenuLabel>
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary-40 to-transparent rounded-full transition-all animate-pulse"></div>
                  <div className="bg-white w-full h-full">
                    <div className="flex flex-col w-full px-2 py-2">
                      <>
                        <div className="button-group w-full">
                          <div className="w-full flex gap-x-2 justify-between p-2">
                            <button
                              type="button"
                              onClick={() =>
                                editor
                                  ?.chain()
                                  .focus()
                                  .setTextAlign("left")
                                  .run()
                              }
                              className={`
                  ${editor?.isActive({ textAlign: "left" }) ? "is-active" : ""} border border-line-20 rounded-lg px-3 p-2`}>
                              <TextAlignLeft className="w-4 h-4 text-black-80" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                editor
                                  ?.chain()
                                  .focus()
                                  .setTextAlign("center")
                                  .run()
                              }
                              className={`
                  ${editor?.isActive({ textAlign: "center" }) ? "is-active" : ""} border border-line-20 rounded-lg px-3 p-2`}>
                              <TextAlignCenter className="w-4 h-4 text-black-80" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                editor
                                  ?.chain()
                                  .focus()
                                  .setTextAlign("right")
                                  .run()
                              }
                              className={`
                  ${editor?.isActive({ textAlign: "right" }) ? "is-active" : ""} border border-line-20 rounded-lg px-3 p-2`}>
                              <TextAlignRight className="w-4 h-4 text-black-80" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                editor
                                  ?.chain()
                                  .focus()
                                  .setTextAlign("justify")
                                  .run()
                              }
                              className={`
                  ${editor?.isActive({ textAlign: "justify" }) ? "is-active" : ""} border border-line-20 rounded-lg px-3 p-2`}>
                              <TextAlignJustify className="w-4 h-4 text-black-80" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                editor?.chain().focus().toggleBulletList().run()
                              }
                              className={`${editor?.isActive("bulletList") ? "is-active" : ""} border border-line-20 rounded-lg px-2 p-2`}>
                              <List className="w-4 h-4 text-black-80" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                editor
                                  ?.chain()
                                  .focus()
                                  .toggleOrderedList()
                                  .run()
                              }
                              className={`${editor?.isActive("orderedList") ? "is-active" : ""} border border-line-20 rounded-lg px-2 p-2`}>
                              <ListOrdered className="w-4 h-4 text-black-80" />
                            </button>
                          </div>
                        </div>

                        <div className="button-group w-full">
                          <div className="w-full flex gap-x-2 justify-between p-2">
                            <button
                              type="button"
                              onClick={() =>
                                editor
                                  ?.chain()
                                  .focus()
                                  .toggleHeading({ level: 1 })
                                  .run()
                              }
                              className={`
                  ${editor?.isActive("heading", { level: 1 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2 p-2 text-xs md:text-sm
                `}>
                              H1
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                editor
                                  ?.chain()
                                  .focus()
                                  .toggleHeading({ level: 2 })
                                  .run()
                              }
                              className={`
                  ${editor?.isActive("heading", { level: 2 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2 text-xs md:text-sm
                `}>
                              H2
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                editor
                                  ?.chain()
                                  .focus()
                                  .toggleHeading({ level: 3 })
                                  .run()
                              }
                              className={`
                  ${editor?.isActive("heading", { level: 3 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2 text-xs md:text-sm
                `}>
                              H3
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                editor
                                  ?.chain()
                                  .focus()
                                  .toggleHeading({ level: 4 })
                                  .run()
                              }
                              className={`
                  ${editor?.isActive("heading", { level: 4 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2 text-xs md:text-sm
                `}>
                              H4
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                editor
                                  ?.chain()
                                  .focus()
                                  .toggleHeading({ level: 5 })
                                  .run()
                              }
                              className={`
                  ${editor?.isActive("heading", { level: 5 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2 text-xs md:text-sm
                `}>
                              H5
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                editor
                                  ?.chain()
                                  .focus()
                                  .toggleHeading({ level: 6 })
                                  .run()
                              }
                              className={`
                  ${editor?.isActive("heading", { level: 6 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2 text-xs md:text-sm
                `}>
                              H6
                            </button>
                          </div>
                        </div>

                        <div className="button-group w-full">
                          <div className="w-full flex gap-x-2 justify-start p-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <div className="border border-line-20 px-5 py-2 rounded-lg">
                                  <Pen className="w-4 h-4 text-black-80" />
                                </div>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-full max-w-xl bg-line-10 flex flex-col">
                                <DropdownMenuLabel>
                                  Pilih Warna
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="w-full flex flex-row flex-wrap gap-x-0.5">
                                  {colors.map(
                                    (
                                      item: {
                                        id: number;
                                        color: string;
                                        name: string;
                                      },
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
                              onInput={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                editor
                                  ?.chain()
                                  .focus()
                                  .setColor(event?.target?.value)
                                  .run()
                              }
                              value={editor?.getAttributes("textStyle")?.color}
                              data-testid="setColor"
                            />
                          </div>
                        </div>
                      </>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}

      {/* dekstop*/}
      <div className="hidden md:block">
        <div className="w-full flex flex-row gap-x-3 flex-wrap border-b border-line-20 pt-4 px-2">
          <div className="control-group w-full">
            <div className="button-group max-w-2xl horizontalScroll flex flex-row gap-x-3">
              <div className="w-full flex flex-row gap-x-3 px-2">
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`${editor?.isActive("bold") ? "is-active" : ""} border border-line-20 rounded-lg px-3 text-xs md:text-sm`}>
                  B
                </button>

                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                  className={`${editor?.isActive("underline") ? "is-active" : ""} border border-line-20 rounded-lg px-3 text-xs md:text-sm`}>
                  U
                </button>

                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`${editor?.isActive("italic") ? "is-active" : ""} border border-line-20 rounded-lg px-4 text-xs md:text-sm`}>
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
                  ${editor?.isActive({ textAlign: "left" }) ? "is-active" : ""} border border-line-20 rounded-lg px-3 text-xs md:text-sm`}>
                  <TextAlignLeft className="w-5 h-5 text-black-80" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().setTextAlign("center").run()
                  }
                  className={`
                  ${editor?.isActive({ textAlign: "center" }) ? "is-active" : ""} border border-line-20 rounded-lg px-3 text-xs md:text-sm`}>
                  <TextAlignCenter className="w-5 h-5 text-black-80" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().setTextAlign("right").run()
                  }
                  className={`
                  ${editor?.isActive({ textAlign: "right" }) ? "is-active" : ""} border border-line-20 rounded-lg px-3 text-xs md:text-sm`}>
                  <TextAlignRight className="w-5 h-5 text-black-80" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().setTextAlign("justify").run()
                  }
                  className={`
                  ${editor?.isActive({ textAlign: "justify" }) ? "is-active" : ""} border border-line-20 rounded-lg px-3 text-xs md:text-sm`}>
                  <TextAlignJustify className="w-5 h-5 text-black-80" />
                </button>
              </div>

              <div className="w-full flex flex-row items-center gap-x-3">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="border border-line-20 px-2 py-2 rounded-lg">
                      <Pen className="w-5 h-5 text-black-80" />
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

              <div className="w-full flex flex-row gap-x-3">
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={`
                  ${editor?.isActive("heading", { level: 1 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2 text-xs md:text-sm
                `}>
                  H1
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={`
                  ${editor?.isActive("heading", { level: 2 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2 text-xs md:text-sm
                `}>
                  H2
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={`
                  ${editor?.isActive("heading", { level: 3 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2 text-xs md:text-sm
                `}>
                  H3
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 4 }).run()
                  }
                  className={`
                  ${editor?.isActive("heading", { level: 4 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2 text-xs md:text-sm
                `}>
                  H4
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 5 }).run()
                  }
                  className={`
                  ${editor?.isActive("heading", { level: 5 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2 text-xs md:text-sm
                `}>
                  H5
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 6 }).run()
                  }
                  className={`
                  ${editor?.isActive("heading", { level: 6 }) ? "is-active" : ""} border border-line-20 rounded-lg px-2 text-xs md:text-sm
                `}>
                  H6
                </button>
              </div>

              <div className="w-full flex flex-row gap-x-3">
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleBulletList().run()
                  }
                  className={`${editor?.isActive("bulletList") ? "is-active" : ""} border border-line-20 rounded-lg px-2 text-xs md:text-sm`}>
                  <List className="w-5 h-5 text-black-80" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleOrderedList().run()
                  }
                  className={`${editor?.isActive("orderedList") ? "is-active" : ""} border border-line-20 rounded-lg px-2 text-xs md:text-sm`}>
                  <ListOrdered className="w-5 h-5 text-black-80" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* dekstop*/}
      <EditorContent editor={editor} />
    </>
  );
}
