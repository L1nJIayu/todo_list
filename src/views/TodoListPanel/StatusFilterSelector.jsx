import { useCallback } from "react"
import { STATUS_DOING, STATUS_DONE, STATUS_DELETE } from "../../assets/dictionary"
import { useTodoListContext } from "./context"
import classNames from "classnames"


const StatusFilterSelector = () => {
  const { currStatus, setCurrStatus } = useTodoListContext()

  const handleChangeStatus = useCallback((status) => {
    setCurrStatus(status)
  }, [ setCurrStatus ])

  const options = [
    { label: '未完成', status: STATUS_DOING },
    { label: '已完成', status: STATUS_DONE },
    { label: '已删除', status: STATUS_DELETE },
  ]

  return (
    <div className="status_filter_selector">
      {
        options.map(item => (
          <div
            className={
              classNames(
                'option',
                {
                  'active': currStatus === item.status
                }
              )
            }
            onClick={ () => handleChangeStatus(item.status) }>
              { item.label }
          </div>
        ))
      }
    </div>
  )
}

export default StatusFilterSelector