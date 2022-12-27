import React, { useState } from 'react'
import { useEditor, useEditorValue } from '../../Components/Editor'
import { MAX_TITLE_LENGTH } from '../../config'
import { useFetch } from '../../Contexts/Fetch'

const NewAnnouncement = () => {
    const Editor = useEditor();
    const EditorValue = useEditorValue()()
    const CustomFetch = useFetch();

    const [ title, setTitle ] = useState({
        count: 0,
        value: ''
    })

    const updateTitle = (e) => {
        const value = e.target.value
        const count = e.target.value.length
        console.log(EditorValue)

        if (count > MAX_TITLE_LENGTH) return

        setTitle(() => {
            return {
                value,
                count
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { response, data} = await CustomFetch({url: 'announcement', options: {
            method: 'POST',
            body: JSON.stringify({
                title: title.value,
                content: EditorValue
            })
        }, returnResponse: true})

        console.log(data, response)
    };

    return (

    <div className='px-2 w-full mx-auto mt-10'>
        <form onSubmit={handleSubmit} className='w-full'>
            <section className='relative'>
                <input type="text" name="title" placeholder='Title...'  onChange={updateTitle} value={title.value} className='px-2 mb-2 py-1 rounded-sm w-full border-gray-400 outline-none border-1 text-gray-600' />
                <span className='absolute right-1 bottom-2 font-light text-sm'>{title.count}/{MAX_TITLE_LENGTH}</span>
            </section>
            <Editor />
            <div className='w-full grid place-content-center mt-2'>
                <button type="submit" className='bg-indigo-500 text-white px-3 py-1 rounded-sm'>Create Announcement</button>
            </div>
        </form>
    </div>
    )
}

export default NewAnnouncement