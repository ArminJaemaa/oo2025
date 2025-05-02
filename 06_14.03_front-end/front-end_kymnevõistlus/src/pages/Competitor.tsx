import { useEffect, useState } from "react";
import { competitor } from "../models/competitor";
import { Link } from "react-router-dom";

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
      {competitor.map(competitor => <li id="võistleja" key={competitor.id}>
        {competitor.firstName} {competitor.lastName}
        <Link to={"/competitor/" + competitor.id}>
        <button className="competitorViewButton">Vaata</button>
        </Link>
      </li>
     )}
    </ol>

    </div>
  )
}

export default Competitor