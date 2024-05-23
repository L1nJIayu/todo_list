import {
  Form,
  Input,
  Button,
  Popconfirm,
} from "antd"
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useState } from "react"
import './TodoList.scss'


function TodoList () {
  console.log('todoList --- render')
  const [ list, setList ] = useState([])

  const onFinish = (values) => {
    const newList = [createItem(values), ...list]
    setList(newList)
    console.log('values', values)
    console.log('list', list)
  }

  const createItem = (values) => {
    return {
      id: Math.random() * 10000000,
      ...values
    }
  }
  const removeItem = (id) => {
    const target_index = list.findIndex(item => item.id === id)
    console.log(id,  target_index)
    const newList = list.toSpliced(target_index, 1)
    setList([...newList])
  }

  return (
    <div>
      <Form
        layout="inline"
        onFinish={onFinish}>
        <Form.Item
          name="title">
          <Input style={{width: '500px'}} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">添加</Button>
        </Form.Item>
      </Form>
      <div className="list">
        {
          list.map((item) => {
            return (<div key={item.id} className="list_item">
              <span class="list_item-title">{item.title}</span>
              <span class="list_item-actions">
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
                onConfirm={() => removeItem(item.id)}
              >
                <Button
                  type="primary"
                  size="small"
                  shape="circle"
                  danger>X</Button>
              </Popconfirm>
              
              </span>
            </div>)
          })
        }

      </div>
    </div>
  )
}

export default TodoList