import { useEffect, useState } from 'react'

import './App.css'
import { competitor } from './models/competitor'
import { events } from './models/events';
import { result } from './models/result';

function App() {
  const [competitor, setCompetitor] = useState<competitor[]>([]);
  const [event, setEvent] = useState<events[]>([])
  const [result, setResult] = useState<result[]>([])

  useEffect(() => {
    fetch('http://localhost:8080/competition')
    .then(res=>res.json())
    .then(json=>setCompetitor(json)) 
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/events')
    .then(res=>res.json())
    .then(json=>setEvent(json))
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/results')
    .then(res=>res.json())
    .then(json=>setResult(json))
  }, []);

  return (
    <>
    <h1>Kümnevõistlus back-endist</h1>
    <div className='textContainer'>
      <h2>võistlejad:</h2>
    <ol className='võistlejad'>
      {competitor.map(competitor => <div key={competitor.id}>
        <li>{competitor.firstName} {competitor.lastName} ({competitor.age}, {competitor.country} )</li>
      </div> )}
    </ol>
    <h2>Võistlusalad:</h2>
    <div>
      {event.map(event => <div key={event.id}>
        ({event.name})
      </div> )}
    </div>
    <h2>Tulemused:</h2>
    <div>
      {result.map(result=> <div key={result.id}>
        {result.competitor.firstName}({result.event.name}) - {Math.round(result.result)}
      </div> )}
    </div>
    </div>
    </>
  )
}

export default App
