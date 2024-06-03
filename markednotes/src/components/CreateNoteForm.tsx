import React, { FormEvent } from 'react';
import { NoteData, Tag } from '../App';
import { useRef, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<NoteData>

export function CreateNoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })

    navigate("..")
  }

  return (
    <div className="flex min-h-screen items-center justify-start bg-white">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="text-4xl font-medium">Create Notes and Mark them with tags.</h1>

        <form onSubmit={handleSubmit} className="mt-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="relative z-0">
              <input
                defaultValue={title}
                type="text"
                name="name"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                ref={titleRef}
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Title
              </label>
            </div>

            <div className="relative z-0">
              <CreatableSelect
                onCreateOption={label => {
                  const newTag = { id: uuidv4(), label };
                  onAddTag(newTag);
                  setSelectedTags(prev => [...prev, newTag]);
                }}
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                options={availableTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map(tag => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
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
                    marginLeft: '-2%',
                  }),
                }}
              />
            </div>
          </div>

          <div className="mt-4 relative z-0">
            <textarea
              defaultValue={markdown}
              name="body"
              rows={15}
              ref={markdownRef}
              className="pt-16 peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder="Your notes here..."
            />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
              Body
            </label>
          </div>

          <button type="submit" className="m-2 mt-5 rounded-md bg-black px-10 py-2 text-white">
            Create Note
          </button>
          <Link to="..">
            <button type="submit" className="m-2 mt-5 rounded-md bg-black px-10 py-2 text-white">
              Cancel
            </button>
          </Link>
          
        </form>
      </div>
    </div>
  );
};
