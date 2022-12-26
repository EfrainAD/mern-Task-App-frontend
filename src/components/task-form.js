import React from 'react'

const TaskForm = ({createTask, name, isEditing, updateTask, handleInputChange}) => {
     return (
          <form className='task-form' onSubmit={isEditing ? updateTask : createTask}>
               <input type='text' placeholder='Add a task' name='name' onChange={handleInputChange} value={name} />
               
               <button type='submit'>
                    {isEditing ? ('Edit'):('Add')}
               </button>
          </form>
     )
}

export default TaskForm