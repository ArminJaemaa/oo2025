import { useEffect, useRef, useState } from "react";
import { competitor } from "../models/competitor";
import { events } from "../models/events";
import { result } from "../models/result";
import { useNavigate, useParams } from "react-router-dom";

function ManageCompetitor() {

    const {resultId}=useParams(); 
    const nameRef = useRef<HTMLSelectElement>(null);
    const eventRef = useRef<HTMLSelectElement>(null);
    const resultRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const [results, setResults] = useState<result>();
    const [events, setEvents] = useState<events[]>([]);
    const [competitors, setCompetitor] = useState<competitor[]>([]);

     useEffect(() => {
        fetch("http://localhost:8080/results/" + resultId)
        .then(res=>res.json())
        .then(json=> setResults(json))
      }, [resultId]);
    useEffect(() => {
      fetch("http://localhost:8080/competition")
      .then(res=>res.json())
      .then(json => setCompetitor(json))
      },[]);

    useEffect(() => {
      fetch("http://localhost:8080/events")
      .then(res=>res.json())
      .then(json => setEvents(json))
    }, []);

    const editResult = () => {
      const editedResult={
        id: resultId,
        event: {"id":Number(eventRef.current?.value,)},
        competitor: {"id":Number(nameRef.current?.value)},
        result: Number(resultRef.current?.value)
      }
          fetch("http://localhost:8080/results", {
            method: "PUT",
            body: JSON.stringify(editedResult),
            headers: {
              "content-type": "application/json",
            }
          })
          .then(res=>res.json())
          .then(json=>{
            if (json.error) {
              console.error(json.error);
            }else{
              navigate("/manageResults")
            }
          })
        }
    
    if (results?.result === undefined){
      return <div>Page not found</div>
    }

  return (
    <div>
      <h1>Edit competitor result</h1>
      <div>
      <label>Name</label>
        <select ref={nameRef} defaultValue={results.competitor.id}>
          {competitors.map(competitor => <option key={competitor.id} value={competitor.id}>{competitor.firstName}</option>  )}
        </select>
        <br />
        <label>Event</label>
        <select ref={eventRef} defaultValue={results.event.id}>
          {events.map(event => <option key={event.id} value={event.id}>{event.name}</option> )}
        </select>
        <br />
        <label>Result</label>
        <input type="number" ref={resultRef} defaultValue={results.result} />
        <button onClick={()=>editResult()} >edit result</button>
      </div>
    </div>
  )
}

export default ManageCompetitor