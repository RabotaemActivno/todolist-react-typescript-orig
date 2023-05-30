import React, { useState } from 'react';
import { TaskType } from './todolist';
import './App.css'
import { Todolist } from './todolist';
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key:string]: Array<TaskType>
}

function App() {



  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false}
    let tasks = tasksObj[todolistId]
    let newTasks = [task, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({...tasksObj})
  }

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filtredTasks = tasks.filter(t => t.id !== id)
    tasksObj[todolistId] =filtredTasks
    setTasks({...tasksObj})
  }

  function changeStatus(id: string, isDone: boolean, todolistId:string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === id)
    if (task) {
      task.isDone = isDone
      setTasks({...tasksObj})
    }
  }

  function changeTaskTitle(id: string, newTile: string, todolistId:string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === id)
    if (task) {
      task.title = newTile
      setTasks({...tasksObj})
    }
  }

  let removeTodolist =(todolistId: string) => {
    let filtredTodolist = todolists.filter(tl => tl.id !==todolistId)
    setTodolists(filtredTodolist)
    delete tasksObj[todolistId];
    setTasks({...tasksObj})
  }
  let changeTodolistTitle =(todolistId: string, newTitle: string) => {
    const todolist = todolists.find(tl => tl.id ===todolistId)
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
    }
  }

  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'what to learn', filter: 'all' },
    { id: todolistId2, title: 'what to buy', filter: 'completed' }
  ])

  const [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: 'css', isDone: true },
      { id: v1(), title: 'js', isDone: true },
      { id: v1(), title: 'react', isDone: false }
    ],
    [todolistId2]: [
      { id: v1(), title: 'bolki', isDone: true },
      { id: v1(), title: 'homut', isDone: true },
      { id: v1(), title: 'spirt', isDone: false }
    ]
  })

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id:v1(),
      filter: 'all',
      title:title
    }

    setTodolists([todolist, ...todolists]);
    setTasks({...tasksObj, [todolist.id]:[]})
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist}/>
      {
        todolists.map((tl) => {
          let tasksForTodolist = tasksObj[tl.id];

          if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
          }
          if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
          }

          return (
            <Todolist
              key={tl.id}
              id={tl.id}
              removeTodolist={removeTodolist}
              changeTodolistTitle={changeTodolistTitle}
              title={tl.title}
              filter={tl.filter}
              changeTaskStatus={changeStatus}
              changeTaskTitle={changeTaskTitle}
              addTask={addTask}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeFilter={changeFilter}
            />
          )
        })
      }
    </div>
  );
}

export default App;
