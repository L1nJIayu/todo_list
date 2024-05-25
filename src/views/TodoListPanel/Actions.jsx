import { Switch } from "antd"
import { useTodoListContext } from "./context"
import StatusFilterSelector from './StatusFilterSelector'

const DetailSwitch = () => {
  const { isShowTodoListDetail, setIsShowTodoListDetail } = useTodoListContext()

  const onChange = (checked) => setIsShowTodoListDetail(checked)
  
  return (
    <div className="actions">
      <StatusFilterSelector />
      <Switch
        checkedChildren="显示详情"
        unCheckedChildren="隐藏详情"
        checked={ isShowTodoListDetail }
        onChange={ onChange } />
    </div>
  )
}


export default DetailSwitch