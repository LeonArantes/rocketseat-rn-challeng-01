import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

type EditTaskArgs = {
  taskId: number
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find((task) => task.title === newTaskTitle)

    if (taskWithSameTitle) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      )
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks([...tasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    let newTasks = tasks.map((task) => ({
      ...task,
      done: id == task.id ? !task.done : task.done,
    }))
    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          style: 'cancel',
          text: 'Não',
        },
        {
          style: 'destructive',
          text: 'Sim',
          onPress: () => {
            let newTasks = tasks.filter((task) => task.id !== id)
            setTasks(newTasks)
          },
        },
      ]
    )
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    let newTasks = tasks.map((task) => ({
      ...task,
      title: taskId == task.id ? taskNewTitle : task.title,
    }))
    setTasks(newTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />
      <TodoInput addTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
})
