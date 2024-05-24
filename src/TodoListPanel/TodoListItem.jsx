
import {
  Button,
  Popconfirm,
} from "antd"
import { QuestionCircleOutlined } from '@ant-design/icons'
import './css/TodoList.scss'
import { useTodoListContext } from "./context"

const TodoListItem = ({ id, title }) => {
  const { removeItem } = useTodoListContext()
  return (
    <div className="list_item">
      <span className="list_item-title">{title}</span>
      <span className="list_item-actions">
        <Popconfirm
          title="删除"
          description="您确定要删除此任务吗？"
          icon={
            <QuestionCircleOutlined
              style={{
                color: 'red',
              }}
            />
          }
          onConfirm={() => removeItem(id)}
        >
          <Button
            type="primary"
            size="small"
            shape="circle"
            danger>X</Button>
        </Popconfirm>
      </span>
  </div>
  )
}

export default TodoListItem