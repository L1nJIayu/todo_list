import { TodoListProvider } from './context'
import AppendForm from './AppendForm'
import TodoList from './TodoList'
import './css/TodoList.scss'

const TodoListPanel = () => {
  return (
    <div className="panel">
      <div className="title">Todo List</div>
      <TodoListProvider>
        <AppendForm />
        <TodoList />
      </TodoListProvider>
    </div>
  )
}

export default TodoListPanel