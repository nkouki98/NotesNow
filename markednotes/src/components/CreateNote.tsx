
import {CreateNoteForm} from './CreateNoteForm.tsx'
import { NoteData, Tag } from '../App.tsx'

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function CreateNote({onSubmit, onAddTag, availableTags}: NewNoteProps) {
    return (
        <>
        <h1 className="text-2xl font-bold">New Note</h1>
            <CreateNoteForm
            onSubmit={onSubmit}
            onAddTag={onAddTag}
            availableTags={availableTags}
            />
      </>
  
    )
}