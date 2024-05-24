import { createContext, useContext, useState, useEffect } from "react"

const TodoListContext = createContext()

export const useTodoListContext = () => useContext(TodoListContext)

export const TodoListProvider = ({ children }) => {
  const [ list , setList ] = useState([])

  
  useEffect(() => {
    init()
  }, [])

  const init = () => {
    const data = localStorage.getItem('data')
    if(data) {
      setList(JSON.parse(data))
    } else {
      localStorage.setItem('data', JSON.stringify([]))
    }
  }

  const appendItem = (newItem) => {
    const newList = [newItem, ...list]
    setList(newList)
    updateData(newList)
  }
  const removeItem = (id) => {
    const target_index = list.findIndex(item => item.id === id)
    const newList = list.toSpliced(target_index, 1)
    setList([...newList])
    updateData(newList)
  }


  const updateData = (data) => {
    localStorage.setItem('data', JSON.stringify(data))
  }

  return (
    <TodoListContext.Provider
      value={{
        list,
        setList,
        appendItem,
        removeItem
      }}
    >
      { children }
    </TodoListContext.Provider>
  )
}