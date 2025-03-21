import { useEffect, useState } from "react";
import { competitor } from "../models/competitor";

function Competitor() {

      const [competitor, setCompetitor] = useState<competitor[]>([]);

      useEffect(() => {
        fetch('http://localhost:8080/competition')
        .then(res=>res.json())
        .then(json=>setCompetitor(json)) 
      }, []);

  return (
    <div>
    <h1>Võistlejad</h1>

    <ol className='võistlejad'>
      {competitor.map(competitor => <div key={competitor.id}>
        <li>{competitor.firstName} {competitor.lastName} ({competitor.age}, {competitor.country} )</li>
      </div> )}
    </ol>

    </div>
  )
}

export default Competitor