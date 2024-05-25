
import { Button, Popconfirm, Checkbox } from "antd"
import { QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import './css/TodoList.scss'
import { useTodoListContext } from "./context"
import { useState } from "react"
import { STATUS_DOING, STATUS_DONE } from "../../assets/dictionary"

const TodoListItem = ({ id, title, content }) => {
  const {
    removeItem,
    showUpdateDrawer,
    isShowTodoListDetail,
    updateStatus,
    currStatus
  } = useTodoListContext()

  const [ checked, setChecked ] = useState(false)

  const [ removeTimer, setRemoveTimer ] = useState(null)

  const onCheckboxChange = (e) => {
    const checked = e.target.checked
    setChecked(checked)

    if(checked) {
      if(!removeTimer) {
        setRemoveTimer(setTimeout(() => {
          updateStatus({ id, status: STATUS_DONE })
          setRemoveTimer(null)
        }, 3000))
      }
    } else {
      if(removeTimer) {
        clearTimeout(removeTimer)
        setRemoveTimer(null)
      }
      updateStatus({ id, status: STATUS_DOING })
    }
  }

  const checkedStyle = {
    textDecoration: 'line-through',
    textDecorationThickness: '5px'
  }

  return (
    <div className="list_item">
      <div className="list_item-left">
        { currStatus === STATUS_DOING && <Checkbox className="list_item-checkbox" onChange={ onCheckboxChange } /> }
        <div>
          <div className="list_item-title" style={ checked ? checkedStyle : {}}>{title}</div>
          { (isShowTodoListDetail && content) && <div className="list_item-content" style={ checked ? checkedStyle : {}}>{ content }</div> }
        </div>
      </div>
      <span className="list_item-actions">
        <Button
          type="primary"
          size="small"
          shape="circle"
          style={{
            backgroundColor: '#ff8533'
          }}
          onClick={() => showUpdateDrawer(id)}
        >
          <EditOutlined />
        </Button>
        <Popconfirm
          title="删除"
          description="您确定要删除此任务吗？"
          icon={ <QuestionCircleOutlined style={{ color: 'red' }} /> }
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