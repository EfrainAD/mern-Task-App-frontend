import { FaEdit, FaCheckDouble, FaRegTrashAlt } from 'react-icons/fa'

const Task = ({task, index, markCompleted, getSingleTask, deleteTask}) => {
     const handleCompleted = () => markCompleted(task)
     const handleUpdate = () => getSingleTask(task)
     const handleDelete = () => deleteTask(task._id)
     
     return (
          <div className={task.completed ? 'task completed' : 'task'}>
               <p>
                    <b>{index}. </b>
                    {task.name}
               </p>
               <div className="task-icons">
                    <FaCheckDouble 
                         color='green'
                         onClick={handleCompleted}     
                    />
                    <FaEdit 
                         color='purple' 
                         onClick={handleUpdate} 
                    />
                    <FaRegTrashAlt 
                         color='red' 
                         onClick={handleDelete} 
                    />
               </div>
          </div>
     )
}

export default Task