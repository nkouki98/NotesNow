
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Tag } from "../App"
import ReactSelect from "react-select"
import {Badge, Card, Stack} from "react-bootstrap"
import { CloudArrowDownIcon } from "@heroicons/react/16/solid"

type SimplifiedNote = {
    id: string;
    title: string;
    tags: Tag[]; 
  };
  

type NoteListProps = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
}

export function NoteList({
    availableTags, notes

}: NoteListProps){

    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
          return (
            (title === "" ||
              note.title.toLowerCase().includes(title.toLowerCase())) &&
            (selectedTags.length === 0 ||
              selectedTags.every(tag =>
                note.tags.some(noteTag => noteTag.id === tag.id)
              ))
          )
        })
      }, [title, selectedTags, notes])

    return ( 
    
    <>
        <div className="flex flex-col items-center mb-4 -scroll-mt-10 mt-12">
        <div className="flex gap-2">
            <Link to="/new">
            <button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white">
                Create Note
            </button>
            </Link>
            {/* <button onClick={() => (true)} type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white">
            Edit Tags
            </button> */}
        </div>
        <h1 className="text-2xl font-bold mt-12">All Notes</h1>
        <div className="flex mt-4 gap-4">
            <input
            type="text"
            className="w-full border border-gray-300 bg-white focus:outline-none focus:border-gray-500 rounded-md py-2 px-4"
            placeholder="Enter title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            />
        
        </div>


        <div className="relative z-0">
              
              <ReactSelect
              value={selectedTags.map(tag=>{
                return{label: tag.label, value: tag.id}
              })}
              options={availableTags.map(tag => {
                return { label: tag.label, value: tag.id }
              })}
              onChange={tags => {
                setSelectedTags(
                  tags.map(tag => {
                    return { label: tag.label, id: tag.value }
                  })
                )
              }}
                isMulti
                className="peer block w-full appearance-none bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                classNamePrefix="select"
                placeholder="Enter tags..."
                styles={{
                  control: styles => ({
                    ...styles,
                    border: 'none',
                    boxShadow: 'none',
                    color: 'black',
                    marginLeft:'-2%',
                  }),
                }}
              />
            </div>
        </div>
        
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredNotes.map(note => (
            <div key={note.id} className="col-span-1">
            <div className="p-2 my-1 rounded-md text-black">
                <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </div>
            </div>
        ))}
        </div>



    </>
    )
}

const NoteCard: React.FC<SimplifiedNote> = ({ id, title, tags = [] }) => {  // Default value for tags
    return (
      <Link
        to={`/${id}`}
        className="block h-full text-gray-900 no-underline"
      >
        <div className="min-h-60 p-6 border border-gray-400 rounded-lg hover:scale-105 hover:border-cyan-600 transition duration-300">
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <span className="text-lg font-normal p-4 my-2 tracking-tighter font-sans">{title}</span>
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-1">
                {tags.map(tag => (
                  <span
                    key={tag.id}
                    className=" p-1 font-mono text-cyan-700 text-xs truncate"
                  >
                    #{tag.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  };
  
