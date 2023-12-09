'use client'
import React from "react"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapMenuBar from "./TiptapMenuBar"
import { Button } from "./ui/button"
import { useDebounce } from "@/hooks/useDebounce"

type Props = {

}



const TiptapEditer = (props:Props) => {
  const [editorState, setEditorState] = React.useState("")
  
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });


  //Event Handler 
  const debouncedEditorState = useDebounce(editorState, 300)
  React.useEffect(() => {
    console.log(debouncedEditorState)
    // setEditorState(debouncedEditorState)

  }, [debouncedEditorState])

  return (
    <>
        <div className="flex">
            {editor && <TiptapMenuBar editor={editor} />}
            <Button>Saved</Button>
        </div>
        <div className="prose">
            <EditorContent editor={editor} />
        </div>
    </>   
  )
}

export default TiptapEditer