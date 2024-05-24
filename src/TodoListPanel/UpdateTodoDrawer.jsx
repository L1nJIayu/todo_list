
import { Drawer } from 'antd'
import { useTodoListContext } from './context'

const UpdateTodoItem = () => {
  const { isShowUpdateDrawer } = useTodoListContext()
  return (
    <Drawer open={ isShowUpdateDrawer }>
      <div>修改内容</div>
    </Drawer> 

  )
}

export default UpdateTodoItem