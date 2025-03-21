import { useEffect, useState } from "react";
import { events } from "../models/events";

function Event() {

      const [event, setEvent] = useState<events[]>([])

      useEffect(() => {
        fetch('http://localhost:8080/events')
        .then(res=>res.json())
        .then(json=>setEvent(json))
      }, []);

  return (
    <div>
        <h1>Võistlusalad</h1>
        <div>
            {event.map(event => <div key={event.id}>
                ({event.name})
        </div> )}
    </div>
    </div>
  )
}

export default Event