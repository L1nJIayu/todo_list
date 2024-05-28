
import { Button, Popconfirm, Checkbox } from "antd"
import { QuestionCircleOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons'
import './css/TodoList.scss'
import { useTodoListContext } from "./context"
import { useCallback, useState } from "react"
import { STATUS_DELETE, STATUS_DOING, STATUS_DONE } from "../../assets/dictionary"


const TodoListItem = ({ id, status, title, content }) => {
  const {
    removeItem,
    deleteItem,
    recoveryItem,
    showUpdateDrawer,
    isShowTodoListDetail,
    updateStatus,
    currStatus
  } = useTodoListContext()

  const getActions = useCallback((status) => {
    let content = null
  
    switch(status) {
      case STATUS_DONE:
      case STATUS_DOING:
        content = (<>
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
          <Button
            type="primary"
            size="small"
            shape="circle"
            danger
            onClick={() => removeItem(id)}>X</Button>
        </>)
        break
      case STATUS_DELETE:
        content = (<>
          <Popconfirm
            title="恢复"
            description="您确定要恢复此任务吗？"
            icon={ <QuestionCircleOutlined style={{ color: 'red' }} /> }
            onConfirm={() => recoveryItem(id)}
          >
            <Button
              type="primary"
              size="small"
              shape="circle"
              danger>
                <SyncOutlined />
              </Button>
          </Popconfirm>
          <Popconfirm
            title="彻底删除"
            description="您确定彻底要删除此任务吗？删除后不可恢复"
            icon={ <QuestionCircleOutlined style={{ color: 'red' }} /> }
            onConfirm={() => deleteItem(id)}
          >
            <Button
              type="primary"
              size="small"
              shape="circle"
              danger>X</Button>
          </Popconfirm>
        </>)
        break
      default:
        content = <span></span>
    }
  
    return content
  }, [ id, showUpdateDrawer, removeItem, recoveryItem, deleteItem ])

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
        { getActions(status) }
      </span>
  </div>
  )
}

export default TodoListItem