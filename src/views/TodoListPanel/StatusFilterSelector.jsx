import { STATUS_DOING, STATUS_DONE, STATUS_DELETE } from "../../assets/dictionary"
import { useTodoListContext } from "./context"


const StatusFilterSelector = () => {
  const { currStatus, setCurrStatus } = useTodoListContext()

  const handleChangeStatus = (status) => {
    setCurrStatus(status)
  }

  return (
    <div class="status_filter_selector">
      <div className={ currStatus === STATUS_DOING ? 'active' : ''} onClick={() => handleChangeStatus(STATUS_DOING)}>未完成</div>
      <div className={ currStatus === STATUS_DONE ? 'active' : ''} onClick={() => handleChangeStatus(STATUS_DONE)}>已完成</div>
      <div className={ currStatus === STATUS_DELETE ? 'active' : ''} onClick={() => handleChangeStatus(STATUS_DELETE)}>已删除</div>
    </div>
  )
}

export default StatusFilterSelector