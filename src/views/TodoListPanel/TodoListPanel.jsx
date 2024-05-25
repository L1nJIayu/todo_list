import { TodoListProvider } from './context'
import AppendForm from './AppendForm'
import TodoList from './TodoList'
import './css/TodoList.scss'
import UpdateTodoDrawer from './UpdateTodoDrawer'
import Actions from './Actions'

const TodoListPanel = () => {
  return (
    <TodoListProvider>
      <div className="panel">
        <div className="title">Todo List</div>
        <Actions />
        <AppendForm />
        <TodoList />
        <UpdateTodoDrawer />
      </div>
    </TodoListProvider>
  )
}

export default TodoListPanel