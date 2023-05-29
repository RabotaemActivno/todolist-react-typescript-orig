import React, { useState } from 'react';
import { TaskType } from './todolist';
import './App.css'
import { Todolist } from './todolist';


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {


  const [tasks, setTasks] = useState([
    {id: 1, title: 'css', isDone: true},
    {id: 2, title: 'js', isDone: true},
    {id: 3, title: 'react', isDone: false}
  ])
  const [filter, setFilter] = useState<FilterValuesType>('completed')



  function removeTask( id: number) {
    let resultTask = tasks.filter(t => t.id !== id)
    setTasks(resultTask)
  }

  let tasksForTodolist = tasks;
  if(filter === 'completed') {
    tasksForTodolist=tasks.filter(t=>t.isDone===true)
  }
  if(filter === 'active') {
    tasksForTodolist=tasks.filter(t=>t.isDone===false)
  }
  

  return (
    <div className="App">
      <Todolist title = 'what to learn'
      tasks={tasksForTodolist}
      removeTask = {removeTask}/>
    </div>
  );
}

export default App;
