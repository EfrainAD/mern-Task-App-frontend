import Task from "./task"
import TaskForm from "./task-form"
import { URL } from '../App'
import { useEffect, useState } from "react"
import axios, { Axios } from 'axios'
import { toast } from "react-toastify"
import loadingImage from '../assets/loader.gif'

const TaskList = () => {
     const [formData, setFormData] = useState({name: '', completed: false})
     const name = formData.name
     const [tasks, setTasks] = useState([])
     const [completedTask, setCompletedTask] = useState([])
     const [isLoading, setIsLoading] = useState(false)
     const [isEditing, setIsEditing] = useState(false)
     const [taskId, setTaskId] = useState('')

     const handleInputChange = (e) => {
          const {name, value} = e.target
          setFormData({...formData, [name]: value})
     }

     const getTasks = async () => {
          setIsLoading(true)
          try {
               const { data } = await axios(`${URL}/api/tasks`)
               setTasks(data)
               setIsLoading(false)
          } catch (error) {
               toast.error(error.message)
               setIsLoading(false)
          }
     }

     const deleteTask = async (id) => {
          try {
               await axios.delete(`${URL}/api/tasks/${id}`)
               toast.success('Task has been deleted')
               getTasks()
          } catch (error) {
               toast.error(error.message)
          }
     }

     useEffect(() => {
       getTasks()
     }, [])
     
     useEffect(() => {
          setCompletedTask(tasks.filter(task => task.completed))
     }, [tasks])
     

     const createTask = async (e) => {
          e.preventDefault()

          if (name === '') return toast.error('Can not have an empty to-do')

          try {
               await axios.post(`${URL}/api/tasks`, formData)
               setFormData({name: '', completed: false})
               getTasks()
               toast.success('Task has been added')
          } catch (error) {
               toast.error(error.message)
          }
     }

     const getSingleTask = (task) => {
          setFormData({name: task.name, completed: false})
          setTaskId(task._id)
          setIsEditing(true)
     }
     const updateTask = async (e) => {
          e.preventDefault()
          if (name === '') return toast.error('Can not have an empty to-do')
          try {
               await axios.put(`${URL}/api/tasks/${taskId}`, formData)
               setFormData({name: '', completed: false})
               setTaskId('')
               setIsEditing(false)
               getTasks()
               toast.success('Edit Successful')
          } catch (error) {
               toast.error(error.message)
          }
     }
     const markCompleted = async (task) => {
          try {
               await axios.put(`${URL}/api/tasks/${task._id}`, {...task, completed: true} )
               getTasks()
               toast.success('Marked Complete!')
          } catch (error) {
               toast.error(error.message)
          }
     }
     return (
          <div>
               <h2>Task Manager</h2>
               <TaskForm 
                    createTask={createTask}
                    name={name}
                    handleInputChange={handleInputChange}
                    isEditing={isEditing}
                    updateTask={updateTask}
               />
               {tasks.length && (
                    <div className="--flex-between --pd">
                         <p>
                              <b>Totle Task:</b> {tasks.length}
                         </p>
                         <p>
                              <b>Completed Task:</b> {completedTask.length}
                         </p>
                    </div>
               )}
               <hr />
               {
                    isLoading && (
                         <div className="--flex-center">
                              <img src={loadingImage} alt='loading' />
                         </div>
                    )
               }
               {
                    !isLoading && tasks.length === 0 ? (
                         <p className="--py">You have no tasks</p>
                    ):(
                         <>
                              {tasks.map((task, index) => 
                                   <Task 
                                        key={task._id} 
                                        task={task} 
                                        index={index + 1} 
                                        deleteTask={deleteTask} getSingleTask={getSingleTask}
                                        markCompleted={markCompleted}
                                   />)}
                         </>
                    )
               }
          </div>
     )
}

export default TaskList