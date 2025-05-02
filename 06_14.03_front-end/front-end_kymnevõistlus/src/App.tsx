
import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage'
import Event from './pages/Event'
import Competitor from './pages/Competitor'
import Result from './pages/Result'
import Menu from './components/Menu'
import ManageCompetitors from './pages/ManageCompetitors'
import ManageResults from './pages/ManageResults'
import SingleCompetitor from './pages/SingleCompetitor'
import ManageCompetitor from './pages/ManageCompetitor'

function App() {

  return (

    <>
    <Menu/>
    <Routes>
            <Route path='/' element={ < MainPage /> } />
            <Route path='/events' element={ < Event /> } />
            <Route path='/competitors' element={ < Competitor/> } />

            <Route path='/results' element={ < Result /> } />
            <Route path='/manageCompetitors' element={ < ManageCompetitors /> } />
            <Route path='/edit-result/:resultId' element={ < ManageCompetitor /> } />
            <Route path='/manageResults' element={ <ManageResults />} />

            <Route path='/competitor/:competitorId' element={ <SingleCompetitor />} />


            <Route path='/*' element={ <div>Page Not Found</div>} /> {/* saab ka HTML-i otse kirjutada sisse. */}
          </Routes>

    </>
  )
}

export default App
