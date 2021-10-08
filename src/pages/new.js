import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { useTasks } from "../context/taskContext"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router'

const TaskFormPage = () => {
    const router = useRouter()

    const [task, setTask] = useState({
        title: '',
        descripiton: ''
    })

    const { createTask, updateTask, tasks } = useTasks()

    const { title, description } = task

    const handleChange = ({ target }) => {
        setTask({
            ...task,
            [target.name]: target.value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if ( ! router?.query?.id ) {
            createTask({
                id: uuidv4(),
                title,
                description
            })
        } else {
            updateTask( router.query.id, { title, description })
        }
        router.push('/')
    }

    useEffect(() => {
        if ( router?.query?.id ) {
            const taskFounded = tasks.find( t => t.id === router?.query?.id  )
            setTask({ title: taskFounded.title, description: taskFounded.description })
        }
    }, [])

    return (
        <Layout>
            <div className='flex justify-center items-center h-full'>
                <form
                    className='bg-gray-700 p-10 h-2/4'
                    onSubmit={handleSubmit}
                >
                    <h1 className='text-3xl mb-7'>{ router?.query?.id ? 'Update task' : 'Create task'}</h1>
                    <input
                        className='bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5'
                        type="text" placeholder="White a task"
                        name="title"
                        value={ title }
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        value={ description }
                        onChange={handleChange}
                        className='bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5'
                        rows="2" placeholder="write a description"></textarea>

                    <button
                        className='bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-20'
                        disabled={ task.title !== '' ? false : true }
                    >
                        Save
                    </button>
                </form>
            </div>
        </Layout>
    )
}


export default TaskFormPage