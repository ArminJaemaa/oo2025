import { useEffect, useRef, useState } from 'react'
import { result } from '../models/result'
import { events } from '../models/events';
import { competitor } from '../models/competitor';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function ManageResults() {

  const [results, setResults] = useState<result[]>([]);
  const [events, setEvents] = useState<events[]>([]);
  const [competitors, setCompetitor] = useState<competitor[]>([]);

      useEffect(() => {
          fetch("http://localhost:8080/results")
              .then(res=>res.json())
              .then(json=> setResults(json))
        }, []);
        
      useEffect(() => {
        fetch("http://localhost:8080/competition")
        .then(res=>res.json())
        .then(json => setCompetitor(json))
      });

      useEffect(() => {
        fetch("http://localhost:8080/events")
        .then(res=>res.json())
        .then(json => setEvents(json))
      })
  

  const deleteResult = (id:number) => {
            fetch(`http://localhost:8080/results/${id}`, {
                method: "DELETE",
              })
              .then(res=>res.json())
              .then(json=> {
                toast.success("Kustutatud");
                setResults(json)
  });
  }

  const nameRef = useRef<HTMLSelectElement>(null);
  const eventRef = useRef<HTMLSelectElement>(null);
  const resultRef = useRef<HTMLInputElement>(null);

  const addResult = ()=>{
    const newResult = {
      event: {"name":String(eventRef.current?.value,)},
      competitor: {"id":Number(nameRef.current?.value)},
      result: Number(resultRef.current?.value)
    }
    fetch("http://localhost:8080/results", {
      method: "POST",
      body: JSON.stringify(newResult),
      headers: {
        "content-type": "application/json",
      }
    })
    .then(res=>res.json())
    .then(json=>{
      toast.success("Lisatud tulemus");
      setResults(json)})
  }

  return (
    <div>
        <h1>Manage results</h1>
        <div id='addResult'>
          <p>Lisa uus tulemus</p>
          <label>Name</label>
          <select ref={nameRef}>
            {competitors.map(competitor => <option key={competitor.id} value={competitor.id}>{competitor.firstName}</option>  )}
          </select>
          <br />
          <label>Event</label>
          <select ref={eventRef}>
            {events.map(event => <option key={event.id} value={event.name}>{event.name}</option> )}
          </select>
          <br />
          <label>Result</label>
          <input type="number" ref={resultRef} placeholder='Lisa siia tulemus' />
          <div>Tulemus arvutatakse ise automaatselt punktideks</div>
          <button onClick={()=>addResult()} >Add result</button>
        </div>
        <br /><br />
        <table>
            <thead>
                <tr>
                    <th>Competitor</th>
                    <th>Event</th>
                    <th>Result</th>
                    <th>Muuda</th>
                    <th></th>
                    </tr>
            </thead>
            <tbody>
                {results.map(result => (
                    <tr key={result.id}>
                        <td>{result.competitor.firstName}</td>
                        <td>{result.event.name}</td>
                        <td>{result.result}</td>
                        <td>
                            <button onClick={()=>deleteResult(result.id)}>Delete</button>
                        </td>
                        <td>
                          <Link to={"/edit-result/" + result.id}>
                          <button>Muuda</button>
                          </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <ToastContainer />
    </div>
  )
}

export default ManageResults