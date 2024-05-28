import {
  Input,
  Button,
  message,
} from "antd"
import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import './css/TodoList.scss'
import { STATUS_DOING } from '../../assets/dictionary'
import dayjs from 'dayjs'
import { useTodoListContext } from "./context"


const AppendForm = () => {
  
  useEffect(() => inputRef.current.focus(), [])

  const inputRef = useRef(null)
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
      createTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      completeTime: null,
      status: STATUS_DOING
    }
  }

  return (
    <div className="form">
      <Input
        ref={ inputRef }
        value={ title }
        placeholder="请输入代表事项"
        onChange={ onInputValueCHange }
        onPressEnter={ append } />
      <Button type="primary" onClick={ append }>添加</Button>
      <Button type="primary" onClick={ clearTitle }>清空内容</Button>
    </div>
  )
}


export default AppendForm
