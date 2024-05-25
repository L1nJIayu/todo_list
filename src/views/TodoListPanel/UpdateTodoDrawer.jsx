
import { Drawer, Form, Input, Button } from 'antd'
import { useTodoListContext } from './context'
import { useEffect } from 'react'

const UpdateTodoItem = () => {
  const {
    isShowUpdateDrawer,
    currActionItem,
    hideUpdateDrawer,
    modifyItem
  } = useTodoListContext()
  const [ form ] = Form.useForm()
  
  useEffect(() => {
    if(isShowUpdateDrawer && currActionItem) {
      form.setFieldsValue({
        ...currActionItem
      })
    }
  }, [ isShowUpdateDrawer, form, currActionItem ])

  const onFinish = () => {
    const formData = form.getFieldValue()
    modifyItem(formData)
    hideUpdateDrawer()
  }

  return (
    <Drawer
      title="编辑内容"
      open={ isShowUpdateDrawer }
      onClose={ hideUpdateDrawer }>
      <Form
        layout="vertical"
        form={form}
        onFinish={ onFinish }>
        <Form.Item label="标题" name="title">
          <Input  />
        </Form.Item>
        <Form.Item label="详情" name="content">
          <Input.TextArea  />
        </Form.Item>
        <Form.Item label="创建时间" name="createTime">
          { currActionItem?.createTime }
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            block
            htmlType="submit"
            >保存</Button>
        </Form.Item>
      </Form>
    </Drawer> 

  )
}

export default UpdateTodoItem