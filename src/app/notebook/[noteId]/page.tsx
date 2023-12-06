import React from 'react'

type Props = {
    params: {
        noteId: string
    }
}

const NotebookPage  = ({params: {noteId}} : Props) => {
  return (
    <div className="font-semibold text-3xl text-center"> NotebookPage  {noteId}</div>
  )
}

export default NotebookPage;