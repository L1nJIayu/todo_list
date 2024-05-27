import './App.scss'
import TodoListPanel from './views/TodoListPanel/TodoListPanel'
import { HashRouter } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <div className="App">
        <TodoListPanel />
      </div>
    </HashRouter>
  )
}

export default App
