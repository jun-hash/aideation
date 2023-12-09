'use client'
import React from "react"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapMenuBar from "./TiptapMenuBar"
import { Button } from "./ui/button"
import { useDebounce } from "@/hooks/useDebounce"
import axios from 'axios'
import { useMutation } from "@tanstack/react-query";
import { NoteType } from "@/lib/db/schema"
import Text from "@tiptap/extension-text";
import { useCompletion } from "ai/react";

type Props = {
  note: NoteType,
}



const TiptapEditer = ({note} :Props) => {
  const [editorState, setEditorState] = React.useState(note.editorState || `<h1>${note.name}</h1>`)
  const { complete, completion } = useCompletion({
    api: "/api/completion"
  })
  //Local State
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": ()=> {
          const prompt = this.editor.getText().split("").slice(-30).join("")
          complete(prompt)
          return true;
        }
      }
    }
  })

  //Server State
  const saveNoteBook = useMutation({
    mutationFn: async () => {
        const response = await axios.post("/api/saveNote", {
          noteId: note.id,
          editorState,
        })
        return response.data;
    },
  }) 

  //Event Handler 
  const debouncedEditorState = useDebounce(editorState, 300)
  React.useEffect(() => {
    // save to DB
    if (debouncedEditorState === "") return;
    saveNoteBook.mutate(undefined, {
      onSuccess: (data) => {
        console.log("success update!", data)
      },
      onError: (error) => {
        console.error(error)
      }
    })
  }, [debouncedEditorState])


  return (
    <>
        <div className="flex justify-between">
            {editor && <TiptapMenuBar editor={editor} />}
            <Button className="bg-green-600">
              {saveNoteBook.isLoading ? "Saving" : "Saved"}
              </Button>
        </div>
        <div className="prose">
            <EditorContent editor={editor} />
        </div>
        <div className="h-8"></div>
        <span className="text-sm">
          Tip: Press{" "}
          <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
            Shift + A   
          </kbd>{" "}
          for AI autocomplete
        </span>
    </>   
  )
}

export default TiptapEditer