import { createContext, useContext, useState } from "react";



const TaskContext = createContext()

export const useTasks = () => useContext( TaskContext )

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])


    const createTask = ( task ) => {
        setTasks([...tasks, { ...task } ])
    }

    const updateTask = ( id, taskUpdate ) => {
        setTasks([
            ...tasks.map( task =>  task.id === id ? { ...task, ...taskUpdate } : task )
        ])
    }


    const deleteTask = ( id ) => {
        setTasks([
            ...tasks.filter( task => task.id !== id )
        ])
    }


    return (
        <TaskContext.Provider
            value={{
                tasks,
                createTask,
                updateTask,
                deleteTask
            }}
        >
            { children }
        </TaskContext.Provider>
    )
}


