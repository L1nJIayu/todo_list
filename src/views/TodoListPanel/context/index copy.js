import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { STATUS_DELETE, STATUS_DOING, STATUS_DONE } from "../../../assets/dictionary"
import dayjs from "dayjs"

const TodoListContext = createContext()

export const useTodoListContext = () => useContext(TodoListContext)

export const TodoListProvider = ({ children }) => {
  const [ list , setList ] = useState([])
  const [ filterList, setFilterList ] = useState([])
  const [ isShowUpdateDrawer, setIsShowUpdateDrawer ] = useState(false)
  const [ currActionItem, setCurrActionItem ] = useState(null)
  const [ isShowTodoListDetail, setIsShowTodoListDetail ] = useState(false)
  const [ currStatus, setCurrStatus ] = useState(STATUS_DOING)
  
  const init = useCallback(() => {
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
  }, [])
  useEffect(() => {
    init()
  }, [ init ])

  const updateFilterList = useCallback(() => {
    setFilterList(prevList => list.filter(item => item.status === currStatus))
  }, [ currStatus, list ])
  useEffect(() => {
    updateFilterList()
  }, [ updateFilterList ])

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateData()
    }, 3000)
    return () => clearInterval(intervalId)
  }, [])

  const appendItem = (newItem) => {
    setList(prevList => [newItem, ...prevList])
  }
  // 伪删除
  const removeItem = (id) => updateStatus({ id, status: STATUS_DELETE })
  // 彻底删除
  const deleteItem = (id) => {
    setList(prevList => {
      const target_index = prevList.findIndex(item => item.id === id)
      if(target_index !== -1) {
        const newList = prevList.toSpliced(target_index, 1)
        return newList
      } else {
        return prevList
      }
    })
  }
  const recoveryItem = (id) => {
    const target = list.find(item => item.id === id)
    if(target) {
      if(target.completeTime) {
        updateStatus({ id, status: STATUS_DONE })
      } else {
        updateStatus({ id, status: STATUS_DOING })
      }
    }

  }

  const modifyItem = (newData) => {

    setList(prevList => {
      const { id } = newData
      const targetIndex = prevList.findIndex(item => item.id === id)

      if(targetIndex !== -1) {
        const target = prevList[targetIndex]
        prevList[targetIndex] = {
          ...target,
          ...newData
        }
      }
      
      return [...prevList]
    })


  }

  const updateData = () => {
    setList(list => {
      localStorage.setItem('data', JSON.stringify(list))
      return list
    })
  }
  

  const showUpdateDrawer = (id) => {
    const target = list.find(item => item.id === id)
    if(target) setCurrActionItem(target)
    setIsShowUpdateDrawer(true)
  }
  const hideUpdateDrawer = () => setIsShowUpdateDrawer(false)

  const updateStatus = ({ id, status }) => {
    const target = list.find(item => item.id === id)
    if(target) {
      target.status = status

      switch(status) {
        case STATUS_DONE:
          modifyItem({
            ...target,
            completeTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
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
      updateFilterList()
    }
  }

  return (
    <TodoListContext.Provider
      value={{
        list,
        filterList,
        setList,
        appendItem,
        removeItem,
        deleteItem,
        recoveryItem,
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