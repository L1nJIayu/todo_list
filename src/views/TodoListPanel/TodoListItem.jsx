
import { Button, Popconfirm, Checkbox } from "antd"
import { QuestionCircleOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons'
import './css/TodoList.scss'
import { useTodoListContext } from "./context"
import { useState } from "react"
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
      {
        
        status === STATUS_DELETE ? (
          <span className="list_item-actions">
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
          </span>
        ) : (
            
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
            <Button
              type="primary"
              size="small"
              shape="circle"
              danger
              onClick={() => removeItem(id)}>X</Button>
          </span>
        )
      }
      {
        // status === STATUS_DELETE ? (
        //   <span className="list_item-actions">
        //     <Popconfirm
        //       title="恢复"
        //       description="您确定要恢复此任务吗？"
        //       icon={ <QuestionCircleOutlined style={{ color: 'red' }} /> }
        //       onConfirm={() => recoveryItem(id)}
        //     >
        //       <Button
        //         type="primary"
        //         size="small"
        //         shape="circle"
        //         danger>
        //           <SyncOutlined />
        //         </Button>
        //     </Popconfirm>
        //     <Popconfirm
        //       title="彻底删除"
        //       description="您确定彻底要删除此任务吗？删除后不可恢复"
        //       icon={ <QuestionCircleOutlined style={{ color: 'red' }} /> }
        //       onConfirm={() => deleteItem(id)}
        //     >
        //       <Button
        //         type="primary"
        //         size="small"
        //         shape="circle"
        //         danger>X</Button>
        //     </Popconfirm>
        //   </span>
        // ) : (
        //   <span className="list_item-actions">
        //     <Button
        //       type="primary"
        //       size="small"
        //       shape="circle"
        //       style={{
        //         backgroundColor: '#ff8533'
        //       }}
        //       onClick={() => showUpdateDrawer(id)}
        //     >
        //       <EditOutlined />
        //     </Button>
        //     <Button
        //       type="primary"
        //       size="small"
        //       shape="circle"
        //       danger
        //       onClick={removeItem(id)}>X</Button>
        //   </span>
        // )
      }
  </div>
  )
}

export default TodoListItem