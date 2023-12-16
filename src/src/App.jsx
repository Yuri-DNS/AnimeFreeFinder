import './App.css'
import MainMenu from './components/Menus/MainMenu'
import Content from './components/Content/Content'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
          <MainMenu/>
          <Content/>
        </BrowserRouter>
    </>
  )
}

export default App
