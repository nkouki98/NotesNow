
import { Link, useNavigate } from "react-router-dom"
import { useNote } from "./NoteLayout"
import ReactMarkdown from "react-markdown"

type NoteProps = {
    onDelete: (id: string) => void
  }
  

export function Note({onDelete}:NoteProps){
    const note = useNote()
    const navigate = useNavigate()


    return (
        <>
  <div className="flex items-center justify-center min-h-screen p-1">
      <div className="w-full max-w-4xl p-16 border border-zinc-300 rounded bg-white shadow-md">
        <div className="flex flex-col md:flex-row items-center mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{note.title}</h1>
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {note.tags.map(tag => (
                  <span className="truncate bg-gray-200 text-gray-700 px-2 py-1 rounded" key={tag.id}>
                    {tag.label}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 md:mt-0 md:ml-4">
            <div className="flex gap-2">
              <Link to={`/${note.id}/edit`}>
                <button className="bg-orange-700 text-white px-4 py-2 rounded">Edit</button>
              </Link>
              <button
                onClick={() => {
                  onDelete(note.id);
                  navigate("/");
                }}
                className="border border-orange-700 text-orange-700 px-4 py-2 rounded hover:bg-orange-700 hover:text-white"
              >
                Delete
              </button>
              <Link to="/">
                <button className="border border-gray-500 text-gray-500 bg-black text-gray-200 px-4 py-2 rounded">Back</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="prose">
          <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </div>
      </div>
    </div>

  
      </>
      
    );
};