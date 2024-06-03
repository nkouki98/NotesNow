
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { CreateNote } from './components/CreateNote';
import { useMemo } from 'react';
import { useLocalStorage } from './Hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import { NoteList } from './components/NoteList';
import { NoteLayout } from './components/NoteLayout';
import { Note } from './components/Note';
import { EditNote } from './components/EditNote';

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}




function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
  
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }


  return (
    <div className="container mx-auto p-4">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags} />} />
        
        <Route path="/new" element={
        <CreateNote 
          onSubmit={onCreateNote} 
          onAddTag={addTag} 
          availableTags={tags} />
        } 
        />

        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote}/>} />
          <Route path="edit" element=     {<EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />}
              />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
