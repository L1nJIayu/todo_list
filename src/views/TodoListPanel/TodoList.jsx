import './css/TodoList.scss'
import TodoListItem from './TodoListItem'
import { useTodoListContext } from './context'

const TodoList = () => {
  const { list } = useTodoListContext()
  return (
    <div className="list">
      {
        list.map((item) => {
          return <TodoListItem key={item.id} {...item} />
        })
      }
    </div>
  )
}

export default TodoList