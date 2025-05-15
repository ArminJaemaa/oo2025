import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import EditWord from './pages/EditWord'
import ViewSingleWord from './pages/ViewSingleWord'
import AdministratorList from './pages/AdministratorList'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<MainPage/>} />
      <Route path='/edit' element={<EditWord/>}/>
      
      <Route path='/word/:wordId' element={<ViewSingleWord/>}/>
      <Route path='/admin' element={<AdministratorList/>}/>

      <Route path='/*' element={ <div>Page Not Found</div>} />
    </Routes>
    
    </>
  )
}

export default App
