import {
  Input,
  Button,
  message,
} from "antd"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import './css/TodoList.scss'
import { STATUS_DOING } from '../../assets/dictionary'
import moment from 'moment'
import { useTodoListContext } from "./context"


const AppendForm = () => {

  const [ title, setTitle ] = useState('')
  const { appendItem } = useTodoListContext()
  const onInputValueCHange = (e) => {
    setTitle(e.target.value)
  }

  const append = () => {
    if(!title) {
      message.warning('您还未输入标题呢！')
      return
    }

    appendItem(createItem(title))
    clearTitle()
  }
  const clearTitle = () => setTitle('')

  const createItem = (title) => {
    return {
      id: uuidv4(),
      title,
      content: null,
      createTime: moment(new Date()).format('yyyy-MM-DD hh:mm:ss'),
      completeTime: null,
      status: STATUS_DOING
    }
  }

  return (
    <div className="form">
      <Input value={ title } onChange={ onInputValueCHange } onPressEnter={ append } />
      <Button type="primary" onClick={ append }>添加</Button>
      <Button type="primary" onClick={ clearTitle }>清空内容</Button>
    </div>
  )
}


export default AppendForm
