import React, { useState, useRef, useEffect } from 'react'
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

export interface Task {
  id: number
  title: string
  done: boolean
}

type EditTaskArgs = {
  taskId: number
  taskNewTitle: string
}

interface TaskItemProps {
  item: Task
  index: number
  toggleTaskDone: (id: number) => void
  removeTask: (id: number) => void
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void
}

export function TaskItem({
  item,
  index,
  toggleTaskDone,
  editTask,
  removeTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(item.title)
  const textInputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) textInputRef.current.focus()
      else textInputRef.current.blur()
    }
  }, [isEditing])

  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(item.title)
    setIsEditing(false)
  }

  function handleSubmitEditing() {
    editTask({ taskId: item.id, taskNewTitle: taskNewTitleValue })
    setIsEditing(false)
  }

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item?.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>
          <TextInput
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={taskNewTitleValue}
            onChangeText={setTaskNewTitleValue}
            onSubmitEditing={handleSubmitEditing}
            editable={isEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View
          style={{
            width: 1,
            height: 24,
            marginHorizontal: 12,
            backgroundColor: 'rgba(196, 196, 196, 0.24)',
          }}
        ></View>
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingRight: 24, opacity: isEditing ? 0.2 : 1 }}
          onPress={() => removeTask(item.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
})
