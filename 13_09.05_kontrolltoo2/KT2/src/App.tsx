
import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainMenu from './Pages/MainMenu'
import SingleComment from './Pages/SingleComment'
import Users from './Pages/Users'
import CommentByUser from './Pages/CommentByUser'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<MainMenu/>} />
      <Route path='/users' element={<Users/>}/>
      <Route path='/comment/:commentId' element={<SingleComment/>}/>
      <Route path='/userComment/:userId' element={<CommentByUser/>}/>
    </Routes>
    </>
  )
}

export default App
