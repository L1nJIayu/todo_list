import { TodoListProvider } from './context'
import AppendForm from './AppendForm'
import TodoList from './TodoList'
import './css/TodoList.scss'
import UpdateTodoDrawer from './UpdateTodoDrawer'

const TodoListPanel = () => {
  return (
    <div className="panel">
      <div className="title">Todo List</div>
      <TodoListProvider>
        <AppendForm />
        <TodoList />
        <UpdateTodoDrawer />
      </TodoListProvider>

    </div>
  )
}

export default TodoListPanel