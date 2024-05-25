import { createContext, useContext, useState, useEffect } from "react"
import { STATUS_DOING, STATUS_DONE } from "../../../assets/dictionary"
import moment from "moment"

const TodoListContext = createContext()

export const useTodoListContext = () => useContext(TodoListContext)

export const TodoListProvider = ({ children }) => {
  const [ list , setList ] = useState([])
  const [ isShowUpdateDrawer, setIsShowUpdateDrawer ] = useState(false)
  const [ currActionItem, setCurrActionItem ] = useState(null)
  const [ isShowTodoListDetail, setIsShowTodoListDetail ] = useState(false)
  const [ currStatus, setCurrStatus ] = useState(STATUS_DOING)
  
  useEffect(() => {
    init()
  }, [])


  useEffect(() => {
    setList(prevList => {
      const data = JSON.parse(localStorage.getItem('data') || '[]')
      const newList = data.filter(item => item.status === currStatus)
      return newList
    })
  }, [ currStatus ])

  const init = () => {
    try {
      const data = localStorage.getItem('data')
      if(data) {
        setList(JSON.parse(data))
      } else {
        localStorage.setItem('data', JSON.stringify([]))
      }
    } catch (err) {
      localStorage.setItem('data', JSON.stringify([]))
    }
  }

  const appendItem = (newItem) => {
    const newList = [newItem, ...list]
    setList(newList)
    updateData(newList)
  }

  const removeItem = (id) => {
    setList(prevList => {
      const target_index = prevList.findIndex(item => item.id === id)
      if(target_index !== -1) {
        const newList = prevList.toSpliced(target_index, 1)
        updateData(newList)
        return newList
      } else {
        return prevList
      }
    })
  }

  const modifyItem = (newData) => {

    setList(list => {
      const { id } = newData
      const targetIndex = list.findIndex(item => item.id === id)

      if(targetIndex !== -1) {
        const target = list[targetIndex]
        list[targetIndex] = {
          ...target,
          ...newData
        }
        updateData(list)
      }
      
      return list
    })


  }

  const updateData = (data) => {
    localStorage.setItem('data', JSON.stringify(data))
  }

  const updateList = () => {
    setList(prevList => {
      const data = JSON.parse(localStorage.getItem('data') || '[]')
      const newList = data.filter(item => item.status === currStatus)
      return newList
    })
  }

  const showUpdateDrawer = (id) => {
    const target = list.find(item => item.id === id)
    if(target) setCurrActionItem(target)
    setIsShowUpdateDrawer(true)
  }
  const hideUpdateDrawer = () => setIsShowUpdateDrawer(false)

  const updateStatus = ({ id, status }) => {
    const data = JSON.parse(localStorage.getItem('data') || '[]')
    const target = data.find(item => item.id === id)
    if(target) {
      target.status = status

      switch(status) {
        case STATUS_DONE:
          modifyItem({
            ...target,
            completeTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          })
          break
        case STATUS_DOING:
          modifyItem({
            ...target,
            completeTime: null
          })
          break
        default:
          break
      }
      updateData(data)
      updateList()


    }
  }

  return (
    <TodoListContext.Provider
      value={{
        list,
        setList,
        appendItem,
        removeItem,
        modifyItem,
        currActionItem,
        isShowUpdateDrawer,
        showUpdateDrawer,
        hideUpdateDrawer,
        isShowTodoListDetail,
        setIsShowTodoListDetail,
        currStatus,
        setCurrStatus,
        updateStatus
      }}
    >
      { children }
    </TodoListContext.Provider>
  )
}