import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { competitor } from "../models/competitor";

function SingleCompetitor() {

    const {competitorId} = useParams();
    const [competitor, setCompetitor] = useState<competitor>();

    useEffect(()=> {
        fetch("http://localhost:8080/competition/" + competitorId)
        .then(res => res.json())
        .then(json=> setCompetitor(json))
    }, [competitorId]);

  return (
    <div>
      <div id="singleCompetitor">
        <h1>Single Competitor</h1>
        <div>Nimi: {competitor?.firstName} {competitor?.lastName}</div>
        <div>Vanus: {competitor?.age}</div>
        <div>Riik: {competitor?.country}</div>
      </div>
    </div>
  )
}

export default SingleCompetitor