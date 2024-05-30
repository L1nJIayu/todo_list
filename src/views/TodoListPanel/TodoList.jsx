import { Empty } from 'antd'
import './css/TodoList.scss'
import TodoListItem from './TodoListItem'
import { useTodoListContext } from './context'

const TodoList = () => {
  const { filterList } = useTodoListContext()
  console.log('TodoList---filterList', filterList)
  return (
    <div className="list">
      { filterList.length === 0 && <Empty description="暂无数据" />}
      {
        filterList.map((item) => {
          return <TodoListItem key={item.id} {...item} />
        })
      }
    </div>
  )
}

export default TodoList